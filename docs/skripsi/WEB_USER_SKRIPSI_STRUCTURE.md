# Struktur Bab Skripsi: Rancangan Antarmuka Website User

Dokumen ini menyajikan urutan rancangan antarmuka (User Interface) aplikasi **ParkFinder Web User** yang layak dimasukkan ke dalam dokumen skripsi pada **Bab Perancangan Antarmuka** dan **Bab Implementasi Antarmuka**.

---

## C. Rancangan Antarmuka Website User

Rancangan antarmuka di bawah ini diurutkan berdasarkan alur perjalanan pengguna (User Journey) dari pertama kali mengunjungi situs hingga menyelesaikan transaksi sesi parkir mereka.

### 1. Halaman Landing Page
*   **Deskripsi**: Halaman selamat datang publik yang menyajikan informasi umum platform, fitur unggulan, langkah-langkah penggunaan, statistik, dan ajakan bertindak (CTA).
*   **File Sumber Utama**: [LandingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/LandingPage.jsx)
*   **Komponen Pendukung**:
    *   `LandingHero` (Header utama + Model 3D mobil)
    *   `LandingStats` (Statistik dashboard)
    *   `LandingFeatures` (Grid fitur unggulan)
    *   `LandingSteps` (Panduan langkah penggunaan)
    *   `LandingDownloadCta` (Tautan unduh aplikasi mobile)
    *   `LandingFooter` (Kaki halaman)

### 2. Halaman Tentang Project (About Project)
*   **Deskripsi**: Menyajikan visi, misi, ruang lingkup project, serta profil pengembang sistem ParkFinder.
*   **File Sumber Utama**: [AboutProjectPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/AboutProjectPage.jsx)
*   **Komponen Pendukung**:
    *   `LandingNavbar` (Navigasi atas)
    *   `LandingFooter` (Kaki halaman)

### 3. Halaman Download Mobile
*   **Deskripsi**: Halaman khusus yang mempromosikan keuntungan menggunakan aplikasi mobile ParkFinder lengkap dengan tautan unduhan file paket aplikasi (APK).
*   **File Sumber Utama**: [DownloadMobilePage.jsx](file:///C:/programming/skripsi/web-user/src/pages/DownloadMobilePage.jsx)
*   **Komponen Pendukung**:
    *   `LandingDownloadCta` (Konten promosi)

### 4. Halaman Scan QR Code
*   **Deskripsi**: Antarmuka kamera pemindai (QR Reader) untuk memverifikasi keabsahan tiket fisik/digital tamu yang diperoleh dari pintu masuk gerbang parkir.
*   **File Sumber Utama**: [ScanPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/ScanPage.jsx)
*   **Komponen Pendukung**:
    *   `ScanHeader` (Header instruksi scan)
    *   `ScanBackground` (Background animasi halaman)
    *   `ScanFooterBack` (Tombol kembali)
    *   `Html5Qrcode` (Library pembaca kamera)

### 5. Halaman Cari Area Parkir
*   **Deskripsi**: Antarmuka untuk mencari dan menampilkan daftar gedung parkir yang dikelola sistem beserta kapasitas slot kosong dan jarak mock pengguna.
*   **File Sumber Utama**: [ParkingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/ParkingPage.jsx) (Kolom Sebelah Kiri)
*   **Komponen Pendukung**:
    *   `ParkingSearch` (Bilah pencarian gedung)
    *   `ParkingList` (Daftar gedung parkir)

### 6. Halaman Detail Area Parkir
*   **Deskripsi**: Panel visualisasi peta slot parkir per lantai setelah salah satu gedung parkir dipilih. Slot kosong digambarkan berwarna hijau dan slot terisi digambarkan berwarna merah.
*   **File Sumber Utama**: [ParkingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/ParkingPage.jsx) (Kolom Sebelah Kanan)
*   **Komponen Pendukung**:
    *   `ParkingSlotPanel` (Panel kontrol lantai & grid slot parkir)

### 7. Halaman Booking Slot
*   **Deskripsi**: Formulir ber-stepper tempat pengguna tamu memasukkan data pemesanan seperti Nama Lengkap, Nomor Plat Kendaraan, dan Nomor HP untuk mengamankan slot parkir yang telah dipilih.
*   **File Sumber Utama**: [BookingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/BookingPage.jsx)
*   **Komponen Pendukung**:
    *   `BookingStepper` (Langkah stepper proses booking)
    *   `BookingFormStep` (Formulir pengisian data diri tamu)
    *   `BookingConfirmStep` (Review detail ringkasan sebelum reservasi)
    *   `BookingSuccessStep` (Pemberitahuan booking berhasil dibuat)

### 8. Halaman Status Reservasi (Parkiran Aktif)
*   **Deskripsi**: Dasbor utama pengguna tamu untuk memantau status sesi parkir mereka. Menyediakan tombol konfirmasi interaktif: "Sudah Sampai" (ketika kendaraan tiba di slot) dan "Selesai Parkir" (untuk mengosongkan slot).
*   **File Sumber Utama**: [MyBookingPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/MyBookingPage.jsx)
*   **Komponen Pendukung**:
    *   `MyBookingHeader` (Header halaman)
    *   `MyBookingStats` (Statistik jumlah parkiran aktif tamu)
    *   `MyBookingFilters` (Bilah filter status aktif vs riwayat)
    *   `MyBookingList` (List kartu reservasi aktif & riwayat)
    *   `MyBookingEmptyState` (Tampilan jika belum ada transaksi)

### 9. Halaman Swap Slot (Tukar Slot)
*   **Deskripsi**: Antarmuka untuk memindahkan slot parkir aktif tamu ke slot kosong lain yang setipe dalam satu gedung parkir yang sama tanpa membatalkan tiket tamu.
*   **File Sumber Utama**: [SwapPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/SwapPage.jsx)
*   **Komponen Pendukung**:
    *   `SwapStepper` (Stepper pemindahan slot)
    *   `SwapSelectStep` (Pemilihan slot baru di lantai gedung)
    *   `SwapConfirmStep` (Perbandingan slot lama vs baru)
    *   `SwapSuccessStep` (Pemberitahuan sukses tukar slot)

### 10. Halaman Checkout (Keluar Parkir)
*   **Deskripsi**: Antarmuka konfirmasi akhir bagi pengguna tamu yang telah menyelesaikan parkir untuk mematikan sesi tiket sebelum keluar melalui pintu gerbang otomatis.
*   **File Sumber Utama**: [CheckoutPage.jsx](file:///C:/programming/skripsi/web-user/src/pages/CheckoutPage.jsx)
*   **Komponen Pendukung**:
    *   `CheckoutStepper` (Stepper checkout)
    *   `CheckoutConfirmStep` (Detail durasi parkir & tombol konfirmasi keluar)
    *   `CheckoutSuccessStep` (Ringkasan sukses checkout & waktu keluar)
