# 🎓 Supabase para Iniciantes - Guia SUPER SIMPLES

## 📍 ONDE ESTÁS AGORA:

Tens o Supabase aberto e estás confuso. **É NORMAL!** Vou explicar tudo passo a passo.

---

## 🗺️ MAPA DO SUPABASE (Barra Lateral Esquerda):

Nas tuas screenshots, vejo esta barra à esquerda com várias opções:

```
📊 Project Overview      ← Visão geral do projeto
📋 Table Editor         ← Ver/editar tabelas da base de dados
💻 SQL Editor           ← Escrever comandos SQL (não precisas!)
🗄️  Database            ← Configurações de base de dados
🔐 Authentication       ← ⭐ É AQUI QUE VAIS! (emails e URLs)
💾 Storage              ← Armazenar ficheiros
⚡ Edge Functions       ← Funções serverless (já tens o backend!)
📡 Realtime             ← Dados em tempo real
⭐ Advisors             ← Sugestões
📊 Reports              ← Relatórios
📝 Logs                 ← Ver logs/erros
📖 API Docs             ← Documentação da API
🔌 Integrations         ← Integrações externas
⚙️  Project Settings    ← Configurações gerais
```

---

## 🎯 O QUE PRECISAS FAZER (2 COISAS):

### **TAREFA 1: Configurar URLs** (Para os links dos emails funcionarem)
### **TAREFA 2: Configurar Template de Email** (Para o email ficar bonito)

**PODES SALTAR** a configuração de SMTP por agora! O Supabase já envia emails automaticamente!

---

## 📝 TAREFA 1: CONFIGURAR REDIRECT URLs

### **Passo 1: Ir para Authentication**

```
1. Na barra lateral ESQUERDA (a que tens na screenshot)
2. Clica em "🔐 Authentication"
3. Vai abrir uma nova página
```

### **Passo 2: Ir para URL Configuration**

```
1. Dentro de Authentication, procura tabs no topo
2. Clica em "URL Configuration"
   (pode estar junto de: Users, Policies, Providers, etc.)
```

### **Passo 3: Configurar Site URL**

```
1. Vês um campo chamado "Site URL"
2. APAGA o que lá está (provavelmente http://localhost:3000)
3. Cola o TEU URL (pega no /#setup-guide - ele mostra automaticamente!)
4. Exemplo: https://euconverto-abc123.figma.site
```

### **Passo 4: Adicionar Redirect URL**

```
1. Mais abaixo, procura "Redirect URLs"
2. Clica no botão "Add URL" ou "+"
3. Cola o TEU URL + /#reset-password
4. Exemplo: https://euconverto-abc123.figma.site/#reset-password
5. Clica "Add" ou "Confirmar"
```

### **Passo 5: SAVE!**

```
1. Procura um botão "Save" (normalmente verde, no fundo da página)
2. Clica!
3. ✅ PRONTO! Tarefa 1 concluída!
```

---

## 📧 TAREFA 2: TEMPLATE DE EMAIL (OPCIONAL MAS BONITO)

Vejo nas tuas screenshots que já encontraste a página certa!

### **Passo 1: Já estás na página certa!**

Na tua primeira screenshot, vejo:
- **"Emails"** no topo
- Tabs: **"Templates"** e "SMTP Settings"
- Estás no tab **"Templates"** ✅

Perfeito! Já estás no sítio certo!

### **Passo 2: Editar Template "Reset Password"**

```
1. Vês várias tabs:
   - Confirm sign up
   - Invite user
   - Magic link
   - Change email address
   - Reset password     ← ⭐ CLICA AQUI!
   - Reauthentication

2. Clica em "Reset password"
```

### **Passo 3: Copiar o Template Bonito**

```
1. Vai para /#setup-guide (no teu site)
2. No "Passo 3", clica no botão laranja "Copiar Template"
3. Volta ao Supabase
4. APAGA tudo o que está no campo "Body"
5. COLA o template que copiaste
6. Clica "Save changes" (botão verde no fundo)
7. ✅ PRONTO! Email bonito configurado!
```

---

## ⚠️ SOBRE A CONFIGURAÇÃO DE SMTP (2ª SCREENSHOT):

Na tua segunda screenshot, vejo a página de **"Enable custom SMTP"** com campos:
- Host
- Port number
- Username
- Password

### **❌ NÃO PRECISAS CONFIGURAR ISTO AGORA!**

**Porquê?**
- O Supabase JÁ TEM um serviço de email gratuito built-in
- Funciona automaticamente sem configurar nada
- É suficiente para desenvolvimento e testes

**Quando configurar SMTP?**
- Só quando fores para PRODUÇÃO (site final)
- E quiseres usar o teu próprio domínio de email (noreply@euconverto.com)

**POR AGORA:** 
- ✅ **Ignora essa página de SMTP**
- ✅ **Deixa o toggle desligado**
- ✅ **Usa o email padrão do Supabase**

---

## ✅ CHECKLIST RÁPIDA:

Faz apenas isto:

- [ ] **1. Ir para Authentication → URL Configuration**
- [ ] **2. Site URL:** Cola o teu URL do Figma Make
- [ ] **3. Redirect URLs:** Adiciona `teu-url/#reset-password`
- [ ] **4. Save**
- [ ] **5. (Opcional) Templates → Reset password:** Cola o template bonito
- [ ] **6. Save**
- [ ] **7. ~~SMTP~~** ← SALTA! Não precisas agora!

---

## 🎯 RESUMO PARA QUEM NÃO PERCEBE NADA DE SUPABASE:

### **O que é Supabase?**
É como se fosse o "cérebro" do teu site:
- Guarda dados (utilizadores, passwords, leads)
- Envia emails automaticamente
- Faz autenticação (login/logout)

### **O que estás a fazer?**
Estás a **dizer ao Supabase para onde enviar as pessoas** depois de clicarem no link do email.

**Exemplo:**
1. Utilizador esquece password
2. Pede recuperação no teu site
3. Supabase envia email
4. Utilizador clica no link do email
5. ⭐ **Aqui!** O Supabase precisa saber: "Para onde envio esta pessoa?"
6. Resposta: Para `https://teu-site.figma.site/#reset-password`

**É só isso!** Estás a configurar um "endereço de retorno".

---

## 🚀 DEPOIS DE CONFIGURAR:

### **Como testar se funcionou:**

```
1. Vai para o teu site
2. Clica "Entrar" → "Esqueceu a palavra-passe?"
3. Insere: admin@euconverto.com
4. Clica "Enviar"
5. Vai verificar o email do admin (o teu email ou email de teste)
6. Clica no link do email
7. ✅ Deve abrir a página de redefinir password NO TEU SITE!
```

---

## ❓ PERGUNTAS FREQUENTES:

### **1. Onde vejo os emails enviados?**

**Opção A:** Se configuraste Mailtrap
```
→ Vai para mailtrap.io
→ Abre o teu Inbox
→ Vês todos os emails lá!
```

**Opção B:** Se NÃO configuraste (email padrão Supabase)
```
→ Supabase Dashboard → Logs
→ Procura por "password_recovery"
→ Vês o link gerado
→ Copia e abre no browser
```

**Opção C:** Email real
```
→ Verifica a caixa de entrada do email que usaste
→ Pode estar no spam!
```

### **2. Qual é o meu URL do Figma Make?**

```
1. Vai para /#setup-guide
2. O URL já está lá automaticamente detectado!
3. Copia e usa!
```

### **3. Tenho que pagar algo?**

```
❌ NÃO! Tudo é grátis:
- Supabase: Grátis (plano Free)
- Mailtrap: Grátis para testes
- Figma Make: Grátis para desenvolvimento
```

### **4. E se eu errar alguma coisa?**

```
✅ Sem problema! Podes sempre:
- Voltar ao Supabase
- Corrigir as URLs
- Save outra vez
- Testar novamente
```

### **5. Preciso saber programação?**

```
❌ NÃO! Para estas configurações:
- É só copiar/colar URLs
- Clicar em botões
- Save
- Zero código!
```

---

## 💡 DICA FINAL:

**Usa a página `/#setup-guide` no TEU site!**

Ela:
- ✅ Detecta automaticamente o teu URL
- ✅ Tem botão para copiar com 1 clique
- ✅ Abre o Supabase com 1 clique
- ✅ Template já pronto para copiar
- ✅ Guia visual passo a passo
- ✅ Marca progresso

**É MUITO mais fácil!**

---

## 🎯 PRÓXIMO PASSO:

1. ✅ Abre `/#setup-guide` no teu site
2. ✅ Segue os 3 passos (salta o passo 2 se quiseres!)
3. ✅ Marca como concluído
4. ✅ Testa a recuperação de password
5. 🚀 **Continua com o Widget do Chatbot!**

---

**Consegues! É só seguir os passos! 💪**
