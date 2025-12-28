const EventCompiler = {
  compileAction: function (oalCode) {
    if (!oalCode) return "// No action code";
    let code = oalCode;

    const formatParams = (p) => (p ? p.replace(/:/g, " = ") : "");

    // 1. Cancel Timer (OAL: cancel t_timeout from self)
    code = code.replace(
      /cancel\s+(\w+)\s+from\s+(\w+);?/g,
      "TimerService.Cancel($1)"
    );

    // 2. Bridge Call (OAL: TIM::getCurrentTime)
    code = code.replace(/(\w+)::(\w+)/g, "$1.$2");

    // 3. Create Event Instance
    code = code.replace(
      /create\s+event\s+instance\s+(\w+)\s+of\s+(\w+)(?::'(.+?)')?\s*(\(.*?\))?\s*to\s+(\w+);/g,
      (m, handle, eventId, meaning, params, target) => {
        const p = formatParams(params);
        return `var ${handle} = new EventInstance("${eventId}", "${
          meaning || ""
        }", ${target}, new { ${p.slice(1, -1)} })`;
      }
    );

    // 4. Generate Event (Langsung & Handle)
    code = code.replace(
      /generate\s+(\w+)(?::'(.+?)')?\s*(\(.*?\))?\s*to\s+(\w+);/g,
      (m, eventId, meaning, params, target) => {
        const p = formatParams(params);
        return `${target}.ReceiveEvent("${eventId}", "${
          meaning || ""
        }", new { ${p.slice(1, -1)} })`;
      }
    );
    code = code.replace(/generate\s+(\w+);/g, "$1.Send()");

    // 5. Timer
    code = code.replace(
      /create\s+timer\s+(\w+)\s+of\s+\((.*?)\)\s+generating\s+(\w+);/g,
      "var $1 = TimerService.Create($2, $3)"
    );

    // 6. Keywords & Control Flow
    code = code.replace(
      /create\s+object\s+instance\s+(\w+)\s+of\s+(\w+);/g,
      "var $1 = new $2()"
    );
    code = code.replace(/^\s*assign\s+/gm, "");
    code = code.replace(/if\s*\((.*?)\)\s*then/gi, "if ($1) {");
    code = code.replace(/else\s+if\s*\((.*?)\)\s*then/gi, "} else if ($1) {");
    code = code.replace(/else\s+/gi, "} else {");
    code = code.replace(/end\s+if\s*;?/gi, "}");

    return code;
  },
};
