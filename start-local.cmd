@echo off
cd /d C:\projects\greenengine-platform

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not available in PATH. Please install Node.js 20+ and reopen Command Prompt.
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)

set HOST=127.0.0.1
set PORT=5000
set DATABASE_URL=./local.db
set SESSION_SECRET=greenengine-secret-key-change-in-production

echo.
echo Starting GREENENGINE locally on http://127.0.0.1:5000
echo Keep this terminal open while using the site.
echo.

call npm run dev:local
