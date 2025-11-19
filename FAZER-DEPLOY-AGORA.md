# 🚀 FAZER DEPLOY AGORA - GUIA RÁPIDO

## ✅ PASSO 1: ENVIAR PARA GITHUB (2 minutos)

### 📝 **O QUE FAZER:**
1. Duplo-clique no ficheiro: **`git-push-tudo.bat`**
2. Se pedir login:
   - **Username:** `marcosthenomad-source`
   - **Password:** O teu token do GitHub

### 🔑 **Criar Token GitHub (se ainda não tens):**
1. Vai a: https://github.com/settings/tokens
2. Clica em **"Generate new token (classic)"**
3. Marca a checkbox **"repo"** (todas as opções)
4. Clica **"Generate token"**
5. **COPIA O TOKEN** (só aparece uma vez!)
6. Usa esse token como password

---

## ✅ PASSO 2: CONFIGURAR SECRETS NO GITHUB (1 minuto)

### 📝 **O QUE FAZER:**
1. Vai a: https://github.com/marcosthenomad-source/euconverto.com/settings/secrets/actions
2. Clica **"New repository secret"** (2 vezes)

### 🔐 **Secrets a adicionar:**

**Secret 1:**
- Name: `SUPABASE_PROJECT_ID`
- Value: `eyxcgkztplqkfwjzdflt`

**Secret 2:**
- Name: `SUPABASE_ACCESS_TOKEN`
- Value: (vai buscar ao Supabase - vê abaixo ⬇️)

### 🔑 **Como obter o SUPABASE_ACCESS_TOKEN:**
1. Vai a: https://supabase.com/dashboard/account/tokens
2. Clica em **"Generate new token"**
3. Nome: `GitHub Actions Deploy`
4. **COPIA O TOKEN**
5. Cola no secret `SUPABASE_ACCESS_TOKEN`

---

## ✅ PASSO 3: DEPLOY DO FRONTEND NA VERCEL (2 minutos)

### 📝 **O QUE FAZER:**
1. Duplo-clique no ficheiro: **`deploy-site.bat`**
2. Segue as instruções no ecrã

### 🌐 **Se ainda não tens Vercel CLI instalado:**
```bash
npm install -g vercel
```

Depois corre outra vez: **`deploy-site.bat`**

### 📋 **Durante o deploy:**
- **Project name:** `euconverto-com` (ou o que quiseres)
- **Link to existing project?** `No`
- **Scope:** (escolhe a tua conta)

---

## ✅ PASSO 4: CONFIGURAR DOMÍNIO (opcional)

### 📝 **No Vercel Dashboard:**
1. Vai ao teu projeto
2. **Settings > Domains**
3. Adiciona: `euconverto.com`
4. Segue as instruções para configurar DNS

---

## 🧪 TESTAR TUDO

### ✅ **Backend está OK?**
Abre no browser:
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

**Resposta esperada:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-19T...",
  "service": "euconverto-api"
}
```

### ✅ **Frontend está OK?**
Depois do deploy, a Vercel dá-te um URL tipo:
```
https://euconverto-com.vercel.app
```

Abre esse URL e testa:
1. Homepage carrega? ✅
2. Login funciona? ✅
3. Dashboard aparece? ✅

---

## 🎯 RESUMO DOS 4 PASSOS

```
1️⃣ Duplo-clique: git-push-tudo.bat       (2 min)
2️⃣ Configurar secrets no GitHub          (1 min)
3️⃣ Duplo-clique: deploy-site.bat         (2 min)
4️⃣ Testar no browser                      (1 min)
```

**TOTAL: 6 MINUTOS! 🔥**

---

## ❌ PROBLEMAS?

### ❌ Git push falhou?
- Certifica-te que tens o token correto
- Token precisa de ter permissão "repo"

### ❌ GitHub Actions dá erro?
- Verifica se adicionaste os 2 secrets
- Tokens corretos: `SUPABASE_PROJECT_ID` e `SUPABASE_ACCESS_TOKEN`

### ❌ Vercel deploy falhou?
- Instala Vercel CLI: `npm install -g vercel`
- Tenta login: `vercel login`

### ❌ Frontend não carrega?
- Espera 1-2 minutos (pode demorar)
- Verifica se há erros no Vercel Dashboard

---

## 🆘 CONTACTOS DE EMERGÊNCIA

- **GitHub Repo:** https://github.com/marcosthenomad-source/euconverto.com
- **Supabase Dashboard:** https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt
- **Vercel Dashboard:** https://vercel.com/dashboard

---

**AGORA VAI! É SÓ DUPLO-CLIQUE! 🚀🔥**

*Última atualização: 19 Novembro 2025*
