/* cursor-highlight.js
   Draws a bright halo around the mouse / pen / touch position, so the cursor
   stays visible when the screen is mirrored with Weylus (which does not capture
   the system cursor).

   - On/off: the arrow button in the bottom-left tool dock, or press "H".
   - The choice is remembered (localStorage). Default: ON.
   - Self-contained: injects its own CSS, needs nothing from app.js / style.css.
   - Tweak the look with the three constants below. */
(function () {
  "use strict";

  var SIZE = 34;                 // ring diameter in px (try 42 if it is too small on the panel)
  var COLOR = "255, 196, 0";     // halo colour as r, g, b (yellow)
  var STORAGE_KEY = "analyticsLab.cursorHighlight";

  var enabled = readPref();
  var halo = null;
  var posX = -200, posY = -200;
  var frameQueued = false;
  var shown = false;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readPref() {
    try { return localStorage.getItem(STORAGE_KEY) !== "off"; } catch (e) { return true; }
  }
  function savePref() {
    try { localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off"); } catch (e) { /* ignore */ }
  }

  function injectStyles() {
    var css = [
      ".cursor-halo{position:fixed;left:0;top:0;width:" + SIZE + "px;height:" + SIZE + "px;",
      "margin:-" + (SIZE / 2) + "px 0 0 -" + (SIZE / 2) + "px;z-index:2000;pointer-events:none;",
      "opacity:0;transition:opacity .12s ease;will-change:transform}",
      ".cursor-halo.visible{opacity:1}",
      ".cursor-halo-ring{position:absolute;inset:0;border-radius:50%;box-sizing:border-box;",
      "border:3px solid rgba(" + COLOR + ",.95);background:rgba(" + COLOR + ",.12);",
      /* thin dark outline + glow so it also reads on white and on dark code blocks */
      "box-shadow:0 0 0 1.5px rgba(20,24,32,.5),0 0 8px 1px rgba(" + COLOR + ",.4);",
      "transition:transform .12s ease,background .12s ease}",
      ".cursor-halo.pressed .cursor-halo-ring{transform:scale(.75);background:rgba(" + COLOR + ",.35)}",
      ".cursor-halo-dot{position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;",
      "border-radius:50%;background:rgba(20,24,32,.85);box-shadow:0 0 0 2px rgba(255,255,255,.9)}",
      ".cursor-ripple{position:fixed;z-index:1999;pointer-events:none;width:" + SIZE + "px;height:" + SIZE + "px;",
      "margin:-" + (SIZE / 2) + "px 0 0 -" + (SIZE / 2) + "px;border-radius:50%;box-sizing:border-box;",
      "border:3px solid rgba(" + COLOR + ",.9);animation:cursorRipple .45s ease-out forwards}",
      "@keyframes cursorRipple{from{transform:scale(.7);opacity:.9}to{transform:scale(1.7);opacity:0}}"
    ].join("");
    var style = document.createElement("style");
    style.id = "cursorHighlightStyles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildHalo() {
    halo = document.createElement("div");
    halo.className = "cursor-halo";
    halo.setAttribute("aria-hidden", "true");
    halo.innerHTML = '<div class="cursor-halo-ring"></div><div class="cursor-halo-dot"></div>';
    document.body.appendChild(halo);
  }

  /* ---- drawing --------------------------------------------------------- */
  function paint() {
    frameQueued = false;
    if (!halo) return;
    halo.style.transform = "translate3d(" + posX + "px," + posY + "px,0)";
    halo.classList.toggle("visible", enabled && shown);
  }
  function queuePaint() {
    if (frameQueued) return;
    frameQueued = true;
    requestAnimationFrame(paint);
  }

  /* ---- pointer tracking (mouse, pen and touch all arrive as pointer events) */
  function onMove(e) {
    posX = e.clientX;
    posY = e.clientY;
    shown = true;
    queuePaint();
  }
  function onDown(e) {
    onMove(e);
    if (!enabled || !halo) return;
    halo.classList.add("pressed");
    if (reduceMotion) return;
    var r = document.createElement("div");
    r.className = "cursor-ripple";
    r.style.left = e.clientX + "px";
    r.style.top = e.clientY + "px";
    r.addEventListener("animationend", function () { r.remove(); });
    document.body.appendChild(r);
  }
  function onUp(e) {
    if (halo) halo.classList.remove("pressed");
    if (e && e.pointerType === "touch") { shown = false; queuePaint(); } // finger lifted: nothing to follow
  }
  function hide() {
    shown = false;
    if (halo) halo.classList.remove("pressed");
    queuePaint();
  }

  /* ---- on / off -------------------------------------------------------- */
  function syncButton() {
    var btn = document.getElementById("cursorToggle");
    if (!btn) return;
    var label = enabled ? "Cursor highlight: on (press H)" : "Cursor highlight: off (press H)";
    btn.title = label;
    btn.setAttribute("aria-label", label);
    btn.setAttribute("aria-pressed", String(enabled));
    btn.classList.toggle("active", enabled);
  }
  function setEnabled(on) {
    enabled = !!on;
    savePref();
    syncButton();
    queuePaint();
  }

  function addToggleButton() {
    var group = document.querySelector(".tool-dock .dock-buttons");
    if (!group || document.getElementById("cursorToggle")) return !!group;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "cursorToggle";
    btn.className = "icon-btn";
    btn.innerHTML = '<i class="fa-solid fa-arrow-pointer"></i>';
    btn.addEventListener("click", function () { setEnabled(!enabled); });
    group.appendChild(btn);
    syncButton();
    return true;
  }

  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || (e.key !== "h" && e.key !== "H")) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    setEnabled(!enabled);
  }

  function init() {
    injectStyles();
    buildHalo();

    // Capture phase: still fires if something else stops propagation (e.g. the pen canvas).
    document.addEventListener("pointermove", onMove, { passive: true, capture: true });
    document.addEventListener("pointerdown", onDown, { passive: true, capture: true });
    document.addEventListener("pointerup", onUp, { passive: true, capture: true });
    document.addEventListener("pointercancel", onUp, { passive: true, capture: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("keydown", onKey);

    // The dock is built by app.js on start-up; wait for it if it is not there yet.
    if (!addToggleButton()) {
      var obs = new MutationObserver(function () {
        if (addToggleButton()) obs.disconnect();
      });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();