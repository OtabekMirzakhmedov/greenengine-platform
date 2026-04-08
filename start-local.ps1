$ErrorActionPreference = "Stop"

Set-Location "C:\projects\greenengine-platform"

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "npm is not available in PATH. Please install Node.js 20+ and reopen PowerShell." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path ".\node_modules")) {
  Write-Host "Installing dependencies..." -ForegroundColor Yellow
  npm install
}

$env:HOST = "127.0.0.1"
$env:PORT = "5000"
$env:DATABASE_URL = "./local.db"
$env:SESSION_SECRET = "greenengine-secret-key-change-in-production"

Write-Host ""
Write-Host "Starting GREENENGINE locally on http://127.0.0.1:5000" -ForegroundColor Green
Write-Host "Keep this terminal open while using the site." -ForegroundColor DarkGreen
Write-Host ""

npm run dev:local
