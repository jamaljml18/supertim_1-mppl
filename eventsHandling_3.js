const EventCompiler = {
  compileAction: function (oalCode) {
    if (!oalCode) return "// [Info] No action code defined.";

    let code = oalCode;

    // =====================================================================
    // 1. STANDARD OAL COMMANDS
    // =====================================================================

    // A. INSTANCE CREATION
    // OAL: create object instance a of Attendance;
    // C# : var a = new Attendance();
    code = code.replace(
      /create\s+object\s+instance\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = new $2();"
    );

    // B. GENERATE EVENT (DELAYED)
    // OAL: generate schedule_end_passed to self delay (self.end_time + 30);
    // C# : self.GenerateEventDelayed(new Events.schedule_end_passed(), (self.end_time + 30));
    code = code.replace(
      /generate\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+)\s+delay\s+\((.*?)\);/g,
      (match, evt, target, time) =>
        `${target}.GenerateEventDelayed(new Events.${evt}(), ${time});`
    );

    // C. GENERATE EVENT (IMMEDIATE)
    // OAL: generate Email to Notification;
    // C# : Notification.GenerateEvent(new Events.Email());
    code = code.replace(
      /generate\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+);/g,
      (match, evt, target) => `${target}.GenerateEvent(new Events.${evt}());`
    );

    // D. ASSIGNMENT
    // OAL: assign self.status = "Pending";
    // C# : self.status = "Pending";
    code = code.replace(/^\s*assign\s+/gm, "");

    // E. RELATE
    // OAL: relate a to e across R1;
    // C# : a.RelateTo(e, "R1");
    code = code.replace(
      /relate\s+([A-Za-z0-9_.]+)\s+to\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      '$1.RelateTo($2, "$3");'
    );

    // F. CANCEL TIMER (Simplified Standard)
    // OAL: cancel schedule_end_passed from self;
    // C# : self.CancelTimer(Events.schedule_end_passed);
    code = code.replace(
      /cancel\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_.]+);/g,
      "$2.CancelTimer(Events.$1);"
    );

    // =====================================================================
    // 2. DATA ACCESS & LOGIC
    // =====================================================================

    // Access Event Data (rcvd_evt -> eventArgs)
    code = code.replace(/\brcvd_evt\.([a-zA-Z0-9_]+)\b/g, "eventArgs.$1");

    // Logical Operators
    code = code.replace(/\s+and\s+/gi, " && ");
    code = code.replace(/\s+or\s+/gi, " || ");
    code = code.replace(/\s+not\s+/gi, " !");

    // =====================================================================
    // 3. CONTROL FLOW
    // =====================================================================

    // IF
    const regexIf = /if\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexIf, "if ($1) {");

    // ELSE IF
    const regexElif = /(?:elif|else\s+if)\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexElif, "} else if ($1) {");

    // ELSE
    code = code.replace(/^\s*else\s*$/gm, "} else {");

    // END IF
    code = code.replace(/end\s*if\s*;?/gi, "}");

    return code;
  },
};
