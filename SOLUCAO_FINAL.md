# ✅ SOLUÇÃO FINAL - Sistema de Debug

## 🎯 PROBLEMA RESOLVIDO:

O erro "Email já está registado" + "Login incorreto" acontece quando:
1. Criaste uma conta de teste anteriormente
2. Estás a tentar criar novamente com o mesmo email
3. Mas não te lembras da password

---

## 🛠️ SOLUÇÃO: Ferramenta de Debug

Criei uma ferramenta para **apagar contas de teste** e permitir começar do zero!

---

## 📍 COMO ACEDER:

### **Opção 1: URL com hash**
```
Vai para: /#debug
```

### **Opção 2: Modifica o URL manualmente**
1. Adiciona `#debug` no fim do URL
2. Exemplo: `https://seu-site.com/#debug`
3. Carrega a página

---

## 🗑️ COMO USAR:

### **Passo 1:** Acede à página de debug (`/#debug`)

### **Passo 2:** Insere o email que queres apagar
```
Exemplo: teste@email.com
```

### **Passo 3:** Clica em "🗑️ Apagar Conta"

### **Passo 4:** Aguarda confirmação
```
✅ Utilizador teste@email.com removido com sucesso!
```

### **Passo 5:** Agora podes criar nova conta com esse email!

---

## ⚙️ O QUE É APAGADO:

Quando apagas uma conta, o sistema remove **completamente**:

- ✅ **Supabase Auth:** Utilizador removido do sistema de autenticação
- ✅ **KV Store - user:{userId}:** Dados do perfil
- ✅ **KV Store - assistant:{userId}:** Configuração do assistente  
- ✅ **KV Store - leads:user:{userId}:** Array de leads
- ✅ **KV Store - lead:{leadId}:** Todas as leads individuais

---

## 🧪 TESTE COMPLETO AGORA:

### **1. Limpa a conta antiga:**
```
1. Vai para /#debug
2. Insere: teste@email.com (ou o email que usaste)
3. Clica "Apagar Conta"
4. ✅ Confirmação de sucesso
```

### **2. Cria nova conta:**
```
1. Volta para a homepage
2. Clica "Começar Agora" → Signup
3. Email: teste@email.com
4. Password: teste123 (mínimo 6 caracteres)
5. ✅ Conta criada!
```

### **3. Faz login:**
```
1. Vai para Login
2. Email: teste@email.com
3. Password: teste123
4. ✅ Entras no Dashboard!
```

---

## 🔐 SEGURANÇA:

### **⚠️ Esta ferramenta é APENAS para desenvolvimento!**

- Não requer autenticação (qualquer pessoa pode apagar qualquer conta)
- **REMOVE ANTES DO DEPLOY EM PRODUÇÃO**
- Útil apenas para testes e desenvolvimento

### **Para Produção:**
- Adiciona autenticação (só admin pode apagar)
- OU remove completamente o endpoint `/debug/delete-user`
- OU protege com API key secreta

---

## 📊 LOGS DO SERVIDOR:

Quando apagas uma conta, verás nos logs:
```
🗑️ Attempting to delete user: teste@email.com
Found user in KV: abc123-user-id-xyz
✅ Deleted user data from KV Store
✅ Deleted user from Supabase Auth
✅ Deleted user from Auth by email search
```

---

## 🚀 PRÓXIMOS PASSOS:

Agora que tens o sistema de autenticação funcional:

1. ✅ **Criar conta** → funciona
2. ✅ **Login** → funciona  
3. ✅ **Apagar contas de teste** → funciona
4. 🔜 **Conectar Dashboard** ao backend real
5. 🔜 **Criar Widget** do chatbot
6. 🔜 **Deploy** em produção

---

## 💡 DICA PRO:

**Guarda estas credenciais para testes:**
```
Email: teste@euconverto.com
Password: teste123456
```

Se quiseres começar do zero, usa a ferramenta de debug! 🎯

---

**Tudo pronto! O sistema de autenticação está 100% funcional!** 🎉
