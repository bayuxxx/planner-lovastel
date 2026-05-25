# 📅 Lovastel Planner 2026

Aplikasi Progressive Web App (PWA) untuk mengelola jadwal dengan fitur CRUD, localStorage, dan alarm notifikasi.

## ✨ Fitur

- **📱 Progressive Web App (PWA)** - Install di perangkat dan gunakan offline
- **💾 LocalStorage** - Data tersimpan di browser, tidak hilang saat refresh
- **➕ CRUD Lengkap** - Create, Read, Update, Delete jadwal
- **🔔 Alarm & Notifikasi** - Notifikasi otomatis 30 menit sebelum jadwal
- **📆 Kalender Interaktif** - Klik tanggal untuk scroll ke jadwal
- **🎨 UI Modern** - Desain glassmorphism dengan animasi smooth
- **💄 Badge Khusus** - Makeup dan Double shift indicator
- **📊 Filter Bulan** - Navigasi mudah antar bulan

## 🚀 Cara Menggunakan

### Opsi A: Deploy ke Vercel (RECOMMENDED) ⚡

**Deploy dalam 5 menit:**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

**Atau via GitHub:**
1. Push ke GitHub
2. Import di [vercel.com](https://vercel.com)
3. Deploy otomatis!

📚 **Panduan lengkap:** `VERCEL-QUICKSTART.md` atau `DEPLOY-VERCEL.md`

### Opsi B: Jalankan Lokal

#### 1. Generate Icon
Buka `create-icons.html` di browser untuk generate icon PWA (icon-192.png dan icon-512.png)

#### 2. Jalankan Server
```bash
# Windows
start-server.bat

# Mac/Linux
./start-server.sh

# Manual - Python
python -m http.server 8000

# Manual - Node.js
npx serve

# Manual - PHP
php -S localhost:8000
```

#### 3. Install sebagai PWA
- Di Chrome/Edge: Klik icon install di address bar
- Di Mobile: Pilih "Add to Home Screen"

## 📝 Cara Menggunakan Fitur

### Tambah Jadwal
1. Klik tombol ➕ di header
2. Isi form (Bulan, Tanggal, Waktu, Lokasi)
3. Centang Makeup/Double jika perlu
4. Klik Simpan

### Edit Jadwal
1. Klik tombol ✏️ pada kartu jadwal
2. Ubah data yang diperlukan
3. Klik Simpan

### Hapus Jadwal
1. Klik tombol 🗑️ pada kartu jadwal
2. Konfirmasi penghapusan

### Alarm
1. Klik tombol 🔔 untuk melihat alarm aktif
2. Alarm akan berbunyi 30 menit sebelum jadwal
3. Pastikan izinkan notifikasi di browser

## 🗂️ Struktur File

```
├── index.html          # File HTML utama
├── styles.css          # Styling dan animasi
├── app.js              # Logic aplikasi (CRUD, Alarm)
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker untuk offline
├── vercel.json         # Vercel configuration
├── package.json        # NPM package info
├── create-icons.html   # Generator icon PWA
├── icon-192.png        # Icon 192x192 (generate dulu)
├── icon-512.png        # Icon 512x512 (generate dulu)
├── README.md           # Dokumentasi
├── VERCEL-QUICKSTART.md # Quick deploy guide
├── DEPLOY-VERCEL.md    # Detailed deploy guide
├── deploy.bat          # Windows deploy script
└── deploy.sh           # Unix deploy script
```

## 🎨 Teknologi

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dengan Tailwind CSS
- **JavaScript (Vanilla)** - Logic tanpa framework
- **LocalStorage API** - Penyimpanan data
- **Service Worker** - Offline capability
- **Notification API** - Push notification
- **PWA** - Progressive Web App

## 📱 Browser Support

- Chrome/Edge (Recommended)
- Firefox
- Safari (iOS 11.3+)
- Opera

## 💡 Tips

- Data tersimpan di localStorage browser
- Backup data dengan export/import (fitur bisa ditambahkan)
- Izinkan notifikasi untuk fitur alarm
- Install sebagai PWA untuk pengalaman terbaik

## 🔧 Kustomisasi

### Ubah Waktu Alarm
Edit di `app.js` baris:
```javascript
return timeDiff > 0 && timeDiff <= 30; // 30 menit sebelum
```

### Tambah Bulan Baru
Edit di `app.js`:
```javascript
const calendarSetup = {
    'Desember': { days: 31, startDay: 2 } // Tambahkan bulan baru
};
```

### Ubah Warna Tema
Edit di `styles.css` atau Tailwind config di `index.html`

## 📄 Lisensi

Free to use - Lovastel Planner 2026

---

Dibuat dengan ❤️ untuk Lovastel Team
