const EventCompiler = {
  compileAction: function (oalCode) {
    if (!oalCode) return "// [Info] No action code defined.";

    let code = oalCode;

    // =====================================================================
    // 1. EXPLICIT EVENT HANDLING (NEW REQUEST)
    // =====================================================================

    // A. CREATE EVENT INSTANCE (Explicit)
    code = code.replace(
      /create\s+event\s+instance\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+);/g,
      "var $1 = new Events.$2(); $1.Target = $3;"
    );

    // B. CREATE TIMER (Explicit)
    code = code.replace(
      /create\s+timer\s+([A-Za-z0-9_]+)\s+of\s+\((.*?)\)\s+generating\s+([A-Za-z0-9_]+);/g,
      "var $1 = $3.Target.StartTimer($3, $2);"
    );

    // C. GENERATE EVENT INSTANCE (Explicit)
    code = code.replace(
      /generate\s+([A-Za-z0-9_]+);/g,
      "$1.Target.GenerateEvent($1);"
    );

    // =====================================================================
    // 2. STANDARD OAL COMMANDS
    // =====================================================================

    // D. INSTANCE CREATION
    code = code.replace(
      /create\s+object\s+instance\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = new $2();"
    );

    // ---------------------------------------------------------
    // E. INSTANCE SELECTION
    // ---------------------------------------------------------

    // SELECT ANY
    code = code.replace(
      /select\s+any\s+([A-Za-z0-9_]+)\s+from\s+instances\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = Population.$2[0] || null;"
    );

    // SELECT ONE with WHERE
    code = code.replace(
      /select\s+one\s+([A-Za-z0-9_]+)\s+from\s+instances\s+of\s+([A-Za-z0-9_]+)\s+where\s*\((.*?)\);/g,
      "var $1 = Population.$2.find(item => $3) || null;"
    );

    // SELECT MANY with WHERE
    code = code.replace(
      /select\s+many\s+([A-Za-z0-9_]+)\s+from\s+instances\s+of\s+([A-Za-z0-9_]+)\s+where\s*\((.*?)\);/g,
      "var $1 = Population.$2.filter(item => $3);"
    );

    // ---------------------------------------------------------
    // F. CREATING RELATIONSHIP INSTANCE
    // ---------------------------------------------------------
    // OAL: create relationship instance r1 between a and b of R1;
    code = code.replace(
      /create\s+relationship\s+instance\s+([A-Za-z0-9_]+)\s+between\s+([A-Za-z0-9_]+)\s+and\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = $2.RelateTo($3, '$4');"
    );

    // ---------------------------------------------------------
    // F2. DELETING RELATIONSHIP INSTANCE
    // ---------------------------------------------------------

    // delete relationship instance r1;
    code = code.replace(
      /delete\s+relationship\s+instance\s+([A-Za-z0-9_]+);/g,
      "$1.Delete();"
    );

    // delete relationship instance r1 between a and b of R1;
    code = code.replace(
      /delete\s+relationship\s+instance\s+([A-Za-z0-9_]+)\s+between\s+([A-Za-z0-9_]+)\s+and\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "$2.UnrelateFrom($3, '$4');"
    );

    // ---------------------------------------------------------
    // G. ASSIGNMENT
    // ---------------------------------------------------------
    code = code.replace(/^\s*assign\s+/gm, "");

    // G2. RELATE
    code = code.replace(
      /relate\s+([A-Za-z0-9_.]+)\s+to\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      '$1.RelateTo($2, "$3");'
    );

    // H. CANCEL TIMER
    code = code.replace(
      /cancel\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_.]+);/g,
      "$2.CancelTimer(Events.$1);"
    );

    // =====================================================================
    // 3. DATA ACCESS & LOGIC
    // =====================================================================

    // Access Event Data
    code = code.replace(/\brcvd_evt\.([a-zA-Z0-9_]+)\b/g, "eventArgs.$1");

    // Logical Operators
    code = code.replace(/\s+and\s+/gi, " && ");
    code = code.replace(/\s+or\s+/gi, " || ");
    code = code.replace(/\s+not\s+/gi, " !");

    // =====================================================================
    // 3.b DATE & TIME
    // =====================================================================

    code = code.replace(/\bCurrentTime\b/gi, "DateTime.Now");
    code = code.replace(/\bnow\(\)/gi, "DateTime.Now");
    code = code.replace(/\bcurrent\s+time\b/gi, "DateTime.Now");

    code = code.replace(/\bCurrentDate\b/gi, "DateTime.Today");
    code = code.replace(/\bcurrent_date\b/gi, "DateTime.Today");
    code = code.replace(/\bcurrent\s+date\b/gi, "DateTime.Today");

    code = code.replace(
      /add_days\s*\(\s*([A-Za-z0-9_.]+)\s*,\s*([0-9]+)\s*\)/gi,
      "$1.AddDays($2)"
    );

    code = code.replace(
      /dateadd\s*\(\s*([A-Za-z0-9_.]+)\s*,\s*([0-9]+)\s*\)/gi,
      "$1.AddDays($2)"
    );

    code = code.replace(
      /([A-Za-z0-9_.]+)\s*\+\s*([0-9]+)\s+days/gi,
      "$1.AddDays($2)"
    );

    code = code.replace(
      /date_parse\s*\(\s*(.*?)\s*\)/gi,
      "DateTime.Parse($1)"
    );

    // =====================================================================
    // 4. CONTROL FLOW
    // =====================================================================

    const regexIf = /if\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexIf, "if ($1) {");

    const regexElif = /(?:elif|else\s+if)\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexElif, "} else if ($1) {");

    code = code.replace(/^\s*else\s*$/gm, "} else {");
    code = code.replace(/end\s*if\s*;?/gi, "}");

    return code;
  },
};


