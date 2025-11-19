# 🧪 Guia de Teste - Autenticação

## ✅ O QUE FOI CORRIGIDO:

### **Backend:**
- ✅ Removida verificação duplicada no KV Store
- ✅ Usa apenas Supabase Auth como fonte única de verdade
- ✅ Login usa `SUPABASE_ANON_KEY` (correto para signin)
- ✅ Signup usa `SUPABASE_SERVICE_ROLE_KEY` (correto para criar users)
- ✅ Se utilizador existe no Auth mas não no KV, cria dados automaticamente no login
- ✅ Mensagens de erro em português e claras

### **Frontend:**
- ✅ Mensagens de erro traduzidas
- ✅ Botão para ir para login quando email duplicado
- ✅ Loading states nos botões
- ✅ Validação de password mínimo (6 caracteres)

---

## 🧪 TESTE PASSO A PASSO:

### **Teste 1: Criar Conta Nova** ✅
1. Vai para a página de Signup
2. Preenche com email NOVO (ex: `teste123@gmail.com`)
3. Password: `teste123` (mínimo 6 caracteres)
4. Clica "Criar Conta"

**Resultado esperado:**
- ✅ Conta criada com sucesso
- ✅ Auto-login
- ✅ Redireciona para dashboard

---

### **Teste 2: Tentar Email Duplicado** ⚠️
1. Vai para Signup novamente
2. Usa o MESMO email do Teste 1
3. Preenche tudo e clica "Criar Conta"

**Resultado esperado:**
- ❌ Erro: "Este email já está registado"
- ✅ Botão "Ir para login" aparece
- ✅ Não cria conta duplicada

---

### **Teste 3: Login com Credenciais Corretas** ✅
1. Vai para Login
2. Email: `teste123@gmail.com`
3. Password: `teste123`
4. Clica "Entrar"

**Resultado esperado:**
- ✅ Login bem-sucedido
- ✅ Redireciona para dashboard

---

### **Teste 4: Login com Password Errada** ❌
1. Vai para Login
2. Email: `teste123@gmail.com`
3. Password: `errada123`
4. Clica "Entrar"

**Resultado esperado:**
- ❌ Erro: "Email ou palavra-passe incorretos"
- ✅ Fica na página de login

---

### **Teste 5: Password Curta no Signup** ❌
1. Vai para Signup
2. Email novo: `teste456@gmail.com`
3. Password: `123` (menos de 6)
4. Clica "Criar Conta"

**Resultado esperado:**
- ❌ Erro: "A palavra-passe deve ter pelo menos 6 caracteres"

---

## 🔍 VERIFICAR NO CONSOLE:

Após criar uma conta, verifica nos logs do servidor:
```
Auth signup error: [não deve aparecer]
User created successfully ✅
```

Após login bem-sucedido:
```
Auth signin error: [não deve aparecer]
Login successful ✅
```

---

## 🚨 SE AINDA HOUVER ERROS:

### **Erro: "Email já existe" mas não consigo fazer login**

**Solução:**
1. Vai para Login (não Signup)
2. Usa o email que tentaste criar
3. Usa a password que tentaste usar
4. O sistema agora sincroniza automaticamente se faltarem dados no KV

---

## ✅ STATUS ATUAL:

- ✅ Supabase Auth conectado e funcional
- ✅ KV Store sincronizado
- ✅ Signup funciona sem duplicados
- ✅ Login funciona com credenciais corretas
- ✅ Mensagens de erro claras em português
- ✅ Auto-recuperação se dados inconsistentes

**PRÓXIMO PASSO:** Conectar Dashboard ao backend real! 🚀
