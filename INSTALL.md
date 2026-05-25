# 🚀 Panduan Instalasi Lovastel Planner 2026

## Langkah 1: Generate Icon PWA

Sebelum menjalankan aplikasi, Anda perlu membuat icon terlebih dahulu:

1. Buka file `create-icons.html` di browser
2. Icon akan otomatis ter-download sebagai `icon-192.png` dan `icon-512.png`
3. Pastikan kedua file icon ada di folder yang sama dengan `index.html`

**ATAU** gunakan icon sendiri dengan ukuran:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

## Langkah 2: Jalankan Aplikasi

### Opsi A: Langsung Buka File (Tidak Recommended untuk PWA)
- Double click `index.html`
- **Catatan**: PWA dan Service Worker tidak akan berfungsi dengan `file://` protocol

### Opsi B: Menggunakan Local Server (RECOMMENDED)

#### Menggunakan Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Menggunakan Node.js:
```bash
# Install serve globally
npm install -g serve

# Jalankan
serve -p 8000
```

#### Menggunakan PHP:
```bash
php -S localhost:8000
```

#### Menggunakan VS Code:
1. Install extension "Live Server"
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

## Langkah 3: Buka di Browser

1. Buka browser (Chrome/Edge recommended)
2. Akses `http://localhost:8000`
3. Aplikasi siap digunakan!

## Langkah 4: Install sebagai PWA (Opsional)

### Desktop (Chrome/Edge):
1. Klik icon ⊕ atau 🖥️ di address bar (sebelah kanan)
2. Klik "Install"
3. Aplikasi akan terbuka sebagai aplikasi standalone

### Mobile (Android):
1. Buka di Chrome
2. Tap menu (⋮)
3. Pilih "Add to Home Screen"
4. Tap "Add"

### Mobile (iOS/Safari):
1. Buka di Safari
2. Tap tombol Share (⬆️)
3. Scroll dan tap "Add to Home Screen"
4. Tap "Add"

## Langkah 5: Aktifkan Notifikasi

Untuk fitur alarm bekerja:

1. Saat diminta, klik "Allow" untuk notifikasi
2. Atau buka Settings browser → Site Settings → Notifications → Allow

## Troubleshooting

### Service Worker tidak register?
- Pastikan menggunakan `http://` atau `https://`, bukan `file://`
- Buka DevTools → Application → Service Workers untuk debug

### Notifikasi tidak muncul?
- Cek permission notifikasi di browser settings
- Pastikan browser mendukung Notification API
- Test di Chrome/Edge untuk hasil terbaik

### Icon tidak muncul?
- Pastikan `icon-192.png` dan `icon-512.png` sudah ada
- Generate ulang menggunakan `create-icons.html`
- Cek console browser untuk error

### Data hilang?
- Data tersimpan di localStorage browser
- Jangan clear browser data/cache
- Backup dengan export (fitur bisa ditambahkan)

## Fitur yang Bisa Ditambahkan

- [ ] Export/Import data ke JSON
- [ ] Dark mode
- [ ] Recurring events
- [ ] Custom alarm time
- [ ] Multiple alarms per schedule
- [ ] Sync dengan Google Calendar
- [ ] Print schedule
- [ ] Share schedule

---

Selamat menggunakan Lovastel Planner 2026! 🎉
