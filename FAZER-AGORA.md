# 🔥 FAZER AGORA - PASSO A PASSO

## ✅ PASSO 1: ENVIAR CÓDIGO PARA GITHUB (30 segundos)

### **Duplo-clique aqui:**
```
git-push-tudo.bat
```

**O que vai acontecer:**
1. ✅ Inicializa Git
2. ✅ Adiciona TODOS os ficheiros
3. ✅ Cria commit inicial
4. ✅ Envia tudo para GitHub

**Se pedir login:**
- Username: `marcosthenomad-source`
- Password: **[USA UM PERSONAL ACCESS TOKEN]**

### Como criar o token:
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Marca: `repo` (tudo)
5. Copia o token e usa como password

---

## ✅ PASSO 2: CONFIGURAR GITHUB SECRETS (1 minuto)

Vai a: https://github.com/marcosthenomad-source/euconverto.com/settings/secrets/actions

### Adiciona estes 2 secrets:

#### **Secret 1:**
- Name: `SUPABASE_PROJECT_ID`
- Value: `eyxcgkztplqkfwjzdflt`

#### **Secret 2:**
- Name: `SUPABASE_ACCESS_TOKEN`
- Value: **[Vai buscar ao Supabase!]**

### Como obter o SUPABASE_ACCESS_TOKEN:
1. Abre: https://supabase.com/dashboard/account/tokens
2. Clica em **"Generate new token"**
3. Nome: `GitHub Actions`
4. Copia o token
5. Cola no GitHub Secret

---

## ✅ PASSO 3: DEPLOY DO FRONTEND (2 minutos)

### **Duplo-clique aqui:**
```
deploy-site.bat
```

**O que vai acontecer:**
1. ✅ Instala Vercel CLI (se necessário)
2. ✅ Faz deploy do site
3. ✅ Site fica ONLINE!

**Se for a primeira vez:**
- Escolhe: `Set up and deploy`
- Project name: `euconverto`
- Directory: `.` (deixa vazio)
- Faz override das settings? `N` (No)

---

## ✅ PASSO 4: TESTAR TUDO (30 segundos)

### Backend:
Abre: https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health

**Deve aparecer:**
```json
{
  "status": "healthy",
  "timestamp": "...",
  "service": "euconverto-api"
}
```

### Frontend:
Abre: https://euconverto.com (ou o URL que o Vercel deu)

**Deve aparecer a homepage com:**
- ✅ Logo EuConverto
- ✅ Menu de navegação
- ✅ Botões "Login" e "Começar Agora"

---

## 🎯 RESUMO DOS 4 PASSOS:

1. ✅ Duplo-clique em `git-push-tudo.bat`
2. ✅ Configura GitHub Secrets (2 secrets)
3. ✅ Duplo-clique em `deploy-site.bat`
4. ✅ Testa tudo

**TEMPO TOTAL: 4 MINUTOS!**

---

## ❓ PROBLEMAS?

### "Git not found"
- Instala: https://git-scm.com/downloads
- Reinicia o terminal

### "Authentication failed"
- **USA UM TOKEN, NÃO A PASSWORD!**
- Segue as instruções acima para criar token

### "Vercel not found"
- O script instala automaticamente!
- Ou instala: `npm install -g vercel`

### "Erro no GitHub Actions"
- Verifica se criaste os 2 secrets corretamente
- Nomes têm de ser EXATAMENTE iguais!

---

## 🎉 QUANDO ACABAR:

✅ Repositório no GitHub com todo o código  
✅ Backend deployed automaticamente via GitHub Actions  
✅ Frontend online no Vercel/euconverto.com  
✅ Sistema de feedback a funcionar  
✅ Tudo operacional!

---

## 📞 CONTACTO

Se houver algum problema, mostra-me screenshot do erro!

---

**AGORA FAZ ISTO! 🔥**

*Última atualização: 19 Novembro 2025*
