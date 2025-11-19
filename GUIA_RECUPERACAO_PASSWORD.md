# 🔐 Guia Completo: Recuperação de Password

## ✅ O QUE JÁ ESTÁ FEITO:

- ✅ Backend funcional (endpoints de forgot/reset)
- ✅ Páginas de UI (forgot-password + reset-password)
- ✅ Link "Esqueceu a palavra-passe?" no Login
- ✅ Código envia URL correto automaticamente
- ✅ Validações e segurança implementadas

---

## ⚙️ O QUE PRECISAS CONFIGURAR (2 PASSOS):

### **PASSO 1: Configurar Redirect URLs no Supabase**

#### **1.1 Copia o teu URL do Figma Make:**
```
Exemplo: https://euconverto-abc123.figma.site
```

#### **1.2 Acede ao Supabase:**
```
https://supabase.com/dashboard
→ Seleciona o teu projeto
→ Authentication → URL Configuration
```

#### **1.3 Configura Site URL:**
```
Site URL: https://[teu-url].figma.site
```

#### **1.4 Adiciona Redirect URLs:**
```
Redirect URLs → Add URL:

1. https://[teu-url].figma.site/#reset-password
2. https://[teu-url].figma.site/#login
3. http://localhost:5173/#reset-password (opcional)
```

#### **1.5 Save**
```
✅ Clica "Save"
```

---

### **PASSO 2: Configurar Email (ESCOLHE UMA OPÇÃO)**

#### **OPÇÃO A: Mailtrap (RECOMENDADO PARA TESTES)**

**Mais fácil e grátis! Vês emails numa interface web.**

```
1. Vai para: https://mailtrap.io
2. Cria conta (grátis)
3. Cria um Inbox
4. Copia as credenciais SMTP
5. Supabase → Settings → Auth → SMTP Settings:
   - Host: sandbox.smtp.mailtrap.io
   - Port: 2525
   - Username: [cola do Mailtrap]
   - Password: [cola do Mailtrap]
   - Sender email: noreply@euconverto.com
   - Sender name: euconverto.com
6. Save
```

**✅ Agora podes testar! Emails aparecem no Mailtrap.**

---

#### **OPÇÃO B: Resend (PARA PRODUÇÃO)**

**Envia emails reais. Grátis até 3000 emails/mês.**

```
1. Vai para: https://resend.com
2. Cria conta
3. API Keys → Create API Key
4. Supabase → Settings → Auth → Email Provider
5. Choose Resend
6. Cola API Key
7. Sender email: noreply@euconverto.com
8. Save
```

**Nota:** Precisas verificar o domínio para emails reais!

---

#### **OPÇÃO C: Só Testes (SEM EMAIL)**

**Não configures nada! Mas terás que:**

```
1. Pedir recuperação de password
2. Ir ao Supabase Dashboard → Logs
3. Procurar "password_recovery"
4. Copiar o link manualmente
5. Abrir no browser
```

**⚠️ Funciona mas não é prático!**

---

### **PASSO 3: Personalizar Email Template (OPCIONAL MAS RECOMENDADO)**

```
1. Supabase → Authentication → Email Templates
2. Clica "Reset Password"
3. Cola o template HTML do ficheiro EMAIL_TEMPLATES.md
4. Save
```

**Fica com:**
- ✅ Cores da marca (#2563eb)
- ✅ Logo euconverto.com
- ✅ Design profissional
- ✅ Botão bonito
- ✅ Avisos de segurança

---

## 🧪 COMO TESTAR (FLUXO COMPLETO):

### **Teste Passo a Passo:**

#### **1. Pedir Recuperação:**
```
1. Vai para o teu site
2. Clica "Entrar"
3. Clica "Esqueceu a palavra-passe?"
4. Insere: admin@euconverto.com
5. Clica "Enviar Instruções"
6. ✅ Vês mensagem de sucesso
```

#### **2. Verificar Email:**

**Se usaste Mailtrap:**
```
1. Vai para Mailtrap.io
2. Abre o teu Inbox
3. ✅ Vês o email de recuperação!
4. Clica no link OU no botão "Redefinir Palavra-passe"
```

**Se usaste Resend:**
```
1. Verifica a caixa de entrada do email
2. Pode estar no spam!
3. Abre o email
4. Clica no link
```

**Se NÃO configuraste email:**
```
1. Supabase Dashboard → Logs
2. Procura "password_recovery"
3. Copia o link
4. Abre no browser
```

#### **3. Redefinir Password:**
```
1. Abre a página de reset (via link do email)
2. Insere nova password (mínimo 6 caracteres)
3. Confirma a password
4. Clica "Redefinir Palavra-passe"
5. ✅ Vês mensagem "Password alterada com sucesso!"
```

#### **4. Fazer Login:**
```
1. Clica "Ir para o login"
2. Email: admin@euconverto.com
3. Password: [nova password]
4. ✅ Login com sucesso!
```

---

## 📋 CHECKLIST RÁPIDO:

Antes de testar, confirma:

### **Configuração Supabase:**
- [ ] ✅ Site URL configurado
- [ ] ✅ Redirect URLs adicionados (mínimo 1)
- [ ] ✅ Email provider configurado (Mailtrap/Resend)
- [ ] ✅ Email template personalizado (opcional)

### **Teste:**
- [ ] ✅ Pedir recuperação funciona (sem erros)
- [ ] ✅ Email chega (Mailtrap ou inbox real)
- [ ] ✅ Link do email abre página de reset
- [ ] ✅ Reset de password funciona
- [ ] ✅ Login com nova password funciona

---

## 🚨 PROBLEMAS COMUNS:

### **1. "Link não funciona / abre localhost"**
**Causa:** Redirect URLs não configurados
**Solução:** Adiciona o teu URL no Supabase (Passo 1)

### **2. "Email não chega"**
**Causa:** SMTP não configurado
**Solução:** Configura Mailtrap (Passo 2)

### **3. "Invalid redirect URL"**
**Causa:** URL não está na lista permitida
**Solução:** Adiciona EXATAMENTE o URL com /#reset-password

### **4. "Token expired / Invalid token"**
**Causa:** Link expirou (1 hora) ou já foi usado
**Solução:** Pede novo link de recuperação

### **5. "Email genérico do Supabase"**
**Causa:** Template não personalizado
**Solução:** Edita o template (Passo 3 - opcional)

---

## 💡 RECOMENDAÇÃO:

### **AGORA (Desenvolvimento):**
```
✅ Usa Mailtrap
✅ Adiciona Figma Make URL aos Redirect URLs
✅ Personaliza email template
✅ Testa tudo!
```

### **MAIS TARDE (Produção):**
```
✅ Muda para Resend
✅ Configura domínio (euconverto.com)
✅ Verifica DNS records
✅ Testa com emails reais
```

---

## 📂 FICHEIROS ÚTEIS:

- **`/EMAIL_TEMPLATES.md`** - Templates HTML para emails bonitos
- **`/CONFIGURAR_REDIRECT_URLS.md`** - Guia detalhado de URLs
- **`/RECUPERACAO_PASSWORD.md`** - Documentação técnica completa

---

## ⏱️ TEMPO ESTIMADO:

- **Configurar Redirect URLs:** 2 minutos
- **Configurar Mailtrap:** 5 minutos
- **Personalizar Template:** 3 minutos
- **Testar:** 2 minutos

**Total: ~12 minutos** ⚡

---

## 🎯 PRÓXIMO PASSO:

**FAZ AGORA:**

1. ✅ Copia URL do Figma Make
2. ✅ Adiciona ao Supabase (Site URL + Redirect URLs)
3. ✅ Cria conta no Mailtrap
4. ✅ Configura SMTP no Supabase
5. ✅ Testa recuperação completa!

**DEPOIS:**
- 🚀 Continuar com Widget do Chatbot
- 💳 Sistema de Pagamentos
- 🌐 Deploy em Produção

---

**Tudo pronto! Segue os 2 passos e o sistema funciona perfeitamente! 🔐**
