# 🚀 EuConverto.com

## Chatbot Inteligente para Websites

Plataforma completa para criar e gerir chatbots que capturam leads dos teus clientes.

---

## ⚡ COMEÇAR AGORA - 3 PASSOS

### 📖 **LEIA ISTO PRIMEIRO:**
**👉 Abre o ficheiro: `FAZER-DEPLOY-AGORA.md`**

Tem TUDO explicado passo-a-passo em 6 minutos!

---

## ✨ Funcionalidades

- ✅ **Dashboard Premium** - Interface moderna React + Tailwind + shadcn/ui
- ✅ **Sistema de Autenticação** - Login, Register, Password Recovery
- ✅ **Gestão de Assistentes** - Cria e personaliza chatbots
- ✅ **Captura de Leads** - Recolhe informações dos utilizadores
- ✅ **Sistema de Feedback** - Emails automáticos via Resend
- ✅ **Calendário de Eventos** - Organiza compromissos
- ✅ **Multi-idioma** - Português e Inglês
- ✅ **Tema Claro/Escuro** - Personalização completa

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Supabase Edge Functions (Deno + Hono)
- **Database:** Supabase KV Store
- **Auth:** Supabase Auth
- **Email:** Resend API
- **Deploy:** Vercel (Frontend) + Supabase (Backend)
- **CI/CD:** GitHub Actions

---

## 🚀 Quick Start

### 1️⃣ Enviar para GitHub
```bash
# Duplo-clique no ficheiro:
git-push-tudo.bat
```

### 2️⃣ Configurar Secrets
Vai a: https://github.com/marcosthenomad-source/euconverto.com/settings/secrets/actions

Adiciona:
- `SUPABASE_PROJECT_ID` = `eyxcgkztplqkfwjzdflt`
- `SUPABASE_ACCESS_TOKEN` = (token do Supabase)

### 3️⃣ Deploy Frontend
```bash
# Duplo-clique no ficheiro:
deploy-site.bat
```

---

## 📧 Configuração

### Supabase
- **Project ID:** `eyxcgkztplqkfwjzdflt`
- **URL:** `https://eyxcgkztplqkfwjzdflt.supabase.co`
- **Dashboard:** https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt

### Resend (Email)
- Configurado para enviar feedbacks para: **marcosthenomad@gmail.com**
- Email remetente: `onboarding@resend.dev`

### GitHub
- **Repositório:** https://github.com/marcosthenomad-source/euconverto.com
- **Actions:** Deploy automático quando fizer push

---

## ✅ Status Atual

- ✅ **Backend** → DEPLOYED e funcionando!
- ✅ **Sistema de feedback** → Emails OK!
- ✅ **Autenticação** → Login/Register/Recovery OK!
- ✅ **Base de dados** → KV Store configurada!
- ✅ **GitHub** → Repositório criado!
- ⏳ **Frontend** → Pronto para deploy!

---

## 🧪 Testar

### Backend (Health Check)
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

**Resposta esperada:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-19T...",
  "service": "euconverto-api"
}
```

---

## 📂 Estrutura do Projeto

```
euconverto.com/
├── components/          # Componentes React
├── supabase/           # Backend (Edge Functions)
├── styles/             # CSS Global
├── utils/              # Utilitários
├── .github/            # GitHub Actions
├── deploy-site.bat     # Deploy Frontend
├── deploy-backend.bat  # Deploy Backend
└── git-push-tudo.bat   # Push para GitHub
```

---

## 📝 Licença

Proprietary - © 2025 EuConverto.com - Todos os direitos reservados

---

**AGORA VAI! 🔥**

*Última atualização: 19 Novembro 2025*