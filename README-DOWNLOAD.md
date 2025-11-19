# 📦 COMO FAZER DOWNLOAD DO PROJETO EUCONVERTO

## ✅ **OPÇÃO 1: DOWNLOAD DIRETO DO FIGMA MAKE (MAIS FÁCIL)**

Se estás no Figma Make, procura por:

1. **Botão "Export"** ou **"Download"** 
   - Normalmente está no canto superior direito
   - Pode ter um ícone de download ⬇️

2. **Menu "File" → "Export Project"**
   - Alguns editores têm esta opção no menu

3. **Atalho de teclado**
   - Ctrl+Shift+E ou Cmd+Shift+E

---

## 🔧 **OPÇÃO 2: CRIAR ZIP MANUALMENTE (SE NÃO HOUVER BOTÃO)**

### **No Windows:**
1. Duplo clique em `criar-zip.bat`
2. Aguarda até criar o ficheiro ZIP
3. Faz download do ficheiro `.zip` que foi criado

### **No Mac/Linux:**
1. Abre o Terminal
2. Vai para a pasta do projeto
3. Executa: `chmod +x criar-zip.sh && ./criar-zip.sh`
4. Aguarda até criar o ficheiro ZIP
5. Faz download do ficheiro `.zip` que foi criado

---

## 📋 **OPÇÃO 3: COPIAR FICHEIRO A FICHEIRO**

Se nada funcionar, copia manualmente cada ficheiro:

### **Ficheiros Essenciais:**
```
📁 euconverto/
├── 📄 App.tsx                          ← PRINCIPAL
├── 📄 deploy.bat                       ← Deploy Windows
├── 📄 deploy.sh                        ← Deploy Mac/Linux
├── 📄 INSTRUCOES_DEPLOY.md             ← Instruções
├── 📄 package.json                     ← Dependências
├── 📄 index.html                       ← HTML principal
├── 📁 components/                      ← Componentes React
│   ├── 📁 ui/                          ← ShadCN components
│   ├── 📄 Header.tsx
│   ├── 📄 Footer.tsx
│   ├── 📄 PricingCard.tsx
│   ├── 📄 Dashboard.tsx
│   ├── 📄 AssistantCustomizer.tsx
│   ├── 📄 LeadsTable.tsx
│   ├── 📄 CalendarView.tsx
│   ├── 📄 ThemeSwitcher.tsx
│   ├── 📄 NotificationSystem.tsx
│   ├── 📄 TagManager.tsx
│   ├── 📄 BillingInfo.tsx
│   └── 📄 PasswordRecovery.tsx
├── 📁 pages/
│   ├── 📄 LoginPage.tsx
│   ├── 📄 SignupPage.tsx
│   └── 📄 PricingPage.tsx
├── 📁 public/
│   └── 📄 widget.js                    ← Widget embeddable
├── 📁 styles/
│   └── 📄 globals.css                  ← Estilos globais
├── 📁 utils/
│   └── 📁 supabase/
│       ├── 📄 info.tsx                 ← Config Supabase
│       ├── 📄 client.tsx               ← Cliente Supabase
│       └── 📄 kv_store.tsx             ← KV Store
├── 📁 supabase/
│   ├── 📄 config.toml                  ← Config deploy
│   └── 📁 functions/
│       └── 📁 server/
│           ├── 📄 index.tsx            ← SERVIDOR PRINCIPAL
│           ├── 📄 auth.tsx             ← Autenticação
│           ├── 📄 assistants.tsx       ← Assistentes
│           ├── 📄 leads.tsx            ← Leads
│           ├── 📄 kv_store.tsx         ← KV (PROTEGIDO)
│           └── 📄 widget.tsx           ← Widget API
└── 📁 lib/
    └── 📄 utils.ts                     ← Utilidades
```

---

## ⚡ **DEPOIS DE FAZER DOWNLOAD:**

### **PASSO 1: EXTRAIR**
- Extrai o ZIP para uma pasta (ex: `C:\euconverto` ou `~/Desktop/euconverto`)

### **PASSO 2: INSTALAR DEPENDÊNCIAS**
Abre o Terminal/PowerShell na pasta e executa:
```bash
npm install
```

### **PASSO 3: FAZER DEPLOY**
- **Windows:** Duplo clique em `deploy.bat`
- **Mac/Linux:** `chmod +x deploy.sh && ./deploy.sh`

### **PASSO 4: TESTAR**
1. Abre: `https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health`
2. Deve responder: `{"status":"ok"}`
3. Login: `admin@euconverto.com` / `admin123456`
4. Testa o widget!

---

## 🆘 **NÃO CONSIGO FAZER DOWNLOAD?**

Se não consegues fazer download do Figma Make:

### **SOLUÇÃO 1: Pedir ao Suporte**
Contacta o suporte do Figma Make e pede para exportar o projeto.

### **SOLUÇÃO 2: Usar GitHub**
Se tens acesso a Git:
```bash
git clone https://github.com/teu-repo/euconverto.git
cd euconverto
npm install
```

### **SOLUÇÃO 3: Reconstruir Localmente**
Se nada funcionar, posso ajudar-te a recriar o projeto localmente!

---

## ✅ **CHECKLIST DE DOWNLOAD:**

- [ ] Fiz download de todos os ficheiros
- [ ] Tenho a pasta `supabase/functions/server/`
- [ ] Tenho o ficheiro `deploy.bat` ou `deploy.sh`
- [ ] Tenho o `package.json`
- [ ] Tenho a pasta `components/`
- [ ] Tenho o `App.tsx`

**Se tens tudo, estás pronto para o deploy!** 🚀

---

## 📞 **PRECISO DE AJUDA?**

Diz-me qual é o problema:
- ❓ "Não encontro o botão de download"
- ❓ "O ZIP não está a criar"
- ❓ "Falta algum ficheiro"
- ❓ "Não sei como extrair"

**Vou ajudar-te!** 💪
