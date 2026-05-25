@echo off
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║     🚀 LOVASTEL PLANNER 2026 - VERCEL DEPLOY             ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check if vercel is installed
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI tidak ditemukan!
    echo.
    echo Install dengan:
    echo   npm install -g vercel
    echo.
    pause
    exit /b 1
)

echo ✅ Vercel CLI ditemukan
echo.

REM Check if icons exist
if not exist "icon-192.png" (
    echo ⚠️  WARNING: icon-192.png belum ada!
    echo.
    echo Buka create-icons.html di browser untuk generate icon
    echo.
    set /p continue="Lanjutkan deploy tanpa icon? (y/n): "
    if /i not "%continue%"=="y" exit /b 1
)

if not exist "icon-512.png" (
    echo ⚠️  WARNING: icon-512.png belum ada!
    echo.
    echo Buka create-icons.html di browser untuk generate icon
    echo.
    set /p continue="Lanjutkan deploy tanpa icon? (y/n): "
    if /i not "%continue%"=="y" exit /b 1
)

echo 📦 Memulai deployment...
echo.

REM Deploy to production
vercel --prod

echo.
echo ✅ Deployment selesai!
echo.
echo 📱 Aplikasi Anda sudah live!
echo.
echo Next steps:
echo 1. Test aplikasi di URL yang diberikan
echo 2. Test PWA install
echo 3. Test offline mode
echo 4. Share link ke team!
echo.
pause
