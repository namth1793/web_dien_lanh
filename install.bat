@echo off
echo ============================================
echo   Dien Lanh MK JSC - Cai dat lan dau
echo ============================================
echo.

echo [1/2] Cai dat Backend...
cd /d "%~dp0backend"
call npm install
if %errorlevel% neq 0 (echo Loi cai dat backend! & pause & exit /b 1)

echo.
echo [2/2] Cai dat Frontend...
cd /d "%~dp0frontend"
call npm install
if %errorlevel% neq 0 (echo Loi cai dat frontend! & pause & exit /b 1)

echo.
echo ============================================
echo   Cai dat hoan tat!
echo   Chay start.bat de khoi dong ung dung.
echo ============================================
pause
