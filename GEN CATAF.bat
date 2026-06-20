@echo off
setlocal EnableDelayedExpansion

echo [ > beats.json

set first=1

for %%f in (BEATS*.wav BEATS*.mp3) do (

set "archivo=%%~nxf"
set "nombre=%%~nf"

set "productor=Desconocido"
set "titulo=!nombre!"

echo !nombre! | findstr /B "ATP_" >nul
if !errorlevel! == 0 (
set "productor=Ale The Producer"
set "titulo=!titulo:ATP_=!"
)

echo !nombre! | findstr /B "TEST_" >nul
if !errorlevel! == 0 (
set "productor=Test"
set "titulo=!titulo:TEST_=!"
)

if !first! == 0 (
echo,>> beats.json
)

echo {"titulo":"!titulo!","productor":"!productor!","archivo":"BEATS/!archivo!"}>> beats.json

set first=0
)

echo ]>> beats.json

echo Catalogo generado correctamente.
pause
