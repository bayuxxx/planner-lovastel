# 🚀 Deploy ke Vercel - Panduan Lengkap

## Metode 1: Deploy via GitHub (RECOMMENDED)

### Langkah 1: Push ke GitHub

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Lovastel Planner 2026"

# Add remote (ganti dengan repo Anda)
git remote add origin https://github.com/USERNAME/lovastel-planner.git

# Push
git push -u origin main
```

### Langkah 2: Deploy di Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"Add New Project"**
4. Pilih repository **lovastel-planner**
5. Klik **"Deploy"**
6. Tunggu beberapa detik
7. ✅ **Selesai!** Aplikasi live di `https://lovastel-planner.vercel.app`

### Langkah 3: Generate Icon

⚠️ **PENTING:** Sebelum deploy, generate icon dulu!

1. Buka `create-icons.html` di browser lokal
2. Download `icon-192.png` dan `icon-512.png`
3. Commit dan push icon ke GitHub:

```bash
git add icon-192.png icon-512.png
git commit -m "Add PWA icons"
git push
```

4. Vercel akan auto-redeploy

---

## Metode 2: Deploy via Vercel CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy

```bash
# Login
vercel login

# Deploy (preview)
vercel

# Deploy (production)
vercel --prod
```

### Update

```bash
# Setiap kali ada perubahan
vercel --prod
```

---

## Metode 3: Deploy Manual (Drag & Drop)

1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag & drop folder project
3. Klik **"Deploy"**
4. ✅ Selesai!

⚠️ **Catatan:** Metode ini tidak auto-update saat ada perubahan

---

## Konfigurasi Domain Custom

### Tambah Domain

1. Buka project di Vercel Dashboard
2. Settings → Domains
3. Tambah domain Anda (contoh: `jadwal.lovastel.com`)
4. Update DNS sesuai instruksi Vercel
5. Tunggu propagasi DNS (5-10 menit)

### Update Manifest

Edit `manifest.json`:

```json
{
  "start_url": "https://jadwal.lovastel.com/",
  "scope": "https://jadwal.lovastel.com/"
}
```

---

## Environment Variables (Opsional)

Jika butuh environment variables:

1. Vercel Dashboard → Settings → Environment Variables
2. Tambah variable (contoh: `API_KEY`)
3. Redeploy

---

## Auto Deploy

Setiap push ke GitHub akan auto-deploy:

```bash
git add .
git commit -m "Update feature"
git push
# Vercel auto-deploy dalam 30 detik
```

---

## Monitoring

### Check Status

- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Logs: Project → Deployments → View Logs
- Analytics: Project → Analytics

### Performance

Vercel otomatis optimize:
- ✅ Global CDN
- ✅ Auto HTTPS
- ✅ Compression (Gzip/Brotli)
- ✅ Image optimization
- ✅ Edge caching

---

## Troubleshooting

### ❌ Service Worker tidak register?

**Solusi:** Pastikan `vercel.json` sudah ada dan benar.

### ❌ Icon tidak muncul?

**Solusi:** 
1. Generate icon dengan `create-icons.html`
2. Commit `icon-192.png` dan `icon-512.png`
3. Push ke GitHub

### ❌ PWA tidak bisa install?

**Solusi:**
1. Cek manifest.json sudah benar
2. Cek icon sudah ada
3. Cek HTTPS aktif (Vercel auto HTTPS)
4. Clear cache browser dan reload

### ❌ Data hilang setelah deploy?

**Solusi:** Data tersimpan di localStorage browser user, bukan di server. Ini normal untuk PWA.

---

## Checklist Deploy

- [ ] Generate icon (`icon-192.png`, `icon-512.png`)
- [ ] Commit semua file
- [ ] Push ke GitHub
- [ ] Connect ke Vercel
- [ ] Deploy
- [ ] Test di browser
- [ ] Test PWA install
- [ ] Test offline mode
- [ ] Test notifications

---

## Update Aplikasi

### Update Code

```bash
# Edit file
nano app.js

# Commit
git add .
git commit -m "Update: fitur baru"

# Push (auto-deploy)
git push
```

### Rollback

Jika ada masalah:

1. Vercel Dashboard → Deployments
2. Pilih deployment sebelumnya
3. Klik **"Promote to Production"**

---

## Custom Configuration

### Update `vercel.json`

```json
{
  "version": 2,
  "name": "lovastel-planner-2026",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ]
}
```

### Redirects

Tambah di `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

---

## Performance Tips

1. **Enable Analytics**
   - Vercel Dashboard → Analytics → Enable

2. **Monitor Speed**
   - Use Lighthouse
   - Check Core Web Vitals

3. **Optimize Assets**
   - Icons sudah optimal (PNG)
   - CSS minimal (Tailwind CDN)
   - JS vanilla (no framework)

---

## Biaya

- **Free Tier:**
  - 100 GB bandwidth/bulan
  - Unlimited deployments
  - Auto HTTPS
  - Global CDN
  - Perfect untuk project ini! ✅

- **Pro Tier ($20/bulan):**
  - 1 TB bandwidth
  - Advanced analytics
  - Password protection
  - (Tidak perlu untuk project ini)

---

## Links Penting

- 📊 Dashboard: https://vercel.com/dashboard
- 📚 Docs: https://vercel.com/docs
- 💬 Support: https://vercel.com/support
- 🐛 Status: https://vercel-status.com

---

## Example URLs

Setelah deploy, aplikasi akan tersedia di:

- Production: `https://lovastel-planner.vercel.app`
- Preview: `https://lovastel-planner-git-branch.vercel.app`
- Custom: `https://jadwal.lovastel.com` (jika setup domain)

---

## Next Steps

1. ✅ Deploy ke Vercel
2. ✅ Test semua fitur
3. ✅ Share link ke team
4. ✅ Setup custom domain (opsional)
5. ✅ Enable analytics (opsional)

---

**Selamat! Aplikasi Anda sudah live! 🎉**

Share link: `https://lovastel-planner.vercel.app`
