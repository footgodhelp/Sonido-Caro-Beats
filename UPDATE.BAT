@echo off
title Sonido Caro Auto Update

echo ==========================
echo SONIDO CARO AUTO UPDATE
echo ==========================

git add .

git commit -m "Actualizacion %date% %time%"

git push origin main

echo.
echo WEB ACTUALIZADA
pause