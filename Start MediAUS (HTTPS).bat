@echo off
title MediAUS secure link
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0https.ps1"
echo.
pause
