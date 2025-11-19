# 🚀 EUCONVERTO - INSTRUÇÕES DE DEPLOY

## ✅ O QUE JÁ ESTÁ PRONTO:

- ✅ **Backend** → Funcionando no Supabase (eyxcgkztplqkfwjzdflt)
- ✅ **Feedback por Email** → Funciona! Envia para marcosthenomad@gmail.com
- ✅ **Base de Dados** → Configurada com KV Store
- ✅ **Autenticação** → Sistema completo de login/register
- ✅ **Dashboard Premium** → Interface completa React + Tailwind

---

## 🎯 PARA FAZER DEPLOY:

### **OPÇÃO 1: Deploy do FRONTEND (Recomendado)**

**Duplo-clique em:**
```
deploy-site.bat
```

**O que acontece:**
1. Instala Vercel CLI (se necessário)
2. Faz deploy do site completo
3. Conecta ao domínio euconverto.com
4. Site fica ONLINE!

**Tempo:** 2-3 minutos

---

### **OPÇÃO 2: Deploy do BACKEND (Se fizeres alterações)**

**Duplo-clique em:**
```
deploy-backend.bat
```

**IMPORTANTE:** Precisas ter o Supabase CLI instalado!

**Se não tiveres:**
```bash
# No PowerShell (como Admin):
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**OU baixa aqui:**
https://supabase.com/docs/guides/cli

---

## 🧪 TESTAR SE ESTÁ TUDO OK:

### **Backend:**
Abre no browser:
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

**Deve aparecer:**
```json
{
  "status": "healthy",
  "timestamp": "...",
  "service": "euconverto-api"
}
```

### **Frontend:**
Depois do deploy:
```
https://euconverto.com
```

---

## 📧 FEEDBACK:

Quando alguém enviar feedback pelo dashboard, vais receber email em:
**marcosthenomad@gmail.com**

---

## ⚙️ CREDENCIAIS IMPORTANTES:

### **Supabase:**
- Project ID: `eyxcgkztplqkfwjzdflt`
- URL: `https://eyxcgkztplqkfwjzdflt.supabase.co`

### **Resend (Email):**
- API Key: Já configurada no Supabase
- Email de envio: `onboarding@resend.dev`

### **GitHub:**
- Repo: `https://github.com/marcosthenomad-source/euconverto.com`
- (Nota: Não conseguimos configurar o deploy automático, mas não é necessário!)

---

## 🔥 PRÓXIMOS PASSOS RECOMENDADOS:

1. **Fazer deploy do frontend** → `deploy-site.bat`
2. **Testar o site** → https://euconverto.com
3. **Criar uma conta de teste** → Verificar se tudo funciona
4. **Enviar um feedback** → Confirmar que chega ao email
5. **LUCRAR!** 💰

---

## ❓ PROBLEMAS COMUNS:

### "Vercel CLI não encontrado"
- O script instala automaticamente!
- Ou instala manualmente: `npm install -g vercel`

### "Supabase CLI não encontrado"
- Só precisas se quiseres fazer deploy do backend
- Instala: https://supabase.com/docs/guides/cli
- **MAS o backend JÁ ESTÁ DEPLOYED!**

### "Erro no deploy"
- Fecha o terminal e tenta outra vez
- Verifica se tens Node.js instalado
- Se persistir, contacta-me!

---

## 🎉 ESTÁ FEITO!

**Duplo-clique em `deploy-site.bat` e ACABOU!**

O resto já está tudo configurado e a funcionar! 🚀

---

*Última atualização: 19 Novembro 2025*
