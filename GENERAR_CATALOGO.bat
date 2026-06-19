@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
echo [ > beats.json
set "primero=1"
for /f "delims=" %%f in ('dir /b /a-d BEATS') do (
set "archivo=%%f"
set "nombre=%%~nf"
set "productor=Ale The Producer"
echo !nombre! | find /i "TEST_" >nul
if not errorlevel 1 set "productor=Test"
echo !nombre! | find /i "ATP_" >nul
if not errorlevel 1 set "productor=Ale The Producer"
set "titulo=!nombre!"
set "titulo=!titulo:ATP_=!"
set "titulo=!titulo:TEST_=!"
if "!primero!"=="0" echo,>> beats.json
echo {"titulo":"!titulo!","productor":"!productor!","archivo":"BEATS/!archivo!"}>> beats.json
set "primero=0"
)
echo ]>> beats.json
pause