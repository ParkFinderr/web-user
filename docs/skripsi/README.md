# Dokumentasi Skripsi — ParkFinder Web User Guest

Folder ini berisi seluruh dokumen pendukung, panduan visual, diagram alur, dan pemetaan komponen aplikasi **ParkFinder Web User** yang dirancang khusus untuk mempermudah penyusunan dokumen skripsi (khususnya Bab III Perancangan Sistem dan Bab IV Implementasi & Pengujian).

---

## 1. Ringkasan Web User Guest

**ParkFinder Web User** adalah modul aplikasi berbasis web dalam ekosistem ParkFinder Smart Parking Platform. Aplikasi ini dikembangkan khusus untuk memfasilitasi **Pengguna Tamu (Guest)** secara instan tanpa perlu mendaftar akun atau login. 

Identifikasi transaksi dan pelacakan sesi parkir dilakukan menggunakan kombinasi pemindaian QR Code tiket fisik/digital dari gerbang masuk gedung dan penyimpanan state client-side terenkripsi menggunakan penyimpanan lokal browser (`localStorage`). Pengguna tamu dapat memantau status secara mandiri mulai dari reservasi slot, memicu kedatangan di slot, pindah slot, hingga mengosongkan slot dan menyelesaikan sesi tiket (checkout).

---

## 2. Metrik Utama Aplikasi

*   **Jumlah Halaman**: **9 Halaman** (Landing, Tentang Project, Download Mobile, Scan QR, Cari Parkir, Booking, Swap Slot, Checkout, dan Riwayat Aktif).
*   **Jumlah Route**: **9 Route Utama** (diatur melalui `react-router-dom` v6) dan 1 wild-card route redirect.
*   **Jumlah Endpoint API Terhubung**: **13 Endpoint Utama** (dikelola lewat `GuestService` di `src/services/api.js`).

---

## 3. Daftar Dokumen Skripsi yang Tersedia

Berikut adalah daftar dokumen panduan yang dapat langsung dimanfaatkan untuk menyusun laporan skripsi:

1.  **[WEB_USER_SCREENSHOT_GUIDE.md](file:///C:/programming/skripsi/web-user/docs/skripsi/WEB_USER_SCREENSHOT_GUIDE.md)**: Panduan detail pengambilan gambar untuk 9 halaman beserta kondisi data ril/mock yang dibutuhkan.
2.  **[WEB_USER_SKRIPSI_STRUCTURE.md](file:///C:/programming/skripsi/web-user/docs/skripsi/WEB_USER_SKRIPSI_STRUCTURE.md)**: Rancangan urutan 10 antarmuka logis untuk Bab Perancangan & Implementasi.
3.  **[WEB_USER_NAVIGATION.md](file:///C:/programming/skripsi/web-user/docs/skripsi/WEB_USER_NAVIGATION.md)**: Diagram Navigasi Antarmuka berbasis Mermaid Diagram dari Landing hingga Checkout selesai.
4.  **[WEB_USER_COMPONENTS.md](file:///C:/programming/skripsi/web-user/docs/skripsi/WEB_USER_COMPONENTS.md)**: Inventarisasi dan penjelasan detail 8 komponen React utama & global yang layak dibahas di skripsi.
5.  **[WEB_USER_SCREENSHOT_MAPPING.md](file:///C:/programming/skripsi/web-user/docs/skripsi/WEB_USER_SCREENSHOT_MAPPING.md)**: Pemetaan berurutan 21 file gambar screenshot terhadap sub-bab Bab IV Skripsi.

---

## 4. Cara Mengambil Tangkapan Layar (Screenshot)

Untuk mendapatkan tangkapan layar yang rapi, profesional, dan representatif, ikuti langkah-langkah berikut:

1.  **Gunakan Mode Responsif Mobile**:
    *   Buka aplikasi di browser Google Chrome / Microsoft Edge (`http://localhost:5173`).
    *   Tekan tombol `F12` untuk membuka Developer Tools.
    *   Klik ikon **Toggle Device Toolbar** (atau tekan `Ctrl + Shift + M`).
    *   Pilih perangkat simulasi yang diinginkan (contoh: **iPhone 12 Pro** atau **Pixel 7**).
2.  **Gunakan Fitur Mock Offline (Demo) Jika API Offline**:
    *   Pada halaman verifikasi `/scan`, masukkan kode secara acak lalu klik "Cek". Jika backend gagal terhubung, klik tombol **Activate Locally (demo)** untuk mengaktifkan sesi tiket secara lokal guna memuluskan pengambilan screenshot halaman pemesanan.
3.  **Pengambilan Gambar**:
    *   Gunakan alat bawaan Windows: `Windows Key + Shift + S` (Snipping Tool).
    *   Simpan gambar ke format `.png` dengan penamaan file yang rapi sesuai panduan [WEB_USER_SCREENSHOT_MAPPING.md](file:///C:/programming/skripsi/web-user/docs/skripsi/WEB_USER_SCREENSHOT_MAPPING.md).

---

## 5. Urutan Screenshot yang Direkomendasikan

Untuk mempermudah penulisan alur cerita sistem (System Walkthrough) di skripsi, ambil screenshot secara berurutan sebagai berikut:

```text
Landing Page Hero -> Landing Page Stats -> Halaman Scan QR (Kondisi Scan) -> Scan Sukses -> Cari Area Parkir ->
Pilih Slot Kosong -> Isi Formulir Booking -> Konfirmasi Booking -> Sukses Reservasi -> Dasbor Parkiran Aktif (Booked) ->
Konfirmasi Tiba (Arrived) -> Swap Slot -> Sukses Swap Slot -> Selesai Parkir (Completed) -> Konfirmasi Checkout -> Selesai
```
Urutan ini akan menghasilkan bab dokumentasi implementasi sistem yang mengalir dengan runtut bagi pembaca dan dosen penguji.
