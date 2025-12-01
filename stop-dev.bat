@echo off
echo Stopping Track-Trade Development Servers...

:: Kill all node processes (Vite)
taskkill /F /IM node.exe 2>nul

:: Kill all PHP artisan serve processes
taskkill /F /IM php.exe 2>nul

echo.
echo All development servers stopped!
echo.
pause
