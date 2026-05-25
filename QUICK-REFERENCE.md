# ⚡ Quick Reference Card

## 🚀 Deploy Commands

```bash
# Vercel CLI
npm install -g vercel          # Install
vercel login                   # Login
vercel                         # Preview deploy
vercel --prod                  # Production deploy

# Quick Deploy Scripts
deploy.bat                     # Windows
./deploy.sh                    # Mac/Linux
```

## 🖥️ Local Development

```bash
# Start Server
start-server.bat               # Windows
./start-server.sh              # Mac/Linux
python -m http.server 8000     # Manual

# Access
http://localhost:8000
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `index.html` | Main HTML |
| `app.js` | Application logic |
| `styles.css` | Styling |
| `manifest.json` | PWA config |
| `sw.js` | Service Worker |
| `vercel.json` | Vercel config |

## 📚 Documentation

| File | Description |
|------|-------------|
| `00-BACA-DULU.txt` | Start here! |
| `VERCEL-QUICKSTART.md` | Deploy in 5 min |
| `DEPLOY-VERCEL.md` | Full deploy guide |
| `README.md` | Complete docs |
| `API-DOCS.md` | Developer API |

## 🎯 Common Tasks

### Generate Icons
```bash
# Open in browser
create-icons.html
```

### Test Locally
```bash
start-server.bat
# Open http://localhost:8000
```

### Deploy to Vercel
```bash
vercel --prod
```

### Update After Deploy
```bash
git add .
git commit -m "Update"
git push
# Auto-deploys!
```

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Icons missing | Open `create-icons.html` |
| Server won't start | Install Python or use VS Code Live Server |
| PWA won't install | Check icons exist, use HTTPS |
| Notifications not working | Allow in browser settings |
| Data lost | Don't clear browser cache |

## 📊 File Structure

```
lovastel-planner/
├── index.html              # Main app
├── app.js                  # Logic
├── styles.css              # Styles
├── manifest.json           # PWA
├── sw.js                   # Service Worker
├── vercel.json            # Vercel config
├── package.json           # NPM info
├── deploy.bat/sh          # Deploy scripts
├── start-server.bat/sh    # Dev server
└── docs/                  # Documentation
```

## 🌐 URLs After Deploy

- Production: `https://your-app.vercel.app`
- Preview: `https://your-app-git-branch.vercel.app`
- Custom: `https://your-domain.com`

## 💡 Quick Tips

✅ Use Chrome/Edge for best experience  
✅ Generate icons before deploy  
✅ Test locally before deploy  
✅ Enable notifications for alarms  
✅ Install as PWA for offline use  

## 🔗 Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- GitHub Repo: (your repo URL)

## 📞 Get Help

1. Check `VERCEL-QUICKSTART.md`
2. Check `DEPLOY-VERCEL.md`
3. Check `README.md`
4. Open GitHub issue

---

**Keep this file handy for quick reference! 📌**
