@echo off
echo ========================================
echo   ENVIANDO TUDO PARA GITHUB!
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Inicializando Git...
git init
echo.

echo [2/5] Adicionando TODOS os ficheiros...
git add .
echo.

echo [3/5] Criando commit inicial...
git commit -m "🚀 Deploy inicial completo - EuConverto.com"
echo.

echo [4/5] Adicionando repositorio remoto...
git remote remove origin 2>nul
git remote add origin https://github.com/marcosthenomad-source/euconverto.com.git
echo.

echo [5/5] Enviando para GitHub...
git branch -M main
git push -u origin main --force
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo   SUCESSO! TUDO NO GITHUB!
    echo ========================================
    echo.
    echo Repositorio: https://github.com/marcosthenomad-source/euconverto.com
    echo.
    echo PROXIMOS PASSOS:
    echo 1. Vai ao GitHub
    echo 2. Settings ^> Secrets and variables ^> Actions
    echo 3. Adiciona estes secrets:
    echo    - SUPABASE_PROJECT_ID = eyxcgkztplqkfwjzdflt
    echo    - SUPABASE_ACCESS_TOKEN = (vai buscar ao Supabase Dashboard)
    echo.
    echo Para fazer deploy do frontend:
    echo    Duplo-clique em: deploy-site.bat
    echo.
) else (
    echo ========================================
    echo   ERRO!
    echo ========================================
    echo.
    echo Se pedir login, usa:
    echo Username: marcosthenomad-source
    echo Password: (teu token do GitHub)
    echo.
    echo Para criar token:
    echo 1. GitHub ^> Settings ^> Developer settings
    echo 2. Personal access tokens ^> Tokens (classic)
    echo 3. Generate new token (classic)
    echo 4. Marca: repo (tudo)
    echo 5. Copia o token e usa como password
    echo.
)

pause
