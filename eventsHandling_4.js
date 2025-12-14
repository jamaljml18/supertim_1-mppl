const EventCompiler = {
  bridges: {
    "current_date": { type: "datetime", args: 0, csharp: "DateTime.Today" },
    "current_time": { type: "datetime", args: 0, csharp: "DateTime.Now" },
    "add_days": { type: "datetime", args: 2, template: "{0}.AddDays({1})" },
    "add_hours": { type: "datetime", args: 2, template: "{0}.AddHours({1})" },
    "add_minutes": { type: "datetime", args: 2, template: "{0}.AddMinutes({1})" },
    "day_of": { type: "datetime", args: 1, template: "{0}.Day" },
    "month_of": { type: "datetime", args: 1, template: "{0}.Month" },
    "string_upper": { type: "string", args: 1, template: "{0}.ToUpper()" },
    "string_lower": { type: "string", args: 1, template: "{0}.ToLower()" },
    "string_concat": { type: "string", args: -1, template: "string.Concat({0})" },
    "string_length": { type: "string", args: 1, template: "{0}.Length" },
    "string_trim": { type: "string", args: 1, template: "{0}.Trim()" },
    "string_replace": { type: "string", args: 3, template: "{0}.Replace({1}, {2})" },
    "string_contains": { type: "string", args: 2, template: "{0}.Contains({1})" },
    "string_starts_with": { type: "string", args: 2, template: "{0}.StartsWith({1})" },
    "string_ends_with": { type: "string", args: 2, template: "{0}.EndsWith({1})" },
    "string_substring": { type: "string", args: 3, template: "{0}.Substring({1}, {2})" },
    "string_index_of": { type: "string", args: 2, template: "{0}.IndexOf({1})" },
    "string_split": { type: "string", args: 2, template: "{0}.Split({1})" },
    "string_equals": { type: "string", args: 2, template: "{0}.Equals({1})" },
    "string_equals_ignore_case": { type: "string", args: 2, template: "{0}.Equals({1}, StringComparison.OrdinalIgnoreCase)" },
    "string_empty": { type: "string", args: 0, csharp: "string.Empty" },
    "is_empty_string": { type: "string", args: 1, template: "string.IsNullOrEmpty({0})" },
    "is_not_empty_string": { type: "string", args: 1, template: "!string.IsNullOrEmpty({0})" },
    "size": { type: "collection", args: 1, template: "{0}.Count()" },
    "is_empty": { type: "collection", args: 1, template: "({0}.Count() == 0)" },
    "is_not_empty": { type: "collection", args: 1, template: "({0}.Count() > 0)" },
    "cardinality": { type: "collection", args: 1, template: "{0}.Count()" },
    "add_to_collection": { type: "collection", args: 2, template: "{0}.Add({1})" },
    "remove_from_collection": { type: "collection", args: 2, template: "{0}.Remove({1})" },
    "clear_collection": { type: "collection", args: 1, template: "{0}.Clear()" },
    "collection_contains": { type: "collection", args: 2, template: "{0}.Contains({1})" },
    "first_element": { type: "collection", args: 1, template: "{0}.FirstOrDefault()" },
    "last_element": { type: "collection", args: 1, template: "{0}.LastOrDefault()" },
    "collection_to_list": { type: "collection", args: 1, template: "{0}.ToList()" },
    "collection_to_array": { type: "collection", args: 1, template: "{0}.ToArray()" },
    "abs": { type: "math", args: 1, template: "Math.Abs({0})" },
    "ceiling": { type: "math", args: 1, template: "Math.Ceiling({0})" },
    "floor": { type: "math", args: 1, template: "Math.Floor({0})" },
    "round": { type: "math", args: 2, template: "Math.Round({0}, {1})" },
    "sqrt": { type: "math", args: 1, template: "Math.Sqrt({0})" },
    "power": { type: "math", args: 2, template: "Math.Pow({0}, {1})" },
    "min": { type: "math", args: 2, template: "Math.Min({0}, {1})" },
    "max": { type: "math", args: 2, template: "Math.Max({0}, {1})" },
    "random": { type: "math", args: 0, csharp: "new Random().Next()" },
    "random_range": { type: "math", args: 2, template: "new Random().Next({0}, {1})" },
    "to_string": { type: "conversion", args: 1, template: "{0}.ToString()" },
    "to_integer": { type: "conversion", args: 1, template: "int.Parse({0})" },
    "to_real": { type: "conversion", args: 1, template: "double.Parse({0})" },
    "to_boolean": { type: "conversion", args: 1, template: "bool.Parse({0})" },
    "to_date": { type: "conversion", args: 1, template: "DateTime.Parse({0})" },
    "try_to_integer": { type: "conversion", args: 2, template: "int.TryParse({0}, out {1})" },
    "try_to_real": { type: "conversion", args: 2, template: "double.TryParse({0}, out {1})" },
    "to_decimal": { type: "conversion", args: 1, template: "decimal.Parse({0})" },
    "log": { type: "logging", args: 1, template: "Console.WriteLine({0})" },
    "log_error": { type: "logging", args: 1, template: "Console.Error.WriteLine({0})" },
    "log_info": { type: "logging", args: 1, template: "Console.WriteLine(\"[INFO] \" + {0})" },
    "log_warning": { type: "logging", args: 1, template: "Console.WriteLine(\"[WARN] \" + {0})" },
    "log_debug": { type: "logging", args: 1, template: "Console.WriteLine(\"[DEBUG] \" + {0})" },
    "print": { type: "logging", args: 1, template: "Console.Write({0})" },
    "print_line": { type: "logging", args: 1, template: "Console.WriteLine({0})" },
    "debug_break": { type: "logging", args: 0, csharp: "System.Diagnostics.Debugger.Break()" },
    "file_read": { type: "file", args: 1, template: "System.IO.File.ReadAllText({0})" },
    "file_write": { type: "file", args: 2, template: "System.IO.File.WriteAllText({0}, {1})" },
    "file_exists": { type: "file", args: 1, template: "System.IO.File.Exists({0})" },
    "file_delete": { type: "file", args: 1, template: "System.IO.File.Delete({0})" },
    "get_guid": { type: "misc", args: 0, csharp: "Guid.NewGuid().ToString()" },
    "get_hash": { type: "misc", args: 1, template: "\"{0}\".GetHashCode().ToString()" },
  },

  resolveBridges: function(code) {
    let result = code;
    let iterations = 0;
    const maxIterations = 15;

    while (iterations < maxIterations) {
      iterations++;
      let foundBridge = false;

      // Find first TIM:: occurrence
      const timIdx = result.indexOf('TIM::');
      if (timIdx === -1) break;

      // Extract function name
      let funcEndIdx = timIdx + 5;
      while (funcEndIdx < result.length && /[a-zA-Z0-9_]/.test(result[funcEndIdx])) {
        funcEndIdx++;
      }
      const functionName = result.substring(timIdx + 5, funcEndIdx);

      // Skip whitespace and find opening paren
      let parenStart = funcEndIdx;
      while (parenStart < result.length && /\s/.test(result[parenStart])) {
        parenStart++;
      }

      if (parenStart >= result.length || result[parenStart] !== '(') {
        break;
      }

      // Find matching closing paren by counting depth
      let depth = 0;
      let parenEnd = parenStart;
      for (let i = parenStart; i < result.length; i++) {
        if (result[i] === '(') depth++;
        else if (result[i] === ')') {
          depth--;
          if (depth === 0) {
            parenEnd = i;
            break;
          }
        }
      }

      if (depth !== 0) break; // Unmatched parens

      const argsString = result.substring(parenStart + 1, parenEnd);
      const fullMatch = result.substring(timIdx, parenEnd + 1);
      const bridge = this.bridges[functionName];

      let replacement;
      if (!bridge) {
        replacement = `/* [ERROR] Bridge '${functionName}' not found */`;
      } else {
        let args = [];
        if (argsString.trim()) {
          args = this.parseArguments(argsString);
        }

        if (bridge.args >= 0 && args.length !== bridge.args) {
          replacement = `/* [ERROR] TIM::${functionName}() expects ${bridge.args} arg(s), got ${args.length} */`;
        } else if (bridge.csharp) {
          replacement = bridge.csharp;
        } else if (bridge.template) {
          replacement = bridge.template;
          // Handle variable argument functions (args: -1)
          if (bridge.args === -1 && args.length > 0) {
            // Replace {0} with all arguments joined by comma
            replacement = replacement.replace('{0}', args.join(', '));
          } else {
            // Standard template replacement for fixed argument count
            args.forEach((arg, index) => {
              replacement = replacement.replace(`{${index}}`, arg);
            });
          }
        } else {
          replacement = fullMatch;
        }
      }

      result = result.substring(0, timIdx) + replacement + result.substring(parenEnd + 1);
      foundBridge = true;
      break;
    }

    if (result !== code) {
      return this.resolveBridges(result); // Recursive for nested bridges
    }
    return result;
  },

  parseArguments: function(argsString) {
    const args = [];
    let currentArg = "";
    let parenDepth = 0;
    let inQuotes = false;
    let escapeNext = false;

    for (let i = 0; i < argsString.length; i++) {
      const char = argsString[i];
      
      // Handle escape sequences
      if (escapeNext) {
        currentArg += char;
        escapeNext = false;
        continue;
      }
      
      // Handle backslash escape
      if (char === "\\") {
        currentArg += char;
        escapeNext = true;
        continue;
      }
      
      // Toggle quote state
      if (char === '"') {
        inQuotes = !inQuotes;
        currentArg += char;
        continue;
      }
      
      // Track parenthesis depth only outside quotes
      if (!inQuotes) {
        if (char === "(" || char === "[") {
          parenDepth++;
          currentArg += char;
        } else if (char === ")" || char === "]") {
          parenDepth--;
          currentArg += char;
        } else if (char === "," && parenDepth === 0) {
          args.push(currentArg.trim());
          currentArg = "";
        } else {
          currentArg += char;
        }
      } else {
        // Inside quotes, add all characters as-is
        currentArg += char;
      }
    }
    if (currentArg.trim()) {
      args.push(currentArg.trim());
    }
    return args;
  },

  compileAction: function (oalCode) {
    if (!oalCode) return "// [Info] No action code defined.";

    let code = oalCode;

    // =====================================================================
    // STEP 0: PREPROCESS - Remove keywords before other transformations
    // =====================================================================
    code = code.replace(/\bassign\s+/gm, "");

    // =====================================================================
    // STEP 1: RESOLVE BRIDGES
    // =====================================================================
    code = this.resolveBridges(code);

function compileChainedNavigation(code) {
  const navRegex =
    /([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\s*->\s*([A-Za-z0-9_]+)\[([A-Za-z0-9_]+)\]/g;

  let prev;
  do {
    prev = code;
    code = code.replace(navRegex, (_, source, rel, cls) => {
      return `${source}.GetRelated("${rel}").filter(o => o instanceof ${cls})`;
    });
  } while (code !== prev);

  return code;
}

    // =====================================================================
    // STEP 2: PREPROCESS if/then/else/end if BEFORE other transformations
    // =====================================================================
    
    // Convert if (...) then ... to if (...) { ...
    code = code.replace(/\bif\s*\((.*?)\)\s*then\s*/gi, "if ($1) { ");
    
    // Convert else if / elif ... then to } else if (...) { ...
    code = code.replace(/\belse\s+if\s*\((.*?)\)\s*then\s*/gi, "} else if ($1) { ");
    code = code.replace(/\belif\s*\((.*?)\)\s*then\s*/gi, "} else if ($1) { ");
    
    // Convert else to } else {
    code = code.replace(/\belse\s*(?!if|{)/gi, "} else { ");
    
    // Convert end if to }
    code = code.replace(/end\s+if\s*;?/gi, "}");

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
    // D2. INSTANCE DELETION (BARU)
    // ---------------------------------------------------------
    // OAL: delete object instance a;
    // C# : a.Delete();
    code = code.replace(
      /delete\s+object\s+instance\s+([A-Za-z0-9_]+);/g,
      "$1.Delete();"
    );

    // OAL Short version: delete a; (jika ada)
    code = code.replace(
      /^\s*delete\s+([A-Za-z0-9_]+);/gm,
      "$1.Delete();"
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
    // E2. INSTANCE SELECTION BY RELATIONSHIP NAVIGATION 
    // ---------------------------------------------------------

    // SELECT ONE by Relationship Navigation
    code = code.replace(
      /select\s+one\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      "var $1 = ($2.GetRelated('$3')[0]) || null;"
    );

    // SELECT MANY by Relationship Navigation
    code = code.replace(
      /select\s+many\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+)\s+where\s*\((.*?)\);/g,
      "var $1 = $2.GetRelated('$3').filter(item => $4);"
    );

    code = code.replace(
      /select\s+many\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      "var $1 = $2.GetRelated('$3');"
    );

    // SELECT ANY by Relationship Navigation
    code = code.replace(
      /select\s+any\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      "var $1 = ($2.GetRelated('$3')[0]) || null;"
    );
    
    code = compileChainedNavigation(code);

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
    // 4. CONTROL FLOW (Already handled in STEP 2 preprocessing)
    // =====================================================================
    // if/then/else/end if already converted to if { } else { } syntax

    return code;
  },
};






