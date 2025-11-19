# 🚀 SETUP VERCEL - PASSO-A-PASSO

## ⏱️ Tempo total: 10 minutos

---

## 📋 O QUE VAIS PRECISAR:

- ✅ Conta Google ou GitHub (para login)
- ✅ Domínio euconverto.com (já tens!)
- ✅ Acesso ao painel do domínio (onde compraste)

---

## 🎯 PASSO 1: CRIAR CONTA VERCEL (2 minutos)

### 1. Abre o browser e vai a:
```
https://vercel.com/signup
```

### 2. Clica em **"Continue with Google"** ou **"Continue with GitHub"**
- Escolhe a opção mais fácil para ti
- Usa a mesma conta que usas sempre

### 3. Autoriza o acesso
- Clica "Allow" / "Permitir"

### 4. Preenche o formulário:
- **Name:** O teu nome
- **Company (opcional):** euconverto ou deixa vazio
- Clica **"Continue"**

### 5. PRONTO! Conta criada! ✅

---

## 💻 PASSO 2: INSTALAR VERCEL CLI (3 minutos)

### 1. Abre o **CMD** (Command Prompt):
- Windows: Prime tecla Windows
- Escreve: `cmd`
- Enter

### 2. Cola este comando:
```cmd
npm install -g vercel
```

### 3. Prime Enter e espera
- Vai aparecer muito texto
- Espera até dizer "added X packages"
- Demora ~1 minuto

### 4. Testa se funcionou:
```cmd
vercel --version
```

Se aparecer um número (ex: "33.0.1"), está OK! ✅

---

## 🔗 PASSO 3: FAZER LOGIN NO VERCEL (1 minuto)

### 1. No CMD, escreve:
```cmd
vercel login
```

### 2. Escolhe a opção:
```
> Continue with Google
> Continue with GitHub
> Continue with Email
```
Use as setas ↑↓ e prime Enter

### 3. Abre no browser
- Vai abrir uma página
- Clica **"Confirm"**

### 4. Volta ao CMD
- Deve dizer: "✅ Logged in"

---

## 📁 PASSO 4: PRIMEIRO DEPLOY (2 minutos)

### 1. Vai à pasta do projeto:
```cmd
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com
```

### 2. Faz o primeiro deploy:
```cmd
vercel
```

### 3. Responde às perguntas:

**"Set up and deploy?"**
→ Prime **Y** (Yes)

**"Which scope?"**
→ Prime **Enter** (usa o default)

**"Link to existing project?"**
→ Prime **N** (No)

**"What's your project's name?"**
→ Escreve: `euconverto`
→ Prime Enter

**"In which directory is your code located?"**
→ Prime **Enter** (usa ./)

**"Want to override the settings?"**
→ Prime **N** (No)

### 4. Espera...
- Vai aparecer muito texto
- Demora 1-2 minutos
- No fim diz: **"✅ Production: https://euconverto.vercel.app"**

### 5. Testa!
- Abre o browser
- Vai a: `https://euconverto.vercel.app`
- Deve aparecer o teu site! 🎉

---

## 🌐 PASSO 5: LIGAR O DOMÍNIO euconverto.com (3 minutos)

### 1. Vai ao dashboard Vercel:
```
https://vercel.com/dashboard
```

### 2. Clica no projeto **"euconverto"**

### 3. Clica no separador **"Settings"** (no topo)

### 4. No menu lateral, clica **"Domains"**

### 5. Escreve: `euconverto.com`
- Clica **"Add"**

### 6. Vai aparecer instruções DNS

### 7. Abre noutra aba onde compraste o domínio
- Exemplo: GoDaddy, Namecheap, etc.

### 8. Vai às definições DNS do domínio

### 9. Adiciona os registos que o Vercel te deu:

**TIPO A:**
```
Name: @
Value: 76.76.21.21
```

**TIPO CNAME:**
```
Name: www
Value: cname.vercel-dns.com
```

### 10. Guarda as mudanças DNS

### 11. Volta ao Vercel
- Clica **"Refresh"** ou espera 5 minutos

### 12. Quando aparecer ✅ ao lado de euconverto.com:
- **PRONTO!** Domínio ligado!

### 13. Testa:
```
https://euconverto.com
```

Deve aparecer o site! 🚀

---

## ✅ PASSO 6: TESTAR OS FICHEIROS MÁGICOS

### 1. Vai à pasta do projeto no Explorador de Ficheiros

### 2. Procura o ficheiro: **`deploy-site.bat`**

### 3. **DUPLO-CLIQUE** nele

### 4. Aparece janela preta:
```
🌐 EUCONVERTO.COM - DEPLOY DO SITE
📦 A preparar o site para publicação...
🚀 A fazer deploy no Vercel...
⏳ Isto pode demorar 1-2 minutos...
```

### 5. Espera...

### 6. No fim deve dizer:
```
✅ SITE ONLINE EM EUCONVERTO.COM!
🌐 Abre o browser e vai a: https://euconverto.com
```

### 7. Abre euconverto.com → Está atualizado! 🎉

---

## 🎯 A PARTIR DE AGORA:

### **Para atualizar o SITE:**
1. Pedes mudanças no chat
2. Eu faço
3. Tu: **DUPLO-CLIQUE** em `deploy-site.bat`
4. Espera 2 minutos
5. Refresh em euconverto.com
6. PRONTO! ✅

### **Para atualizar o BACKEND:**
1. Pedes mudanças no chat
2. Eu faço
3. Tu: **DUPLO-CLIQUE** em `redeploy.bat`
4. Espera 30 segundos
5. PRONTO! ✅

---

## ❓ PROBLEMAS COMUNS:

### **"vercel: command not found"**
→ Reinicia o CMD e tenta outra vez
→ Ou corre: `npm install -g vercel` novamente

### **"DNS not configured"**
→ Espera 10-30 minutos (DNS demora a propagar)
→ Testa: https://dnschecker.org

### **"Deploy failed"**
→ Tira print do erro
→ Manda no chat
→ Eu resolvo

### **Site não atualiza**
→ Força refresh: **Ctrl + F5**
→ Ou abre em janela anónima

---

## 🆘 PRECISO DE AJUDA!

Manda no chat:
1. Print do erro
2. Diz em que passo estás
3. Eu ajudo em 2 minutos! 💪

---

## 🎉 PARABÉNS!

Agora tens:
- ✅ Site online em euconverto.com
- ✅ Backend funcional no Supabase
- ✅ Sistema de duplo-clique para tudo
- ✅ Domínio profissional

**SEM SABER CÓDIGO!** 🚀

---

## 📞 PRÓXIMOS PASSOS:

1. ✅ Testar login/registo
2. ✅ Adicionar Stripe (pagamentos)
3. ✅ Personalizar cores/textos
4. ✅ Lançar! 💰

Vem ao chat quando estiveres pronto! 😊
