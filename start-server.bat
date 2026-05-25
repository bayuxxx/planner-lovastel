@echo off
echo ========================================
echo   Lovastel Planner 2026 - Local Server
echo ========================================
echo.
echo Mencoba menjalankan server...
echo.

REM Try Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python ditemukan!
    echo Membuka browser...
    timeout /t 2 /nobreak >nul
    start http://localhost:8000
    echo.
    echo Server berjalan di: http://localhost:8000
    echo Tekan Ctrl+C untuk stop server
    echo.
    python -m http.server 8000
    goto :end
)

REM Try PHP
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] PHP ditemukan!
    echo Membuka browser...
    timeout /t 2 /nobreak >nul
    start http://localhost:8000
    echo.
    echo Server berjalan di: http://localhost:8000
    echo Tekan Ctrl+C untuk stop server
    echo.
    php -S localhost:8000
    goto :end
)

REM No server found
echo [ERROR] Python atau PHP tidak ditemukan!
echo.
echo Silakan install salah satu:
echo - Python: https://www.python.org/downloads/
echo - PHP: https://www.php.net/downloads
echo.
echo Atau gunakan VS Code dengan extension "Live Server"
echo.
pause
goto :end

:end
