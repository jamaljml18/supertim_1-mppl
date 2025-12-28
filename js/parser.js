// 1. Daftar Kata Tidak Boleh (C# Keywords + Custom)
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
]);

// 2. Fungsi Validasi Identifier (Format & Keyword)
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

      // --- TRACKER UNTUK DUPLIKASI (Level Subsystem) ---
      const seenClassNames = new Set();

      let csharpCode = `using System;\nusing System.Collections.Generic;\n\n`;

      // Validasi Namespace
      const namespaceName = isValidIdentifier(json.sub_name)
        ? json.sub_name
        : "GeneratedSubsystem";
      csharpCode += `namespace ${namespaceName} {\n`;

      // --- PROSES MODEL ---
      json.model.forEach((model) => {
        if (model.type === "class") {
          // A. VALIDASI NAMA KELAS (Forbidden & Duplicate)
          if (!isValidIdentifier(model.class_name)) {
            throw new Error(
              `Invalid or Forbidden class name: "${model.class_name}"`
            );
          }
          if (seenClassNames.has(model.class_name)) {
            throw new Error(
              `Duplicate class detected: "${model.class_name}". Class names must be unique.`
            );
          }
          seenClassNames.add(model.class_name);

          csharpCode += `    public class ${model.class_name} {\n`;

          // B. VALIDASI & PROSES ATRIBUT
          const seenAttributes = new Set();
          if (model.attributes) {
            model.attributes.forEach((attr) => {
              if (!isValidIdentifier(attr.attribute_name)) {
                throw new Error(
                  `Invalid attribute name: "${attr.attribute_name}" in class ${model.class_name}`
                );
              }
              if (seenAttributes.has(attr.attribute_name)) {
                throw new Error(
                  `Duplicate attribute: "${attr.attribute_name}" in class ${model.class_name}`
                );
              }
              seenAttributes.add(attr.attribute_name);

              let csharpType = getCSharpType(attr.data_type);
              csharpCode += `        public ${csharpType} ${attr.attribute_name} { get; set; }\n`;
            });
          }

          // C. VALIDASI & PROSES STATES
          const seenStates = new Set();
          if (model.states) {
            csharpCode += `\n        // --- States ---\n`;
            model.states.forEach((state) => {
              const stateClassName = state.state_name.replace(/\s/g, "_");

              if (seenStates.has(stateClassName)) {
                throw new Error(
                  `Duplicate state: "${state.state_name}" in class ${model.class_name}`
                );
              }
              seenStates.add(stateClassName);

              csharpCode += `        public class State_${stateClassName} {\n`;
              csharpCode += `            public string StateId { get; } = "${state.state_id}";\n`;
              csharpCode += `            public void ExecuteAction(${model.class_name} self) {\n`;

              if (state.action_oal) {
                const lines = state.action_oal.split("\n");
                lines.forEach((line) => {
                  csharpCode += `                // ${line}\n`;
                });
              }

              csharpCode += `            }\n        }\n`;
            });
          }
          csharpCode += `    }\n\n`;
        } else if (model.type === "association") {
          // Penangan Relasi
          //   csharpCode += `    // Association ${model.name} detected\n`;
        }
      });

      csharpCode += `}`; // Tutup Namespace
      csharpPreview.textContent = csharpCode;
    } catch (error) {
      // Menampilkan pesan error yang ramah di area preview
      csharpPreview.textContent =
        "❌ COMPILATION ERROR:\n--------------------------\n" + error.message;
      console.error("Compiler Error:", error.message);
    }
  };
  reader.readAsText(file);
}

// 4. Fungsi Mapper Tipe Data
function getCSharpType(xtUmlType) {
  const typeMap = {
    id: "int",
    string: "string",
    integer: "int",
    real: "double",
    state: "string",
    boolean: "bool",
  };
  return typeMap[xtUmlType] || "object";
}
