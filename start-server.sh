#!/bin/bash

echo "========================================"
echo "  Lovastel Planner 2026 - Local Server"
echo "========================================"
echo ""
echo "Mencoba menjalankan server..."
echo ""

# Try Python 3
if command -v python3 &> /dev/null; then
    echo "[OK] Python3 ditemukan!"
    echo "Membuka browser..."
    sleep 2
    
    # Open browser based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000 2>/dev/null || echo "Buka manual: http://localhost:8000"
    fi
    
    echo ""
    echo "Server berjalan di: http://localhost:8000"
    echo "Tekan Ctrl+C untuk stop server"
    echo ""
    python3 -m http.server 8000
    exit 0
fi

# Try Python 2
if command -v python &> /dev/null; then
    echo "[OK] Python ditemukan!"
    echo "Membuka browser..."
    sleep 2
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000 2>/dev/null || echo "Buka manual: http://localhost:8000"
    fi
    
    echo ""
    echo "Server berjalan di: http://localhost:8000"
    echo "Tekan Ctrl+C untuk stop server"
    echo ""
    python -m SimpleHTTPServer 8000
    exit 0
fi

# Try PHP
if command -v php &> /dev/null; then
    echo "[OK] PHP ditemukan!"
    echo "Membuka browser..."
    sleep 2
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:8000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:8000 2>/dev/null || echo "Buka manual: http://localhost:8000"
    fi
    
    echo ""
    echo "Server berjalan di: http://localhost:8000"
    echo "Tekan Ctrl+C untuk stop server"
    echo ""
    php -S localhost:8000
    exit 0
fi

# No server found
echo "[ERROR] Python atau PHP tidak ditemukan!"
echo ""
echo "Silakan install salah satu:"
echo "- Python: https://www.python.org/downloads/"
echo "- PHP: https://www.php.net/downloads"
echo ""
echo "Atau gunakan VS Code dengan extension 'Live Server'"
echo ""
