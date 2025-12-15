const EventCompiler = {
  // =====================================================================
  // 1. TEAM'S BRIDGE INFRASTRUCTURE
  // =====================================================================
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

  resolveBridges: function (code) {
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
        // [MODIFIED] Do NOT error yet, specific Timers might handle this later? 
        // NO, specific timers handled BEFORE this function.
        replacement = `/* [ERROR] Bridge '${functionName}' not found in team library */`;
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

  parseArguments: function (argsString) {
    const args = [];
    let currentArg = "";
    let parenDepth = 0;
    let inQuotes = false;
    let escapeNext = false;

    for (let i = 0; i < argsString.length; i++) {
      const char = argsString[i];

      if (escapeNext) {
        currentArg += char;
        escapeNext = false;
        continue;
      }

      if (char === "\\") {
        currentArg += char;
        escapeNext = true;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
        currentArg += char;
        continue;
      }

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
        currentArg += char;
      }
    }
    if (currentArg.trim()) {
      args.push(currentArg.trim());
    }
    return args;
  },

  // =====================================================================
  // 2. MAIN COMPILE FUNCTION (MERGED)
  // =====================================================================
  compileAction: function (oalCode) {
    if (!oalCode) return "// [Info] No action code defined.";

    let code = oalCode;
    // auto detect timer
    const USE_STRICT_TIMER =
      /create\s+timer\s+/i.test(oalCode) ||
      /TIM::timer_/i.test(oalCode);

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
    // STEP 0: PREPROCESS - Remove keywords
    // =====================================================================
    code = code.replace(/\bassign\s+/gm, "");

    // =====================================================================
    //  B. TIMERS & TIM:: BRIDGE 
    // =====================================================================
    // PENTING: Logika ini dijalankan SEBELUM 'resolveBridges' milik tim.
    // Ini mencegah resolveBridges mendeteksi TIM::timer_start sebagai bridge error.
    if (USE_STRICT_TIMER) {
      // 1. create timer (PASSIVE creation, OAL Standard)
      code = code.replace(
        /create\s+timer\s+([A-Za-z0-9_]+)\s+of\s+\((.*?)\)\s+generating\s+([A-Za-z0-9_]+);/g,
        "var $1 = TimerService.Create($3, $2, false);"
      );

      // 2. TIM::timer_start (ACTIVE schedule, Bridge)
      code = code.replace(
        /([A-Za-z0-9_]+)\s*=\s*TIM::timer_start\s*\(\s*microseconds:\s*([0-9A-Za-z_]+)\s*,\s*event_inst:\s*([A-Za-z0-9_]+)\s*\);/g,
        "var $1 = TimerService.Schedule($3, (int)($2 / 1000), false);"
      );

      // 3. TIM::timer_start_recurring
      code = code.replace(
        /([A-Za-z0-9_]+)\s*=\s*TIM::timer_start_recurring\s*\(\s*microseconds:\s*([0-9A-Za-z_]+)\s*,\s*event_inst:\s*([A-Za-z0-9_]+)\s*\);/g,
        "var $1 = TimerService.Schedule($3, (int)($2 / 1000), true);"
      );

      // 4. TIM::timer_cancel
      code = code.replace(
        /(?:[A-Za-z0-9_]+\s*=\s*)?TIM::timer_cancel\s*\(\s*timer_inst_ref:\s*([A-Za-z0-9_]+)\s*\);/g,
        "TimerService.Cancel($1);"
      );
      code = code.replace(
        /cancel\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_.]+);/g,
        "TimerService.Cancel($1);"
      );

      // 5. Utilities
      code = code.replace(
        /TIM::timer_remaining_time\s*\(\s*timer_inst_ref:\s*([A-Za-z0-9_]+)\s*\)/g,
        "TimerService.GetRemainingTime($1)"
      );
      code = code.replace(
        /(?:[A-Za-z0-9_]+\s*=\s*)?TIM::timer_reset_time\s*\(\s*timer_inst_ref:\s*([A-Za-z0-9_]+)\s*,\s*microseconds:\s*([0-9A-Za-z_]+)\s*\);/g,
        "TimerService.ResetTime($1, (int)($2 / 1000));"
      );
      code = code.replace(
        /(?:[A-Za-z0-9_]+\s*=\s*)?TIM::timer_add_time\s*\(\s*timer_inst_ref:\s*([A-Za-z0-9_]+)\s*,\s*microseconds:\s*([0-9A-Za-z_]+)\s*\);/g,
        "TimerService.AddTime($1, (int)($2 / 1000));"
      );
    } else {
      // Fallback stub untuk timer lama tim (jika ada)
      code = code.replace(
        /create\s+timer\s+([A-Za-z0-9_]+)\s+of\s+\((.*?)\)\s+generating\s+([A-Za-z0-9_]+);/g,
        "// [DISABLED] create timer $1 ($3, $2);"
      );
    }

    // =====================================================================
    // STEP 1: RESOLVE BRIDGES 
    // =====================================================================
    code = this.resolveBridges(code);

    // =====================================================================
    // STEP 2: PREPROCESS CONTROL FLOW
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
    // 1. EXPLICIT EVENT HANDLING
    // =====================================================================

    // A. CREATE EVENT INSTANCE (Explicit)
    code = code.replace(
      /create\s+event\s+instance\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+);/g,
      "var $1 = new Events.$2(); $1.Target = $3;"
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

    // D2. INSTANCE DELETION
    code = code.replace(
      /delete\s+object\s+instance\s+([A-Za-z0-9_]+);/g,
      "$1.Delete();"
    );
    code = code.replace(
      /^\s*delete\s+([A-Za-z0-9_]+);/gm,
      "$1.Delete();"
    );

    // E. INSTANCE SELECTION
    code = code.replace(
      /select\s+any\s+([A-Za-z0-9_]+)\s+from\s+instances\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = Population.$2[0] || null;"
    );
    code = code.replace(
      /select\s+one\s+([A-Za-z0-9_]+)\s+from\s+instances\s+of\s+([A-Za-z0-9_]+)\s+where\s*\((.*?)\);/g,
      "var $1 = Population.$2.find(item => $3) || null;"
    );
    code = code.replace(
      /select\s+many\s+([A-Za-z0-9_]+)\s+from\s+instances\s+of\s+([A-Za-z0-9_]+)\s+where\s*\((.*?)\);/g,
      "var $1 = Population.$2.filter(item => $3);"
    );

    // E2. NAVIGATION
    code = code.replace(
      /select\s+one\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      "var $1 = ($2.GetRelated('$3')[0]) || null;"
    );
    code = code.replace(
      /select\s+many\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+)\s+where\s*\((.*?)\);/g,
      "var $1 = $2.GetRelated('$3').filter(item => $4);"
    );
    code = code.replace(
      /select\s+many\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      "var $1 = $2.GetRelated('$3');"
    );
    code = code.replace(
      /select\s+any\s+([A-Za-z0-9_]+)\s+from\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      "var $1 = ($2.GetRelated('$3')[0]) || null;"
    );
    code = compileChainedNavigation(code);

    // F. RELATIONSHIP INSTANCE
    code = code.replace(
      /create\s+relationship\s+instance\s+([A-Za-z0-9_]+)\s+between\s+([A-Za-z0-9_]+)\s+and\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "var $1 = $2.RelateTo($3, '$4');"
    );
    code = code.replace(
      /delete\s+relationship\s+instance\s+([A-Za-z0-9_]+);/g,
      "$1.Delete();"
    );
    code = code.replace(
      /delete\s+relationship\s+instance\s+([A-Za-z0-9_]+)\s+between\s+([A-Za-z0-9_]+)\s+and\s+([A-Za-z0-9_]+)\s+of\s+([A-Za-z0-9_]+);/g,
      "$2.UnrelateFrom($3, '$4');"
    );

    // G. ASSIGNMENT & RELATE
    code = code.replace(
      /relate\s+([A-Za-z0-9_.]+)\s+to\s+([A-Za-z0-9_]+)\s+across\s+([A-Za-z0-9_]+);/g,
      '$1.RelateTo($2, "$3");'
    );

    // =====================================================================
    // 5. INTER-COMPONENT MESSAGING 
    // =====================================================================
    // 1. Explicit Targeting
    code = code.replace(
      /(?:send\s+)?([A-Za-z0-9_]+)::([A-Za-z0-9_]+)\s*\((.*?)\)\s+to\s+([A-Za-z0-9_]+);/g,
      "$4.$1.$2($3);"
    );
    // 2. Implicit Targeting
    code = code.replace(
      /(?:send\s+)?([A-Za-z0-9_]+)::([A-Za-z0-9_]+)\s*\((.*?)\)(?!\s+to\b)/g,
      "this.$1.$2($3)"
    );

    // Simpan flag untuk GetRuntimeHelpers
    this._usesStrictTimer = USE_STRICT_TIMER;

    return code;
  },

  // =====================================================================
  // 3. get runtime helpers
  // =====================================================================
  GetRuntimeHelpers: function () {
    if (!this._usesStrictTimer) return "";

    return `
using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

// ============================================================================
// OAL RUNTIME INFRASTRUCTURE (STRICT SEMANTICS)
// ============================================================================

public static class TimerService {
    public enum TimerStatus { Created, Running, Paused, Completed, Cancelled }

    private class TimerData {
        public CancellationTokenSource Cts { get; set; }
        public DateTime EndTime { get; set; } 
        public bool IsRecurring { get; set; }
        public int IntervalMs { get; set; }
        public dynamic EventInstance { get; set; }
        public TimerStatus Status { get; set; }
        public int RemainingAtPause { get; set; } 
    }

    private static ConcurrentDictionary<Guid, TimerData> _timers = 
        new ConcurrentDictionary<Guid, TimerData>();

    private static void RunTimerInternal(Guid timerId, TimerData data, int delayMs) {
        if (data.Status != TimerStatus.Running) return;

        Task.Run(async () => {
            try {
                await Task.Delay(delayMs, data.Cts.Token);

                if (!data.Cts.Token.IsCancellationRequested && data.Status == TimerStatus.Running) {
                    EventQueue.Enqueue(data.EventInstance);

                    if (data.IsRecurring) {
                        var newCts = new CancellationTokenSource();
                        data.Cts = newCts;
                        data.EndTime = DateTime.Now.AddMilliseconds(data.IntervalMs);
                        RunTimerInternal(timerId, data, data.IntervalMs);
                    } else {
                        data.Status = TimerStatus.Completed;
                        _timers.TryRemove(timerId, out _);
                    }
                }
            } catch (TaskCanceledException) {
                // Normal
            }
        });
    }

    public static Guid Create(dynamic eventInstance, int delayMs, bool isRecurring) {
        Guid timerId = Guid.NewGuid();
        var data = new TimerData { 
            Cts = new CancellationTokenSource(),
            EndTime = DateTime.MinValue,
            IsRecurring = isRecurring,
            IntervalMs = delayMs,
            EventInstance = eventInstance,
            Status = TimerStatus.Created,
            RemainingAtPause = delayMs
        };
        _timers.TryAdd(timerId, data);
        return timerId;
    }

    public static bool Start(Guid timerId) {
        if (_timers.TryGetValue(timerId, out TimerData data)) {
            if (data.Status == TimerStatus.Created || data.Status == TimerStatus.Paused) {
                int duration = data.RemainingAtPause > 0 ? data.RemainingAtPause : data.IntervalMs;
                data.Status = TimerStatus.Running;
                data.EndTime = DateTime.Now.AddMilliseconds(duration);
                data.Cts = new CancellationTokenSource();
                RunTimerInternal(timerId, data, duration);
                return true;
            }
        }
        return false;
    }

    public static Guid Schedule(dynamic eventInstance, int delayMs, bool isRecurring) {
        var id = Create(eventInstance, delayMs, isRecurring);
        Start(id);
        return id;
    }

    public static bool Cancel(Guid timerId) {
        if (_timers.TryRemove(timerId, out TimerData data)) {
            data.Status = TimerStatus.Cancelled;
            data.Cts.Cancel();
            data.Cts.Dispose();
            return true;
        }
        return false;
    }

    public static int GetRemainingTime(Guid timerId) {
        if (_timers.TryGetValue(timerId, out TimerData data)) {
            if (data.Status == TimerStatus.Running) {
                var val = (data.EndTime - DateTime.Now).TotalMilliseconds;
                return val > 0 ? (int)(val * 1000) : 0;
            }
            if (data.Status == TimerStatus.Created || data.Status == TimerStatus.Paused) {
                return data.RemainingAtPause * 1000;
            }
        }
        return 0;
    }

    public static bool AddTime(Guid timerId, int extraMs) {
        if (_timers.TryGetValue(timerId, out TimerData data)) {
            if (data.Status == TimerStatus.Running) {
                data.Cts.Cancel(); 
                double currentRemaining = (data.EndTime - DateTime.Now).TotalMilliseconds;
                if (currentRemaining < 0) currentRemaining = 0;
                int newDelay = (int)(currentRemaining + extraMs);

                data.Cts = new CancellationTokenSource();
                data.EndTime = DateTime.Now.AddMilliseconds(newDelay);
                RunTimerInternal(timerId, data, newDelay);
            } else {
                data.IntervalMs += extraMs;
                data.RemainingAtPause += extraMs;
            }
            return true;
        }
        return false;
    }

    public static bool ResetTime(Guid timerId, int newMs) {
        if (_timers.TryGetValue(timerId, out TimerData data)) {
            if (data.Status == TimerStatus.Running) {
                data.Cts.Cancel();
                data.Cts = new CancellationTokenSource();
                data.EndTime = DateTime.Now.AddMilliseconds(newMs);
                if (data.IsRecurring) data.IntervalMs = newMs;
                RunTimerInternal(timerId, data, newMs);
            } else {
                data.IntervalMs = newMs;
                data.RemainingAtPause = newMs;
            }
            return true;
        }
        return false;
    }
}

public static class EventQueue {
    public static void Enqueue(dynamic evt) {
        Console.WriteLine($"[EventQueue] Enqueued Event Target: {evt.Target}");
        // ... Dispatch Logic ...
    }
}
`;
  }
};