#!/bin/bash

echo "===================================="
echo "📦 EUCONVERTO - CRIAR PACOTE ZIP"
echo "===================================="
echo ""

# Nome do arquivo ZIP com timestamp
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
ZIP_NAME="euconverto-completo-${TIMESTAMP}.zip"

echo "📁 A criar pacote: $ZIP_NAME"
echo ""

# Verificar se o zip está instalado
if ! command -v zip &> /dev/null; then
    echo "❌ Comando 'zip' não encontrado!"
    echo ""
    echo "📥 Instala com:"
    echo "  Ubuntu/Debian: sudo apt-get install zip"
    echo "  Mac: já vem instalado (usa tar como alternativa)"
    echo ""
    exit 1
fi

echo "🗜️  A comprimir ficheiros..."
echo ""

# Criar o ZIP
zip -r "$ZIP_NAME" . -x "*.git*" "node_modules/*" ".DS_Store" "*.log"

if [ $? -eq 0 ]; then
    echo ""
    echo "===================================="
    echo "✅ ZIP CRIADO COM SUCESSO! 🎉"
    echo "===================================="
    echo ""
    echo "📦 Ficheiro: $ZIP_NAME"
    echo "📍 Localização: $(pwd)"
    echo ""
    echo "Agora podes:"
    echo "1. Fazer download deste ZIP"
    echo "2. Extrair numa pasta no teu PC"
    echo "3. Executar ./deploy.sh"
    echo ""
    echo "===================================="
else
    echo ""
    echo "❌ Erro ao criar ZIP"
    echo ""
    echo "Alternativa com tar:"
    echo "tar -czf ${ZIP_NAME%.zip}.tar.gz ."
fi

echo ""
