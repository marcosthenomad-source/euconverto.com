# 🚀 DEPLOY AUTOMÁTICO VIA GITHUB (A FORMA CORRETA)

## ✅ Por que GitHub?
- **Deploy automático** sempre que fazes `git push`
- **Sem problemas** de permissões ou CLI
- **Profissional** - é assim que toda a gente faz
- **Simples** - configura 1 vez, funciona para sempre

---

## 📋 SETUP COMPLETO (10 minutos)

### **PASSO 1: Criar Repositório no GitHub**

1. Vai a https://github.com/new
2. Nome: `euconverto`
3. Privacidade: **Private** (recomendado)
4. ✅ **NÃO** marques "Add README" (já tens ficheiros)
5. Clica **"Create repository"**

---

### **PASSO 2: Obter Token do Supabase**

1. Vai a https://supabase.com/dashboard/account/tokens
2. Clica **"Generate New Token"**
3. Nome: `github-deploy`
4. **COPIA** o token (começa com `sbp_...`)
5. ⚠️ **GUARDA BEM** - só aparece 1 vez!

---

### **PASSO 3: Configurar Secrets no GitHub**

1. No teu repositório GitHub, vai a **Settings** (ícone engrenagem)
2. Menu lateral → **Secrets and variables** → **Actions**
3. Clica **"New repository secret"**

**Secret 1:**
- Name: `SUPABASE_ACCESS_TOKEN`
- Value: `sbp_...` (token que copiaste)
- **"Add secret"**

**Secret 2:**
- Name: `SUPABASE_PROJECT_ID`
- Value: `eyxcgkztplqkfwjzdflt`
- **"Add secret"**

---

### **PASSO 4: Enviar Código para GitHub**

Abre **CMD** ou **PowerShell** na pasta do projeto:

```bash
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com
```

Depois executa (substitui `SEU_USERNAME` pelo teu username do GitHub):

```bash
git init
git add .
git commit -m "Initial commit - EuConverto"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/euconverto.git
git push -u origin main
```

---

### **PASSO 5: Deploy Automático! 🎉**

1. Vai ao teu repo no GitHub
2. Clica no separador **"Actions"**
3. Vais ver o workflow **"Deploy to Supabase"** a correr
4. Espera 1-2 minutos
5. ✅ Quando ficar verde: **DEPLOY CONCLUÍDO!**

---

## 🧪 TESTAR

Abre no browser:
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

Deve aparecer:
```json
{"status":"healthy","timestamp":"...","service":"euconverto-api"}
```

---

## 🔄 DEPLOYAR ALTERAÇÕES (No futuro)

Sempre que fizeres mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

**PRONTO!** Deploy automático! 🚀

---

## ⚠️ TROUBLESHOOTING

### Erro: "git: command not found"
1. Instala Git: https://git-scm.com/download/win
2. Reinicia o CMD
3. Tenta novamente

### Erro no GitHub Actions
1. Vai a **Actions** → clica no workflow falhado
2. Vê os logs vermelhos
3. Verifica se os Secrets estão corretos

### Token expirado
1. Gera novo token: https://supabase.com/dashboard/account/tokens
2. Atualiza o secret `SUPABASE_ACCESS_TOKEN` no GitHub

---

## 🎯 RESUMO SUPER RÁPIDO

1. Cria repo no GitHub
2. Copia token do Supabase
3. Adiciona 2 secrets no GitHub
4. `git push`
5. **FUNCIONOU!** ✅

---

**É ISTO! Muito mais simples e profissional!**
