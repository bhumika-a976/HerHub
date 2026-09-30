@echo off
cd /d "%~dp0"
title HerHub Application Server

echo ===================================================
echo ✨ HerHub - Intelligent Opportunity-Discovery Platform
echo 🌐 Opening: http://127.0.0.1:8080
echo 📁 Directory: %~dp0
echo ===================================================

start http://127.0.0.1:8080

where python >nul 2>nul
if %errorlevel% equ 0 (
    python server.py 8080
) else (
    py server.py 8080
)

pause
