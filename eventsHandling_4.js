const EventCompiler = {
  compileAction: function (oalCode) {
    if (!oalCode) return "// [Info] No action code defined.";

    let code = oalCode;

    // =====================================================================
    // 1. EXPLICIT EVENT HANDLING (NEW REQUEST)
    // =====================================================================

    // A. CREATE EVENT INSTANCE (Eksplisit)
    // OAL: create event instance evt_email of Email to Notification;
    // C# : var evt_email = new Events.Email(); evt_email.Target = Notification;
    code = code.replace(
      /create\s+event\s+instance\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+);/g,
      "var $1 = new Events.$2(); $1.Target = $3;"
    );

    // B. CREATE TIMER (Eksplisit)
    // OAL: create timer t_timeout of (self.end_time + 30) generating evt_timeout;
    // C# : var t_timeout = evt_timeout.Target.StartTimer(evt_timeout, (self.end_time + 30));
    code = code.replace(
      /create\s+timer\s+([A-Za-z0-9_]+)\s+of\s+\((.*?)\)\s+generating\s+([A-Za-z0-9_]+);/g,
      "var $1 = $3.Target.StartTimer($3, $2);"
    );

    // C. GENERATE EVENT INSTANCE (Eksplisit - Kirim yang sudah dibuat)
    // OAL: generate evt_email;
    // C# : evt_email.Target.GenerateEvent(evt_email);
    code = code.replace(
      /generate\s+([A-Za-z0-9_]+);/g,
      "$1.Target.GenerateEvent($1);"
    );

    // =====================================================================
    // 2. STANDARD OAL COMMANDS
    // =====================================================================

    // D. INSTANCE CREATION (Object)
    // OAL: create object instance a of Attendance;
    code = code.replace(
      /create\s+object\s+instance\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = new $2();"
    );

    // E. ASSIGNMENT
    code = code.replace(/^\s*assign\s+/gm, "");

    // F. RELATE
    code = code.replace(
      /relate\s+([A-Za-z0-9_.]+)\s+to\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      '$1.RelateTo($2, "$3");'
    );

    // G. CANCEL TIMER
    // OAL: cancel schedule_end_passed from self;
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
    // 4. CONTROL FLOW
    // =====================================================================

    // IF, ELSE IF, ELSE, END IF
    const regexIf = /if\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexIf, "if ($1) {");

    const regexElif = /(?:elif|else\s+if)\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexElif, "} else if ($1) {");

    code = code.replace(/^\s*else\s*$/gm, "} else {");
    code = code.replace(/end\s*if\s*;?/gi, "}");

    return code;
  },
};
