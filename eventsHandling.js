const EventCompiler = {
  /**
   * Menerjemahkan string kode OAL menjadi syntax C#.
   * * @param {string} oalCode - Blok kode mentah dalam format OAL.
   * @returns {string} - Kode hasil terjemahan dalam format C#.
   */
  compileAction: function (oalCode) {
    // Validasi: Jika tidak ada kode aksi, kembalikan komentar kosong.
    if (!oalCode) return "// Tidak ada action code didefinisikan.";

    let code = oalCode;

    // =====================================================================
    // 1. INSTANCE CREATION (Instansiasi Objek)
    // =====================================================================
    // Mengubah syntax pembuatan objek OAL menjadi konstruktor C#.
    //
    // Input  : create Attendance a;
    // Output : var a = new Attendance();
    // ---------------------------------------------------------------------
    code = code.replace(
      /create\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_]+);/g,
      "var $2 = new $1();"
    );

    // =====================================================================
    // 2. ACCESSING EVENT DATA (Akses Parameter Event)
    // =====================================================================
    // Mengubah keyword 'rcvd_evt' (OAL) menjadi objek 'eventArgs' (C#).
    // Ini digunakan untuk membaca data yang dikirim bersama event.
    //
    // Input  : rcvd_evt.transaction_id
    // Output : eventArgs.transaction_id
    // ---------------------------------------------------------------------
    code = code.replace(/\brcvd_evt\.([a-zA-Z0-9_]+)\b/g, "eventArgs.$1");

    // =====================================================================
    // 3. GENERATING EVENTS (Pengiriman Sinyal Event)
    // =====================================================================

    // ---------------------------------------------------------------------
    // A. Delayed Event (Timer)
    // Menangani pengiriman event yang tertunda (menggunakan 'after').
    //
    // Input  : send schedule_end_passed to a after (s.end_time + 30);
    // Output : a.GenerateEventDelayed(new Events.schedule_end_passed(), (s.end_time + 30));
    // ---------------------------------------------------------------------
    const regexSendTimer =
      /send\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+)\s+after\s+\((.*?)\);/g;

    code = code.replace(regexSendTimer, (match, evtName, target, time) => {
      // $1: Nama Event, $2: Target Objek, $3: Durasi/Waktu
      return `${target}.GenerateEventDelayed(new Events.${evtName}(), ${time});`;
    });

    // ---------------------------------------------------------------------
    // B. Immediate Event (Sinyal Langsung)
    // Menangani pengiriman event yang dieksekusi segera.
    //
    // Input  : send EmailSent to Notification;
    // Output : Notification.GenerateEvent(new Events.EmailSent());
    // ---------------------------------------------------------------------
    const regexSend = /send\s+([A-Za-z0-9_]+)\s+to\s+([A-Za-z0-9_.]+);/g;

    code = code.replace(regexSend, (match, evtName, target) => {
      // $1: Nama Event, $2: Target Objek
      return `${target}.GenerateEvent(new Events.${evtName}());`;
    });

    // =====================================================================
    // 4. ATRIBUT & LOGIKA LAINNYA
    // =====================================================================

    // ---------------------------------------------------------------------
    // Assignment (Penetapan Nilai)
    // OAL menggunakan kata kunci 'set' untuk variabel, C# tidak.
    //
    // Input  : set a.status = "Pending";
    // Output : a.status = "Pending";
    // ---------------------------------------------------------------------
    code = code.replace(/^\s*set\s+/gm, "");

    // ---------------------------------------------------------------------
    // Relationship Linking (Relasi)
    // Mengubah perintah 'relate' menjadi pemanggilan method helper di C#.
    //
    // Input  : relate a to Employee e;
    // Output : a.RelateTo(e);
    // ---------------------------------------------------------------------
    code = code.replace(
      /relate\s+([A-Za-z0-9_.]+)\s+to\s+([A-Za-z0-9_]+)\s+([A-Za-z0-9_.]+);/g,
      "$1.RelateTo($3);"
    );

    // ---------------------------------------------------------------------
    // Cancel Timer
    // Menghentikan timer yang sedang berjalan berdasarkan tipe event.
    //
    // Input  : cancel pending timer schedule_end_passed for a;
    // Output : a.CancelTimer(Events.schedule_end_passed);
    // ---------------------------------------------------------------------
    code = code.replace(
      /cancel pending timer\s+([A-Za-z0-9_]+)\s+for\s+([A-Za-z0-9_.]+);/g,
      "$2.CancelTimer(Events.$1);"
    );

    return code;
  },
};
