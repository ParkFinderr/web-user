# Workflow & Instruksi Operasional Agen AI

Dokumen ini mendefinisikan alur kerja (workflow) wajib bagi setiap agen AI yang berinteraksi dengan codebase ParkFinder Web User. Seluruh instruksi di bawah ini bersifat mengikat demi menjaga kualitas kode dan konsistensi dokumentasi.

---

## Alur Kerja Langkah Demi Langkah

Setiap kali Anda menerima perintah atau tiket tugas baru, Anda **wajib** mengikuti 6 langkah berikut secara berurutan:

### Langkah 1: Membaca Pedoman Project (`agents.md`)
Sebelum melakukan tindakan apa pun (termasuk riset mendalam), baca file [agents.md](file:///C:/programming/skripsi/web-user/agents.md) untuk memahami arsitektur umum, tech stack, batasan modifikasi kode, dan aturan dokumentasi.

### Langkah 2: Membaca Seluruh Update Sebelumnya
Periksa riwayat perubahan di folder `docs/updates/` secara berurutan (dari `0001` hingga update terbaru) untuk menghindari tumpang tindih implementasi dan memahami kondisi terkini dari sistem.

### Langkah 3: Melakukan Audit Sebelum Implementasi
*   Identifikasi file mana saja yang akan terdampak perubahan.
*   Periksa API endpoint yang dipanggil di `src/services/api.js`.
*   Petakan alur data state dan local storage yang bersangkutan.
*   Jika perubahan cukup kompleks, buat rencana/analisis teknis baru di folder `docs/analysis/`.

### Langkah 4: Implementasi & Pemeliharaan Logika Bisnis
*   Lakukan perubahan kode secara hati-hati.
*   Pelihara komentar bawaan, Logger, dan penanganan kesalahan (error boundary).
*   Gunakan variabel CSS global dari sistem styling bawaan.
*   *Jangan mengubah fungsionalitas di luar cakupan tiket kecuali diminta.*

### Langkah 5: Menjalankan Build Verification
Sebelum mengakhiri turn atau menyatakan tugas selesai:
1. Pastikan kode tidak merusak alur aplikasi yang sudah ada.
2. Jalankan build produksi secara lokal menggunakan command line (`npm run build`) untuk memverifikasi tidak ada error typescript/linting/bundler.

### Langkah 6: Mendokumentasikan Perubahan (Update Report)
Buat atau perbarui file update report di `docs/updates/[xxxx]-task-name.md` (di mana `[xxxx]` adalah ID tugas 4 digit). Dokumentasikan daftar file yang berubah, ringkasan perbaikan, dan status terkini aplikasi setelah perubahan dilakukan.

---

## Template Prompt Singkat untuk AI Baru

> "Saya adalah agen AI ParkFinder. Tugas pertama saya sebelum menyentuh kode adalah membaca [agents.md](file:///C:/programming/skripsi/web-user/agents.md), memeriksa riwayat di `docs/updates/`, dan memetakan arsitektur yang terdampak. Saya akan mematuhi seluruh panduan dokumentasi dan menjaga logika bisnis bawaan project tetap utuh."
