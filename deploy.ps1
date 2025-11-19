# EuConverto.com - Deploy Script para Supabase
# Execute: .\deploy.ps1

Write-Host "🚀 DEPLOY EUCONVERTO.COM - BACKEND" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Supabase CLI está instalado
Write-Host "📦 Verificando Supabase CLI..." -ForegroundColor Yellow
$supabaseInstalled = Get-Command supabase -ErrorAction SilentlyContinue

if (-not $supabaseInstalled) {
    Write-Host "❌ Supabase CLI não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instala assim:" -ForegroundColor Yellow
    Write-Host "scoop install supabase" -ForegroundColor White
    Write-Host ""
    Write-Host "Ou via npm:" -ForegroundColor Yellow
    Write-Host "npm install -g supabase" -ForegroundColor White
    exit 1
}

Write-Host "✅ Supabase CLI instalado!" -ForegroundColor Green
Write-Host ""

# Login no Supabase
Write-Host "🔐 Fazendo login no Supabase..." -ForegroundColor Yellow
Write-Host "Isto vai abrir o browser para autenticação." -ForegroundColor Gray
Write-Host ""

supabase login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no login!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Login bem sucedido!" -ForegroundColor Green
Write-Host ""

# Link ao projeto
Write-Host "🔗 A ligar ao projeto Supabase..." -ForegroundColor Yellow
Write-Host "Insere o PROJECT ID do teu projeto (encontras em Project Settings):" -ForegroundColor Gray
$projectId = Read-Host "Project ID"

supabase link --project-ref $projectId

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao ligar ao projeto!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Projeto linkado!" -ForegroundColor Green
Write-Host ""

# Deploy das Edge Functions
Write-Host "🚀 Fazendo deploy do servidor API..." -ForegroundColor Yellow

supabase functions deploy server

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no deploy!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
Write-Host ""

# Inicializar admin
Write-Host "👑 Quer inicializar a conta ADMIN? (S/N)" -ForegroundColor Yellow
$initAdmin = Read-Host

if ($initAdmin -eq "S" -or $initAdmin -eq "s") {
    Write-Host ""
    Write-Host "Criando conta ADMIN..." -ForegroundColor Yellow
    
    $apiUrl = "https://$projectId.supabase.co/functions/v1/make-server-12d56551/admin/init"
    
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Headers @{
            "Content-Type" = "application/json"
        }
        
        Write-Host ""
        Write-Host "✅ CONTA ADMIN CRIADA!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📧 Email: admin@euconverto.com" -ForegroundColor Cyan
        Write-Host "🔑 Password: Admin123!@#" -ForegroundColor Cyan
        Write-Host ""
    } catch {
        Write-Host "⚠️ Aviso: Não foi possível criar admin automaticamente" -ForegroundColor Yellow
        Write-Host "Podes criar manualmente depois." -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "🎉 DEPLOY COMPLETO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URL da API:" -ForegroundColor Cyan
Write-Host "https://$projectId.supabase.co/functions/v1/make-server-12d56551" -ForegroundColor White
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Atualiza o frontend com o PROJECT ID" -ForegroundColor White
Write-Host "2. Testa o login em: https://euconverto.com" -ForegroundColor White
Write-Host "3. Verifica as leads no dashboard" -ForegroundColor White
Write-Host ""
