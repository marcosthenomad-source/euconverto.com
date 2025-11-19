# ⚡ GUIA SUPER RÁPIDO - DEPLOY VIA GITHUB

## 🎯 O QUE FAZER (5 comandos)

### **1. Instala o Git (se não tiveres)**
https://git-scm.com/download/win
- Download → Next → Next → Install
- Fecha e abre novo CMD

---

### **2. Abre CMD na pasta do projeto**
```bash
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com
```

---

### **3. GitHub Setup (1 vez só)**

**A) Cria repo:** https://github.com/new
- Nome: `euconverto`
- Private
- Create

**B) Pega token Supabase:** https://supabase.com/dashboard/account/tokens
- Generate New Token
- Nome: `github-deploy`
- COPIA o `sbp_...`

**C) Adiciona secrets:** (no teu repo GitHub)
- Settings → Secrets and variables → Actions → New secret
- Secret 1: `SUPABASE_ACCESS_TOKEN` = `sbp_...`
- Secret 2: `SUPABASE_PROJECT_ID` = `eyxcgkztplqkfwjzdflt`

---

### **4. Envia para GitHub** (substitui SEU_USERNAME)
```bash
git init
git add .
git commit -m "Deploy EuConverto"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/euconverto.git
git push -u origin main
```

---

### **5. PRONTO! Verifica:**
- GitHub → Actions (vê deploy a correr)
- Testa: https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health

---

## 🔄 FUTURO: Fazer mudanças

```bash
git add .
git commit -m "Nova feature"
git push
```

**Deploy automático!** 🚀

---

## ❓ TL;DR

1. Cria repo GitHub
2. Adiciona 2 secrets
3. `git push`
4. **FUNCIONOU!**

**É ASSIM QUE SE FAZ A SÉRIO!** ✅
