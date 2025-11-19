# 🚀 DEPLOY MANUAL - EUCONVERTO.COM

## ✅ PASSO 1: CRIAR TABELA (OBRIGATÓRIO)

### No Supabase Dashboard:

1. Vai a: https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/editor
2. Clica em **SQL Editor** (ícone </> no menu lateral)
3. Clica em **+ New Query**
4. Cola este SQL:

```sql
CREATE TABLE IF NOT EXISTS kv_store_12d56551 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kv_prefix ON kv_store_12d56551 (key text_pattern_ops);
```

5. Clica em **RUN** (ou pressiona Ctrl+Enter)
6. Deve aparecer: "Success. No rows returned"

---

## ✅ PASSO 2: FAZER DEPLOY DAS EDGE FUNCTIONS

### Método 1: Via NPX (SEM INSTALAR)

No **CMD** na pasta do projeto:

```cmd
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com

npx supabase login

npx supabase link --project-ref eyxcgkztplqkfwjzdflt

npx supabase functions deploy server
```

### Método 2: Upload Manual (se NPX falhar)

1. Vai a: https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/functions
2. Clica em **Create a new function**
3. Nome: `server`
4. Copia TODO o conteúdo de `/supabase/functions/server/index.tsx`
5. Cola no editor
6. Clica em **Deploy**

**ATENÇÃO:** Para o upload manual funcionar, vais precisar de também fazer upload do ficheiro `kv_store.tsx`. Mas a melhor opção é usar NPX!

---

## ✅ PASSO 3: CRIAR CONTA ADMIN

Depois do deploy, no **CMD**:

```cmd
curl -X POST https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/admin/init
```

Ou usa o **PowerShell**:

```powershell
Invoke-RestMethod -Uri "https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/admin/init" -Method POST
```

**Credenciais ADMIN:**
- 📧 Email: `admin@euconverto.com`
- 🔑 Password: `Admin123!@#`

---

## ✅ PASSO 4: TESTAR

```cmd
curl https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

Deve retornar:
```json
{"status":"healthy","timestamp":"...","service":"euconverto-api"}
```

---

## 🎯 TUA API:

**Base URL:**
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551
```

**Endpoints:**
- `POST /auth/register` - Criar conta
- `POST /auth/login` - Login
- `GET /user` - Dados user
- `POST /assistants` - Criar assistente
- `GET /assistants` - Listar assistentes
- `POST /leads` - Criar lead
- `GET /leads` - Listar leads
- `GET /health` - Health check

---

## ⚡ CREDENCIAIS CONFIGURADAS:

- ✅ PROJECT_ID: `eyxcgkztplqkfwjzdflt`
- ✅ ANON_KEY: Configurado
- ✅ Frontend: Atualizado automaticamente

---

## 📸 MOSTRA-ME OS RESULTADOS!

Depois de cada passo, mostra-me screenshot! 🚀
