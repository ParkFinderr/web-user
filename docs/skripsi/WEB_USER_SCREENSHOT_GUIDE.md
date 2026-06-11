# Panduan Tangkapan Layar (Screenshot Guide) — ParkFinder Web User

Dokumen ini berfungsi sebagai panduan praktis bagi mahasiswa/peneliti dalam mengambil tangkapan layar (screenshot) antarmuka aplikasi **ParkFinder Web User** sebagai bahan ilustrasi pada Bab Implementasi Sistem di dalam dokumen skripsi.

---

## Daftar Halaman & Panduan Screenshot

### 1. Halaman Landing Page
*   **Route**: `/`
*   **File Sumber**: [LandingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/LandingPage.jsx)
*   **Fungsi Halaman**: Menampilkan profil singkat platform ParkFinder Smart Parking, fitur-fitur utama, langkah-langkah penggunaan bagi pengguna tamu, statistik operasional, dan tautan unduhan aplikasi mobile.
*   **Screenshot yang Harus Diambil**:
    1.  **Hero Section**: Bagian atas halaman yang menampilkan judul utama, ajakan bertindak (CTA) "Cari & Booking Slot", serta visualisasi model 3D mobil yang berputar secara dinamis.
    2.  **Section Fitur**: Bagian yang merinci fitur-fitur seperti real-time search, instant booking, dan QR Ticket.
    3.  **Section Langkah Penggunaan (Steps)**: Ilustrasi langkah demi langkah (01 Cari, 02 Pilih/Booking, 03 Scan & Masuk, 04 Selesai & Keluar).
    4.  **Section Statistik (Stats)**: Menampilkan jumlah gedung parkir, pengguna aktif, tingkat keberhasilan, dan ketersediaan layanan.
*   **Kondisi Data yang Diperlukan**:
    *   Koneksi internet aktif untuk memuat gambar logo/ikon.
    *   API Backend menyala agar fungsi statistik (`GuestService.getDashboardStats()` dan `GuestService.getAllAreas()`) dapat mengembalikan data ril untuk dirender. Jika API offline, sistem akan menampilkan data mock default (`6+` Gedung, `50K+` Pengguna, `99%` Keberhasilan).

### 2. Halaman Tentang Project (About Project)
*   **Route**: `/tentang-project`
*   **File Sumber**: [AboutProjectPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/AboutProjectPage.jsx)
*   **Fungsi Halaman**: Menyajikan deskripsi detail mengenai misi platform, ruang lingkup project, nilai-nilai utama, serta daftar tim pengembang.
*   **Screenshot yang Harus Diambil**:
    1.  **Informasi Misi & Nilai**: Tampilan kartu-kartu misi, ruang lingkup, dan nilai utama.
    2.  **Profil Developer**: Bagian bawah yang menampilkan kartu tim pengembang (Imam Ariadi, Backend Team, Product Team).
*   **Kondisi Data yang Diperlukan**:
    *   Data statis bawaan, tidak memerlukan interaksi database/API.

### 3. Halaman Unduh Aplikasi (Download Mobile)
*   **Route**: `/download-mobile`
*   **File Sumber**: [DownloadMobilePage.jsx](file:///C:/programming/skripsi/web-user/src/pages/DownloadMobilePage.jsx)
*   **Fungsi Halaman**: Memberikan promosi aplikasi seluler ParkFinder serta tombol tautan unduhan untuk melengkapi ekosistem parkir.
*   **Screenshot yang Harus Diambil**:
    1.  **Halaman Utama Unduh**: Tampilan detail promosi aplikasi mobile dan tombol tautan "Download App".
*   **Kondisi Data yang Diperlukan**:
    *   Data statis bawaan.

### 4. Halaman Scan QR Code (Scan Page)
*   **Route**: `/scan`
*   **File Sumber**: [ScanPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/ScanPage.jsx)
*   **Fungsi Halaman**: Memverifikasi tiket fisik atau digital tamu menggunakan kamera perangkat (QR Code) atau input kode manual agar sesi tamu aktif.
*   **Screenshot yang Harus Diambil**:
    1.  **Kondisi Awal (Minta Akses Kamera)**: Tampilan kotak pembaca kamera (`#qr-reader`) yang aktif dan kolom input manual kosong.
    2.  **Proses Memverifikasi**: Efek loading atau teks "Memverifikasi tiket..." saat kode sedang diperiksa ke backend.
    3.  **Verifikasi Sukses**: Notifikasi sukses berwarna hijau "✓ Tiket Terverifikasi!" sebelum halaman dialihkan.
    4.  **Verifikasi Gagal**: Pesan kesalahan berwarna merah di layar jika tiket tidak valid/ditemukan beserta opsi tombol "Force Activate" dan "Activate Locally (demo)".
*   **Kondisi Data yang Diperlukan**:
    *   Izin akses kamera (Camera Permission) diberikan pada browser.
    *   Untuk demo verifikasi sukses/gagal, Anda bisa menggunakan kode uji coba dari [web-user.md](file:///C:/programming/skripsi/web-user/web-user.md) (contoh: `PF-1778311898289-a9df7436`) atau menekan opsi "Activate Locally (demo)" untuk simulasi offline.

### 5. Halaman Cari Area Parkir (Parking Page)
*   **Route**: `/parking`
*   **File Sumber**: [ParkingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/ParkingPage.jsx)
*   **Fungsi Halaman**: Menampilkan daftar seluruh gedung parkir terdekat dan panel visualisasi peta slot interaktif berdasarkan lantai gedung yang dipilih.
*   **Screenshot yang Harus Diambil**:
    1.  **Daftar Gedung Parkir**: Sisi kiri antarmuka yang memuat nama gedung, alamat, keterisian persentase okupansi, dan label status (Tersedia/Ramai/Penuh).
    2.  **Panel Pemilihan Lantai & Slot**: Sisi kanan antarmuka yang muncul setelah gedung diklik. Menampilkan dropdown lantai (L1, L2, dst) dan denah slot berbentuk grid.
    3.  **Slot Terpilih**: Grid slot dengan slot yang sedang diklik (warna fokus biru) dan tombol "Booking Slot" aktif di bagian bawah.
*   **Kondisi Data yang Diperlukan**:
    *   API Backend aktif untuk memuat gedung (`GET /areas`) dan slot (`GET /areas/{id}/slots`).
    *   Setidaknya ada satu area parkir yang terdaftar di database dengan slot yang bertipe "available" (tersedia).

### 6. Halaman Form Booking (Booking Page)
*   **Route**: `/booking`
*   **File Sumber**: [BookingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/BookingPage.jsx)
*   **Fungsi Halaman**: Menampung data formulir pemesanan tamu (Nama, Plat Nomor, No HP) sebelum mengirimkan reservasi ke server.
*   **Screenshot yang Harus Diambil**:
    1.  **Langkah 1: Formulir Detail Booking**: Input Nama Pengguna, Nomor Kendaraan, dan Nomor Handphone beserta ringkasan slot parkir yang dipilih di bagian atas.
    2.  **Langkah 2: Konfirmasi Pemesanan**: Rincian review data sebelum disimpan ke server, tombol "Konfirmasi & Bayar" / "Konfirmasi Booking".
    3.  **Langkah 3: Tiket Sukses**: Halaman sukses yang menampilkan kode tiket/sesi tamu (disertai tombol pintasan: "Tukar Slot", "Selesai Parkir", "Parkiran Aktif").
*   **Kondisi Data yang Diperlukan**:
    *   Telah memilih slot parkir dari halaman `/parking` (data dikirim via router `state`).
    *   Sesi tiket tamu sudah terverifikasi (disimpan di `localStorage` `pf_guest_ticket`).

### 7. Halaman Riwayat & Sesi Aktif (My Booking Page)
*   **Route**: `/my-booking`
*   **File Sumber**: [MyBookingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/MyBookingPage.jsx)
*   **Fungsi Halaman**: Bertindak sebagai dasbor aktif tamu untuk memantau kendaraan, melakukan konfirmasi kedatangan di slot, mengakhiri parkir, serta melihat riwayat transaksi masa lalu.
*   **Screenshot yang Harus Diambil**:
    1.  **Booking Kosong (Empty State)**: Ilustrasi dan teks penjelas jika pengguna tamu belum melakukan reservasi apa pun.
    2.  **Status Booking Aktif (Sebelum Tiba)**: Menampilkan detail slot yang dipesan disertai tombol aksi: "Sudah Sampai" dan "Batalkan Reservasi".
    3.  **Status Tiba di Slot (Arrived)**: Tampilan setelah tombol "Sudah Sampai" ditekan. Tombol berubah menjadi "Selesai Parkir" dan "Swap Slot".
    4.  **Status Selesai Parkir (Completed)**: Tampilan setelah pengguna mengosongkan slot. Tombol aksi berubah menjadi "Keluar Parkir" (Checkout).
*   **Kondisi Data yang Diperlukan**:
    *   Data reservasi tersimpan di `localStorage` `pf_active_bookings`.

### 8. Halaman Pindah Slot (Swap Page)
*   **Route**: `/swap`
*   **File Sumber**: [SwapPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/SwapPage.jsx)
*   **Fungsi Halaman**: Mengubah alokasi slot parkir aktif tamu ke slot lain yang kosong di dalam gedung parkir yang sama.
*   **Screenshot yang Harus Diambil**:
    1.  **Langkah 1: Pemilihan Slot Baru**: Peta slot parkir yang menampilkan lantai saat ini dengan slot-slot kosong lain yang bisa dipilih.
    2.  **Langkah 2: Konfirmasi Tukar**: Rincian perbandingan antara slot lama (misal: A-01) dengan slot baru (misal: A-05).
    3.  **Langkah 3: Sukses Tukar**: Pesan berhasil beserta kode tiket swap yang baru.
*   **Kondisi Data yang Diperlukan**:
    *   Pengguna memiliki transaksi parkir aktif di localStorage dengan status belum selesai (`completed: false` dan `expired: false`).
    *   Data dikirim via router `state` dari halaman `/my-booking`.

### 9. Halaman Keluar Parkir (Checkout Page)
*   **Route**: `/checkout`
*   **File Sumber**: [CheckoutPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/CheckoutPage.jsx)
*   **Fungsi Halaman**: Menyelesaikan sesi tiket tamu saat hendak keluar dari gerbang keluar gedung parkir dengan mematikan hak akses tiket.
*   **Screenshot yang Harus Diambil**:
    1.  **Langkah 1: Konfirmasi Keluar**: Tampilan informasi tiket, durasi parkir, dan tombol "Konfirmasi Keluar".
    2.  **Langkah 2: Selesai Sesi**: Ringkasan transaksi keluar parkir, detail waktu checkout, dan tombol kembali "Ke Beranda".
*   **Kondisi Data yang Diperlukan**:
    *   Pengguna memiliki reservasi aktif di localStorage yang sudah berstatus selesai parkir (`completed: true`).
