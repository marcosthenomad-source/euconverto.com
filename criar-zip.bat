@echo off
chcp 65001 >nul
echo ====================================
echo 📦 EUCONVERTO - CRIAR PACOTE ZIP
echo ====================================
echo.

REM Nome do arquivo ZIP
set ZIP_NAME=euconverto-completo-%date:~-4,4%%date:~-7,2%%date:~-10,2%-%time:~0,2%%time:~3,2%%time:~6,2%.zip
set ZIP_NAME=%ZIP_NAME: =0%

echo 📁 A criar pacote: %ZIP_NAME%
echo.

REM Verificar se o PowerShell está disponível
where powershell >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PowerShell não encontrado!
    echo.
    echo Por favor, copia manualmente todos os ficheiros para uma pasta.
    pause
    exit /b 1
)

echo 🗜️  A comprimir ficheiros...
echo.

REM Criar o ZIP usando PowerShell
powershell -Command "Compress-Archive -Path '.\*' -DestinationPath '.\%ZIP_NAME%' -Force -CompressionLevel Optimal"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================
    echo ✅ ZIP CRIADO COM SUCESSO! 🎉
    echo ====================================
    echo.
    echo 📦 Ficheiro: %ZIP_NAME%
    echo 📍 Localização: %CD%
    echo.
    echo Agora podes:
    echo 1. Fazer download deste ZIP
    echo 2. Extrair numa pasta no teu PC
    echo 3. Executar deploy.bat
    echo.
    echo ====================================
) else (
    echo.
    echo ❌ Erro ao criar ZIP
    echo.
    echo Tenta copiar manualmente:
    echo 1. Seleciona todos os ficheiros
    echo 2. Clica com botão direito
    echo 3. Enviar para ^> Pasta comprimida
)

echo.
pause
