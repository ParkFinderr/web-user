# Narasi Akademis Bab IV: Perancangan Antarmuka Website User (Guest)

Dokumen ini berisi narasi lengkap untuk **Bab IV bagian C: Rancangan Antarmuka Website User** pada naskah skripsi. Narasi ini disusun secara akademis berdasarkan tangkapan layar (screenshot) aktual yang ditemukan pada direktori `docs/screenshot/` dan dirancang agar siap disalin langsung ke draf skripsi tanpa memerlukan perubahan besar.

---

## C. Rancangan Antarmuka Website User

Perancangan antarmuka aplikasi Website User pada platform ParkFinder berfokus pada kemudahan akses bagi pengguna tamu (Guest) tanpa harus melalui proses pendaftaran akun terlebih dahulu. Berikut merupakan rincian rancangan antarmuka dari setiap halaman logis yang tersedia di dalam sistem:

### 1. Halaman Landing Page

Rancangan antarmuka Halaman Landing Page dirancang dengan tujuan untuk memperkenalkan platform ParkFinder Smart Parking secara umum kepada pengguna tamu, menyajikan fitur-fitur unggulan, serta menyediakan tautan navigasi awal menuju fungsi utama sistem. Halaman ini berfungsi sebagai gerbang masuk informasi yang interaktif bagi masyarakat yang ingin mengetahui cara kerja sistem sebelum bertransaksi parkir.

Komponen antarmuka yang dirancang pada halaman ini meliputi bilah menu navigasi atas yang minimalis, area promosi utama (*hero banner*) yang menampilkan visualisasi objek model kendaraan tiga dimensi (3D) dinamis, tombol ajakan bertindak (CTA) untuk memulai pencarian parkir, panel statistik operasional layanan, deretan kartu informasi fitur-fitur sistem, bagan langkah-langkah penggunaan layanan parkir tamu, serta bagian kaki halaman (*footer*) yang berisi tautan informasi tambahan.

Alur interaksi pengguna pada halaman ini dimulai ketika pengguna mengakses alamat utama website. Pengguna dapat membaca informasi fitur dan tata cara penggunaan dengan menggulirkan halaman ke bawah. Apabila pengguna memutuskan untuk langsung memesan slot parkir, pengguna dapat mengklik tombol "Cari & Booking Slot" pada area promosi utama, yang secara otomatis akan mengarahkan sistem menuju halaman pemindaian tiket.

---

### 2. Halaman Tentang Project

Rancangan antarmuka Halaman Tentang Project dirancang dengan tujuan untuk menyajikan informasi deskriptif mengenai visi, misi, ruang lingkup project, serta kontributor atau tim pengembang yang merancang ekosistem ParkFinder. Halaman ini berfungsi sebagai media transparansi riset akademik dan pembagian peran dalam pengembangan sistem.

Komponen antarmuka yang dirancang pada halaman ini terdiri dari bilah navigasi atas, teks tajuk deskripsi misi platform, tiga kartu informasi utama yang memuat perincian visi, ruang lingkup sistem, dan nilai-nilai dasar platform, serta deretan kartu profil pengembang yang mencantumkan nama, peran spesifik (seperti perancang antarmuka atau pengembang sistem data), fokus kerja masing-masing anggota, dan diakhiri dengan komponen kaki halaman (*footer*).

Alur interaksi pengguna pada halaman ini bersifat searah dan informatif. Pengguna masuk ke halaman ini dengan memilih menu "Tentang Project" pada bilah navigasi atas. Pengguna kemudian dapat membaca rincian profil serta misi platform dengan menggulirkan halaman, lalu kembali ke halaman utama dengan mengklik logo utama pada bilah navigasi.

---

### 3. Halaman Unduh Aplikasi

Rancangan antarmuka Halaman Unduh Aplikasi dirancang dengan tujuan untuk mempromosikan aplikasi seluler (mobile app) ParkFinder serta memfasilitasi pengguna tamu yang membutuhkan fleksibilitas lebih tinggi dalam memantau parkir langsung melalui perangkat ponsel pintar mereka. Halaman ini berfungsi untuk menjembatani transisi pengguna dari platform berbasis web ke platform mobile.

Komponen antarmuka yang dirancang pada halaman ini mencakup judul halaman yang deskriptif, kartu-kartu visual yang merinci keunggulan aplikasi seluler (seperti kecepatan pemindaian tiket, pemantauan status secara real-time, dan fleksibilitas akses), tombol tautan unduh utama (*Download App*), serta komponen kaki halaman (*footer*).

Alur interaksi pengguna pada halaman ini dimulai saat pengguna memilih menu "Download Mobile" dari bilah navigasi. Pengguna membaca rincian kelebihan versi aplikasi seluler, kemudian mengklik tombol unduh untuk mendapatkan berkas paket aplikasi (APK) secara langsung ke perangkat mereka.

---

### 4. Halaman Tutorial Penggunaan

Rancangan antarmuka Halaman Tutorial Penggunaan dirancang dengan tujuan untuk memberikan panduan interaktif serta jawaban atas pertanyaan umum (FAQ) bagi pengguna tamu yang mengalami kebingungan saat menjalankan siklus parkir. Antarmuka ini berfungsi sebagai pusat bantuan mandiri guna mengurangi kendala operasional pengguna di lapangan.

Komponen antarmuka yang dirancang pada halaman ini berbentuk panel bantuan mengambang (*floating help widget*) yang dapat dibuka-tutup. Di dalam panel ini terdapat judul bantuan, kolom navigasi kategori FAQ, ikon-ikon ilustratif yang merepresentasikan tahapan parkir (seperti cara memindai tiket, cara memesan slot, cara pindah slot, dan cara keluar dari gedung parkir), serta tombol penutup panel.

Alur interaksi pengguna pada antarmuka ini dimulai saat pengguna mengklik tombol ikon tanda tanya (?) mengambang di pojok kanan bawah layar. Panel bantuan kemudian akan bergeser muncul ke layar; pengguna dapat memilih salah satu topik bantuan untuk membaca panduan yang relevan, dan setelah selesai, pengguna dapat menekan tombol tutup untuk menyembunyikan kembali panel tersebut.

---

### 5. Halaman Scan QR Code

Rancangan antarmuka Halaman Scan QR Code dirancang dengan tujuan untuk memverifikasi keabsahan tiket parkir fisik maupun digital tamu yang diperoleh saat memasuki area gerbang gedung parkir. Halaman ini berfungsi untuk mengaktifkan sesi tiket tamu di dalam sistem sebelum pengguna diperbolehkan memesan slot parkir.

Komponen antarmuka yang dirancang pada halaman ini meliputi area kotak pemindai kamera (*scanner viewport*), teks panduan pemindaian, formulir input manual kode tiket, tombol cek manual, indikator pemrosesan verifikasi, panel notifikasi status verifikasi (warna hijau untuk tiket sukses terverifikasi dan warna merah untuk tiket tidak valid), serta tombol kembali menuju halaman cari parkir di bagian bawah.

Alur interaksi pengguna pada halaman ini dimulai saat pengguna memberikan izin akses kamera pada perangkat mereka. Pengguna kemudian mengarahkan kamera ponsel ke QR Code tiket atau mengetikkan kode tiket secara manual ke dalam formulir input dan menekan tombol "Cek". Jika tiket terdeteksi valid, sistem akan memunculkan pesan sukses dan secara otomatis mengalihkan pengguna ke halaman pencarian area parkir.

---

### 6. Halaman Pencarian Area Parkir

Rancangan antarmuka Halaman Pencarian Area Parkir dirancang dengan tujuan untuk membantu pengguna tamu dalam mencari, menyaring, dan memilih gedung parkir yang dikelola oleh platform ParkFinder. Halaman ini berfungsi menyajikan visualisasi ringkas mengenai ketersediaan kapasitas slot kosong di berbagai lokasi gedung parkir secara real-time.

Komponen antarmuka yang dirancang pada halaman ini terdiri dari bilah navigasi utama aplikasi, kolom pencarian teks untuk memfilter nama gedung, panel daftar gedung parkir yang dirender dalam bentuk kartu informasi (memuat nama gedung, alamat lengkap, persentase keterisian okupansi, informasi jumlah slot kosong vs kapasitas total, indikator jarak mock, serta label status keterisian seperti Tersedia, Ramai, atau Penuh), serta bilah melayang peringatan tiket aktif di bagian atas.

Alur interaksi pengguna pada halaman ini dimulai dengan mengetikkan kata kunci nama gedung parkir pada kolom pencarian. Pengguna kemudian meninjau daftar kartu gedung parkir yang muncul; apabila pengguna menemukan gedung parkir yang diinginkan dan status keterisiannya masih tersedia (tidak penuh), pengguna dapat mengklik kartu gedung tersebut untuk membuka denah detail lantai dan peta slot parkir.

---

### 7. Halaman Pemilihan Slot Parkir

Rancangan antarmuka Halaman Pemilihan Slot Parkir dirancang dengan tujuan untuk memvisualisasikan denah denah tata letak slot parkir di setiap lantai gedung yang dipilih secara terperinci. Halaman ini berfungsi agar pengguna tamu dapat memantau sebaran slot dan memilih secara spesifik nomor slot yang ingin mereka pesan.

Komponen antarmuka yang dirancang pada halaman ini meliputi panel detail gedung terpilih di bagian atas, menu dropdown pemilih lantai gedung (L1, L2, dst), grid visual denah tata letak slot parkir (menggunakan warna hijau untuk merepresentasikan slot kosong, warna merah untuk slot terisi, dan warna biru untuk slot yang sedang diklik/dipilih pengguna), legenda warna status slot, serta tombol konfirmasi pemesanan "Booking Slot".

Alur interaksi pengguna pada halaman ini dimulai dengan memilih lantai gedung yang ingin ditempati melalui dropdown pemilih lantai. Pengguna kemudian mengamati grid visual sebaran slot pada lantai tersebut dan mengklik salah satu slot kosong berwarna hijau (yang kemudian akan berubah menjadi warna biru sebagai penanda terpilih). Setelah slot dipilih, pengguna menekan tombol "Booking Slot" untuk beraljut ke proses pengisian data diri pemesanan.

---

### 8. Halaman Form Pemesanan Slot Parkir

Rancangan antarmuka Halaman Form Pemesanan Slot Parkir dirancang dengan tujuan untuk mengumpulkan data identitas pemesan dan kendaraan pengguna tamu guna mengunci slot parkir yang telah dipilih di server. Halaman ini bertindak sebagai langkah pertama dalam proses pemesanan terstruktur.

Komponen antarmuka yang dirancang pada halaman ini terdiri dari indikator langkah pemesanan (*stepper progress bar* yang memuat tahapan Detail Booking, Konfirmasi, dan Selesai), kartu ringkasan detail slot (menampilkan nama gedung, lantai, dan nomor slot terpilih), formulir input teks untuk Nama Pemesan, formulir input Plat Nomor Kendaraan, formulir input Nomor HP, pesan error validasi kolom jika input kosong, serta tombol navigasi "Lanjutkan" dan tombol batalkan.

Alur interaksi pengguna pada halaman ini dimulai dengan mengisi kolom Nama, Nomor Plat Kendaraan, dan Nomor HP pada formulir yang tersedia. Apabila semua kolom telah terisi secara valid, pengguna mengklik tombol "Lanjutkan" untuk memindahkan tahapan proses pemesanan menuju langkah konfirmasi.

---

### 9. Halaman Konfirmasi Pemesanan Slot Parkir

Rancangan antarmuka Halaman Konfirmasi Pemesanan Slot Parkir dirancang dengan tujuan untuk menyajikan tinjauan akhir (review) dari data pemesan dan slot yang dipilih sebelum transaksi benar-benar disimpan di dalam database. Halaman ini berfungsi untuk meminimalkan kesalahan pengisian plat nomor kendaraan oleh pengguna tamu.

Komponen antarmuka yang dirancang pada halaman ini meliputi indikator langkah pemesanan pada tahap kedua (*Konfirmasi*), kartu rincian slot parkir (berisi nama gedung, lantai, dan nomor slot), kartu detail data pemesan (memuat nama, plat nomor kendaraan, dan nomor HP), indikator keberadaan tiket aktif tamu, tombol navigasi "Kembali" untuk mengoreksi data, serta tombol utama "Konfirmasi Booking".

Alur interaksi pengguna pada halaman ini terfokus pada validasi data secara visual oleh pengguna. Pengguna membaca seluruh ringkasan informasi yang tertera di layar; jika seluruh data sudah benar, pengguna menekan tombol "Konfirmasi Booking" untuk memicu pengiriman data pesanan menuju database dan menerbitkan reservasi.

---

### 10. Halaman Booking Berhasil

Rancangan antarmuka Halaman Booking Berhasil dirancang dengan tujuan untuk memberikan konfirmasi visual bahwa pesanan slot parkir pengguna tamu telah berhasil diproses dan dicatat oleh server. Halaman ini berfungsi sebagai bukti transaksi awal bagi pengguna sebelum tiba di lokasi parkir.

Komponen antarmuka yang dirancang pada halaman ini terdiri dari indikator langkah pemesanan pada tahap akhir (*Selesai*), ikon centang sukses besar berwarna hijau, teks keberhasilan, panel kode sesi tiket tamu, kartu ringkasan detail slot yang berhasil diamankan (gedung, lantai, nomor slot), tombol aksi cepat menuju dasbor parkir aktif ("Parkiran Aktif"), tombol pintas "Tukar Slot" dan "Selesai Parkir", serta tombol navigasi kembali "Ke Beranda".

Alur interaksi pengguna pada halaman ini bersifat konfirmasi dan navigasi pasca-transaksi. Pengguna mencatat atau melihat kode sesi tiket mereka, meninjau ulang detail slot yang telah dipesan, kemudian mengklik tombol "Parkiran Aktif" untuk diarahkan ke halaman pelacakan status parkir guna mengelola kedatangan kendaraan mereka.

---

### 11. Halaman Status Reservasi Parkir

Rancangan antarmuka Halaman Status Reservasi Parkir dirancang dengan tujuan untuk bertindak sebagai dasbor kontrol utama bagi pengguna tamu dalam melacak status parkir aktif dan mengelola siklus hidup kendaraan mereka secara mandiri di lapangan. Halaman ini berfungsi mempermudah interaksi pengguna dengan petugas gerbang parkir.

Komponen antarmuka yang dirancang pada halaman ini meliputi judul dasbor yang informatif, panel ringkasan statistik (menampilkan jumlah reservasi aktif tamu, riwayat parkir lama, dan total transaksi), bilah filter status (menyaring transaksi aktif vs riwayat transaksi), kartu status parkir aktif (memuat nama gedung, nomor slot, plat kendaraan, dan waktu reservasi dibuat), serta deretan tombol aksi dinamis berdasarkan siklus parkir ("Sudah Sampai", "Batalkan Reservasi", "Swap Slot", "Selesai Parkir", dan "Keluar Parkir").

Alur interaksi pengguna pada halaman ini bervariasi sesuai dengan posisi fisik kendaraan pengguna tamu:
*   Ketika pengguna baru tiba di depan slot parkir, pengguna menekan tombol **"Sudah Sampai"** untuk mengonfirmasi kedatangan ke server.
*   Apabila pengguna ingin meninggalkan slot parkir, pengguna menekan tombol **"Selesai Parkir"** untuk mengosongkan kembali slot tersebut.
*   Apabila ingin membatalkan pesanan sebelum tiba, pengguna menekan tombol **"Batalkan Reservasi"**; jika ingin pindah slot, pengguna menekan tombol **"Swap Slot"**; dan jika sesi parkir selesai, pengguna menekan **"Keluar Parkir"** untuk checkout.

---

### 12. Halaman Tukar Slot Parkir

Rancangan antarmuka Halaman Tukar Slot Parkir dirancang dengan tujuan untuk memfasilitasi pemindahan alokasi slot parkir aktif milik tamu ke slot kosong lain dalam satu gedung yang sama jika slot pertama bermasalah atau terhalang. Halaman ini berfungsi untuk meningkatkan kenyamanan parkir tamu di lapangan tanpa perlu mengulang scan tiket.

Komponen antarmuka yang dirancang pada halaman ini terdiri dari bilah navigasi atas, indikator kemajuan penukaran (*stepper progress bar* yang memuat tahapan Pilih Slot Baru, Konfirmasi Tukar, dan Selesai), bilah peringatan info slot aktif saat ini, menu dropdown pemilih lantai gedung, grid visual denah tata letak slot baru per lantai (slot kosong berwarna hijau dan slot terpilih berwarna biru), serta tombol navigasi "Lanjutkan".

Alur interaksi pengguna pada halaman ini dimulai dengan memilih lantai gedung melalui dropdown pemilih lantai. Pengguna kemudian memilih salah satu slot kosong yang tersedia pada grid visual (berubah warna menjadi biru), lalu menekan tombol "Lanjutkan" untuk mengarahkan proses menuju tahap konfirmasi penukaran slot.

---

### 13. Halaman Konfirmasi Tukar Slot

Rancangan antarmuka Halaman Konfirmasi Tukar Slot dirancang dengan tujuan untuk membandingkan secara visual detail slot parkir lama dengan slot parkir baru pilihan pengguna tamu sebelum sistem mengubah alokasi data di server. Halaman ini berfungsi mencegah kesalahan pemilihan slot tujuan oleh pengguna.

Komponen antarmuka yang dirancang pada halaman ini mencakup indikator langkah penukaran pada tahap kedua (*Konfirmasi Tukar*), kartu detail perbandingan slot (menampilkan detail slot lama berupa nomor slot dan lantai berdampingan dengan detail slot baru), panel rincian data kendaraan tamu, tombol kembali untuk membatalkan/mengoreksi pilihan, serta tombol aksi utama "Konfirmasi Tukar".

Alur interaksi pengguna pada halaman ini berpusat pada peninjauan ulang data pemindahan. Pengguna memeriksa apakah perbandingan slot asal dan slot tujuan sudah benar; jika sudah sesuai, pengguna mengklik tombol "Konfirmasi Tukar" untuk memproses pemindahan slot di database.

---

### 14. Halaman Tukar Slot Berhasil

Rancangan antarmuka Halaman Tukar Slot Berhasil dirancang dengan tujuan untuk menyatakan secara resmi bahwa proses pemindahan slot parkir tamu telah berhasil diperbarui di server dan menerbitkan tiket pemindahan baru. Halaman ini berfungsi sebagai bukti transaksi pemindahan yang sah bagi pengguna tamu.

Komponen antarmuka yang dirancang pada halaman ini meliputi indikator langkah penukaran pada tahap akhir (*Selesai*), ikon centang sukses pemindahan berwarna hijau, teks keberhasilan, panel kode sesi tiket penukaran yang baru, rincian lokasi slot parkir yang baru (gedung, lantai, nomor slot), tombol aksi cepat menuju dasbor parkir aktif ("Parkiran Aktif"), serta tombol kembali "Ke Beranda".

Alur interaksi pengguna pada halaman ini bersifat konfirmasi akhir. Pengguna mencatat atau melihat kode tiket baru yang diterbitkan, meninjau ulang detail slot baru mereka, kemudian menekan tombol "Parkiran Aktif" untuk kembali ke dasbor pelacakan status parkir mereka.
