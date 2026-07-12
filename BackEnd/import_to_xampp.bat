@echo off
title Import Database Kopdes ke XAMPP MySQL
echo ==================================================
echo   Mengimpor Database Kopdes ke XAMPP MySQL
echo ==================================================
echo.
echo PENTING SEBELUM LANJUT:
echo 1. Pastikan service "MySQL84" standalone sudah di-stop.
echo 2. Pastikan MySQL di XAMPP Control Panel sudah di-start.
echo.
pause

echo.
echo [1/2] Membuat database 'kopdes_rentengpay' di XAMPP...
C:\xampp\mysql\bin\mysql.exe -u root -P 3307 -e "CREATE DATABASE IF NOT EXISTS kopdes_rentengpay;"
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Gagal terhubung ke XAMPP MySQL pada port 3307.
    echo Pastikan XAMPP MySQL sudah menyala di port 3307.
    echo.
    pause
    exit /b
)

echo [2/2] Mengimpor tabel dan data dari kopdes_renteng.sql...
C:\xampp\mysql\bin\mysql.exe -u root -P 3307 kopdes_rentengpay < kopdes_renteng.sql
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Gagal mengimpor data.
    echo.
    pause
    exit /b
)

echo.
echo ==================================================
echo   SELESAI! Database berhasil diimpor ke XAMPP.
echo ==================================================
echo.
pause
