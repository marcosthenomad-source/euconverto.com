@echo off
chcp 65001 >nul
echo ====================================
echo 🚀 EUCONVERTO - DEPLOY AUTOMÁTICO
echo ====================================
echo.

REM Verificar se o Supabase CLI está instalado
where supabase >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Supabase CLI não está instalado!
    echo.
    echo 📥 Instalando Supabase CLI...
    npm install -g supabase
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ❌ Erro ao instalar Supabase CLI
        echo 💡 Tenta instalar manualmente: npm install -g supabase
        pause
        exit /b 1
    )
)

echo ✅ Supabase CLI encontrado!
echo.

REM Verificar se já está logado
supabase projects list >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 🔐 A fazer login no Supabase...
    echo.
    echo ⚠️  Vai abrir o browser. Faz login e volta aqui!
    echo.
    pause
    supabase login
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ❌ Erro ao fazer login
        pause
        exit /b 1
    )
)

echo ✅ Login OK!
echo.

REM Link ao projeto (se ainda não estiver linked)
echo 🔗 A conectar ao projeto Supabase...
supabase link --project-ref eyxcgkztplqkfwjzdflt
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  Erro ao conectar. Vais precisar introduzir a database password.
    echo 💡 Encontras a password no Supabase Dashboard ^> Project Settings ^> Database ^> Database password
    echo.
    pause
    supabase link --project-ref eyxcgkztplqkfwjzdflt
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ❌ Erro ao conectar ao projeto
        pause
        exit /b 1
    )
)

echo ✅ Projeto conectado!
echo.

REM Deploy da Edge Function
echo 🚀 A fazer deploy do servidor...
echo.
supabase functions deploy make-server-12d56551 --no-verify-jwt
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Erro ao fazer deploy
    pause
    exit /b 1
)

echo.
echo ====================================
echo ✅ DEPLOY CONCLUÍDO COM SUCESSO! 🎉
echo ====================================
echo.
echo 🌐 URL do Backend:
echo https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551
echo.
echo 🧪 Testa aqui:
echo https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
echo.
echo Deve responder: {"status":"ok"}
echo.
echo ====================================
pause
