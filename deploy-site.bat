@echo off
echo ========================================
echo 🌐 EUCONVERTO.COM - DEPLOY DO SITE
echo ========================================
echo.

cd /d "%~dp0"

echo 📦 A preparar o site para publicacao...
echo.

REM Verificar se tem Vercel CLI instalado
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Vercel CLI nao encontrado. A instalar...
    echo.
    npm install -g vercel
    echo.
)

echo 🚀 A fazer deploy no Vercel...
echo.
echo ⏳ Isto pode demorar 1-2 minutos...
echo.

vercel --prod

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ SITE ONLINE EM EUCONVERTO.COM!
    echo ========================================
    echo.
    echo 🌐 Abre o browser e vai a: https://euconverto.com
    echo.
) else (
    echo.
    echo ❌ ERRO NO DEPLOY!
    echo.
    echo 💡 Se e a primeira vez:
    echo    1. Corre este ficheiro outra vez
    echo    2. Segue as instrucoes no ecra
    echo    3. Escolhe as opcoes por defeito
    echo.
)

pause
