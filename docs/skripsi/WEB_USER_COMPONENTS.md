# Inventarisasi Komponen Aplikasi (React Components Inventory) — ParkFinder Web User

Dokumen ini mendata komponen-komponen React ( reusable & global components) yang diimplementasikan pada project **ParkFinder Web User**. Informasi ini sangat penting untuk menyusun sub-bab **Implementasi Komponen Perangkat Lunak** pada Bab IV Skripsi.

---

## Daftar Komponen Utama & Global

### 1. AppNavbar
*   **Fungsi**: Bilah navigasi atas (navigation bar) utama yang digunakan pada halaman aplikasi. Memiliki fitur pendeteksi scroll (merubah opacity navbar), tombol pintas "Cari Parkir", pemilih tema (Light/Dark/System), serta badge dinamis yang melacak jumlah reservasi aktif tamu yang sedang berjalan secara real-time.
*   **Lokasi File**: [AppNavbar.jsx](file:///C:/programming/skripsi/web-user/src/components/AppNavbar.jsx)
*   **Halaman yang Menggunakan**:
    *   `/scan` (ScanPage)
    *   `/parking` (ParkingPage)
    *   `/booking` (BookingPage)
    *   `/swap` (SwapPage)
    *   `/checkout` (CheckoutPage)
    *   `/my-booking` (MyBookingPage)

### 2. LandingNavbar
*   **Fungsi**: Bilah navigasi atas minimalis khusus untuk area promosi. Menyediakan tautan cepat ke Landing Page, Tentang Project, Download Mobile, dan tombol pintas cepat menuju aplikasi utama.
*   **Lokasi File**: [LandingNavbar.jsx](file:///C:/programming/skripsi/web-user/src/components/LandingNavbar.jsx)
*   **Halaman yang Menggunakan**:
    *   `/` (LandingPage)
    *   `/tentang-project` (AboutProjectPage)
    *   `/download-mobile` (DownloadMobilePage)

### 3. HelpWidget
*   **Fungsi**: Widget bantuan mengambang (floating helper widget) yang terletak di pojok kanan bawah layar aplikasi. Ketika diklik, ia membuka panel interaktif berisi panduan FAQ terstruktur mengenai alur scan tiket, cara mem-booking slot, metode swap slot, serta cara mengakhiri sesi parkir bagi pengguna tamu (Guest).
*   **Lokasi File**: [HelpWidget.jsx](file:///C:/programming/skripsi/web-user/src/components/HelpWidget.jsx)
*   **Halaman yang Menggunakan**:
    *   Seluruh halaman aplikasi utama (`/scan`, `/parking`, `/booking`, `/swap`, `/checkout`, `/my-booking`). Tidak dirender pada marketing pages untuk menjaga estetika promosi.

### 4. GuestActiveTicketBar
*   **Fungsi**: Bar notifikasi melayang (floating alert bar) di bagian atas halaman yang mendeteksi jika pengguna tamu memiliki sesi tiket terverifikasi (`pf_guest_ticket`) atau booking aktif di localStorage. Memberikan kemudahan bagi tamu untuk langsung melompat ke halaman `/parking` atau `/my-booking` tanpa perlu melakukan scan ulang.
*   **Lokasi File**: [GuestActiveTicketBar.jsx](file:///C:/programming/skripsi/web-user/src/components/GuestActiveTicketBar.jsx)
*   **Halaman yang Menggunakan**:
    *   `/parking` (ParkingPage)
    *   `/booking` (BookingPage - Step 1 & 2)

### 5. CarModel3D
*   **Fungsi**: Komponen visualisasi 3D interaktif yang merender model mobil sport berputar lambat dengan bayangan dan pencahayaan studio. Menggunakan integrasi WebGL melalui Three.js dan React Three Fiber untuk menciptakan tampilan modern dan premium.
*   **Lokasi File**: [CarModel3D.jsx](file:///C:/programming/skripsi/web-user/src/components/3d/CarModel3D.jsx)
*   **Halaman yang Menggunakan**:
    *   `/` (LandingPage - Bagian Hero banner kanan pada resolusi desktop)

---

## Komponen Pendukung Halaman (Page-Specific Components)

Berikut adalah komponen fungsional penting yang dipecah dari file halaman utama untuk memudahkan pembacaan kode:

### 6. ParkingSlotPanel
*   **Fungsi**: Panel visualisasi grid layout slot parkir per lantai. Memproses data array slot dari backend untuk memetakan ketersediaan warna slot (Hijau untuk `available`, Merah untuk `occupied/booked`), memproses pemilihan slot, serta menginisiasi tombol aksi pemesanan.
*   **Lokasi File**: [ParkingSlotPanel.jsx](file:///C:/programming/skripsi/web-user/src/components/pages/ParkingPage/ParkingSlotPanel.jsx)
*   **Halaman yang Menggunakan**:
    *   `/parking` (ParkingPage - Sisi Kanan)

### 7. MyBookingList
*   **Fungsi**: Merender daftar kartu (cards) reservasi parkir milik tamu yang aktif. Mengontrol rendering bersyarat untuk tombol-tombol aksi dinamis berdasarkan status siklus hidup parkir (`arrived`, `completed`, `expired`).
*   **Lokasi File**: [MyBookingList.jsx](file:///C:/programming/skripsi/web-user/src/components/pages/MyBookingPage/MyBookingList.jsx)
*   **Halaman yang Menggunakan**:
    *   `/my-booking` (MyBookingPage)

### 8. BookingFormStep & BookingConfirmStep
*   **Fungsi**:
    *   `BookingFormStep`: Menyajikan input data formulir (Nama, Plat, HP) lengkap dengan visualisasi validasi error input.
    *   `BookingConfirmStep`: Menyajikan ringkasan visual data pemesanan gedung, lantai, slot, serta data kendaraan tamu sebelum menembak API pemesanan.
*   **Lokasi File**: [BookingFormStep.jsx](file:///C:/programming/skripsi/web-user/src/components/pages/BookingPage/BookingFormStep.jsx) & [BookingConfirmStep.jsx](file:///C:/programming/skripsi/web-user/src/components/pages/BookingPage/BookingConfirmStep.jsx)
*   **Halaman yang Menggunakan**:
    *   `/booking` (BookingPage - Step 0 dan Step 1)
