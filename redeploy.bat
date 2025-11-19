@echo off
echo ========================================
echo 🚀 EUCONVERTO.COM - REDEPLOY BACKEND
echo ========================================
echo.

cd /d "%~dp0"

echo 📦 Fazendo upload do servidor...
echo.

npx supabase functions deploy server

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ DEPLOY COMPLETO!
    echo ========================================
    echo.
    echo 🌐 API: https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551
    echo.
) else (
    echo.
    echo ❌ ERRO NO DEPLOY!
    echo.
)

pause
