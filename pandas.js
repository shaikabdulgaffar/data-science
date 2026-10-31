/* =========================================================================
   pandas.js — Pandas library topics.
   Loaded by <script src="pandas.js"> in index.html (after app.js).
   Add further Pandas topics below with more registerTopic({...}) calls.
   ========================================================================= */

/* ---- Pandas Introduction (theory-only visual + runnable demo) ----------- */
(function () {
  const section = (num, title, body) => `
    <section class="intro-section">
      <div class="intro-section-head">
        ${num ? `<span class="intro-section-num">${num}</span>` : ""}
        <h3 class="intro-section-title">${title}</h3>
      </div>
      ${body}
    </section>`;

  const p = (text) => `<p class="intro-section-body">${text}</p>`;

  const chips = (items) => `
    <div class="intro-chip-grid">
      ${items.map(([icon, text]) => `<span class="intro-chip"><i class="${icon}"></i>${text}</span>`).join("")}
    </div>`;

  const callout = (icon, html) => `
    <div class="intro-callout">
      <i class="${icon}"></i>
      <div class="intro-callout-body">${html}</div>
    </div>`;

  const table = (heads, rows) => `
    <div class="intro-table-wrap">
      <table class="intro-table">
        <thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>`;

  const bullets = (items) => `<ul class="intro-bullets">${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;

  // A code example with its own copy button (handled in app.js via data-copy-code).
  const codeBlock = (label, code) => `
    <div class="intro-code">
      <div class="intro-code-header">
        <span class="intro-code-label"><i class="fa-brands fa-python"></i> ${label}</span>
        <button class="copy-btn" type="button" data-copy-code><i class="fa-regular fa-copy"></i><span>Copy code</span></button>
      </div>
      <pre><code>${escapeHtml(code)}</code></pre>
    </div>`;

  // Folder (next to index.html) that holds the topic images.
  const IMAGE_DIR = "attachments/";

  // Image slot: shows the picture if the file exists in IMAGE_DIR, otherwise
  // a dashed placeholder that names the exact path to add.
  const figure = (file, alt) => `
    <figure class="intro-figure" data-scale="1">
      <div class="intro-figure-stage">
        <img src="${IMAGE_DIR + file}" alt="${alt}" onerror="this.closest('.intro-figure').classList.add('is-missing')">
      </div>
      <div class="intro-figure-tools" role="group" aria-label="Image controls">
        <button class="img-tool-btn" type="button" data-img-action="full" title="View full screen" aria-label="View image full screen"><i class="fa-solid fa-expand"></i></button>
        <button class="img-tool-btn" type="button" data-img-action="in" title="Zoom in image" aria-label="Zoom in image"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
        <button class="img-tool-btn" type="button" data-img-action="out" title="Zoom out image" aria-label="Zoom out image" disabled><i class="fa-solid fa-magnifying-glass-minus"></i></button>
      </div>
      <div class="intro-figure-missing"><i class="fa-regular fa-image"></i><span>Add image: <code>${IMAGE_DIR + file}</code></span></div>
    </figure>`;

  const numlist = (cls, items) => `
    <ol class="intro-numlist ${cls}">
      ${items.map(([title, text]) => `<li><strong>${title}</strong> – ${text}</li>`).join("")}
    </ol>`;

  registerTopic({
    library: "pandas",
    id: "introduction",
    title: "Pandas Introduction",
    difficulty: "Beginner",
    summary: "What Pandas is, where it came from, the problem it solves, and how Series and DataFrames work.",

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="fa-solid fa-table"></i></span>
          <div>
            <h2 class="intro-hero-title">Pandas</h2>
            <p class="intro-hero-tag">Python's library for data manipulation, analysis and processing</p>
          </div>
        </div>

        ${section("1", "Definition and Nomenclature",
          p("Pandas is an open-source Python library designed for data manipulation, data analysis, and data processing. It provides high-performance, easy-to-use data structures and tools for working with structured data.") +
          callout("fa-solid fa-tag", `<p><strong>Name origin:</strong> the name is derived from the econometric and statistical term “Panel Data”, which refers to multidimensional structured data observed over time. The library was designed to handle such structured datasets efficiently.</p>`) +
          p("<br>Pandas can ingest and process data from a variety of sources:") +
          chips([
            ["fa-solid fa-file-csv", "CSV files"],
            ["fa-solid fa-file-excel", "Excel spreadsheets"],
            ["fa-solid fa-database", "SQL database tables"],
            ["fa-solid fa-file-code", "JSON data"],
            ["fa-solid fa-chart-pie", "Statistical datasets"],
            ["fa-solid fa-briefcase", "Business datasets"],
          ])
        )}

        ${section("2", "Historical Development",
          table(["Year", "Milestone"], [
            ["2008", "Development of Pandas commenced."],
            ["2009", "Pandas became an open-source project."],
            ["2010s", "Adoption increased significantly in data science and analytics."],
            ["2015", "Pandas became a NumFOCUS-sponsored project."],
            ["Present", "One of the most widely used Python libraries for data analysis."],
          ]) +
          callout("fa-solid fa-user-tie", `
            <p><strong>Creator:</strong> Wes McKinney</p>
            <p><strong>Organization:</strong> AQR Capital Management (a quantitative investment management company)</p>
            <p><strong>Motivation:</strong> the need for a powerful Python tool to manipulate and analyze financial data. NumPy provided numerical computing capabilities, but a more convenient solution was required for tabular and labeled data.</p>`)
        )}

        ${section("3", "The Problem Pandas Solves",
          callout("fa-solid fa-hourglass-half", `<p><strong>Before Pandas</strong></p><p>Data scientists relied on Python lists, NumPy arrays, dictionaries, and custom functions to handle structured data. Working with large datasets using these tools became inconvenient and inefficient, as each operation required manually coded solutions.</p>`) +
          callout("fa-solid fa-bolt", `<p><strong>With Pandas</strong></p><p>Pandas introduced specialized data structures that made common data operations significantly easier. A single library now provides multiple integrated tools:</p>`) +
          chips([
            ["fa-solid fa-filter", "Filtering"],
            ["fa-solid fa-arrow-down-wide-short", "Sorting"],
            ["fa-solid fa-link", "Joining"],
            ["fa-solid fa-layer-group", "Grouping"],
            ["fa-solid fa-eraser", "Missing-value handling"],
            ["fa-solid fa-arrows-rotate", "Data transformation"],
          ]) +
          callout("fa-solid fa-lightbulb", `<p><strong>Takeaway:</strong> Pandas converts raw data into analysis-ready data, making it easier to analyze and understand.</p>`)
        )}

        ${section("4", "Core Functions of Pandas",
          p("Pandas transforms raw data into a structured, analyzable form through four primary functions:") +
          table(["Function", "What it covers"], [
            ["Data Access &amp; Organization", "Read the data · Organize the data · Select required information · Filter records"],
            ["Data Cleaning", "Clean incorrect data · Handle missing values · Remove duplicate records"],
            ["Data Analysis", "Calculate statistics · Group data · Combine datasets · Analyze trends"],
            ["Data Preparation", "Prepare data for visualization · Prepare data for machine learning"],
          ])
        )}

        ${section("5", "Features of Pandas",
          table(["Feature", "Description"], [
            ["Data Structures", "Series (1D) and DataFrame (2D)"],
            ["Data Cleaning", "Tools for handling missing, incorrect, or duplicate data"],
            ["Data Selection", "Efficient indexing and selection mechanisms"],
            ["Data Filtering", "Conditional extraction of records"],
            ["Data Aggregation", "Summary statistics and grouped computations"],
            ["Grouping", "Split-apply-combine operations"],
            ["Data Integration", "Merging and joining datasets"],
            ["File Handling", "Reading from and writing to multiple file formats"],
          ])
        )}

        ${section("6", "Applications of Pandas",
          p("Pandas is utilized across multiple domains:") +
          table(["Domain", "How Pandas is used"], [
            ["Data Analytics", "Exploratory data analysis and reporting"],
            ["Data Science", "End-to-end data workflows"],
            ["Business Analytics", "Business intelligence and decision support"],
            ["Machine Learning", "Feature engineering and data preprocessing"],
            ["Scientific Research", "Handling experimental and observational data"],
            ["Education", "Teaching data manipulation and analysis"],
          ])
        )}

        ${section("7", "Advantages of Pandas",
          numlist("is-pro", [
            ["Easy to Use", "intuitive API and syntax"],
            ["Powerful Data Structures", "Series and DataFrame"],
            ["Excellent Data Cleaning Capabilities", "robust handling of missing and inconsistent data"],
            ["Works Well with Other Python Libraries", "interoperability with NumPy, Matplotlib, Scikit-learn, etc."],
            ["Supports Multiple Data Formats", "CSV, Excel, SQL, JSON, and more"],
            ["Powerful Grouping and Aggregation", "efficient split-apply-combine operations"],
            ["Open Source", "freely available and community-supported"],
            ["Excellent for Tabular Data", "optimized for structured, spreadsheet-like data"],
          ])
        )}

        ${section("8", "Disadvantages of Pandas",
          numlist("is-con", [
            ["High Memory Usage", "in-memory processing can be resource-intensive"],
            ["Not Ideal for Extremely Large Datasets", "performance degrades with data that exceeds available memory"],
            ["Performance Limitations", "not optimized for all computational workloads"],
            ["Learning Curve", "requires time to master its full capabilities"],
            ["Not Primarily a Visualization Library", "relies on external libraries (e.g., Matplotlib, Seaborn) for visualization"],
          ])
        )}

        ${section("9.1", "Comparative Analysis: Pandas vs. NumPy",
          table(["Aspect", "NumPy", "Pandas"], [
            ["Purpose", "Numerical computing", "Data manipulation and analysis"],
            ["Data Structures", "Mainly arrays", "Series and DataFrames"],
            ["Data Types", "Primarily numerical data", "Numerical + categorical + textual data"],
            ["Labels", "Less focus on labels", "Strong support for labels"],
            ["Main Operations", "Mathematical operations", "Data cleaning and analysis"],
            ["Common Use", "Scientific computing", "Business/data analytics"],
          ])
        )}

        ${section("9.2", "Comparative Analysis: Pandas vs. Excel",
          table(["Aspect", "Excel", "Pandas"], [
            ["Interface", "GUI-based", "Programming-based"],
            ["Analysis", "Good for manual analysis", "Good for automated analysis"],
            ["Workflow", "Suitable for interactive spreadsheets", "Suitable for repeatable workflows"],
            ["Flexibility", "Limited programming flexibility", "Highly programmable"],
            ["Operations", "Manual operations are common", "Operations can be automated"],
            ["Typical Use", "Good for smaller business tasks", "Excellent for data-processing workflows"],
          ])
        )}

        ${section("10", "Core Data Structures: Series vs. DataFrame",
          table(["Feature", "Pandas Series", "Pandas DataFrame"], [
            ["Dimensionality", "1D (one-dimensional)", "2D (two-dimensional)"],
            ["Structure", "A single column with an index", "A spreadsheet-like table with rows and columns"],
            ["Data Types", "Contains elements of a single data type", "Can contain heterogeneous data types across columns"],
            ["Conceptual Analogy", "A standard Python list or a single Excel column", "A Python dictionary of lists or a full Excel sheet"],
            ["Creation Method", "<code>pd.Series(data)</code>", "<code>pd.DataFrame(data)</code>"],
          ])
        )}
      `;
    },
  });

  /* ---- Indexing and Slicing (Series + DataFrame, loc / iloc) ---------------- */
  // Small datasets drive every diagram AND every printed output, so the pictures,
  // the code and the results always agree. mark = tag a row as the slice end.
  const DS_S  = { series: true, idx: [0, 1, 2, 3], cols: ["value"], data: [[10], [20], [30], [40]] };
  const DS_C  = { series: true, idx: ["Ali", "Ayesha", "Ravi"], cols: ["value"], data: [[85], [92], [76]] };
  const DS_DF = { idx: [0, 1, 2, 3], cols: ["ID", "Name", "Age"], data: [[101, "Ali", 20], [102, "Ayesha", 21], [103, "Ravi", 19], [104, "John", 22]] };
  const DS_DI = { idxName: "ID", idx: [101, 102, 103, 104], cols: ["Name", "Age"], data: [["Ali", 20], ["Ayesha", 21], ["Ravi", 19], ["John", 22]] };
  const R4 = [0, 1, 2, 3];

  const IX = {
    sI0: { d: DS_S, code: "print(s.iloc[0])",          r: [0],       c: [0], kind: "scalar" },
    sL2: { d: DS_S, code: "print(s.loc[2])",           r: [2],       c: [0], kind: "scalar" },
    sIM: { d: DS_S, code: "print(s.iloc[[0, 2]])",     r: [0, 2],    c: [0], kind: "series" },
    sLM: { d: DS_S, code: "print(s.loc[[0, 2]])",      r: [0, 2],    c: [0], kind: "series" },
    sIS: { d: DS_S, code: "print(s.iloc[0:3])",        r: [0, 1, 2], c: [0], kind: "series", mark: { 3: "x" } },
    sLS: { d: DS_S, code: "print(s.loc[0:2])",         r: [0, 1, 2], c: [0], kind: "series", mark: { 2: "i" } },
    cL:  { d: DS_C, code: 's.loc["Ayesha"]',           r: [1],       c: [0], kind: "scalar" },
    cI:  { d: DS_C, code: "s.iloc[1]",                 r: [1],       c: [0], kind: "scalar" },
    cS:  { d: DS_C, code: 'print(s.loc["Ali":"Ayesha"])', r: [0, 1], c: [0], kind: "series", mark: { 1: "i" } },
    dI0: { d: DS_DF, code: "print(df.iloc[0])",        r: [0],       c: [0, 1, 2], kind: "row" },
    dIM: { d: DS_DF, code: "print(df.iloc[[0, 2]])",   r: [0, 2],    c: [0, 1, 2], kind: "frame" },
    dIR: { d: DS_DF, code: "print(df.iloc[0:2])",      r: [0, 1],    c: [0, 1, 2], kind: "frame", mark: { 2: "x" } },
    dL1: { d: DS_DI, code: "print(df.loc[101])",       r: [0],       c: [0, 1], kind: "row" },
    dLM: { d: DS_DI, code: "print(df.loc[[101, 103]])", r: [0, 2],    c: [0, 1], kind: "frame" },
    dLR: { d: DS_DI, code: "print(df.loc[101:103])",   r: [0, 1, 2], c: [0, 1], kind: "frame", mark: { 2: "i" } },
    k1:  { d: DS_DI, code: 'print(df["Name"])',        r: R4,        c: [0],    kind: "col" },
    k2:  { d: DS_DI, code: 'print(df[["Name", "Age"]])', r: R4,      c: [0, 1], kind: "frame" },
    k3:  { d: DS_DI, code: 'print(df.loc[:, "Name":"Age"])', r: R4,  c: [0, 1], kind: "frame" },
    t1:  { d: DS_DI, code: "print(df.iloc[0:2, 0:2])", r: [0, 1],    c: [0, 1], kind: "frame", mark: { 2: "x" } },
    t2:  { d: DS_DI, code: 'print(df.loc[101:103, "Name":"Age"])', r: [0, 1, 2], c: [0, 1], kind: "frame", mark: { 2: "i" } },
  };
  const KIND = { scalar: "a single value", series: "a Series", col: "a Series", row: "a Series", frame: "a DataFrame" };

  // Prints a Series the way pandas does.
  const ixPrint = (labs, vals, name, idxName) => {
    const lw = Math.max(...labs.map((s) => s.length)), vw = Math.max(...vals.map((v) => String(v).length));
    const dt = vals.every((v) => typeof v === "number") ? "int64" : "object";
    return (idxName ? idxName + "\n" : "") + labs.map((l, i) => l.padEnd(lw) + "    " + String(vals[i]).padStart(vw)).join("\n") +
      `\n${name !== undefined ? `Name: ${name}, ` : ""}dtype: ${dt}`;
  };
  const ixOut = (e) => {
    const d = e.d, rs = e.r, cs = e.c, v = (i, j) => d.data[i][j];
    if (e.kind === "scalar") return String(v(rs[0], cs[0]));
    if (e.kind === "series" || e.kind === "col") return ixPrint(rs.map((i) => String(d.idx[i])), rs.map((i) => v(i, cs[0])), d.series ? undefined : d.cols[cs[0]], d.idxName);
    if (e.kind === "row") return ixPrint(cs.map((j) => d.cols[j]), cs.map((j) => v(rs[0], j)), d.idx[rs[0]]);
    const w = cs.map((j) => Math.max(d.cols[j].length, ...rs.map((i) => String(v(i, j)).length)));
    const iw = Math.max((d.idxName || "").length, ...rs.map((i) => String(d.idx[i]).length));
    const head = " ".repeat(iw) + cs.map((j, k) => "  " + d.cols[j].padStart(w[k])).join("");
    return [head, ...(d.idxName ? [d.idxName] : []),
      ...rs.map((i) => String(d.idx[i]).padEnd(iw) + cs.map((j, k) => "  " + String(v(i, j)).padStart(w[k])).join(""))].join("\n");
  };
  const ixAll = (d) => ixOut({ d, r: d.idx.map((_, i) => i), c: d.cols.map((_, j) => j), kind: d.series ? "series" : "frame" });

  // Diagram: blue = labels, green = positions; chosen cells pop in one by one;
  // slice-end rows are tagged "end included" / "end excluded".
  const ixGrid = (d, e, pos, caption) => {
    let n = 0;
    const has = !!e;
    const head = d.cols.map((h, j) => `<th>${h}${pos && d.cols.length > 1 ? `<small>pos ${j}</small>` : ""}</th>`).join("");
    const body = d.data.map((row, i) => {
      const tag = has && e.mark && e.mark[i];
      return `<tr><th>${d.idx[i]}${pos ? `<small>pos ${i}</small>` : ""}${tag ? `<small class="idx-tag ${tag}">${tag === "x" ? "end excluded" : "end included"}</small>` : ""}</th>` +
        row.map((v, j) => {
          const on = has && e.r.includes(i) && e.c.includes(j);
          return `<td class="${on ? "is-sel" : has ? "is-dim" : ""}"${on ? ` style="--i:${n++}"` : ""}>${v}</td>`;
        }).join("") + "</tr>";
    }).join("");
    return `<div class="idx-grid-wrap"><table class="idx-grid"><thead><tr><th class="idx-corner">${d.idxName || ""}</th>${head}</tr></thead><tbody>${body}</tbody></table></div>` +
      (caption ? `<p class="idx-cap">${caption}</p>` : "");
  };

  // Code, picture, output, then the explanation (the order used in the notes).
  const ixEx = (key, after) => {
    const e = IX[key];
    return codeBlock("Code", e.code) +
      ixGrid(e.d, e, false, `Highlighted cells are selected. Result: <strong>${KIND[e.kind]}</strong>`) +
      codeBlock("Output", ixOut(e)) + (after ? p(after) : "");
  };
  const sub = (num, title) => `<h4 class="intro-subhead">${num} ${title}</h4>`;
  const part = (title) => section("", title, "").replace('class="intro-section"', 'class="intro-section idx-part"');

  registerTopic({
    library: "pandas",
    id: "indexing",
    title: "Indexing and Slicing",
    difficulty: "Beginner",
    summary: "Access specific data in a Series or DataFrame by label or position with loc and iloc, and select ranges with slicing.",

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="fa-solid fa-crosshairs"></i></span>
          <div>
            <h2 class="intro-hero-title">Indexing, Slicing and Selecting</h2>
            <p class="intro-hero-tag">Accessing specific data from a Series or DataFrame</p>
          </div>
        </div>

        ${section("", "Introduction",
          p("In Pandas, indexing, slicing, and selecting are important operations used to access specific data from a Series or DataFrame.") +
          p("These operations help us retrieve individual values, select multiple elements, extract rows and columns, and work with specific portions of a dataset.") +
          p("For example, in a student database, we may want to retrieve one student’s marks, select the first five students, or display only the names and ages of students. Pandas provides indexing and slicing techniques to perform these operations efficiently.")
        )}

        ${part("Part 1: Introduction to Indexing and Slicing")}

        ${section("1", "What is indexing in Pandas?",
          callout("fa-solid fa-book", `<p><strong>Definition:</strong> Indexing is the process of accessing specific elements or values in a Pandas Series or DataFrame using their positions or labels.</p>`) +
          p("Indexing allows us to retrieve individual values, rows, columns, or combinations of rows and columns.") +
          p("For example, consider the following student data:") +
          table(["Index", "Name", "Marks"], [["0", "Ali", "85"], ["1", "Ayesha", "92"], ["2", "Ravi", "76"], ["3", "John", "88"]]) +
          p("Using indexing, we can retrieve Ali’s marks, Ayesha’s record, or a specific column.")
        )}

        ${section("2", "Types of indexing in Pandas",
          p("Pandas provides two primary indexing methods:") +
          sub("A.", "Integer-position-based indexing: <code>iloc</code>") +
          p("<code>iloc</code> stands for integer-location-based indexing. It selects data using the integer positions of rows or columns, starting from <code>0</code>.") +
          codeBlock("Example", "df.iloc[0]") +
          p("This selects the first row of the DataFrame.") +
          sub("B.", "Label-based indexing: <code>loc</code>") +
          p("<code>loc</code> selects data using index labels and column names.") +
          codeBlock("Example", "df.loc[101]") +
          p("If <code>101</code> is a row index label, this selects the row labeled <code>101</code>.") +
          callout("fa-solid fa-triangle-exclamation", `<p><strong>Important:</strong> A row’s integer position and its index label are not necessarily the same. For example, the first row might have position <code>0</code> but label <code>101</code>.</p>`) +
          ixGrid(DS_DI, null, true, "<strong>Blue</strong> = labels (used by <code>loc</code>) &middot; <strong>Green</strong> = positions (used by <code>iloc</code>). The first row has position 0 but label 101.")
        )}

        ${section("3", "Difference between <code>loc</code> and <code>iloc</code>",
          table(["Feature", "loc", "iloc"], [
            ["Full form", "Label-based location", "Integer-location-based indexing"],
            ["Selection method", "Labels", "Integer positions"],
            ["Row example", "<code>df.loc[101]</code>", "<code>df.iloc[0]</code>"],
            ["Column example", '<code>df.loc[:, "Name"]</code>', "<code>df.iloc[:, 1]</code>"],
            ["Slicing rule", "Ending label included when present", "Ending position excluded"],
            ["Best used when", "Labels or column names are known", "Positions are known"],
          ]).replace('class="intro-table"', 'class="intro-table is-wrap"') +
          codeBlock("Example", "df.loc[101]    # Select row with label 101\ndf.iloc[0]     # Select the first row by position") +
          p("These two expressions select the same row only if the first row’s index label is <code>101</code>.")
        )}

        ${section("4", "What is slicing in Pandas?",
          callout("fa-solid fa-book", `<p><strong>Definition:</strong> Slicing is the process of selecting a range of elements, rows, or columns from a Series or DataFrame.</p>`) +
          p("Slicing is useful when we want to retrieve a continuous portion of data instead of selecting just one element. For example, we can select the first three rows of a DataFrame or a range of values from a Series.") +
          p("Pandas supports slicing through both <code>iloc</code> and <code>loc</code>.") +
          sub("A.", "Slicing using <code>iloc</code>") +
          codeBlock("Syntax", "DataFrame.iloc[start:end]") +
          p("The starting position is included, but the ending position is excluded.") +
          codeBlock("Example", "df.iloc[0:3]") +
          p("This selects row positions <code>0</code>, <code>1</code>, and <code>2</code>.") +
          sub("B.", "Slicing using <code>loc</code>") +
          codeBlock("Syntax", "DataFrame.loc[start_label:end_label]") +
          p("The starting label and ending label are included when the ending label exists and the slice follows the index order.") +
          codeBlock("Example", "df.loc[101:103]") +
          p("If the DataFrame has index labels <code>101</code>, <code>102</code>, <code>103</code>, and <code>104</code> in that order, this selects labels <code>101</code>, <code>102</code>, and <code>103</code>.")
        )}

        ${part("Part 2: Series: Indexing, Slicing, and Selecting Elements")}

        ${section("1", "What is a Series in Pandas?",
          p("A Series is a one-dimensional labeled data structure in Pandas. It stores a collection of values along with their corresponding index labels.") +
          p("Think of a Series as a single column of marks in a classroom, where each student has a corresponding index label.")
        )}

        ${section("2", "Creating a Series",
          codeBlock("Code", "import pandas as pd\n\ns = pd.Series([10, 20, 30, 40])\n\nprint(s)") +
          ixGrid(DS_S, null, true, "A Series is one labeled column: index labels on the left, values on the right.") +
          codeBlock("Output", ixAll(DS_S)) +
          bullets(["<code>0, 1, 2, 3</code> are the index labels.", "<code>10, 20, 30, 40</code> are the values.", "Pandas automatically creates a default integer index starting from <code>0</code>."])
        )}

        ${section("3", "Indexing in a Series",
          sub("A.", "Accessing a value using <code>iloc</code>") +
          p("<code>iloc</code> selects an element based on its integer position, starting from <code>0</code>.") +
          codeBlock("Syntax", "Series.iloc[position]") + ixEx("sI0", "Position <code>0</code> contains the value <code>10</code>.") +
          sub("B.", "Accessing a value using <code>loc</code>") +
          p("<code>loc</code> selects an element using its index label.") +
          codeBlock("Syntax", "Series.loc[label]") + ixEx("sL2", "The index label <code>2</code> corresponds to the value <code>30</code>.") +
          p("In this example, the default index labels and integer positions look similar. However, they are different concepts.")
        )}

        ${section("4", "Selecting multiple elements in a Series",
          sub("A.", "Using <code>iloc</code>") + ixEx("sIM", "Position <code>0</code> selects <code>10</code>, and position <code>2</code> selects <code>30</code>.") +
          sub("B.", "Using <code>loc</code>") + ixEx("sLM", "Here, <code>[0, 2]</code> represents index labels rather than positions.")
        )}

        ${section("5", "Slicing a Series",
          sub("A.", "Slicing using <code>iloc</code>") +
          codeBlock("Syntax", "Series.iloc[start:end]") + p("The ending position is excluded.") +
          ixEx("sIS", "Positions <code>0</code>, <code>1</code>, and <code>2</code> are selected. Position <code>3</code> is excluded.") +
          sub("B.", "Slicing using <code>loc</code>") +
          codeBlock("Syntax", "Series.loc[start_label:end_label]") + p("The ending label is included when it exists in the index and the slice follows the index order.") +
          ixEx("sLS", "The labels <code>0</code>, <code>1</code>, and <code>2</code> are included.")
        )}

        ${section("6", "Creating a Series with custom index labels",
          p("Instead of using the default integer index, we can create a Series with our own labels.") +
          codeBlock("Code", 's = pd.Series(\n    [85, 92, 76],\n    index=["Ali", "Ayesha", "Ravi"]\n)\n\nprint(s)') +
          ixGrid(DS_C, null, true, "Now labels and positions are clearly different: <strong>Ayesha</strong> is the label, <strong>1</strong> is the position.") +
          codeBlock("Output", ixAll(DS_C)) +
          p("Here, <code>Ali</code>, <code>Ayesha</code>, and <code>Ravi</code> are custom index labels.") +
          sub("A.", "Accessing a value by label") +
          codeBlock("Code", 'print(s.loc["Ayesha"])') + codeBlock("Output", "92") +
          p("The value <code>92</code> is selected using the label <code>\"Ayesha\"</code>.") +
          sub("B.", "Accessing a value by position") +
          codeBlock("Code", "print(s.iloc[1])") + codeBlock("Output", "92") +
          p("The value <code>92</code> is selected using position <code>1</code>. Both expressions return <code>92</code>, but <code>loc</code> uses the label <code>\"Ayesha\"</code>, whereas <code>iloc</code> uses position <code>1</code>.") +
          ixGrid(DS_C, IX.cL, true, "Same cell, two ways to reach it: by label (<code>loc</code>) or by position (<code>iloc</code>).") +
          sub("C.", "Slicing using custom labels") +
          ixEx("cS", "The slice includes both <code>\"Ali\"</code> and <code>\"Ayesha\"</code> because <code>loc</code> includes the ending label.")
        )}

        ${part("Part 3: DataFrame: Indexing, Slicing, and Selecting Rows and Columns")}

        ${section("1", "What is a DataFrame in Pandas?",
          p("A DataFrame is a two-dimensional labeled data structure consisting of rows and columns.") +
          p("Think of a DataFrame as a student information table containing student IDs, names, and ages.") +
          table(["ID", "Name", "Age"], [["101", "Ali", "20"], ["102", "Ayesha", "21"], ["103", "Ravi", "19"], ["104", "John", "22"]]) +
          p("A DataFrame contains:") +
          bullets(["<strong>Rows:</strong> Represent individual records.", "<strong>Columns:</strong> Represent attributes or variables.", "<strong>Index:</strong> Identifies rows using labels.", "<strong>Column names:</strong> Identify individual columns."])
        )}

        ${section("2", "Indexing in a DataFrame",
          p("Indexing means selecting specific rows, columns, or individual values from a DataFrame. Pandas provides two main indexing methods: <code>iloc</code> and <code>loc</code>.") +
          sub("A.", "<code>iloc</code>: integer-position-based indexing") +
          p("<code>iloc</code> selects rows and columns using integer positions, starting from <code>0</code>.") +
          codeBlock("Syntax", "DataFrame.iloc[row_position, column_position]") +
          bullets(["Uses integer positions, slices, or lists of integers.", "Position counting starts from <code>0</code>.", "The ending position is excluded in slicing."]) +
          p("<strong>Use case:</strong> when you know the position of a row or column.") +
          sub("B.", "<code>loc</code>: label-based indexing") +
          p("<code>loc</code> selects rows and columns using their labels, such as row index labels and column names.") +
          codeBlock("Syntax", "DataFrame.loc[row_label, column_label]") +
          bullets(["Uses labels, lists of labels, slices, or Boolean conditions.", "The ending label is included in slicing when it exists in the index and the slice follows the index order."]) +
          p("<strong>Use case:</strong> when you know the row label or column name.")
        )}

        ${section("3", "Creating a DataFrame",
          codeBlock("Code", 'import pandas as pd\n\ndata = {\n    "ID": [101, 102, 103, 104],\n    "Name": ["Ali", "Ayesha", "Ravi", "John"],\n    "Age": [20, 21, 19, 22]\n}\n\ndf = pd.DataFrame(data)\n\nprint(df)') +
          ixGrid(DS_DF, null, true, "Row labels (blue) are the default <code>0–3</code>; positions (green) match them for now.") +
          codeBlock("Output", ixAll(DS_DF)) +
          p("The DataFrame contains four rows and three columns. The default row index labels are <code>0</code>, <code>1</code>, <code>2</code>, and <code>3</code>.")
        )}

        ${section("4", "Selecting rows using <code>iloc</code>",
          sub("A.", "Selecting a single row") + ixEx("dI0", "<code>df.iloc[0]</code> selects the row at position <code>0</code>. The result is a Series.") +
          sub("B.", "Selecting multiple rows") + ixEx("dIM", "Positions <code>0</code> and <code>2</code> select Ali’s and Ravi’s records.") +
          sub("C.", "Selecting a range of rows") + ixEx("dIR", "Positions <code>0</code> and <code>1</code> are selected because the ending position <code>2</code> is excluded.")
        )}

        ${section("5", "Selecting rows using <code>loc</code>",
          p("To understand label-based indexing, set the <code>ID</code> column as the DataFrame index.") +
          codeBlock("Code", 'df = df.set_index("ID")\n\nprint(df)') +
          ixGrid(DS_DI, null, true, "After <code>set_index(\"ID\")</code> the row labels become 101–104, while positions still start at 0.") +
          codeBlock("Output", ixAll(DS_DI)) +
          p("Now, <code>101</code>, <code>102</code>, <code>103</code>, and <code>104</code> are the row index labels.") +
          sub("A.", "Selecting a single row by label") + ixEx("dL1", "This selects the row whose index label is <code>101</code>.") +
          sub("B.", "Selecting multiple rows by labels") + ixEx("dLM", "The list <code>[101, 103]</code> specifies the row labels to select.") +
          sub("C.", "Selecting a range of rows by labels") + ixEx("dLR", "The ending label <code>103</code> is included.")
        )}

        ${section("6", "Selecting columns in a DataFrame",
          sub("A.", "Selecting a single column") + ixEx("k1", "<code>df[\"Name\"]</code> returns the <code>Name</code> column as a Series.") +
          sub("B.", "Selecting multiple columns") + ixEx("k2", "The expression <code>df[[\"Name\", \"Age\"]]</code> returns a DataFrame containing both columns.") +
          callout("fa-solid fa-lightbulb", `<p><strong>Remember:</strong></p>`) +
          codeBlock("Remember", 'df["Name"]              # Single column: Series\ndf[["Name", "Age"]]     # Multiple columns: DataFrame') +
          sub("C.", "Selecting a range of columns using <code>loc</code>") + ixEx("k3", "") +
          bullets(["The first colon (<code>:</code>) selects all rows.", "<code>\"Name\":\"Age\"</code> selects columns from <code>Name</code> through <code>Age</code>.", "Both column labels are included."])
        )}

        ${section("7", "Selecting rows and columns together",
          sub("A.", "Using <code>iloc</code>") +
          p("Select the first two rows and the first two columns.") + ixEx("t1", "") +
          bullets(["<code>0:2</code> before the comma selects row positions <code>0</code> and <code>1</code>.", "<code>0:2</code> after the comma selects column positions <code>0</code> and <code>1</code>.", "Both ending positions are excluded."]) +
          sub("B.", "Using <code>loc</code>") +
          p("Select rows with labels <code>101</code> to <code>103</code> and columns from <code>Name</code> to <code>Age</code>.") + ixEx("t2", "") +
          bullets(["<code>101:103</code> selects row labels <code>101</code>, <code>102</code>, and <code>103</code>.", "<code>\"Name\":\"Age\"</code> selects both columns.", "The ending row and column labels are included."])
        )}
      `;
    },
  });

  /* ---- Filtering (boolean indexing) with True/False mask diagrams ---------- */
  // Each example carries a real predicate, so the mask, the highlighted rows and
  // the printed output are all computed from the same rule as the code shown.
  const F4 = { cols: ["Name", "Age", "Marks"], rows: [["Ali", 20, 85], ["Ayesha", 21, 90], ["Ravi", 19, 70], ["John", 25, 95]] };
  const F5 = { cols: F4.cols, rows: [...F4.rows, ["Sara", 22, 88]] };
  const frow = (d, i) => ({ Name: d.rows[i][0], Age: d.rows[i][1], Marks: d.rows[i][2] });

  const FX = {
    s1: { ds: F4, code: 'df[df["Age"] > 20]',        f: (r) => r.Age > 20 },
    s2: { ds: F4, code: 'df[df["Marks"] < 90]',      f: (r) => r.Marks < 90 },
    s3: { ds: F4, code: 'df[df["Age"] >= 20]',       f: (r) => r.Age >= 20 },
    s4: { ds: F4, code: 'df[df["Marks"] <= 85]',     f: (r) => r.Marks <= 85 },
    s5: { ds: F4, code: 'df[df["Name"] == "Ali"]',   f: (r) => r.Name === "Ali" },
    s6: { ds: F4, code: 'df[df["Age"] != 20]',       f: (r) => r.Age !== 20 },
    m1: { ds: F4, note: "Students with Age > 20 AND Marks > 80", code: 'df[(df["Age"] > 20) & (df["Marks"] > 80)]', f: (r) => r.Age > 20 && r.Marks > 80 },
    m2: { ds: F4, note: "Students with Age < 20 OR Marks > 90", code: 'df[(df["Age"] < 20) | (df["Marks"] > 90)]', f: (r) => r.Age < 20 || r.Marks > 90 },
    m3: { ds: F4, note: "Students whose Age is NOT greater than 20", code: 'df[~(df["Age"] > 20)]', f: (r) => !(r.Age > 20) },
    m4: { ds: F4, note: "(Age > 20 AND Marks > 80) OR Name == 'Ali'", code: 'df[((df["Age"] > 20) & (df["Marks"] > 80)) | (df["Name"] == "Ali")]', f: (r) => (r.Age > 20 && r.Marks > 80) || r.Name === "Ali" },
    p1: { ds: F5, note: "Select students whose name is Ali or John", code: 'df[df["Name"].isin(["Ali", "John"])]', f: (r) => ["Ali", "John"].includes(r.Name) },
    p2: { ds: F5, note: "Select students with Age between 20 and 22", code: 'df[df["Age"].between(20, 22)]', f: (r) => r.Age >= 20 && r.Age <= 22 },
    p3: { ds: F5, note: "Names containing 'a' or 'A'", code: 'df[df["Name"].str.contains("a", case=False)]', f: (r) => r.Name.toLowerCase().includes("a") },
    p4: { ds: F5, note: "Names starting with 'A'", code: 'df[df["Name"].str.startswith("A")]', f: (r) => r.Name.startsWith("A") },
    p5: { ds: F5, note: "Names ending with 'n'", code: 'df[df["Name"].str.endswith("n")]', f: (r) => r.Name.endsWith("n") },
    p6: { ds: F5, note: "Students with Marks > 85", code: 'df.query("Marks > 85")', f: (r) => r.Marks > 85 },
    p7: { ds: F5, note: "Age > 20 and Marks >= 90", code: 'df.query("Age > 20 and Marks >= 90")', f: (r) => r.Age > 20 && r.Marks >= 90 },
  };

  // Printed table for the chosen row positions, formatted like pandas.
  const fOut = (d, keep) => {
    const w = d.cols.map((c, j) => Math.max(c.length, ...keep.map((i) => String(d.rows[i][j]).length)));
    const iw = Math.max(...keep.map((i) => String(i).length));
    const head = " ".repeat(iw) + d.cols.map((c, j) => "  " + c.padStart(w[j])).join("");
    return [head, ...keep.map((i) => String(i).padEnd(iw) + d.rows[i].map((v, j) => "  " + String(v).padStart(w[j])).join(""))].join("\n");
  };
  const fKeep = (e) => e.ds.rows.map((_, i) => i).filter((i) => e.f(frow(e.ds, i)));
  const fAll = (d) => d.rows.map((_, i) => i);

  // The diagram: a True/False "mask" column; rows with True light up, the rest fade.
  const fGrid = (e, caption) => {
    let n = 0;
    const d = e.ds;
    const head = d.cols.map((c) => `<th>${c}</th>`).join("");
    const body = d.rows.map((row, i) => {
      const on = e.f(frow(d, i));
      const st = on ? ` style="--i:${n++}"` : "";
      return `<tr><th>${i}</th>${row.map((v) => `<td class="${on ? "is-sel" : "is-dim"}"${st}>${v}</td>`).join("")}<td class="fx-mask ${on ? "t" : "f"}">${on ? "True" : "False"}</td></tr>`;
    }).join("");
    return `<div class="idx-grid-wrap"><table class="idx-grid"><thead><tr><th class="idx-corner"></th>${head}<th class="fx-mask-h">condition</th></tr></thead><tbody>${body}</tbody></table></div>` +
      (caption ? `<p class="idx-cap">${caption}</p>` : "");
  };

  const fEx = (key) => {
    const e = FX[key], kept = fKeep(e);
    return codeBlock("Code", (e.note ? "# " + e.note + "\n" : "") + e.code) +
      fGrid(e, `Each row gets <strong>True</strong> or <strong>False</strong>; only the True rows (highlighted) are kept: <strong>${kept.length} of ${e.ds.rows.length}</strong> rows.`) +
      codeBlock("Output", fOut(e.ds, kept));
  };
  const fData = (d, label) => codeBlock(label,
    ["import pandas as pd", "", "data = {",
      `    "Name": [${d.rows.map((r) => `"${r[0]}"`).join(", ")}],`,
      `    "Age": [${d.rows.map((r) => r[1]).join(", ")}],`,
      `    "Marks": [${d.rows.map((r) => r[2]).join(", ")}]`,
      "}", "df = pd.DataFrame(data)", "print(df)"].join("\n")) +
    codeBlock("Output", fOut(d, fAll(d)));

  const fExplorer = () => {
    const groups = [["Single", ["s1", "s2", "s3", "s4", "s5", "s6"]], ["Multiple", ["m1", "m2", "m3", "m4"]], ["Special", ["p1", "p2", "p3", "p4", "p5", "p6", "p7"]]];
    return `
      <div class="idx-explorer" id="fxExplorer">
        ${groups.map(([name, keys]) => `
          <div class="idx-group"><span class="idx-group-name">${name}</span>
            ${keys.map((k) => `<button type="button" class="idx-chip" data-k="${k}">${escapeHtml(FX[k].code)}</button>`).join("")}
          </div>`).join("")}
        <div class="idx-controls"><button type="button" class="idx-play" id="fxPlay"><i class="fa-solid fa-play"></i><span>Play all</span></button></div>
        <div class="idx-stage">
          <div class="idx-stage-top"><code class="idx-ex-code"></code><span class="idx-badge"></span></div>
          <div class="idx-ex-grid"></div>
          <pre class="idx-ex-out"></pre>
        </div>
      </div>`;
  };

  const mountFxExplorer = (panel) => {
    const root = panel.querySelector("#fxExplorer");
    const keys = Object.keys(FX);
    let cur = 0, timer = null;
    const show = (k) => {
      cur = keys.indexOf(k);
      const e = FX[k], kept = fKeep(e);
      root.querySelectorAll(".idx-chip").forEach((b) => b.classList.toggle("active", b.dataset.k === k));
      root.querySelector(".idx-ex-code").textContent = e.code;
      root.querySelector(".idx-badge").textContent = `${kept.length} of ${e.ds.rows.length} rows kept`;
      root.querySelector(".idx-ex-grid").innerHTML = fGrid(e);
      root.querySelector(".idx-ex-out").textContent = fOut(e.ds, kept);
    };
    const setPlay = (on) => {
      clearInterval(timer);
      timer = on ? setInterval(() => show(keys[(cur + 1) % keys.length]), 3000) : null;
      const b = root.querySelector("#fxPlay");
      b.classList.toggle("on", on);
      b.innerHTML = `<i class="fa-solid ${on ? "fa-pause" : "fa-play"}"></i><span>${on ? "Pause" : "Play all"}</span>`;
    };
    root.addEventListener("click", (ev) => {
      const chip = ev.target.closest("[data-k]");
      if (chip) { setPlay(false); show(chip.dataset.k); return; }
      if (ev.target.closest("#fxPlay")) setPlay(!timer);
    });
    show(keys[0]);
    return () => clearInterval(timer);
  };

  registerTopic({
    library: "pandas",
    id: "filtering",
    title: "Filtering Rows and Columns",
    difficulty: "Beginner",
    summary: "Select rows that satisfy conditions using boolean indexing, &, |, ~, isin(), between(), str methods and query().",

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="fa-solid fa-filter"></i></span>
          <div>
            <h2 class="intro-hero-title">Filtering Using Conditions</h2>
            <p class="intro-hero-tag">Keep only the rows that satisfy a condition</p>
          </div>
        </div>

        ${section("", "What is filtering?",
          p("In Pandas, filtering means selecting specific rows or columns from a DataFrame based on some conditions. This is one of the most important operations for data cleaning, analysis, and preprocessing.") +
          callout("fa-solid fa-circle-question", `<p><strong>Condition:</strong> a logical statement that checks values in a column (e.g., <code>Age &gt; 20</code>).</p>`) +
          p("Filtering is done using <strong>boolean indexing</strong>:") +
          codeBlock("Syntax", "df[condition]") +
          p("Result → a subset of the DataFrame containing only the rows that satisfy the condition.") +
          chips([["fa-solid fa-circle-question", "1. Write a condition"], ["fa-solid fa-list-check", "2. Pandas makes a True/False mask"], ["fa-solid fa-filter", "3. Only True rows are kept"]])
        )}

        ${section("1", "Filtering with a single condition",
          codeBlock("Syntax", 'df[df["column_name"] operator value]') +
          table(["Operator", "Meaning"], [
            ["<code>&gt;</code>", "greater than"], ["<code>&lt;</code>", "less than"],
            ["<code>&gt;=</code>", "greater than or equal to"], ["<code>&lt;=</code>", "less than or equal to"],
            ["<code>==</code>", "equal to"], ["<code>!=</code>", "not equal to"],
          ]) +
          sub("", "Example dataset") + fData(F4, "Example dataset") +
          sub("Case 1:", "Greater than (<code>&gt;</code>)") + fEx("s1") +
          sub("Case 2:", "Less than (<code>&lt;</code>)") + fEx("s2") +
          sub("Case 3:", "Greater than or equal to (<code>&gt;=</code>)") + fEx("s3") +
          sub("Case 4:", "Less than or equal to (<code>&lt;=</code>)") + fEx("s4") +
          sub("Case 5:", "Equal to (<code>==</code>)") + fEx("s5") +
          sub("Case 6:", "Not equal to (<code>!=</code>)") + fEx("s6") +
          callout("fa-solid fa-lightbulb", `<p>Single condition filtering lets us extract rows based on <strong>one column condition only</strong>.</p>`)
        )}

        ${section("2", "Filtering with multiple conditions",
          p("Sometimes we need to filter rows using more than one condition. In Pandas we use:") +
          table(["Symbol", "Meaning"], [
            ["<code>&amp;</code>", "AND: both conditions must be true"],
            ["<code>|</code>", "OR: at least one condition must be true"],
            ["<code>~</code>", "NOT: negates a condition"],
          ]) +
          callout("fa-solid fa-triangle-exclamation", `<p><strong>Important:</strong> parentheses <code>()</code> are required around <strong>each</strong> condition. Use <code>&amp;</code>, <code>|</code>, <code>~</code> here, not the words <code>and</code>, <code>or</code>, <code>not</code>.</p>`) +
          sub("", "Example dataset") + fData(F4, "Example dataset") +
          sub("2.1", "AND condition (<code>&amp;</code>)") + p("Select rows where both conditions are true.") + fEx("m1") +
          sub("2.2", "OR condition (<code>|</code>)") + p("Select rows where at least one condition is true.") + fEx("m2") +
          sub("2.3", "NOT condition (<code>~</code>)") + p("Negates the condition → selects rows that do not satisfy the condition.") + fEx("m3") +
          sub("2.4", "Combining multiple conditions") + p("We can use AND + OR together with parentheses.") + fEx("m4")
        )}

        ${section("3", "Filtering with special function conditions",
          p("Apart from simple comparison operators (<code>&gt;</code>, <code>&lt;</code>, <code>==</code>, etc.), Pandas provides special functions to filter rows more efficiently. These are very useful when filtering by a list of values, ranges, or strings.") +
          sub("", "Example dataset") + fData(F5, "Example dataset") +
          sub("3.1", "<code>.isin()</code>: filter by multiple values") + p("Checks if column values are present in a given list.") + fEx("p1") +
          sub("3.2", "<code>.between()</code>: filter within a range") + p("Inclusive by default (includes both ends).") + fEx("p2") +
          sub("3.3", "<code>.str.contains()</code>: filter text (string matching)") + p("Works only on string columns. Can use <code>case=False</code> for ignoring case.") + fEx("p3") +
          sub("3.4", "<code>.str.startswith()</code> and <code>.str.endswith()</code>: string start/end filter") + fEx("p4") + fEx("p5") +
          sub("3.5", "<code>.query()</code>: SQL-like filtering") + p("An easier way to write multiple conditions.") + fEx("p6") + fEx("p7")
        )}

        ${section("", "Try it: Filter Explorer",
          p("Click any filter, or press <strong>Play all</strong>, to see the True/False mask and which rows survive.") +
          fExplorer()
        )}
      `;
      return mountFxExplorer(panel);
    },
  });

  /* ---- Merging (joins with pd.merge) ------------------------------------ */
  // Same two small tables in every example, so students can compare the
  // four joins directly: customers 3 and 4 have no sales, and order 104
  // belongs to customer 5, who is not in the customers table.
  const joinDemo = (how, comment) => [
    "import pandas as pd",
    "",
    "customers = pd.DataFrame({",
    '    "CustomerID": [1, 2, 3, 4],',
    '    "Name": ["Asha", "Ravi", "Meera", "Kabir"],',
    "})",
    "sales = pd.DataFrame({",
    '    "OrderID": [101, 102, 103, 104],',
    '    "CustomerID": [1, 2, 2, 5],',
    '    "Amount": [250, 400, 150, 300],',
    "})",
    "",
    "# " + comment,
    `result = pd.merge(customers, sales, how="${how}", on="CustomerID")`,
    "print(result)",
  ].join("\n");

  // File names inside IMAGE_DIR. Rename here if your files are called something else.
  const MERGE_IMAGES = {
    types: "pandas-merge-join-types.png",
    inner: "pandas-merge-inner.png",
    outer: "pandas-merge-outer.png",
    left:  "pandas-merge-left.png",
    right: "pandas-merge-right.png",
    activity: "pandas-merge-activity.png",
  };

  // Activity data (matches the picture): customers 1 and 3 have no orders,
  // and the Tablet order belongs to customer 5, who is not in the customers table.
  const ACTIVITY_CODE = [
    "import pandas as pd",
    "",
    "# Step 1: create the two DataFrames",
    "customers = pd.DataFrame({",
    '    "CustomerID": [1, 2, 3, 4],',
    '    "Name": ["Ali", "Ayesha", "Ravi", "John"],',
    "})",
    "orders = pd.DataFrame({",
    '    "CustomerID": [2, 4, 4, 5],',
    '    "Product": ["Laptop", "Mobile", "Headphones", "Tablet"],',
    '    "Amount": [50000, 20000, 3000, 15000],',
    "})",
    "",
    "# Step 2: merge with each join type",
    'inner = pd.merge(customers, orders, how="inner", on="CustomerID")',
    'left  = pd.merge(customers, orders, how="left",  on="CustomerID")',
    'right = pd.merge(customers, orders, how="right", on="CustomerID")',
    'outer = pd.merge(customers, orders, how="outer", on="CustomerID")',
    "",
    'print("INNER JOIN"); print(inner); print()',
    'print("LEFT JOIN");  print(left);  print()',
    'print("RIGHT JOIN"); print(right); print()',
    'print("OUTER JOIN"); print(outer)',
    "",
    "# Step 3: answer the questions with code",
    "# Customers who never placed an order (NaN in Product after a left join)",
    'print(left[left["Product"].isna()]["Name"])',
    "# Orders that belong to an unknown customer (NaN in Name after a right join)",
    'print(right[right["Name"].isna()])',
  ].join("\n");

  const joinSection = (num, title, how, points, useCase, imageFile, imageAlt, comment) =>
    section(num, title,
      bullets(points) +
      callout("fa-solid fa-bullseye", `<p><strong>Use Case:</strong> ${useCase}</p>`) +
      codeBlock("Example", `pd.merge(customers, sales, how="${how}", on="CustomerID")`) +
      figure(imageFile, imageAlt) +
      codeBlock("Code example", joinDemo(how, comment))
    );

  registerTopic({
    library: "pandas",
    id: "merging",
    title: "Merging",
    difficulty: "Intermediate",
    summary: "Combine datasets with pd.merge() and see how inner, outer, left and right joins decide which rows appear.",

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="fa-solid fa-code-merge"></i></span>
          <div>
            <h2 class="intro-hero-title">Merging</h2>
            <p class="intro-hero-tag">Combining datasets with pd.merge()</p>
          </div>
        </div>

        ${section("", "What is Merging?",
          bullets([
            "Merging is the process of combining two or more datasets into a single dataset.",
            "In real-world scenarios, data is often spread across multiple tables (like in relational databases).",
            "In Pandas, the function <code>pd.merge()</code> is mainly used for this purpose.",
            "Merging is done based on common columns (keys), such as <code>CustomerID</code>, <code>OrderID</code>, etc.",
          ])
        )}

        ${section("", "Syntax",
          codeBlock("Syntax", 'pd.merge(df1, df2, how="join_type", on="key_column")') +
          bullets([
            "<code>df1</code>, <code>df2</code> → DataFrames to merge.",
            '<code>how</code> → type of join (<code>"inner"</code>, <code>"outer"</code>, <code>"left"</code>, <code>"right"</code>).',
            "<code>on</code> → the column name on which merging happens (common column).",
          ])
        )}

        ${section("", "What are Joins?",
          bullets([
            "Join is a method of merging two datasets based on a common key.",
            "Concept comes from SQL (Structured Query Language), but Pandas supports the same.",
            "Joins decide which rows appear in the result depending on whether they exist in one or both DataFrames.",
          ])
        )}

        ${section("", "Types of Joins in Pandas",
          figure(MERGE_IMAGES.types, "The four join types in Pandas (inner, outer, left, right) shown as Venn diagrams")
        )}

        ${joinSection("1", "Inner Join", "inner",
          [
            "Returns only the rows that have matching values in both DataFrames.",
            "Intersection of sets.",
            "If a customer has no sales → they won’t appear.",
            "If a sale doesn’t belong to a customer → won’t appear.",
          ],
          "Find only customers who actually made purchases.",
          MERGE_IMAGES.inner, "Inner join: only the overlapping rows of customers and sales",
          "Inner join: only customers who have sales (and sales that have a customer)"
        )}

        ${joinSection("2", "Outer Join (Full Outer Join)", "outer",
          [
            "Returns all rows from both DataFrames.",
            "If there is no match → fills with NaN.",
            "Like a Union of sets.",
          ],
          "To see all customers and all sales (even unmatched ones).",
          MERGE_IMAGES.outer, "Outer join: all rows from both customers and sales",
          "Outer join: all customers and all sales, NaN where there is no match"
        )}

        ${joinSection("3", "Left Join", "left",
          [
            "Returns all rows from the left DataFrame + matching rows from right DataFrame.",
            "If there is no match in right → fills with NaN.",
            "Focuses on left DataFrame (customers).",
          ],
          "List all customers and their purchases (if any).",
          MERGE_IMAGES.left, "Left join: all customers plus their matching sales",
          "Left join: all customers, with their sales if any"
        )}

        ${joinSection("4", "Right Join", "right",
          [
            "Returns all rows from the right DataFrame + matching rows from left DataFrame.",
            "If no match in left → fills with NaN.",
            "Focuses on right DataFrame (sales).",
          ],
          "List all sales and include customer details (if available).",
          MERGE_IMAGES.right, "Right join: all sales plus their matching customers",
          "Right join: all sales, with customer details if available"
        )}

        ${section("", "Activity: Customers and Orders",
          p("A shop keeps its customers and its orders in two separate tables. Use <code>pd.merge()</code> to combine them and answer the questions below.") +
          figure(MERGE_IMAGES.activity, "Customers table (CustomerID, Name) and Orders table (CustomerID, Product, Amount)") +
          numlist("", [
            ["Create the data", "build the two DataFrames, <code>customers</code> and <code>orders</code>, exactly as shown in the picture."],
            ["Inner join", "merge on <code>CustomerID</code> with <code>how=\"inner\"</code>. How many rows do you get, and which customers appear?"],
            ["Left join", "merge with <code>how=\"left\"</code>. Which customers have <code>NaN</code> in Product and Amount? What does that tell you?"],
            ["Right join", "merge with <code>how=\"right\"</code>. Which order has <code>NaN</code> in Name, and why?"],
            ["Outer join", "merge with <code>how=\"outer\"</code>. How many rows do you get in total?"],
          ])
        )}
      `;
    },
  });

})();