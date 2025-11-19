# 👑 CONTA ADMIN PERMANENTE

## 🎯 COMO CRIAR A CONTA ADMIN:

### **Passo 1:** Acede à página de debug
```
URL: /#debug
```

### **Passo 2:** Clica no botão vermelho grande
```
⚡ APAGAR TUDO E CRIAR ADMIN
```

### **Passo 3:** Confirma a ação
```
⚠️ Confirma que queres apagar TODAS as contas
```

### **Passo 4:** Aguarda o processo
```
🔥 A apagar todas as contas...
👑 A criar conta ADMIN...
✅ Concluído!
```

### **Passo 5:** Guarda as credenciais
```
📧 Email: admin@euconverto.com
🔑 Password: admin123456
📦 Plano: Professional (2000 conversas/mês)
```

---

## 🔐 CREDENCIAIS ADMIN (PERMANENTES):

```
Email:    admin@euconverto.com
Password: admin123456
Plano:    Professional
```

**Guarda estas credenciais num local seguro!**

---

## ✅ O QUE É FEITO AUTOMATICAMENTE:

### **1. Limpeza Total:**
- ✅ Apaga todos os utilizadores do Supabase Auth
- ✅ Apaga todos os dados do KV Store
- ✅ Remove todas as configurações de assistentes
- ✅ Apaga todas as leads

### **2. Criação da Conta ADMIN:**
- ✅ Cria utilizador no Supabase Auth
- ✅ Email confirmado automaticamente
- ✅ Plano: **Professional** (2000 conversas/mês)
- ✅ Dados guardados no KV Store:
  - `user:{adminId}` → Perfil completo
  - `assistant:{adminId}` → Assistente configurado
  - `leads:user:{adminId}` → Array vazio para leads

### **3. Configuração do Assistente:**
```json
{
  "name": "Assistente Admin",
  "greeting": "Olá! Sou o assistente do administrador. Como posso ajudar?",
  "color": "#2563eb",
  "instructions": "Seja sempre profissional e ajude os utilizadores com todas as suas dúvidas."
}
```

---

## 🧪 TESTA AGORA:

### **1. Faz o reset:**
```
1. Acede: /#debug
2. Clica: "⚡ APAGAR TUDO E CRIAR ADMIN"
3. Confirma
4. ✅ Vês as credenciais na tela
```

### **2. Faz login:**
```
1. Volta para a homepage
2. Clica "Entrar"
3. Email: admin@euconverto.com
4. Password: admin123456
5. ✅ Entras no Dashboard!
```

---

## 📊 LOGS DO SERVIDOR:

Quando executas o reset, vês nos logs:

```
🔥 RESETTING ALL ACCOUNTS...
Found 3 users in KV Store
Deleting user from KV: teste1@email.com
Deleting user from KV: teste2@email.com
Deleting user from KV: teste3@email.com
✅ Deleted all users from KV Store
Found 3 users in Supabase Auth
Deleting from Auth: teste1@email.com
Deleting from Auth: teste2@email.com
Deleting from Auth: teste3@email.com
✅ Deleted all users from Supabase Auth
👑 Creating ADMIN account...
✅ ADMIN account created successfully!
📧 Email: admin@euconverto.com
🔑 Password: admin123456
```

---

## 🎯 PRÓXIMOS PASSOS DEPOIS DO LOGIN:

Quando entrares com a conta ADMIN, terás acesso a:

1. ✅ **Overview:** Dashboard com métricas
2. ✅ **Configurar Assistente:** Personalizar o chatbot
3. ✅ **Leads:** Sistema tipo Airtable (vazio inicialmente)
4. ✅ **Feedback:** Opiniões dos utilizadores
5. 🔜 **Widget:** Código para colar no site (próximo passo!)

---

## ⚠️ IMPORTANTE - SEGURANÇA:

### **EM DESENVOLVIMENTO:**
- ✅ OK usar credenciais simples
- ✅ OK ter endpoint sem autenticação
- ✅ Útil para testes rápidos

### **EM PRODUÇÃO (ANTES DO DEPLOY):**
- ❌ REMOVE o endpoint `/debug/reset-all`
- ❌ REMOVE o endpoint `/debug/delete-user`
- ❌ APAGA o ficheiro `/debug.tsx`
- ✅ Muda a password do ADMIN para algo forte
- ✅ Adiciona autenticação aos endpoints sensíveis

---

## 💡 DICA PRO:

**Sempre que quiseres começar do zero:**

1. Vai para `/#debug`
2. Clica "APAGAR TUDO E CRIAR ADMIN"
3. Confirma
4. Faz login com: `admin@euconverto.com` / `admin123456`

**Base de dados limpa + Conta ADMIN pronta em 10 segundos!** ⚡

---

## 🚀 STATUS ATUAL:

- ✅ Backend funcional
- ✅ Autenticação real
- ✅ Conta ADMIN permanente
- ✅ Sistema de reset completo
- 🔜 Conectar Dashboard ao backend
- 🔜 Criar Widget do chatbot
- 🔜 Deploy em produção

**Tudo pronto para criar a conta ADMIN!** 👑
