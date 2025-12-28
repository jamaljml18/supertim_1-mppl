// 1. Daftar Kata Tidak Boleh (C# Keywords)
const forbiddenNames = new Set([
  "class",
  "namespace",
  "using",
  "public",
  "private",
  "protected",
  "static",
  "void",
  "int",
  "string",
  "bool",
  "double",
  "float",
  "object",
  "base",
  "this",
  "if",
  "else",
  "for",
  "foreach",
  "while",
  "return",
  "event",
  "delegate",
]);

// 2. Fungsi Validasi Identifier
function isValidIdentifier(name) {
  if (!name || typeof name !== "string") return false;
  if (forbiddenNames.has(name.toLowerCase())) return false;
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}

// 3. Fungsi Utama Compiler
function translateJson() {
  const fileInput = document.getElementById("fileInput");
  const jsonPreview = document.getElementById("jsonPreview");
  const csharpPreview = document.getElementById("csharpPreview");

  if (fileInput.files.length === 0) {
    alert("Please select a JSON file.");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const json = JSON.parse(event.target.result);
      jsonPreview.textContent = JSON.stringify(json, null, 2);

      let csharpCode = `using System;\nusing System.Collections.Generic;\n\n`;

      const namespaceName = isValidIdentifier(json.sub_name)
        ? json.sub_name
        : "GeneratedSubsystem";
      csharpCode += `namespace ${namespaceName} {\n`;

      json.model.forEach((model) => {
        if (model.type === "class") {
          csharpCode += `    public class ${model.class_name} {\n`;

          // A. PROSES ATRIBUT
          if (model.attributes) {
            model.attributes.forEach((attr) => {
              let csharpType = getCSharpType(attr.data_type);
              csharpCode += `        public ${csharpType} ${attr.attribute_name} { get; set; }\n`;
            });
          }

          // B. LOGIKA TAMBAHAN UNTUK INFRASTRUKTUR
          if (model.class_name === "EventInstance") {
            csharpCode += `\n        public EventInstance(string id, string label, object target, object data) {\n`;
            csharpCode += `            this.EventId = id; this.Label = label; this.Target = target; this.Data = data;\n        }\n`;
            csharpCode += `        public void Send() => Console.WriteLine($"[Event] {EventId} sent to {Target}");\n`;
          }

          if (model.class_name === "TimerService") {
            csharpCode += `\n        public static object Create(int duration, EventInstance eventInst) {\n`;
            csharpCode += `            Console.WriteLine($"[Timer] Set {duration} mins for {eventInst.Label}");\n`;
            csharpCode += `            return new object();\n        }\n`;
            csharpCode += `        public static void Cancel(object timerHandle) => Console.WriteLine("[Timer] Cancelled");\n`;
          }

          // C. PROSES STATES
          if (model.states) {
            csharpCode += `\n        // --- States ---\n`;
            model.states.forEach((state) => {
              const stateClassName = state.state_name.replace(/\s/g, "_");
              csharpCode += `        public class State_${stateClassName} {\n`;
              csharpCode += `            public string StateId { get; } = "${state.state_id}";\n`;
              csharpCode += `            public void ExecuteAction(${model.class_name} self, dynamic rcvd_evt) {\n`;

              if (state.action_oal) {
                const translatedCode = EventCompiler.compileAction(
                  state.action_oal
                );
                translatedCode.split("\n").forEach((line) => {
                  if (line.trim().length > 0) {
                    let fLine = line.trim();
                    const needsSemi =
                      !fLine.endsWith(";") &&
                      !fLine.endsWith("{") &&
                      !fLine.endsWith("}") &&
                      !fLine.startsWith("//");
                    csharpCode += `                ${fLine}${
                      needsSemi ? ";" : ""
                    }\n`;
                  }
                });
              }
              csharpCode += `            }\n        }\n`;
            });
          }
          csharpCode += `    }\n\n`;
        } else if (model.type === "external_entity") {
          csharpCode += `    public static class ${model.KL} {\n`;
          csharpCode += `        public static void ReceiveEvent(string id, string msg, object data) => Console.WriteLine($"[EE] {msg}");\n`;
          if (model.KL === "TIM") {
            csharpCode += `        public static int getCurrentTime() => (int)DateTime.Now.TimeOfDay.TotalMinutes;\n`;
          }
          csharpCode += `    }\n\n`;
        }
      });

      csharpCode += `}`;
      csharpPreview.textContent = csharpCode;
    } catch (error) {
      csharpPreview.textContent = "❌ ERROR: " + error.message;
    }
  };
  reader.readAsText(file);
}

// Tambahkan "object" ke mapper tipe data
function getCSharpType(xtUmlType) {
  const typeMap = {
    unique_id: "Guid",
    id: "int",
    string: "string",
    integer: "int",
    real: "double",
    state: "string",
    boolean: "bool",
    object: "object",
  };
  return typeMap[xtUmlType] || "object";
}
