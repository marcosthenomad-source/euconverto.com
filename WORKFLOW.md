# 🔄 WORKFLOW DE DESENVOLVIMENTO - EUCONVERTO.COM

## ✅ COMO FAZER MUDANÇAS NO BACKEND

### **1. EDITAR CÓDIGO**

Abre e modifica qualquer destes ficheiros:

- `/supabase/functions/server/index.tsx` - Servidor principal (rotas, autenticação, lógica)
- `/supabase/functions/server/kv_store.tsx` - Sistema de base de dados KV

**Exemplos de mudanças comuns:**

#### Adicionar nova rota:
```typescript
// Em /supabase/functions/server/index.tsx
app.post('/make-server-12d56551/nova-rota', async (c) => {
  // ... lógica aqui
  return c.json({ success: true });
});
```

#### Modificar autenticação:
```typescript
// Procura por "auth/login" e modifica
```

#### Adicionar campos aos leads:
```typescript
// Procura por "POST /leads" e adiciona campos
const lead = {
  id: leadId,
  // ... campos existentes
  novoCampo: leadData.novoCampo,  // ← NOVO
  createdAt: new Date().toISOString()
};
```

---

### **2. FAZER REDEPLOY**

#### **MÉTODO 1: Script Automático (MAIS FÁCIL)** ✅

Duplo-clique em: **`redeploy.bat`**

Pronto! O script:
1. Vai automaticamente para a pasta certa
2. Faz upload do código
3. Mostra se deu sucesso
4. Mostra a URL da API

#### **MÉTODO 2: Manual via CMD**

```cmd
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com
npx supabase functions deploy server
```

---

### **3. TESTAR**

Depois do deploy, testa a API:

```cmd
curl https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

Ou abre no browser:
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health

---

## 🐛 DEBUG E LOGS

### Ver logs em tempo real:

```cmd
npx supabase functions logs server --follow
```

### Ver últimos 100 logs:

```cmd
npx supabase functions logs server --limit 100
```

### Logs no dashboard:

https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/logs/edge-functions

---

## 📁 ESTRUTURA DO PROJETO

```
euconverto.com/
├── supabase/
│   ├── functions/
│   │   └── server/
│   │       ├── index.tsx        ← SERVIDOR PRINCIPAL (EDITA AQUI)
│   │       └── kv_store.tsx     ← BASE DE DADOS (EDITA SE PRECISAR)
│   └── config.toml
├── src/                          ← FRONTEND (React/TypeScript)
├── utils/
│   └── supabase/
│       └── info.tsx              ← CREDENCIAIS (JÁ CONFIGURADO)
├── redeploy.bat                  ← SCRIPT REDEPLOY (DUPLO-CLIQUE)
├── deploy-manual.md              ← INSTRUÇÕES DEPLOY INICIAL
└── WORKFLOW.md                   ← ESTE FICHEIRO
```

---

## ⚡ DICAS RÁPIDAS

### ✅ **BOM:**
- Edita LOCAL → Redeploy → Testa
- Usa `redeploy.bat` para velocidade
- Vê os logs se algo falhar
- Comenta o código para lembrar mudanças

### ❌ **EVITA:**
- Editar direto no Supabase dashboard (perdes mudanças locais)
- Fazer deploy sem testar localmente
- Modificar `/utils/supabase/kv_store.tsx` (é protegido)

---

## 🔥 EXEMPLOS PRÁTICOS

### Adicionar validação de email:

1. Abre `/supabase/functions/server/index.tsx`
2. Procura por `POST /auth/register`
3. Adiciona antes de criar user:
```typescript
if (!email.includes('@')) {
  return c.json({ error: 'Email inválido' }, 400);
}
```
4. Duplo-clique em `redeploy.bat`
5. Pronto!

### Adicionar campo aos assistentes:

1. Procura por `POST /assistants`
2. Adiciona no objeto `assistant`:
```typescript
const assistant = {
  id: assistantId,
  userId: user.id,
  ...assistantData,
  novoCampo: assistantData.novoCampo,  // ← NOVO
  createdAt: new Date().toISOString()
};
```
3. Redeploy!

### Criar nova rota de estatísticas:

```typescript
app.get('/make-server-12d56551/stats', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    
    return c.json({ 
      success: true,
      stats: {
        totalAssistants: userData?.assistants?.length || 0,
        totalLeads: userData?.leads?.length || 0
      }
    });
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});
```

---

## 🆘 PROBLEMAS COMUNS

### "Deploy failed"
→ Vê os erros no terminal
→ Verifica sintaxe do TypeScript
→ Vê logs: `npx supabase functions logs server`

### "Function not found"
→ Verifica se fez deploy: `npx supabase functions list`
→ Refaz link: `npx supabase link --project-ref eyxcgkztplqkfwjzdflt`

### Mudanças não aparecem
→ Espera 10-30 segundos depois do deploy
→ Força refresh no browser (Ctrl+F5)
→ Verifica se editaste o ficheiro certo

---

## 📞 SUPORTE

Qualquer dúvida, mostra-me:
1. O erro completo
2. O código que mudaste
3. Screenshot do terminal

Vou ajudar! 🚀
