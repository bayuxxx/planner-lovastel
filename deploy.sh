#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║     🚀 LOVASTEL PLANNER 2026 - VERCEL DEPLOY             ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI tidak ditemukan!"
    echo ""
    echo "Install dengan:"
    echo "  npm install -g vercel"
    echo ""
    exit 1
fi

echo "✅ Vercel CLI ditemukan"
echo ""

# Check if icons exist
if [ ! -f "icon-192.png" ] || [ ! -f "icon-512.png" ]; then
    echo "⚠️  WARNING: Icon belum di-generate!"
    echo ""
    echo "Buka create-icons.html di browser untuk generate icon"
    echo ""
    read -p "Lanjutkan deploy tanpa icon? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Memulai deployment..."
echo ""

# Deploy to production
vercel --prod

echo ""
echo "✅ Deployment selesai!"
echo ""
echo "📱 Aplikasi Anda sudah live!"
echo ""
echo "Next steps:"
echo "1. Test aplikasi di URL yang diberikan"
echo "2. Test PWA install"
echo "3. Test offline mode"
echo "4. Share link ke team!"
echo ""
