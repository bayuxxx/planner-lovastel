# GitHub Actions - Auto Deploy

## Setup (Opsional)

Jika ingin auto-deploy via GitHub Actions:

### 1. Get Vercel Token

```bash
# Login ke Vercel
vercel login

# Get token
vercel token create
```

### 2. Add GitHub Secret

1. GitHub Repository → Settings → Secrets → Actions
2. New repository secret
3. Name: `VERCEL_TOKEN`
4. Value: (paste token dari step 1)
5. Save

### 3. Push to GitHub

```bash
git add .
git commit -m "Setup GitHub Actions"
git push
```

### 4. Auto Deploy! ✨

Setiap push ke `main` branch akan auto-deploy ke Vercel.

---

## Monitoring

- GitHub Actions: Repository → Actions
- Vercel Dashboard: https://vercel.com/dashboard

---

## Disable Auto Deploy

Jika tidak ingin pakai GitHub Actions:

```bash
# Delete workflow file
rm -rf .github/workflows/deploy.yml

# Commit
git add .
git commit -m "Disable GitHub Actions"
git push
```

---

## Alternative: Vercel Git Integration

Lebih mudah pakai Vercel Git Integration (tidak perlu GitHub Actions):

1. Vercel Dashboard → Import Project
2. Connect GitHub repository
3. Done! Auto-deploy tanpa setup token

**Recommended:** Pakai Vercel Git Integration, bukan GitHub Actions.

---

## Notes

- GitHub Actions = Extra step, butuh token
- Vercel Git Integration = Zero config, auto-detect
- Keduanya sama-sama auto-deploy on push
- Pilih salah satu saja!
