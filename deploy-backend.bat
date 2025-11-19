@echo off
echo ================================
echo   DEPLOY BACKEND - EUCONVERTO
echo ================================
echo.
echo Fazendo deploy para Supabase...
echo.

cd /d "%~dp0"

supabase functions deploy make-server-12d56551 --project-ref eyxcgkztplqkfwjzdflt

if %errorlevel% equ 0 (
    echo.
    echo ================================
    echo   DEPLOY CONCLUIDO COM SUCESSO!
    echo ================================
    echo.
    echo Testa o backend em:
    echo https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
    echo.
) else (
    echo.
    echo ================================
    echo   ERRO NO DEPLOY!
    echo ================================
    echo.
    echo Verifica se o Supabase CLI esta instalado:
    echo https://supabase.com/docs/guides/cli
    echo.
)

pause
