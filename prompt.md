Saya ingin Anda melakukan analisis dan refactoring arsitektur frontend web pada project ini menjadi **Hybrid Feature-Based and Component-Based Architecture**.

Project menggunakan:

* React.js
* Vite
* Tailwind CSS
* React Router
* REST API

## Tujuan Utama

Ubah struktur frontend agar organisasi kode berpusat pada **fitur (feature-based)**, tetapi implementasi setiap fitur tetap menggunakan pendekatan **component-based architecture**.

Arsitektur harus membedakan secara jelas dua jenis komponen:

1. **Private Feature Components**
   Komponen yang hanya digunakan oleh satu fitur tertentu dan tidak boleh diletakkan pada direktori shared/global.

2. **Reusable / Shared Components**
   Komponen generik yang benar-benar digunakan oleh lebih dari satu fitur dan tidak memiliki ketergantungan kuat terhadap domain atau business logic fitur tertentu.

Jangan memindahkan semua komponen ke folder `components` global. Lokasi komponen harus mengikuti scope penggunaannya.

---

# Prinsip Arsitektur

Gunakan prinsip berikut:

## 1. Feature-Based Organization

Setiap fitur utama aplikasi harus memiliki direktori sendiri di dalam:

`src/features/`

Contoh:

```text
src/
├── app/
├── features/
├── shared/
├── assets/
└── main.jsx
```

Setiap fitur dapat memiliki struktur internal seperti:

```text
features/
└── booking/
    ├── pages/
    ├── components/
    ├── services/
    ├── hooks/
    ├── utils/
    └── index.js
```

Tidak semua folder wajib dibuat. Buat hanya jika memang diperlukan oleh fitur tersebut.

---

## 2. Private Feature Components

Komponen yang hanya digunakan dalam satu fitur harus berada di dalam:

```text
features/<feature-name>/components/
```

Contoh:

```text
features/
└── booking/
    ├── pages/
    │   ├── BookingPage.jsx
    │   └── BookingDetailPage.jsx
    │
    ├── components/
    │   ├── SlotCard.jsx
    │   ├── BookingSummary.jsx
    │   ├── FloorSelector.jsx
    │   └── ParkingMap.jsx
    │
    └── services/
        └── bookingService.js
```

`SlotCard`, `BookingSummary`, `FloorSelector`, dan `ParkingMap` merupakan **private feature components** karena hanya memiliki konteks dan kegunaan dalam fitur booking.

Komponen tersebut tidak boleh dipindahkan ke `shared/components` hanya karena berbentuk komponen React.

---

## 3. Reusable / Shared Components

Komponen yang digunakan oleh beberapa fitur dan bersifat generik harus ditempatkan pada:

```text
src/shared/components/
```

Contoh:

```text
shared/
├── components/
│   ├── Button/
│   ├── Modal/
│   ├── LoadingSpinner/
│   ├── EmptyState/
│   ├── ErrorMessage/
│   └── Navbar/
│
├── hooks/
├── services/
├── utils/
└── constants/
```

Sebuah komponen hanya boleh menjadi shared component apabila:

* digunakan oleh lebih dari satu fitur;
* tidak mengandung business logic spesifik dari satu fitur;
* dapat digunakan kembali tanpa bergantung pada struktur internal suatu fitur;
* memiliki API berbasis props yang cukup generik.

Jangan melakukan premature abstraction.

Jika sebuah komponen saat ini hanya digunakan oleh satu fitur, pertahankan sebagai private feature component sampai terdapat kebutuhan nyata untuk digunakan oleh fitur lain.

---

# Aturan Dependency

Gunakan arah dependency berikut:

```text
app
 ↓
features
 ↓
shared
```

Aturan:

* `app` boleh mengimpor dari `features` dan `shared`.
* `features` boleh mengimpor dari `shared`.
* satu fitur sebisa mungkin tidak mengakses struktur internal fitur lain secara langsung;
* `shared` tidak boleh mengimpor dari `features`;
* komponen private suatu fitur tidak boleh diimpor langsung oleh fitur lain.

Jika suatu fungsi atau komponen memang dibutuhkan oleh beberapa fitur, evaluasi terlebih dahulu apakah layak dipindahkan menjadi shared abstraction.

---

# Struktur Target

Gunakan struktur berikut sebagai acuan, tetapi sesuaikan dengan kebutuhan aktual project:

```text
src/
├── app/
│   ├── router/
│   │   └── AppRouter.jsx
│   ├── layouts/
│   └── App.jsx
│
├── features/
│   ├── authentication/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   │
│   ├── parking/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   │
│   ├── booking/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   │
│   └── ticket/
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── hooks/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── constants/
│
├── assets/
├── main.jsx
└── index.css
```

Nama fitur harus mengikuti domain dan fitur yang benar-benar terdapat pada project. Jangan membuat fitur berdasarkan contoh di atas apabila fitur tersebut tidak ada dalam project.

---

# Service dan REST API

Service yang hanya digunakan oleh satu fitur harus berada di dalam fitur tersebut.

Contoh:

```text
features/
└── booking/
    └── services/
        └── bookingService.js
```

Service generik yang digunakan oleh seluruh aplikasi dapat ditempatkan pada:

```text
shared/
└── services/
    └── apiClient.js
```

Contoh pembagian tanggung jawab:

```text
shared/services/apiClient.js
```

bertanggung jawab terhadap konfigurasi komunikasi HTTP secara umum.

Sedangkan:

```text
features/booking/services/bookingService.js
```

bertanggung jawab terhadap endpoint dan operasi yang spesifik terhadap fitur booking.

Jangan mencampurkan seluruh request API dari semua domain ke dalam satu file service yang sangat besar.

---

# Pages dan Components

Gunakan aturan berikut:

### Page

Komponen tingkat halaman yang terhubung dengan routing.

```text
features/booking/pages/BookingPage.jsx
```

### Private Feature Component

Komponen yang menjadi bagian internal suatu fitur.

```text
features/booking/components/SlotCard.jsx
```

### Shared Component

Komponen generik yang digunakan oleh beberapa fitur.

```text
shared/components/Button/Button.jsx
```

Jangan mengategorikan semua file JSX sebagai shared component.

---

# Tugas yang Harus Dilakukan

Lakukan pekerjaan dengan urutan berikut:

## Tahap 1 — Audit

Analisis seluruh struktur project saat ini.

Identifikasi:

* seluruh halaman;
* seluruh komponen;
* seluruh fitur/domain;
* seluruh service API;
* hooks;
* utility;
* konfigurasi routing;
* komponen yang digunakan hanya oleh satu fitur;
* komponen yang digunakan oleh beberapa fitur;
* duplikasi komponen atau logic.

Sebelum melakukan perubahan, tampilkan ringkasan hasil audit.

---

## Tahap 2 — Klasifikasi

Klasifikasikan setiap file menjadi:

* App-level
* Feature
* Private Feature Component
* Shared/Reusable Component
* Feature Service
* Shared Service
* Hook
* Utility
* Asset

Gunakan penggunaan aktual dalam codebase sebagai dasar klasifikasi, bukan hanya berdasarkan nama file.

---

## Tahap 3 — Rancang Struktur Target

Buat rancangan struktur direktori baru berdasarkan fitur yang benar-benar terdapat dalam project.

Jelaskan:

* fitur yang ditemukan;
* file yang akan dipindahkan;
* private components pada setiap fitur;
* reusable/shared components;
* service yang menjadi milik fitur;
* service yang bersifat global.

Jangan melakukan refactoring sebelum struktur target dianalisis dengan jelas.

---

## Tahap 4 — Refactoring

Setelah struktur target ditentukan:

* pindahkan file ke lokasi yang sesuai;
* perbarui seluruh import path;
* pertahankan routing yang sudah berjalan;
* pertahankan seluruh functionality;
* jangan mengubah UI kecuali diperlukan untuk memperbaiki kerusakan akibat refactoring;
* jangan mengubah kontrak REST API;
* jangan mengubah business logic tanpa alasan teknis yang jelas;
* hapus file atau folder lama yang sudah tidak digunakan;
* hindari circular dependency.

---

## Tahap 5 — Verifikasi

Setelah refactoring selesai:

1. jalankan aplikasi;
2. jalankan build production;
3. periksa error import;
4. periksa routing;
5. periksa console error;
6. pastikan seluruh halaman dapat diakses;
7. pastikan komunikasi REST API tetap berjalan;
8. pastikan tidak ada file lama yang menjadi dead code;
9. pastikan private feature component tidak digunakan lintas fitur secara tidak terkontrol;
10. pastikan shared component benar-benar reusable.

---

# Batasan Penting

* Jangan melakukan rewrite project dari awal.
* Jangan mengubah teknologi utama project.
* Jangan mengubah tampilan UI secara tidak perlu.
* Jangan mengubah endpoint backend.
* Jangan membuat abstraction yang tidak dibutuhkan.
* Jangan membuat folder kosong hanya untuk mengikuti pola arsitektur.
* Jangan menjadikan semua komponen sebagai shared component.
* Jangan memecah komponen secara berlebihan apabila tidak meningkatkan modularitas.
* Prioritaskan maintainability, cohesion, dan separation of concerns.
* Pertahankan perilaku aplikasi yang sudah berjalan.

Hasil akhir yang diharapkan adalah frontend dengan **Hybrid Feature-Based and Component-Based Architecture**, di mana:

* struktur utama diorganisasikan berdasarkan fitur;
* setiap fitur memiliki private components sendiri;
* komponen generik yang benar-benar digunakan lintas fitur ditempatkan sebagai reusable/shared components;
* service dan logic ditempatkan sedekat mungkin dengan fitur yang menggunakannya;
* dependency antarbagian aplikasi memiliki arah yang jelas;
* aplikasi tetap berjalan dengan fungsi dan tampilan yang sama setelah proses refactoring.

Mulai dengan melakukan audit terhadap codebase yang tersedia, kemudian tampilkan struktur saat ini, masalah arsitektur yang ditemukan, klasifikasi komponen, dan struktur target sebelum melakukan refactoring.
