# 👆 ONDE CLICAR NO SUPABASE - Guia Visual

## 🎯 BASEADO NAS TUAS SCREENSHOTS

---

## 📸 SCREENSHOT 1: Email Templates (ESTÁS AQUI!)

### **O que vês:**
```
Top: "Emails"
Tabs: "Templates" | "SMTP Settings"
Sub-tabs: Confirm sign up | Invite user | Magic link | ... | Reset password
Campo: Subject → "Confirm Your Signup"
Campo: Body → código HTML
```

### **O que fazer:**

#### **PASSO 1: Clica no tab "Reset password"**
```
Vês estas tabs em baixo:
[Confirm sign up] [Invite user] [Magic link] [Change email address] [Reset password] [Reauthentication]
                                                                      ↑
                                                               CLICA AQUI!
```

#### **PASSO 2: Vai ao teu site /#setup-guide**
```
1. Abre outra aba do browser
2. Vai para o teu site
3. Adiciona /#setup-guide no URL
4. Procura "Passo 3: Personalizar Email Template"
5. Clica no botão laranja "Copiar Template"
6. ✅ Template copiado!
```

#### **PASSO 3: Volta ao Supabase**
```
1. Volta para a tab do Supabase
2. No campo "Body" (onde tem o código HTML)
3. Seleciona TUDO (Ctrl+A ou Cmd+A)
4. DELETE (apaga tudo)
5. COLA o template (Ctrl+V ou Cmd+V)
6. Scroll até ao fundo da página
7. Clica no botão verde "Save changes"
8. ✅ PRONTO! Email bonito configurado!
```

---

## 📸 SCREENSHOT 2: SMTP Settings

### **O que vês:**
```
Top: "Enable custom SMTP" (toggle ON)
Aviso: "All fields must be filled"
Campos:
- Sender email address
- Sender name
- Host
- Port number (465)
- Minimum interval per user (60 seconds)
- Username
- Password
Botões: [Cancel] [Save changes]
```

### **O que fazer:**

#### **⚠️ IMPORTANTE: NÃO MEXAS AQUI!**

```
❌ NÃO configures isto agora!
❌ NÃO atives o toggle!
❌ NÃO preenches estes campos!
```

**Porquê?**
- O Supabase JÁ envia emails automaticamente (serviço built-in)
- Não precisas configurar SMTP para desenvolvimento
- Só vais precisar disto quando fores para PRODUÇÃO

**O que fazer:**
```
1. Se o toggle estiver ON (verde), clica nele para desligar
2. Clica "Cancel" se fizeste alterações
3. SALTA esta página!
4. ✅ Usa o email padrão do Supabase
```

**Quando voltar aqui?**
- Só quando o teu site estiver em produção (euconverto.com)
- E quiseres emails profissionais (noreply@euconverto.com)
- Aí vais usar Resend ou SendGrid

---

## 📸 SCREENSHOT 3: Barra Lateral (Navegação)

### **O que vês:**
```
Logo: euconverto.com - Free
Menu:
  📊 Project Overview
  📋 Table Editor
  💻 SQL Editor
  🗄️  Database
  🔐 Authentication  ← ⭐ PRECISAS DISTO!
  💾 Storage
  ⚡ Edge Functions
  📡 Realtime
  ⭐ Advisors
  📊 Reports
  📝 Logs
  📖 API Docs
  🔌 Integrations
  ⚙️  Project Settings
```

### **O que fazer:**

#### **Para configurar URLs (TAREFA 1):**

```
1. Clica em "🔐 Authentication" (na barra lateral esquerda)
   ↓
2. Abre uma nova página com tabs no topo
   ↓
3. Procura e clica no tab "URL Configuration"
   (outros tabs: Users, Policies, Providers, Rate Limits, etc.)
   ↓
4. Vês 2 campos importantes:
   - Site URL
   - Redirect URLs
   ↓
5. Preenche conforme instruções abaixo ⬇️
```

---

## 📋 INSTRUÇÕES DETALHADAS: URL Configuration

### **Campo 1: Site URL**

```
O que está lá agora:
http://localhost:3000
ou
http://localhost:5173

O que DEVE ficar:
[O TEU URL do Figma Make]

Exemplo:
https://euconverto-abc123.figma.site
```

**Como obter o teu URL:**
```
Opção A - Fácil:
1. Vai para /#setup-guide
2. O URL já está lá! (detectado automaticamente)
3. Clica no botão azul para copiar
4. Cola no Supabase

Opção B - Manual:
1. Olha para a barra de endereços do teu browser
2. Copia o URL (sem o #login ou #forgot-password)
3. Exemplo: https://euconverto-abc123.figma.site
4. Cola no Supabase
```

### **Campo 2: Redirect URLs**

```
O que fazer:
1. Procura um botão "Add URL" ou "+" ou "Add another"
2. Clica
3. Aparece um campo vazio
4. Cola o teu URL + /#reset-password

Exemplo completo:
https://euconverto-abc123.figma.site/#reset-password
                                      ↑
                                Não esqueças esta parte!

5. Clica "Add" ou "Confirm"
6. Deve aparecer na lista de URLs permitidos
```

### **SAVE!**

```
1. Scroll até ao fundo da página
2. Procura botão "Save" (normalmente verde)
3. Clica!
4. Pode aparecer uma mensagem de confirmação
5. ✅ URLs configurados!
```

---

## 🧪 COMO TESTAR SE FUNCIONOU:

### **Teste Completo:**

```
PASSO 1: Pedir recuperação
1. Vai para o teu site
2. Clica "Entrar"
3. Clica "Esqueceu a palavra-passe?"
4. Insere: admin@euconverto.com
5. Clica "Enviar Instruções"
6. Vês mensagem de sucesso ✅

PASSO 2: Verificar email
Opção A - Se tens o email admin@euconverto.com:
→ Verifica a caixa de entrada
→ Procura email do Supabase
→ Pode estar no spam!

Opção B - Ver nos Logs do Supabase:
1. Supabase → Logs (na barra lateral)
2. Procura "password_recovery" ou "reset"
3. Vês o link gerado
4. Copia o link completo

PASSO 3: Abrir link
1. Clica no link do email OU
2. Cola o link do log no browser
3. ✅ DEVE ABRIR: https://teu-site.figma.site/#reset-password
4. Vês a página bonita de redefinir password
5. Funciona! 🎉

PASSO 4: Redefinir password
1. Insere nova password (mínimo 6 caracteres)
2. Confirma a password
3. Clica "Redefinir Palavra-passe"
4. Vês mensagem de sucesso
5. Faz login com a nova password
6. ✅ Tudo a funcionar!
```

---

## ❌ ERROS COMUNS E SOLUÇÕES:

### **Erro: "Invalid redirect URL"**

```
❌ Problema:
O link do email tenta abrir mas dá erro

✅ Solução:
1. Volta ao Supabase
2. Authentication → URL Configuration
3. Verifica se o Redirect URL está EXATAMENTE igual
4. Deve ter: /#reset-password no final
5. Save novamente
6. Testa outra vez
```

### **Erro: "Link abre localhost"**

```
❌ Problema:
O link abre http://localhost:5173 em vez do teu site

✅ Solução:
1. Volta ao Supabase
2. Authentication → URL Configuration
3. Muda "Site URL" para o teu URL do Figma Make
4. Remove qualquer localhost que esteja lá
5. Save
6. Pede novo link de recuperação (o anterior expirou)
```

### **Erro: "Email não chega"**

```
❌ Problema:
Pediste recuperação mas não recebeste email

✅ Solução:
1. Verifica spam/lixo eletrônico
2. OU vai para Supabase → Logs
3. Procura "password_recovery"
4. Copia o link manualmente
5. Abre no browser
6. (Mais tarde podes configurar Mailtrap para ver todos os emails)
```

---

## 📝 RESUMO SUPER RÁPIDO:

### **Para configurar tudo (5 minutos):**

```
✅ PASSO 1: Redirect URLs
→ Supabase barra lateral → Authentication
→ Tab "URL Configuration"
→ Site URL: [teu URL do Figma Make]
→ Redirect URLs: [teu URL]/#reset-password
→ Save

✅ PASSO 2: Email Template (opcional)
→ Supabase barra lateral → Authentication  
→ Tab "Email Templates"
→ Sub-tab "Reset password"
→ Copia template do /#setup-guide
→ Cola no campo "Body"
→ Save

❌ PASSO 3: SMTP
→ SALTA! Não precisas agora!
→ O Supabase já envia emails automaticamente

✅ PASSO 4: Testar
→ Vai para o teu site
→ Esqueceu password → admin@euconverto.com
→ Verifica email ou logs
→ Clica no link
→ Redefinir password
→ Funciona! 🎉
```

---

## 🎯 PRÓXIMA AÇÃO:

1. **AGORA:** Vai para `/#setup-guide` no teu site
2. **DEPOIS:** Segue os 3 passos (interface visual bonita!)
3. **TESTA:** Recuperação de password completa
4. **CONTINUA:** Widget do Chatbot 🚀

**É fácil! Consegues! 💪**
