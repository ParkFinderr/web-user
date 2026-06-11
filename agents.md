# Agen AI Guidelines — ParkFinder Web User

Dokumen ini berfungsi sebagai pedoman utama bagi setiap agen AI yang bekerja pada project **ParkFinder Web User**. Sebelum membaca tiket tugas, melakukan audit, atau memodifikasi kode, setiap agen **wajib** memahami dan mematuhi isi dokumen ini.

---

## 1. Deskripsi & Tujuan Project

Project **ParkFinder Web User** adalah aplikasi berbasis web yang dirancang khusus untuk memfasilitasi pengguna tamu (Guest) dalam melakukan pencarian slot parkir secara real-time, memesan (booking) slot parkir, mengonfirmasi kedatangan, memindahkan slot (swap), dan mengakhiri sesi parkir (checkout) melalui integrasi dengan sistem tiket QR Code.

Aplikasi ini bertujuan untuk memberikan pengalaman parkir yang efisien, transparan, dan tanpa hambatan bagi pengguna jalan yang tidak terdaftar di sistem utama, melengkapi ekosistem ParkFinder Smart Parking Platform.

---

## 2. Tech Stack

Aplikasi dibangun menggunakan teknologi modern berikut:
- **Core Library**: React (Vite)
- **Styling**: Vanilla CSS (menggunakan arsitektur custom di `src/styles/` dan React Bootstrap untuk komponen dasar)
- **Routing**: `react-router-dom` v6 (BrowserRouter)
- **State Management**: React Context API (`ThemeContext`) & Local Storage (`bookingStore`, `guestTicketStore`)
- **Utility & Libraries**: `html5-qrcode` (untuk scan QR Code), `react-bootstrap` (komponen UI)

---

## 3. Struktur Folder

Aplikasi memiliki struktur direktori sebagai berikut:
```text
web-user/
├── docs/                      # Dokumentasi project (analysis, updates, skripsi)
│   ├── analysis/              # Analisis arsitektur dan analisis teknis
│   ├── updates/               # Laporan update perubahan per task/tiket
│   └── skripsi/               # Catatan penelitian akademik/skripsi terkait
├── public/                    # Aset statis public
├── src/
│   ├── assets/                # Aset gambar/ikon lokal
│   ├── components/            # Komponen React reusable global
│   │   ├── 3d/                # Komponen model 3D (misal: CarModel3D)
│   │   └── pages/             # Komponen khusus yang terikat ke halaman tertentu
│   ├── context/               # React Context (State global seperti tema)
│   ├── pages/                 # Komponen Halaman (Router entrypoints)
│   ├── services/              # Integrasi API backend (`api.js`)
│   ├── styles/                # CSS styling file terorganisasi
│   └── utils/                 # Utility helpers dan client-side store (localStorage)
├── agents.md                  # Pedoman agen AI (Dokumen ini)
├── prompt.md                  # Workflow operasional agen AI
├── package.json               # Konfigurasi dependensi npm
└── vite.config.js             # Konfigurasi Vite bundler
```

---

## 4. Aturan Dokumentasi & Perubahan Kode

Seluruh proses pengembangan di dalam repository wajib mematuhi aturan berikut secara ketat:

### 4.1. Format Penomoran Task
Setiap tugas/tiket yang dikerjakan wajib memiliki nomor unik 4 digit (misal: `0001`, `0002`, `0003`, dst.). Seluruh dokumen analisis dan laporan update harus menyertakan nomor tugas tersebut sebagai prefix nama file.

### 4.2. Aturan Audit Sebelum Implementasi
*   **Wajib** melakukan audit menyeluruh terhadap kode, API, dan alur bisnis yang terdampak sebelum melakukan perubahan source code.
*   Buat file dokumentasi analisis di `docs/analysis/[xxxx]-task-name.md` jika perubahan bersifat struktural atau kompleks.

### 4.3. Aturan Sebelum Mengubah Source Code
*   **Dilarang keras** mengubah logika bisnis bawaan atau melakukan refactoring tanpa persetujuan eksplisit dari User.
*   Pertahankan integritas dokumentasi kode (komentar JSDoc, logger penting, error-handling bawaan).
*   Gunakan styling yang harmonis mengikuti variabel CSS yang ada di `src/styles/index.css`. Jangan menggunakan utility CSS ad-hoc jika tidak terpaksa.

### 4.4. Aturan Pembuatan Laporan Perubahan (Update Report)
Setiap selesai mengimplementasikan tugas, agen **wajib** membuat laporan di `docs/updates/[xxxx]-task-name.md` yang merinci:
- **Metadata**: Task ID, Tanggal, Penulis, Status
- **Ringkasan**: Apa yang diubah dan tujuannya
- **Daftar Perubahan**: File yang ditambah/diubah/dihapus
- **Hasil Pengujian**: Bukti build sukses atau tangkapan layar verifikasi UI
- **Status Akhir Project**: Menjelaskan apakah ada deviasi dari fungsionalitas sebelumnya.

---

## 5. Komitmen Terhadap Kualitas & Estetika
Aplikasi web ini mengedepankan kualitas visual yang premium.
- Gunakan transisi halus, micro-interaction pada hover state, dan dynamic rendering.
- Pastikan mode gelap (dark mode) dan mode terang (light mode) terintegrasi dengan baik dan konsisten di seluruh halaman baru yang dibuat.
- Selalu uji hasil perubahan dengan perintah build produksi (`npm run build`) untuk memastikan tidak ada kesalahan kompilasi.
