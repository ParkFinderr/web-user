# Diagram Navigasi Antarmuka (Navigation Diagram) — ParkFinder Web User

Dokumen ini memetakan diagram alur navigasi antarmuka (User Interface Navigation Flow) dari aplikasi **ParkFinder Web User**. Diagram ini dimodelkan menggunakan format **Mermaid Diagram** dan menggambarkan secara akurat perjalanan pengguna (User Journey) dari landing page hingga sesi parkir berakhir.

---

## Diagram Alur Navigasi

```mermaid
graph TD
    %% Halaman Utama / Publik
    Landing["Landing Page (/)"]
    About["Tentang Project (/tentang-project)"]
    Download["Download Mobile (/download-mobile)"]
    
    %% Alur Utama Guest
    Scan["Scan QR Code (/scan)"]
    Parking["Cari Area Parkir (/parking)"]
    Booking["Booking Slot (/booking)"]
    MyBooking["Status Reservasi (/my-booking)"]
    Swap["Swap Slot (/swap)"]
    Checkout["Checkout (/checkout)"]

    %% Hubungan Navigasi Publik
    Landing -->|"Menu Navbar"| About
    Landing -->|"Menu Navbar"| Download
    About -->|"Menu Navbar"| Landing
    Download -->|"Menu Navbar"| Landing
    
    %% Alur Masuk & Mulai Sesi
    Landing -->|"CTA: Cari & Booking"| Scan
    Scan -->|"Verifikasi Tiket Sukses (Simpan localStorage)"| Parking
    Scan -->|"Input Manual / Demo Fallback"| Parking
    
    %% Alur Pemilihan & Booking Parkir
    Parking -->|"Pilih Slot Kosong & Booking (Tiket Ada)"| Booking
    Parking -->|"Pilih Slot Kosong & Booking (Tiket Kosong)"| Scan
    
    %% Detail Stepper di Booking
    subgraph BookingPage [Halaman Booking - 3 Tahap]
        Form["Detail Booking (Form Data Tamu)"]
        Confirm["Konfirmasi Pemesanan"]
        Success["Pemesanan Sukses (Simpan Booking)"]
        Form -->|"Lanjut"| Confirm
        Confirm -->|"Submit API /reservations"| Success
    end
    
    Booking --> Form
    Success -->|"Lihat Sesi Aktif"| MyBooking
    Success -->|"Kembali Cari Parkir"| Parking

    %% Dasbor Sesi Parkir Aktif (My Booking Lifecycle)
    subgraph MyBookingPage [Dasbor Parkir Tamu - Siklus Hidup]
        Booked["Status: Booked (Reservasi Dibuat)"]
        Arrived["Status: Arrived (Kendaraan Tiba di Slot)"]
        Completed["Status: Completed (Slot Dikosongkan)"]
        
        Booked -->|"Aksi: 'Sudah Sampai' [API /arrive]"| Arrived
        Booked -->|"Aksi: 'Batalkan Reservasi' [API /cancel]"| Parking
        Arrived -->|"Aksi: 'Selesai Parkir' [API /complete]"| Completed
    end
    
    MyBooking --> Booked
    
    %% Alur Tukar Slot (Swap)
    Arrived -->|"Aksi: 'Swap Slot'"| Swap
    subgraph SwapPage [Halaman Swap Slot - 3 Tahap]
        SwapSelect["Pilih Slot Baru (Gedung Sama)"]
        SwapConfirm["Konfirmasi Tukar"]
        SwapSuccess["Tukar Sukses (Update Booking)"]
        
        SwapSelect -->|"Lanjut"| SwapConfirm
        SwapConfirm -->|"Submit API /swap"| SwapSuccess
    end
    Swap --> SwapSelect
    SwapSuccess -->|"Kembali ke Sesi Aktif"| MyBooking

    %% Alur Keluar (Checkout)
    Completed -->|"Aksi: 'Keluar Parkir'"| Checkout
    subgraph CheckoutPage [Halaman Checkout - 2 Tahap]
        OutConfirm["Konfirmasi Keluar Sesi"]
        OutSuccess["Checkout Berhasil (Hapus localStorage)"]
        
        OutConfirm -->|"Submit API /cancelTicket"| OutSuccess
    end
    Checkout --> OutConfirm
    OutSuccess -->|"Kembali ke Beranda"| Landing

    %% Styling Mermaid
    classDef page fill:#0d6efd,stroke:#fff,stroke-width:2px,color:#fff;
    classDef state fill:#198754,stroke:#fff,stroke-width:2px,color:#fff;
    class Landing,About,Download,Scan,Parking,Booking,MyBooking,Swap,Checkout page;
    class Booked,Arrived,Completed state;
```

---

## Penjelasan Alur Logika Navigasi

1.  **Akses Awal (Landing Area)**:
    Pengguna tamu masuk melalui `Landing Page (/)`. Pengguna dapat menjelajahi halaman informasi (`/tentang-project`) dan halaman download (`/download-mobile`). Untuk mulai memesan parkir, pengguna diarahkan memindai tiket terlebih dahulu di `/scan`.
2.  **Verifikasi Tiket (`/scan` ke `/parking`)**:
    Sesi parkir tamu membutuhkan tiket parkir fisik/digital dari gerbang. Di halaman `/scan`, kamera memverifikasi tiket dan menyimpan `guestSessionId` ke penyimpanan lokal (`localStorage`). Setelah sukses, pengguna otomatis dibawa ke `/parking`.
3.  **Reservasi Slot (`/parking` ke `/booking`)**:
    Di `/parking`, pengguna melihat slot kosong secara real-time. Setelah slot dipilih, jika tiket terdeteksi aktif, aplikasi mengarahkan ke `/booking` untuk pengisian data kendaraan tamu. Reservasi dibentuk setelah submit formulir konfirmasi ke backend.
4.  **Dasbor Kendaraan (`/my-booking`)**:
    Setelah booking sukses, pengguna diarahkan ke `/my-booking`. Di sini, siklus hidup parkir dikendalikan secara mandiri oleh pengguna tamu:
    *   **Booked**: Slot dipesan untuk plat kendaraan tamu. Begitu sampai di depan slot, tekan **Sudah Sampai** untuk mengubah status ke **Arrived**. Jika batal datang, tekan **Batalkan Reservasi** untuk melepas slot.
    *   **Arrived**: Kendaraan sedang parkir di dalam slot. Pengguna dapat memilih **Swap Slot** jika ingin pindah tempat, atau menekan **Selesai Parkir** ketika hendak pergi guna membebaskan slot di server.
    *   **Completed**: Kendaraan sudah keluar slot namun masih di area gedung. Pengguna diarahkan menekan **Keluar Parkir** untuk checkout tiket.
5.  **Checkout (`/checkout` ke `/`)**:
    Di `/checkout`, pengguna melakukan penonaktifan tiket parkir melalui gerbang keluar. Begitu dikonfirmasi, data tiket di localStorage dibersihkan, dan sesi tamu dinyatakan berakhir. Pengguna dikembalikan ke `/` (Landing Page).
