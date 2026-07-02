@echo off
title SONIDO CARO STORAGE MANAGER
color 0E

:MENU
cls
echo ==========================================
echo SONIDO CARO STORAGE MANAGER
echo ==========================================
echo.
echo [1] Guardar BEATS en BACKUP
echo [2] Restaurar BEATS
echo [3] Salir
echo.
set /p opcion=Selecciona una opcion:

if "%opcion%"=="1" goto BACKUP
if "%opcion%"=="2" goto RESTORE
if "%opcion%"=="3" exit
goto MENU

:BACKUP
cls

if not exist "..\BEATS_BACKUP" mkdir "..\BEATS_BACKUP"

if exist "BEATS" (
move "BEATS" "..\BEATS_BACKUP"
echo.
echo Carpeta BEATS movida correctamente.
) else (
echo.
echo No existe la carpeta BEATS.
)

pause
goto MENU

:RESTORE
cls

if exist "..\BEATS_BACKUP\BEATS" (
move "..\BEATS_BACKUP\BEATS" "."
echo.
echo Carpeta BEATS restaurada correctamente.
) else (
echo.
echo No existe una copia de BEATS en BACKUP.
)

pause
goto MENU
