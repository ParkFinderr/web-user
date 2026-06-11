# Analisis Arsitektur Project & Pemetaan Fitur — ParkFinder Web User

Dokumen ini merangkum hasil audit teknis mendalam terhadap arsitektur project, struktur kode, pemetaan API, routing halaman, serta alur bisnis yang diimplementasikan pada aplikasi **ParkFinder Web User**.

---

## 1. Ringkasan Project

**ParkFinder Web User** merupakan bagian dari ekosistem ParkFinder Smart Parking Platform. Berbeda dengan aplikasi mobile utama yang ditujukan untuk pengguna terdaftar (dengan profil lengkap, manajemen kendaraan, dan saldo pembayaran), aplikasi Web User ini dirancang spesifik untuk memfasilitasi **Pengguna Tamu (Guest)**.

Aplikasi ini beroperasi tanpa sistem login/register tradisional di sisi client. Sebagai gantinya, identifikasi sesi didasarkan pada **Sesi Tamu (`guestSessionId`)** dan **ID Tiket (`ticketId`)** yang diperoleh melalui pemindaian QR Code tiket fisik/digital di gerbang parkir. Seluruh status pemesanan, tiket terverifikasi, dan informasi kendaraan disimpan langsung di penyimpanan lokal browser (**Local Storage**).

---

## 2. Struktur Project

Aplikasi ini menggunakan React yang dibundel dengan Vite. Struktur direktori utama adalah sebagai berikut:

- `src/main.jsx`: Entry point utama aplikasi yang merender komponen `App`.
- `src/App.jsx`: Konfigurasi Router (`react-router-dom`), penyedia tema (`ThemeProvider`), dan tata letak dinamis (`AppShell`).
- `src/context/ThemeContext.jsx`: Mengelola mode gelap, terang, dan preferensi sistem secara global.
- `src/services/api.js`: Lapisan integrasi backend menggunakan Fetch API. Berisi `GuestService` yang membungkus endpoint-endpoint API untuk tamu.
- `src/utils/`:
  - `bookingStore.js`: Menyimpan riwayat reservasi aktif di localStorage dengan key `pf_active_bookings`.
  - `guestTicketStore.js`: Menyimpan sesi tiket tamu hasil pemindaian di localStorage dengan key `pf_guest_ticket`.
- `src/pages/`: Berisi 9 file halaman yang merepresentasikan route aplikasi.
- `src/components/`:
  - `AppNavbar.jsx`: Navbar untuk halaman aplikasi utama (Cari Parkir, Scan Tiket, Parkiran Aktif).
  - `LandingNavbar.jsx`: Navbar minimalis untuk halaman promosi.
  - `HelpWidget.jsx`: Widget bantuan interaktif yang melayang di halaman aplikasi.
  - `GuestActiveTicketBar.jsx`: Bar notifikasi kecil yang melayang di atas jika terdapat tiket/reservasi aktif.
  - `pages/`: Sub-folder berisi komponen yang spesifik digunakan oleh halaman tertentu (memecah kompleksitas halaman).
  - `3d/CarModel3D.jsx`: Animasi visual 3D mobil menggunakan React Three Fiber / Three.js (digunakan pada `LandingHero`).

---

## 3. Routing & Daftar Halaman

Routing dikonfigurasi menggunakan `react-router-dom` di [App.jsx](file:///C:/programming/skripsi/web-user/src/App.jsx). Berikut adalah daftar route dan statusnya:

| No | Nama Halaman | Route | Tipe Navbar | Deskripsi / Fungsi Halaman | Status Sesi |
|---|---|---|---|---|---|
| 1 | `LandingPage` | `/` | `LandingNavbar` | Halaman promosi utama, statistik layanan, dan alur penggunaan. | Publik / Guest |
| 2 | `AboutProjectPage` | `/tentang-project` | `LandingNavbar` | Informasi tentang project ParkFinder dan tim pengembang. | Publik / Guest |
| 3 | `DownloadMobilePage` | `/download-mobile` | `LandingNavbar` | Halaman unduhan aplikasi mobile (mock). | Publik / Guest |
| 4 | `ScanPage` | `/scan` | `AppNavbar` | Scanner QR Code via kamera ponsel atau input manual untuk memverifikasi tiket tamu. | Wajib Tiket/QR |
| 5 | `ParkingPage` | `/parking` | `AppNavbar` | Mencari gedung parkir dan melihat visualisasi ketersediaan slot per lantai secara real-time. | Publik / Guest |
| 6 | `BookingPage` | `/booking` | `AppNavbar` | Formulir pemesanan slot parkir terpilih (mengisi Nama, Plat Nomor, dan Nomor Telepon). | Wajib Tiket |
| 7 | `SwapPage` | `/swap` | `AppNavbar` | Melakukan pemindahan slot parkir dalam gedung yang sama jika diperlukan. | Wajib Booking Aktif |
| 8 | `CheckoutPage` | `/checkout` | `AppNavbar` | Konfirmasi keluar dari area gedung parkir dan menonaktifkan tiket. | Wajib Selesai Parkir |
| 9 | `MyBookingPage` | `/my-booking` | `AppNavbar` | Dasbor pelacakan status parkir (Sudah Sampai, Selesai Parkir, Swap, Checkout). | Publik / Guest |

---

## 4. Integrasi API (Backend Endpoints)

Seluruh panggilan API dikonsolidasikan di [api.js](file:///C:/programming/skripsi/web-user/src/services/api.js).
Base URL backend yang digunakan adalah: `https://backend-api-services-173368161554.asia-southeast2.run.app`.

Berikut daftar endpoint API yang digunakan oleh aplikasi:

| Area Fitur | Endpoint | Method | Parameter/Payload | Fungsi |
|---|---|---|---|---|
| **Verifikasi** | `/access/verify` | `POST` | `{ qrCode: string }` | Memvalidasi QR Code tiket guest yang discan. |
| **Tiket Aktif** | `/access/activeTicket` | `GET` | Query `guestSessionId` | Mengambil status tiket aktif milik guest berdasarkan ID sesi. |
| **Batal Tiket** | `/access/cancelTicket` | `POST` | `{ ticketId, guestSessionId }` | Membatalkan tiket (digunakan saat checkout keluar dari area). |
| **Reservasi** | `/reservations` | `POST` | `{ ticketId, slotId, name, plateNumber }` | Membuat reservasi booking slot parkir untuk guest. |
| **Kedatangan** | `/reservations/{id}/arrive` | `PATCH` | - | Mengonfirmasi kedatangan pengguna tamu di slot parkir yang dipesan. |
| **Selesai Parkir** | `/reservations/{id}/complete` | `PATCH` | - | Mengosongkan slot parkir (sesi parkir selesai tapi belum keluar area). |
| **Pindah Slot** | `/reservations/{id}/swap` | `PATCH` | `{ newSlotId }` | Memindahkan reservasi ke slot lain di gedung yang sama. |
| **Batal Booking** | `/reservations/{id}/cancel` | `PATCH` | - | Membatalkan reservasi aktif (slot dilepas kembali). |
| **Area Parkir** | `/areas` | `GET` | - | Mengambil daftar gedung parkir yang terdaftar. |
| **Detail Area** | `/areas/{areaId}` | `GET` | - | Mengambil informasi spesifik suatu gedung parkir. |
| **Slot Parkir** | `/areas/{areaId}/slots` | `GET` | - | Mengambil ketersediaan slot per lantai di gedung parkir tersebut. |
| **Stats** | `/stats/dashboard` | `GET` | - | Mengambil statistik dashboard untuk ditampilkan di Landing Page. |

---

## 5. Alur Bisnis (Guest User Flow)

Alur operasional tamu di dalam web-user terbagi menjadi beberapa fase utama:

### 5.1. Scan QR Tiket (`/scan`)
1. Pengguna masuk ke halaman scan (baik langsung dari Landing Page atau saat ingin membooking tapi belum memiliki tiket).
2. Sistem menyalakan kamera depan/belakang menggunakan library `html5-qrcode`.
3. Setelah QR Code terbaca (atau kode diinput manual), sistem mengirimkan request ke `POST /access/verify` dengan payload `{ qrCode }`.
4. Jika sukses:
   - Sesi tiket disimpan ke localStorage `pf_guest_ticket` lewat helper `saveVerifiedTicketFromApi`.
   - Pengguna dialihkan ke halaman Cari Parkir (`/parking`) dengan state tiket.

### 5.2. Pencarian & Pemilihan Slot (`/parking`)
1. Halaman `/parking` memuat seluruh area parkir aktif dari `GET /areas`.
2. Pengguna memilih salah satu gedung parkir yang statusnya belum penuh.
3. Aplikasi memanggil `GET /areas/{areaId}/slots` untuk menampilkan panel ketersediaan slot visual per lantai.
4. Pengguna memilih slot kosong (berwarna hijau) dan menekan "Booking Slot".
5. Jika data tiket di localStorage kosong, sistem mengarahkan pengguna ke `/scan` terlebih dahulu. Jika tiket ada, pengguna dialihkan ke halaman formulir booking (`/booking`).

### 5.3. Pemesanan Slot (`/booking`)
1. Pengguna mengisi data tamu: **Nama**, **Nomor Kendaraan (Plat)**, dan **Nomor Handphone**.
2. Pada tahap konfirmasi, sistem memvalidasi kelayakan parameter lalu menembak `POST /reservations` berisi `{ ticketId, slotId, name, plateNumber }`.
3. Jika backend merespon sukses:
   - Detail reservasi disimpan ke localStorage `pf_active_bookings` menggunakan helper `saveBooking`.
   - Pengguna diarahkan ke step sukses dan disarankan membuka dasbor status parkir (`/my-booking`).

### 5.4. Siklus Hidup Parkir tamunya (`/my-booking`)
Dari halaman dasbor, pengguna dapat mengontrol status kendaraan tamu mereka:
1. **Konfirmasi Kedatangan**: Pengguna menekan tombol "Sudah Sampai" -> memicu `PATCH /reservations/{id}/arrive` -> status di lokal diubah menjadi `arrived`.
2. **Pindah Slot (Swap)**: Jika slot terhalang atau ingin pindah, pengguna menekan "Swap Slot" -> diarahkan ke `/swap` -> memilih slot baru di gedung yang sama -> memicu `PATCH /reservations/{id}/swap` -> data tiket baru diperbarui di penyimpanan lokal.
3. **Selesai Parkir (Complete)**: Saat ingin meninggalkan slot, pengguna menekan "Selesai Parkir" -> memicu `PATCH /reservations/{id}/complete` -> status di lokal menjadi `completed` dan slot kembali tersedia untuk orang lain.
4. **Keluar Area Gedung (Checkout)**: Dari status `completed`, pengguna menekan "Keluar Parkir" -> diarahkan ke `/checkout` -> menekan konfirmasi keluar -> memicu `POST /access/cancelTicket` -> menghapus tiket hasil scan dari localStorage (`pf_guest_ticket`) dan menandai reservasi lokal sebagai expired/selesai.

---

## 6. Temuan Awal & Technical Debt

Berdasarkan analisis file source code, ditemukan beberapa poin penting:

*   **Pemisahan Alur Guest dan User Utama**: Sesuai dengan spesifikasi, kode client di project ini sepenuhnya berfokus pada alur **Guest** (Tamu). Halaman login (`/auth/login`), pendaftaran (`/auth/register`), manajemen profil (`/users/profile`), dan manajemen kendaraan terdaftar (`/users/vehicles`) yang ada di dokumentasi `api.md` tidak diimplementasikan secara visual di web-user ini. Alur guest murni memanfaatkan `guestSessionId` dan menyimpan data di localStorage.
*   **Keamanan Penyimpanan Lokal**: Penggunaan localStorage (`pf_active_bookings` dan `pf_guest_ticket`) sangat penting dalam aplikasi ini. Jika browser membersihkan cache atau pengguna menggunakan mode Incognito, riwayat reservasi aktif pengguna akan hilang dari UI client, meskipun status di backend tetap berjalan.
*   **Depresiasi Kode (Technical Debt)**:
  - Terdapat fungsi `@deprecated completeBooking` pada `bookingStore.js` yang masih tersisa, namun sistem sudah beralih menggunakan kombinasi fungsi `markParkingCompleted` dan `exitParking` untuk memisahkan fase pengosongan slot (complete) dan keluar gedung (checkout).
  - Terdapat endpoint mock local demo fallback (`handleLocalActivate` di `ScanPage.jsx`) yang memungkinkan verifikasi secara lokal tanpa server jika backend mati. Fitur ini sangat membantu untuk demo skripsi atau testing UI offline.
