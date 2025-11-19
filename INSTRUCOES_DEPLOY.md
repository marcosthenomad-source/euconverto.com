# 🚀 INSTRUÇÕES DE DEPLOY - EUCONVERTO.COM

## ✅ CHECKLIST ANTES DE COMEÇAR

- [ ] Conta Supabase criada em https://supabase.com
- [ ] Projeto Supabase criado
- [ ] Node.js instalado
- [ ] PowerShell disponível

---

## 📋 PASSO A PASSO

### **1. INSTALAR SUPABASE CLI**

Abre PowerShell como Administrador e executa:

```powershell
# Via Scoop (recomendado)
scoop install supabase

# OU via npm
npm install -g supabase
```

Verifica instalação:
```powershell
supabase --version
```

---

### **2. EXECUTAR DEPLOY**

Na pasta do projeto, executa:

```powershell
.\deploy.ps1
```

O script vai:
1. ✅ Verificar se Supabase CLI está instalado
2. 🔐 Fazer login (abre browser)
3. 🔗 Ligar ao teu projeto (pede PROJECT ID)
4. 🚀 Fazer deploy do servidor
5. 👑 Criar conta ADMIN (opcional)

---

### **3. OBTER CREDENCIAIS**

No Supabase Dashboard:

1. Vai a **Project Settings** > **API**
2. Copia:
   - **Project URL** (ex: `https://xxx.supabase.co`)
   - **Project ID** (parte `xxx`)
   - **anon/public key**

---

### **4. CONFIGURAR FRONTEND**

Edita o ficheiro `/utils/supabase/info.tsx`:

```typescript
export const projectId = 'SEU_PROJECT_ID_AQUI';
export const publicAnonKey = 'SUA_ANON_KEY_AQUI';
```

---

### **5. CRIAR TABELA KV**

No Supabase Dashboard:

1. Vai a **SQL Editor**
2. Executa este SQL:

```sql
CREATE TABLE kv_store_12d56551 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index para queries mais rápidas
CREATE INDEX idx_kv_prefix ON kv_store_12d56551 (key text_pattern_ops);
```

---

### **6. TESTAR API**

Testa se está online:

```powershell
curl https://SEU_PROJECT_ID.supabase.co/functions/v1/make-server-12d56551/health
```

Deve retornar:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "service": "euconverto-api"
}
```

---

### **7. INICIALIZAR ADMIN**

Se não criaste durante o deploy:

```powershell
curl -X POST https://SEU_PROJECT_ID.supabase.co/functions/v1/make-server-12d56551/admin/init
```

**Credenciais ADMIN:**
- 📧 Email: `admin@euconverto.com`
- 🔑 Password: `Admin123!@#`

---

## 🎯 ENDPOINTS DISPONÍVEIS

Todos com prefixo: `https://[PROJECT_ID].supabase.co/functions/v1/make-server-12d56551`

### Autenticação
- `POST /auth/register` - Criar conta
- `POST /auth/login` - Login
- `POST /auth/recover` - Recuperar password
- `POST /auth/reset-password` - Reset password

### Utilizadores
- `GET /user` - Dados do user (requer auth)
- `PUT /user/settings` - Atualizar settings (requer auth)

### Assistentes
- `POST /assistants` - Criar assistente (requer auth)
- `GET /assistants` - Listar assistentes (requer auth)
- `PUT /assistants/:id` - Atualizar assistente (requer auth)
- `DELETE /assistants/:id` - Apagar assistente (requer auth)

### Leads
- `POST /leads` - Criar lead (público - widget)
- `GET /leads` - Listar leads (requer auth)
- `PUT /leads/:id` - Atualizar lead (requer auth)
- `DELETE /leads/:id` - Apagar lead (requer auth)

### Admin
- `POST /admin/init` - Criar conta admin (run once)

### Saúde
- `GET /health` - Health check

---

## 🔧 TROUBLESHOOTING

### Erro: "Supabase CLI not found"
→ Instala com: `scoop install supabase` ou `npm install -g supabase`

### Erro: "Project not linked"
→ Executa: `supabase link --project-ref SEU_PROJECT_ID`

### Erro: "Function deployment failed"
→ Verifica logs: `supabase functions logs server`

### Erro 401 no frontend
→ Verifica se `projectId` e `publicAnonKey` estão corretos em `/utils/supabase/info.tsx`

### Tabela não existe
→ Executa o SQL de criação da tabela `kv_store_12d56551`

---

## 📞 SUPORTE

Problemas? Mostra-me o erro completo! 🚀
