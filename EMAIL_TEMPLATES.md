# 📧 Templates de Email Personalizados

## 🎯 COMO CONFIGURAR:

### **1. Acede ao Supabase Dashboard:**
```
1. Vai para: https://supabase.com/dashboard
2. Seleciona o teu projeto
3. Authentication → Email Templates
```

### **2. Configura "From Email" (opcional mas recomendado):**
```
Settings → Auth → SMTP Settings
From Email: noreply@euconverto.com
From Name: euconverto.com
```

---

## 📝 TEMPLATE: Reset Password / Recuperar Password

### **Subject / Assunto:**
```
Recuperar Palavra-passe - euconverto.com
```

### **Body / Mensagem:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header com cor da marca -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                euconverto.com
              </h1>
            </td>
          </tr>
          
          <!-- Conteúdo -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 24px; font-weight: 600;">
                🔐 Recuperar Palavra-passe
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Olá!
              </p>
              
              <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Recebemos um pedido para recuperar a palavra-passe da sua conta em <strong style="color: #2563eb;">euconverto.com</strong>.
              </p>
              
              <!-- Botão CTA -->
              <table role="presentation" style="margin: 0 auto 30px auto;">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      Redefinir Palavra-passe
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Aviso de tempo -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 0 0 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  ⚠️ <strong>Este link expira em 1 hora</strong> por motivos de segurança.
                </p>
              </div>
              
              <!-- Link alternativo -->
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                Se o botão não funcionar, copie e cole este link no seu navegador:
              </p>
              <p style="margin: 0 0 30px 0; color: #2563eb; font-size: 14px; word-break: break-all; background-color: #f1f5f9; padding: 12px; border-radius: 6px; font-family: monospace;">
                {{ .ConfirmationURL }}
              </p>
              
              <!-- Aviso de segurança -->
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 0 0 20px 0;">
                <p style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                  🛡️ Não pediu esta recuperação?
                </p>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                  Se não foi você que pediu esta recuperação de palavra-passe, <strong>ignore este email</strong>. A sua conta permanecerá segura e nenhuma alteração será feita.
                </p>
              </div>
              
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Obrigado,
              </p>
              <p style="margin: 0; color: #2563eb; font-size: 16px; font-weight: 600;">
                Equipa euconverto.com 🚀
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px;">
                Este é um email automático, por favor não responda.
              </p>
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px;">
                © 2024 euconverto.com - Chatbot inteligente para websites
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                📧 Precisa de ajuda? Contacte-nos: suporte@euconverto.com
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 📝 TEMPLATE: Confirm Signup / Confirmar Registo

### **Subject / Assunto:**
```
Bem-vindo ao euconverto.com! Confirme o seu email
```

### **Body / Mensagem:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                euconverto.com
              </h1>
            </td>
          </tr>
          
          <!-- Conteúdo -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 24px; font-weight: 600;">
                🎉 Bem-vindo ao euconverto.com!
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Olá <strong style="color: #2563eb;">{{ .Email }}</strong>!
              </p>
              
              <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Obrigado por se registar no euconverto.com! Estamos muito felizes por tê-lo connosco. 🚀
              </p>
              
              <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Para começar a usar o seu assistente virtual, confirme o seu email clicando no botão abaixo:
              </p>
              
              <!-- Botão CTA -->
              <table role="presentation" style="margin: 0 auto 30px auto;">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      Confirmar Email
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- O que vem a seguir -->
              <div style="background-color: #eff6ff; padding: 24px; border-radius: 8px; margin: 0 0 30px 0; border-left: 4px solid #2563eb;">
                <p style="margin: 0 0 16px 0; color: #0f172a; font-size: 16px; font-weight: 600;">
                  📋 Próximos passos:
                </p>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #64748b; font-size: 14px; line-height: 1.8;">
                  <li>✅ Confirme o seu email</li>
                  <li>🎨 Personalize o seu assistente</li>
                  <li>📝 Copie o código do widget</li>
                  <li>🚀 Cole no seu website</li>
                  <li>📊 Comece a receber leads!</li>
                </ul>
              </div>
              
              <!-- Link alternativo -->
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                Se o botão não funcionar, copie e cole este link:
              </p>
              <p style="margin: 0 0 30px 0; color: #2563eb; font-size: 14px; word-break: break-all; background-color: #f1f5f9; padding: 12px; border-radius: 6px; font-family: monospace;">
                {{ .ConfirmationURL }}
              </p>
              
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Boas conversões! 💬
              </p>
              <p style="margin: 0; color: #2563eb; font-size: 16px; font-weight: 600;">
                Equipa euconverto.com
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px;">
                © 2024 euconverto.com - Chatbot inteligente para websites
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                📧 Precisa de ajuda? suporte@euconverto.com
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## ⚙️ VERSÃO SIMPLES (SE HTML NÃO FUNCIONAR):

### **Reset Password - Versão Texto:**
```
🔐 Recuperar Palavra-passe - euconverto.com

Olá!

Recebemos um pedido para recuperar a palavra-passe da sua conta.

Clique no link abaixo para redefinir a sua palavra-passe:
{{ .ConfirmationURL }}

⚠️ Este link expira em 1 hora por motivos de segurança.

Não pediu esta recuperação? 
Ignore este email - a sua conta permanecerá segura.

Obrigado,
Equipa euconverto.com 🚀

---
Este é um email automático, por favor não responda.
© 2024 euconverto.com
Precisa de ajuda? suporte@euconverto.com
```

---

## 🎯 COMO APLICAR:

### **Passo 1: Aceder Templates**
```
Supabase Dashboard → Authentication → Email Templates
```

### **Passo 2: Editar "Reset Password"**
```
1. Clica em "Reset Password"
2. Cola o template HTML acima
3. Save
```

### **Passo 3: Editar "Confirm Signup"** (opcional)
```
1. Clica em "Confirm signup"
2. Cola o template HTML de confirmação
3. Save
```

### **Passo 4: Testar!**
```
1. Vai para /#forgot-password
2. Insere teu email
3. Verifica a caixa de entrada
4. ✅ Email bonito com cores da marca!
```

---

## 📧 DOMÍNIO PERSONALIZADO (OPCIONAL):

Para usar `noreply@euconverto.com`:

1. **Configura SMTP** (Resend/SendGrid)
2. **Adiciona domínio** no provider
3. **Verifica DNS** records
4. **Configura no Supabase:**
   ```
   Settings → Auth → SMTP Settings
   From: noreply@euconverto.com
   ```

Por agora, vai aparecer algo como:
`noreply@mail.app.supabase.io`

Mas com o template, já parece profissional! ✨
