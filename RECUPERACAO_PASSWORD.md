# 🔐 Sistema de Recuperação de Palavra-passe

## ✅ O QUE FOI IMPLEMENTADO:

Criei um sistema completo de recuperação de password usando Supabase Auth:

### **1. Backend** (`/supabase/functions/server/index.tsx`):
- ✅ **POST `/auth/forgot-password`** - Envia email de recuperação
- ✅ **POST `/auth/reset-password`** - Define nova password

### **2. Frontend:**
- ✅ **`/forgot-password.tsx`** - Página para inserir email
- ✅ **`/reset-password.tsx`** - Página para definir nova password
- ✅ **Link no Login** - "Esqueceu a palavra-passe?"

---

## 🔄 COMO FUNCIONA:

### **Fluxo Completo:**

```
1. Utilizador → Clica "Esqueceu a palavra-passe?" no Login
   ↓
2. Vai para /#forgot-password
   ↓
3. Insere o email
   ↓
4. Backend envia email com link de recuperação
   ↓
5. Utilizador clica no link do email
   ↓
6. Vai para /#reset-password (com token)
   ↓
7. Insere nova password
   ↓
8. Password alterada com sucesso!
   ↓
9. Faz login com nova password
```

---

## ⚠️ IMPORTANTE - CONFIGURAÇÃO DO EMAIL:

### **Problema Atual:**
O Supabase **NÃO** envia emails automaticamente em desenvolvimento. Precisas configurar um provedor de email!

### **Solução Rápida (Desenvolvimento):**

#### **Opção 1: Ver o link no painel do Supabase**
1. Quando um utilizador pede recuperação, o link aparece nos logs
2. Copia o link e abre no browser
3. Funciona para testes!

#### **Opção 2: Configurar Email Provider (RECOMENDADO)**

**Passos:**
1. Vai para o teu projeto Supabase: https://supabase.com
2. Clica em "Authentication" → "Email Templates"
3. Escolhe um provider:
   - **SendGrid** (grátis até 100 emails/dia)
   - **Resend** (grátis até 3000 emails/mês)
   - **SMTP personalizado**

4. Configura as credenciais
5. Testa enviando email de recuperação

---

## 🧪 COMO TESTAR (SEM EMAIL):

### **Teste Manual:**

1. **Esquece a password:**
   ```
   1. Vai para Login
   2. Clica "Esqueceu a palavra-passe?"
   3. Insere: admin@euconverto.com
   4. Clica "Enviar Instruções"
   5. ✅ Vês mensagem de sucesso
   ```

2. **Simula o link de recuperação:**
   ```
   1. Vai diretamente para: /#reset-password
   2. (Em produção, o token viria do email)
   3. Insere nova password
   4. Confirma password
   5. Clica "Redefinir Password"
   ```

3. **Faz login com nova password:**
   ```
   1. Volta para Login
   2. Email: admin@euconverto.com
   3. Password: [nova password]
   4. ✅ Login com sucesso!
   ```

---

## 📧 CONFIGURAR EMAIL (PRODUÇÃO):

### **Recomendação: Resend (Mais fácil)**

1. **Cria conta no Resend:**
   - https://resend.com
   - Grátis até 3000 emails/mês

2. **Obtém API Key:**
   - Dashboard → API Keys → Create

3. **Configura no Supabase:**
   ```
   1. Supabase Dashboard
   2. Settings → Auth → Email
   3. Enable Custom SMTP
   4. SMTP Provider: Resend
   5. API Key: [cole aqui]
   6. From Email: noreply@euconverto.com
   ```

4. **Personaliza o Template:**
   ```
   Authentication → Email Templates → Reset Password
   
   Assunto: Recuperar Palavra-passe - euconverto.com
   
   Mensagem:
   Olá!
   
   Recebemos um pedido para recuperar a sua palavra-passe.
   
   Clique no link abaixo para definir uma nova password:
   {{ .ConfirmationURL }}
   
   Este link expira em 1 hora.
   
   Se não pediu esta recuperação, ignore este email.
   
   Obrigado,
   Equipa euconverto.com
   ```

---

## 🔒 SEGURANÇA:

### **Boas Práticas Implementadas:**

✅ **Email enumeration protection**
- Sempre retorna mensagem genérica
- Não revela se email existe ou não

✅ **Password Requirements**
- Mínimo 6 caracteres
- Validação no frontend e backend

✅ **Token Expiration**
- Links de recuperação expiram em 1 hora
- Tokens únicos por pedido

✅ **Show/Hide Password**
- Utilizador pode ver o que está a digitar
- Melhora UX e reduz erros

---

## 📝 ENDPOINTS DA API:

### **1. Esqueceu a Password:**
```
POST /auth/forgot-password
Body: { "email": "user@email.com" }

Response:
{
  "success": true,
  "message": "Se o email existir, receberá instruções de recuperação."
}
```

### **2. Redefinir Password:**
```
POST /auth/reset-password
Body: {
  "accessToken": "token-from-email-link",
  "newPassword": "nova-password-123"
}

Response:
{
  "success": true,
  "message": "Password alterada com sucesso!"
}
```

---

## 🎯 ROTAS CRIADAS:

1. **`/#forgot-password`**
   - Formulário com campo de email
   - Envia instruções de recuperação
   - Feedback visual de sucesso

2. **`/#reset-password`**
   - Formulário com nova password
   - Confirmação de password
   - Show/hide password toggle
   - Validação em tempo real

3. **Link no Login**
   - "Esqueceu a palavra-passe?"
   - Navega para `/#forgot-password`

---

## ✅ STATUS ATUAL:

- ✅ Backend configurado
- ✅ Páginas de UI criadas
- ✅ Validações implementadas
- ✅ Mensagens de erro traduzidas PT/EN
- ✅ Link no login funcional
- ⚠️ **Email provider NÃO configurado** (só funciona com links manuais)

---

## 🚀 PRÓXIMOS PASSOS:

1. **Testa o fluxo completo** (sem email por agora)
2. **Configura Resend** quando estiveres pronto para produção
3. **Personaliza os templates** de email
4. **Testa emails reais** antes do deploy

---

## 💡 DICA PRO:

**Para desenvolvimento rápido:**
- Usa a ferramenta de debug (`/#debug`) para resetar passwords diretamente
- Quando fizeres deploy, **OBRIGATORIAMENTE** configura o email provider
- Senão os utilizadores não conseguirão recuperar passwords!

**Tudo pronto! O sistema de recuperação de password está funcional! 🔐**
