@echo off
title Sonido Caro - Separar Manager

echo ==============================
echo Moviendo archivos del Manager
echo ==============================
echo.

if exist "SonidoCaroManager.exe" move "SonidoCaroManager.exe" ".."
if exist "config.json" move "config.json" ".."
if exist "*.db" move "*.db" ".."
if exist "*.log" move "*.log" ".."

if exist "logs" move "logs" ".."
if exist "cache" move "cache" ".."
if exist "temp" move "temp" ".."
if exist "output" move "output" ".."
if exist "build" move "build" ".."
if exist "dist" move "dist" ".."
if exist "python" move "python" ".."
if exist "ffmpeg" move "ffmpeg" ".."

echo.
echo ==============================
echo Proceso finalizado
echo ==============================
echo.
pause
