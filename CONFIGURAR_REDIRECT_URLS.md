# 🔗 Configurar Redirect URLs no Supabase

## ⚠️ PROBLEMA: "Link não funciona - erro localhost"

Isto acontece porque o Supabase precisa saber quais URLs pode usar para redirecionar após recuperação de password.

---

## ✅ SOLUÇÃO:

### **1. Acede ao Supabase Dashboard:**
```
https://supabase.com/dashboard
→ Seleciona o teu projeto
→ Authentication → URL Configuration
```

### **2. Adiciona as tuas URLs:**

Procura por **"Redirect URLs"** ou **"Site URL"** e adiciona:

#### **Para Desenvolvimento (Figma Make):**
```
URL do Figma Make: https://[teu-projeto].figma.site
```

#### **Para Produção (quando fizeres deploy):**
```
https://euconverto.com
https://www.euconverto.com
```

---

## 📝 COMO ADICIONAR:

### **Opção 1: Site URL (Principal)**
```
Authentication → Settings → Site URL

Coloca: https://[teu-url].figma.site
```

### **Opção 2: Redirect URLs (Múltiplos)**
```
Authentication → URL Configuration → Redirect URLs

Adiciona todas as URLs que vais usar:
- https://[dev].figma.site/#reset-password
- https://euconverto.com/#reset-password
- http://localhost:5173/#reset-password (para dev local)
```

---

## 🧪 COMO TESTAR:

### **1. Copia o teu URL do Figma Make:**
```
Exemplo: https://euconverto-abc123.figma.site
```

### **2. Adiciona ao Supabase:**
```
1. Supabase Dashboard
2. Authentication → URL Configuration
3. Site URL: https://euconverto-abc123.figma.site
4. Redirect URLs → Add URL
5. Cola: https://euconverto-abc123.figma.site/#reset-password
6. Save
```

### **3. Testa a recuperação:**
```
1. Vai para o teu site: https://[teu-url].figma.site
2. Clica "Entrar" → "Esqueceu a palavra-passe?"
3. Insere o email (ex: admin@euconverto.com)
4. Clica "Enviar Instruções"
5. Vai ao email
6. Clica no link
7. ✅ Deve abrir a página de reset no TEU site!
```

---

## 📧 VER O EMAIL DE RECUPERAÇÃO:

### **Opção 1: Usar Mailtrap (Recomendado para testes)**

**Mailtrap** captura emails de desenvolvimento sem enviar para emails reais:

```
1. Cria conta: https://mailtrap.io
2. Cria inbox para desenvolvimento
3. Copia credenciais SMTP
4. Supabase → Settings → Auth → SMTP Settings:
   - Host: sandbox.smtp.mailtrap.io
   - Port: 2525
   - Username: [do Mailtrap]
   - Password: [do Mailtrap]
   - From: noreply@euconverto.com
5. Save
```

**Vantagens:**
- ✅ Vês todos os emails numa interface web
- ✅ Não precisa de configurar domínio
- ✅ Grátis para desenvolvimento
- ✅ Consegues testar o link!

### **Opção 2: Verificar logs do Supabase**

Se não configuraste email ainda:
```
1. Supabase Dashboard → Logs → Auth Logs
2. Procura por "password_recovery"
3. Vês o link gerado nos logs
4. Copia e abre no browser
```

---

## 🎯 CONFIGURAÇÃO COMPLETA:

### **No Supabase Dashboard:**

#### **1. Site URL:**
```
Authentication → Settings → Site URL
→ https://[teu-url].figma.site
```

#### **2. Redirect URLs:**
```
Authentication → URL Configuration → Redirect URLs
→ Adiciona:
  - https://[teu-url].figma.site/#reset-password
  - https://[teu-url].figma.site/#login
  - http://localhost:5173/#reset-password (opcional para dev local)
```

#### **3. Email Templates (IMPORTANTE!):**
```
Authentication → Email Templates → Reset Password

Usa o template HTML do ficheiro EMAIL_TEMPLATES.md
Personaliza com as cores e marca da euconverto.com
```

#### **4. SMTP (Para emails funcionarem):**

**Para Testes:**
```
→ Mailtrap (grátis, vês emails numa interface)
```

**Para Produção:**
```
→ Resend (grátis até 3000 emails/mês)
→ SendGrid (grátis até 100 emails/dia)
```

---

## ✅ CHECKLIST:

Antes de testar a recuperação de password:

- [ ] ✅ Site URL configurado no Supabase
- [ ] ✅ Redirect URLs adicionados
- [ ] ✅ Email template personalizado
- [ ] ✅ SMTP configurado (Mailtrap ou Resend)
- [ ] ✅ Testaste com email real
- [ ] ✅ Link do email abre no teu site (não localhost)

---

## 🚨 ERROS COMUNS:

### **Erro: "Invalid redirect URL"**
**Causa:** URL não está na lista de Redirect URLs permitidos
**Solução:** Adiciona o teu URL no Supabase Dashboard

### **Erro: "Link abre localhost"**
**Causa:** Site URL está configurado como localhost
**Solução:** Muda para o URL do Figma Make

### **Erro: "Email não chega"**
**Causa:** SMTP não configurado
**Solução:** Configura Mailtrap (dev) ou Resend (prod)

### **Erro: "Token expired"**
**Causa:** Link de recuperação expirou (1 hora)
**Solução:** Pede novo link de recuperação

---

## 💡 DICA PRO:

### **Para Desenvolvimento Rápido:**

1. **Usa Mailtrap** para capturar emails
2. **Adiciona localhost E Figma Make** aos Redirect URLs
3. **Testa localmente primeiro** (mais rápido)
4. **Depois testa no Figma Make**
5. **Em produção, usa Resend** (profissional e grátis até 3k emails/mês)

### **Email Template Bonito:**

Usa o template HTML completo do ficheiro `EMAIL_TEMPLATES.md`:
- ✅ Cores da marca (#2563eb)
- ✅ Design profissional
- ✅ Botão CTA grande
- ✅ Avisos de segurança
- ✅ Link alternativo se botão não funcionar

---

## 🎯 PRÓXIMO PASSO:

1. **Copia o teu URL do Figma Make**
2. **Adiciona ao Supabase** (Site URL + Redirect URLs)
3. **Configura Mailtrap** para ver os emails
4. **Testa a recuperação completa!**

**Tudo pronto! Agora os links de recuperação vão funcionar! 🚀**
