# Fix all @radix-ui imports
Get-ChildItem -Path "components/ui" -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace '@radix-ui/([a-z-]+)@[\d.]+', '@radix-ui/$1'
    Set-Content -Path $_.FullName -Value $content -NoNewline
}

Write-Host "Fixed all imports!" -ForegroundColor Green