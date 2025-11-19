# 🚀 Backend Euconverto - Setup Completo

## ✅ O QUE FOI FEITO:

### 1. **Servidor Backend** (`/supabase/functions/server/index.tsx`)
API completa com Supabase + autenticação real:

#### **Endpoints de Autenticação:**
- `POST /auth/signup` - Criar conta nova
- `POST /auth/signin` - Login  

#### **Endpoints de Utilizador:**
- `GET /user` - Ver perfil do utilizador (requer auth)

#### **Endpoints do Assistente:**
- `GET /assistant` - Ver configuração do assistente (requer auth)
- `PUT /assistant` - Atualizar assistente (requer auth)

#### **Endpoints de Leads:**
- `GET /leads` - Ver todas as leads do cliente (requer auth)
- `POST /leads` - Criar nova lead (chamado pelo widget no site do cliente)
- `PUT /leads/:leadId` - Atualizar lead (requer auth)
- `DELETE /leads/:leadId` - Apagar lead (requer auth)

---

### 2. **Frontend API Helper** (`/utils/api.ts`)
Funções fáceis para chamar o backend:

```typescript
// Autenticação
auth.signup(email, password, name, plan)
auth.signin(email, password)
auth.signout()
auth.isAuthenticated()

// Utilizador
user.getProfile()

// Assistente
assistant.get()
assistant.update(config)

// Leads
leads.getAll()
leads.create(data)
leads.update(leadId, data)
leads.delete(leadId)
```

---

### 3. **Páginas Conectadas:**
✅ **Login** (`/login.tsx`) - conectado ao backend
✅ **Signup** (`/signup.tsx`) - conectado ao backend

---

## 🎯 COMO FUNCIONA:

### **Fluxo de Registo/Login:**
1. Cliente preenche formulário → chama `auth.signup()`
2. Backend cria utilizador no Supabase
3. Guarda dados adicionais no KV Store
4. Auto-login e redireciona para dashboard

### **Fluxo de Leads:**
1. Visitante usa chatbot no site do cliente
2. Widget chama `POST /leads` com `clientId`
3. Lead fica guardada no KV Store
4. Cliente vê a lead no dashboard (`GET /leads`)

---

## 📊 ESTRUTURA DOS DADOS:

### **KV Store Schema:**
```
user:{userId} = {
  id, email, name, plan, 
  conversationsLeft, createdAt
}

assistant:{userId} = {
  userId, name, greeting, color, 
  instructions
}

lead:{leadId} = {
  id, clientId, name, email, phone, 
  service, status, lastStatusChange, 
  notes, files, createdAt
}

leads:user:{userId} = [array de leadIds]
```

---

## 🔐 SEGURANÇA:
- ✅ Autenticação com Supabase Auth
- ✅ Tokens JWT para sessões
- ✅ Verificação de ownership (cada cliente só vê as suas leads)
- ✅ Endpoints protegidos com Authorization header

---

## 📝 PRÓXIMOS PASSOS:

### **URGENTE - Conectar Dashboard:**
1. Atualizar Overview para buscar dados reais
2. Conectar secção de Leads ao backend
3. Conectar Configurar Assistente ao backend
4. Adicionar logout funcional

### **Widget do Chatbot:**
1. Criar `/widget.js` - código que os clientes copiam
2. Interface do chat (popup no canto)
3. Formulário de captura de leads
4. Enviar para o backend

### **Produção:**
1. Deploy do frontend (Vercel/Netlify)
2. Configurar domínio euconverto.com
3. Adicionar pagamentos (Stripe)
4. Sistema de emails (notificações de leads)

---

## 🧪 TESTAR AGORA:

1. **Vai para a página de Signup**
2. **Cria uma conta**
3. **Faz login**
4. **Dashboard deve carregar** (ainda com dados mock, mas autenticado!)

**Nota:** O backend está LIVE no Supabase e pronto a funcionar! 🎉
