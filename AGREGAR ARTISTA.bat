@echo off
title Agregar Productor

set /p codigo=Codigo del productor (ej: ATP):
set /p nombre=Nombre del productor:

echo %codigo%=%nombre%>>productores.txt

echo.
echo Productor agregado correctamente.
pause
