@echo off
echo ============================================
echo   Dien Lanh MK JSC - Khoi dong
echo ============================================
echo.
echo Backend : http://localhost:5025
echo Frontend: http://localhost:5174
echo.

start "MK JSC - Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 2 /nobreak >nul
start "MK JSC - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:5174

echo.
echo Ung dung da duoc khoi dong!
echo Nhan phim bat ky de dong cua so nay...
pause >nul
