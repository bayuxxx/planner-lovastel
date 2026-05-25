# 🚀 Panduan Mulai Cepat

## Langkah Singkat (3 Menit)

### 1️⃣ Generate Icon (30 detik)
```
Buka: create-icons.html di browser
→ Icon otomatis ter-download
```

### 2️⃣ Jalankan Server (30 detik)

**Windows:**
```
Double-click: start-server.bat
```

**Mac/Linux:**
```bash
./start-server.sh
```

**Manual:**
```bash
python -m http.server 8000
```

### 3️⃣ Buka Browser (10 detik)
```
http://localhost:8000
```

### 4️⃣ Mulai Gunakan! ✨

---

## Fitur Utama

### ➕ Tambah Jadwal
- Klik tombol **➕** di kanan atas
- Isi form dan klik **Simpan**

### ✏️ Edit Jadwal
- Klik tombol **✏️** pada kartu jadwal
- Ubah data dan klik **Simpan**

### 🗑️ Hapus Jadwal
- Klik tombol **🗑️** pada kartu jadwal
- Konfirmasi hapus

### 🔔 Alarm
- Klik tombol **🔔** untuk lihat alarm aktif
- Alarm berbunyi 30 menit sebelum jadwal
- **Penting:** Izinkan notifikasi saat diminta!

### 📅 Kalender
- Klik tanggal di kalender
- Otomatis scroll ke jadwal hari itu

### 📊 Filter Bulan
- Klik nama bulan untuk ganti tampilan

---

## Tips Cepat

✅ **Data Aman** - Tersimpan di browser (localStorage)  
✅ **Offline** - Bisa digunakan tanpa internet (setelah install PWA)  
✅ **Install PWA** - Klik icon install di address bar  
✅ **Notifikasi** - Jangan lupa izinkan notifikasi!  

---

## Troubleshooting Cepat

❌ **Server tidak jalan?**
→ Install Python atau gunakan VS Code + Live Server

❌ **Notifikasi tidak muncul?**
→ Cek permission di browser settings

❌ **Icon tidak ada?**
→ Buka `create-icons.html` untuk generate

---

## Struktur Data

Setiap jadwal punya:
- **Bulan** (Mei - November)
- **Tanggal** (1-31)
- **Waktu** (Subuh/Pagi/Siang/Sore)
- **Lokasi** (nama tempat)
- **Makeup** ✓/✗ (opsional)
- **Double** ✓/✗ (opsional)

---

## Keyboard Shortcuts

Tidak ada keyboard shortcuts (mobile-first design)

---

Selamat menggunakan! 🎉

Butuh bantuan? Baca **README.md** atau **INSTALL.md**
