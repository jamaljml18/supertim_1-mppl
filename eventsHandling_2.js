const EventCompiler = {
  /**
   * Menerjemahkan blok kode OAL menjadi kode C#.
   * * @param {string} oalCode - String kode asli dalam format OAL.
   * @returns {string} - Kode hasil terjemahan dalam format C#.
   */
  compileAction: function (oalCode) {
    // Validasi: Pastikan ada kode yang diproses
    if (!oalCode)
      return "// [Info] Tidak ada action code didefinisikan dalam JSON.";

    let code = oalCode;

    // =====================================================================
    // BAGIAN 1: OPERATOR LOGIKA (LOGICAL OPERATORS)
    // =====================================================================
    // Tujuan: Mengubah sintaks bahasa natural OAL menjadi simbol logika C#.
    // ---------------------------------------------------------------------

    // 1. Operator AND
    // Input  : if (valid and active)
    // Output : if (valid && active)
    code = code.replace(/\s+and\s+/gi, " && ");

    // 2. Operator OR
    // Input  : if (x or y)
    // Output : if (x || y)
    code = code.replace(/\s+or\s+/gi, " || ");

    // 3. Operator NOT
    // Input  : if (not valid)
    // Output : if (!valid)
    code = code.replace(/\s+not\s+/gi, " !");

    // [Opsional] Assignment Check di dalam IF
    // Peringatan: Regex ini dinonaktifkan untuk keamanan, karena sulit membedakan
    // antara assignment (=) dan comparison (==) tanpa parser yang kompleks.
    // code = code.replace(/if\s*\(([^=]+)=([^=]+)\)/g, "if ($1 == $2)");

    // =====================================================================
    // BAGIAN 2: ALUR KONTROL (CONTROL FLOW)
    // =====================================================================
    // Tujuan: Mengubah struktur blok 'if ... end if' menjadi kurung kurawal C# {}.
    // ---------------------------------------------------------------------

    // A. IF Statement
    // Input  : if (self.amount > 100) then
    // Output : if (self.amount > 100) {
    const regexIf = /if\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexIf, "if ($1) {");

    // B. ELSE IF Statement
    // Mendukung gaya 'elif' maupun 'else if'.
    // Input  : elif (self.amount < 0) then
    // Output : } else if (self.amount < 0) {
    const regexElif = /(?:elif|else\s+if)\s*\((.*?)\)\s*(?:then)?/gi;
    code = code.replace(regexElif, "} else if ($1) {");

    // C. ELSE Statement
    // Input  : else
    // Output : } else {
    code = code.replace(/^\s*else\s*$/gm, "} else {");

    // D. END IF Statement
    // Input  : end if;  ATAU  end if
    // Output : }
    code = code.replace(/end\s*if\s*;?/gi, "}");

    // =====================================================================
    // BAGIAN 3: MANAJEMEN OBJEK & EVENT (CORE FEATURES)
    // =====================================================================
    // Tujuan: Menangani instansiasi, pengiriman sinyal, dan timer.
    // ---------------------------------------------------------------------

    // A. Instance Creation (Instansiasi)
    // Input  : create Attendance a;
    // Output : var a = new Attendance();
    code = code.replace(
      /create\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+);/g,
      "var $2 = new $1();"
    );

    // B. Accessing Event Data (Data Masuk)
    // Input  : rcvd_evt.user_id
    // Output : eventArgs.user_id
    code = code.replace(/\brcvd_evt\.([a-zA-Z0-9_]+)\b/g, "eventArgs.$1");

    // C. Generating Events (Pengiriman Sinyal)

    // C.1 Delayed Event (Timer)
    // Input  : send Timeout to self after (time + 30);
    // Output : self.GenerateEventDelayed(new Events.Timeout(), time + 30);
    code = code.replace(
      /send\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+)\s+after\s+\((.*?)\);/g,
      (match, evt, target, time) =>
        `${target}.GenerateEventDelayed(new Events.${evt}(), ${time});`
    );

    // C.2 Immediate Event (Langsung)
    // Input  : send Process to Processor;
    // Output : Processor.GenerateEvent(new Events.Process());
    code = code.replace(
      /send\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+);/g,
      (match, evt, target) => `${target}.GenerateEvent(new Events.${evt}());`
    );

    // =====================================================================
    // BAGIAN 4: HELPER & PEMBERSIHAN SINTAKS
    // =====================================================================

    // A. Menghapus keyword 'set' (C# tidak menggunakannya untuk assignment)
    // Input  : set a.status = "Active";
    // Output : a.status = "Active";
    code = code.replace(/^\s*set\s+/gm, "");

    // B. Menerjemahkan Relasi (Relationship Linking)
    // Input  : relate a to Employee e;
    // Output : a.RelateTo(e);
    code = code.replace(
      /relate\s+([A-Za-z0-9_.]+)\s+to\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_.]+);/g,
      "$1.RelateTo($3);"
    );

    // C. Membatalkan Timer (Cancel Timer)
    // Input  : cancel pending timer Timeout for self;
    // Output : self.CancelTimer(Events.Timeout);
    code = code.replace(
      /cancel pending timer\s+([A-Za-z0-9_]+)\s+for\s+([A-Za-z0-9_.]+);/g,
      "$2.CancelTimer(Events.$1);"
    );

    return code;
  },
};
