@echo off
echo Starting Track-Trade Development Servers...
echo.

cd /d "%~dp0"

:: Start Vite dev server in a new window
start "Vite Dev Server" cmd /k "npm run dev"

:: Wait 2 seconds for Vite to initialize
timeout /t 2 /nobreak > nul

:: Start Laravel server in a new window
start "Laravel Server" cmd /k "php artisan serve"

echo.
echo ========================================
echo Development servers are starting!
echo ========================================
echo Vite:   http://localhost:5173
echo Laravel: http://127.0.0.1:8000
echo ========================================
echo.
echo Press any key to open the application in your browser...
pause > nul

:: Open browser
start http://127.0.0.1:8000

echo.
echo To stop the servers, close both terminal windows.
echo.
