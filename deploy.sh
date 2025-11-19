#!/bin/bash

echo "===================================="
echo "🚀 EUCONVERTO - DEPLOY AUTOMÁTICO"
echo "===================================="
echo ""

# Verificar se o Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI não está instalado!"
    echo ""
    echo "📥 Instalando Supabase CLI..."
    npm install -g supabase
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Erro ao instalar Supabase CLI"
        echo "💡 Tenta instalar manualmente: npm install -g supabase"
        exit 1
    fi
fi

echo "✅ Supabase CLI encontrado!"
echo ""

# Verificar se já está logado
supabase projects list &> /dev/null
if [ $? -ne 0 ]; then
    echo "🔐 A fazer login no Supabase..."
    echo ""
    echo "⚠️  Vai abrir o browser. Faz login e volta aqui!"
    echo ""
    read -p "Pressiona ENTER para continuar..."
    supabase login
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Erro ao fazer login"
        exit 1
    fi
fi

echo "✅ Login OK!"
echo ""

# Link ao projeto (se ainda não estiver linked)
echo "🔗 A conectar ao projeto Supabase..."
supabase link --project-ref eyxcgkztplqkfwjzdflt
if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Erro ao conectar. Vais precisar introduzir a database password."
    echo "💡 Encontras a password no Supabase Dashboard > Project Settings > Database > Database password"
    echo ""
    read -p "Pressiona ENTER para tentar novamente..."
    supabase link --project-ref eyxcgkztplqkfwjzdflt
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Erro ao conectar ao projeto"
        exit 1
    fi
fi

echo "✅ Projeto conectado!"
echo ""

# Deploy da Edge Function
echo "🚀 A fazer deploy do servidor..."
echo ""
supabase functions deploy make-server-12d56551 --no-verify-jwt
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Erro ao fazer deploy"
    exit 1
fi

echo ""
echo "===================================="
echo "✅ DEPLOY CONCLUÍDO COM SUCESSO! 🎉"
echo "===================================="
echo ""
echo "🌐 URL do Backend:"
echo "https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551"
echo ""
echo "🧪 Testa aqui:"
echo "https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health"
echo ""
echo "Deve responder: {\"status\":\"ok\"}"
echo ""
echo "===================================="
