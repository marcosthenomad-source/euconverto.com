# ✅ CHECKLIST ANTES DO DEPLOY

## 🎯 OBJETIVO
Garantir que TUDO está configurado antes de fazer deploy!

---

## 📋 PASSO 1: VERIFICAR FICHEIROS ESSENCIAIS

### ✅ Ficheiros do projeto:
- [ ] `/App.tsx` existe
- [ ] `/homepage.tsx` existe  
- [ ] `/login.tsx` existe
- [ ] `/signup.tsx` existe
- [ ] `/forgot-password.tsx` existe
- [ ] `/reset-password.tsx` existe
- [ ] `/dashboard.tsx` existe
- [ ] `/components/` pasta existe com componentes

### ✅ Ficheiros de configuração:
- [ ] `/package.json` existe
- [ ] `/.gitignore` existe
- [ ] `/vercel.json` existe
- [ ] `/supabase/config.toml` existe

### ✅ Backend:
- [ ] `/supabase/functions/server/index.tsx` existe
- [ ] `/supabase/functions/server/kv_store.tsx` existe
- [ ] `/utils/supabase/info.tsx` existe

### ✅ Scripts de deploy:
- [ ] `/git-push-tudo.bat` existe
- [ ] `/deploy-site.bat` existe
- [ ] `/deploy-backend.bat` existe

### ✅ GitHub Actions:
- [ ] `/.github/workflows/deploy.yml` existe

---

## 🔐 PASSO 2: CONFIGURAÇÃO SUPABASE

### ✅ Project ID correto:
```
eyxcgkztplqkfwjzdflt
```

### ✅ URLs corretas em `/utils/supabase/info.tsx`:
```typescript
export const projectId = 'eyxcgkztplqkfwjzdflt';
export const publicAnonKey = 'eyJhbGciOi...'; // Verifica se está preenchida
```

### ✅ Backend já deployed:
- [ ] Abre: https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
- [ ] Vê resposta JSON com `"status": "healthy"`

### ✅ Variáveis de ambiente no Supabase:
- [ ] `RESEND_API_KEY` configurada
- [ ] Vai a: https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/settings/functions

---

## 📧 PASSO 3: CONFIGURAÇÃO RESEND

### ✅ API Key existe:
- [ ] Já foi configurada no Supabase
- [ ] Variável: `RESEND_API_KEY`

### ✅ Email configurado:
- [ ] Remetente: `onboarding@resend.dev`
- [ ] Destinatário feedback: `marcosthenomad@gmail.com`
- [ ] Ficheiro `/supabase/functions/server/index.tsx` tem código de email

### ✅ Testar email:
```bash
# Depois do backend deployed, testa enviando feedback via dashboard
```

---

## 🔑 PASSO 4: AUTENTICAÇÃO

### ✅ Redirect URLs configuradas:

#### No Supabase Dashboard:
1. Vai a: https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/auth/url-configuration
2. Adiciona URLs:

**Site URL:**
```
https://euconverto.com
```

**Redirect URLs (uma por linha):**
```
http://localhost:5173/*
https://euconverto.com/*
https://euconverto.vercel.app/*
https://*.vercel.app/*
```

#### ⚠️ IMPORTANTE:
- [ ] Marca "Allow wildcard domains"
- [ ] Clica em "Save" depois de adicionar!

---

## 🐙 PASSO 5: GITHUB

### ✅ Repositório criado:
- [ ] Vai a: https://github.com/marcosthenomad-source/euconverto.com
- [ ] Verifica que existe

### ✅ Personal Access Token criado:
1. [ ] GitHub → Settings → Developer settings
2. [ ] Personal access tokens → Tokens (classic)
3. [ ] Token tem permissão `repo` (tudo)
4. [ ] Token copiado e guardado (vais precisar para git push)

### ✅ GitHub Secrets configurados:
- [ ] `SUPABASE_PROJECT_ID` = `eyxcgkztplqkfwjzdflt`
- [ ] `SUPABASE_ACCESS_TOKEN` = (token do Supabase)

**Como obter SUPABASE_ACCESS_TOKEN:**
1. Vai a: https://supabase.com/dashboard/account/tokens
2. Clica "Generate new token"
3. Nome: `GitHub Actions`
4. Copia o token
5. Cola no GitHub Secret

---

## ☁️ PASSO 6: VERCEL

### ✅ Conta Vercel:
- [ ] Tens conta no Vercel (https://vercel.com)
- [ ] Email verificado

### ✅ Vercel CLI instalada:
```bash
npm install -g vercel
# OU deixar o script deploy-site.bat instalar automaticamente
```

### ✅ Domínio euconverto.com:
- [ ] Domínio comprado
- [ ] Está registado na tua conta (Hostinger/GoDaddy/etc)

---

## 🧪 PASSO 7: TESTES FINAIS LOCAIS

### ✅ Verificar se falta alguma dependência:
```bash
# Se tiveres node_modules local, verifica:
npm install
```

### ✅ Build local funciona:
```bash
npm run build
# OU ignora se não tens node_modules
```

---

## 🚀 PASSO 8: PRONTO PARA DEPLOY!

Se TODAS as checkboxes acima estiverem ✅, então:

### 1️⃣ Enviar para GitHub:
```bash
duplo-clique: git-push-tudo.bat
```

**Vai pedir:**
- Username: `marcosthenomad-source`
- Password: **[O TOKEN que criaste, NÃO a password!]**

### 2️⃣ Verificar GitHub Actions:
- [ ] Vai a: https://github.com/marcosthenomad-source/euconverto.com/actions
- [ ] Vê se workflow "Deploy Backend to Supabase" está a correr
- [ ] Espera terminar (1-2 minutos)
- [ ] Verifica se ficou ✅ verde

### 3️⃣ Deploy Frontend:
```bash
duplo-clique: deploy-site.bat
```

**Vai pedir:**
- Setup and deploy? `Y`
- Project name: `euconverto` (ou o que quiseres)
- Directory: `.` (apenas Enter)
- Override settings? `N`

### 4️⃣ Testar TUDO:

**Backend:**
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

**Frontend:**
```
https://euconverto.vercel.app
# OU
https://euconverto.com (se DNS já configurado)
```

**Funcionalidades:**
- [ ] Homepage carrega
- [ ] Clica "Login" → abre página de login
- [ ] Clica "Começar Agora" → abre signup
- [ ] Cria conta de teste
- [ ] Recebe email de confirmação (opcional se email_confirm: true)
- [ ] Faz login
- [ ] Dashboard abre
- [ ] Envia feedback → verifica se chega email

---

## ⚠️ PROBLEMAS COMUNS

### Git push falha com 403:
**CAUSA:** Estás a usar password em vez de token  
**SOLUÇÃO:** Usa o Personal Access Token como password

### GitHub Actions falha:
**CAUSA:** Secrets não configurados ou errados  
**SOLUÇÃO:** Verifica nomes EXATOS dos secrets

### Vercel deploy falha:
**CAUSA:** Pode faltar package.json ou vercel.json  
**SOLUÇÃO:** Verifica se ambos existem

### Site carrega mas login não funciona:
**CAUSA:** Redirect URLs não configuradas no Supabase  
**SOLUÇÃO:** Vai ao Passo 4 desta checklist

### Feedback não envia email:
**CAUSA:** RESEND_API_KEY não configurada  
**SOLUÇÃO:** Vai a Supabase → Settings → Edge Functions → Add secret

---

## 📞 CONTACTO DE EMERGÊNCIA

Se algo correr mal, tira screenshot e mostra!

---

## 🎉 SUCESSO!

Quando tudo estiver ✅:
- ✅ Código no GitHub
- ✅ Backend auto-deployed via Actions
- ✅ Frontend online no Vercel
- ✅ Domínio a apontar para Vercel
- ✅ Emails a funcionar
- ✅ Autenticação OK

**PARABÉNS! ESTÁS LIVE! 🚀**

---

*Última atualização: 19 Novembro 2025*
