# 📧 Como Configurar o Resend para Receber Feedbacks por Email

## 🎯 Objectivo

Configurar o serviço Resend para que os feedbacks enviados pelos clientes sejam recebidos no email **marcosthenomad@gmail.com**.

---

## 📋 Passos para Configurar

### 1️⃣ Criar Conta no Resend (GRÁTIS)

1. Ir para https://resend.com
2. Clicar em **"Sign Up"** ou **"Get Started"**
3. Criar conta com um email (pode usar o marcosthenomad@gmail.com)
4. Verificar o email de confirmação

**✅ Plano Gratuito:**
- 3.000 emails/mês GRÁTIS
- 100 emails/dia
- Mais do que suficiente para feedbacks!

---

### 2️⃣ Obter a API Key

1. Após login, ir para **API Keys** no menu lateral
2. Clicar em **"Create API Key"**
3. Dar um nome: `euconverto-feedback`
4. Copiar a API Key (começa com `re_...`)
5. **IMPORTANTE:** Guardar a chave num local seguro (só é mostrada uma vez!)

---

### 3️⃣ Adicionar a API Key ao Supabase

#### Opção A: Interface do Supabase (Recomendado)

1. Ir para https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/settings/functions
2. Clicar na aba **"Edge Functions"** no menu lateral
3. Scroll down até **"Function Secrets"**
4. Clicar em **"Add Secret"**
5. Preencher:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxxxxxxx` (a chave que copiaste)
6. Clicar em **"Save"**

#### Opção B: CLI do Supabase

Se preferires usar a linha de comandos:

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 4️⃣ Verificar Domínio do Email (Opcional mas Recomendado)

Para enviar emails de `feedback@euconverto.com`, precisas verificar o domínio:

1. No Resend, ir para **Domains**
2. Clicar em **"Add Domain"**
3. Inserir: `euconverto.com`
4. Seguir as instruções para adicionar os registos DNS:
   - SPF
   - DKIM
   - DMARC

**Como adicionar registos DNS:**
1. Ir ao painel de controlo do teu domínio (onde compraste)
2. Procurar por "DNS Settings" ou "Manage DNS"
3. Adicionar os registos TXT fornecidos pelo Resend
4. Aguardar alguns minutos (pode demorar até 24h)
5. Voltar ao Resend e clicar em **"Verify"**

**📝 Nota:** Enquanto não verificares o domínio, os emails serão enviados de `onboarding@resend.dev`, mas funcionarão na mesma!

---

### 5️⃣ Fazer Redeploy do Backend

Depois de adicionar a API Key ao Supabase, é necessário fazer redeploy:

```powershell
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com
.\deploy.bat
```

Aguardar até ver:
```
✅ Deployed successfully!
```

---

### 6️⃣ Testar o Sistema de Feedback

1. Abrir a aplicação no browser
2. Fazer login
3. Ir para a secção **"Feedback"**
4. Preencher o formulário:
   - Tipo: `💡 Nova Funcionalidade`
   - Título: `Teste de Email`
   - Mensagem: `Este é um teste para verificar se os emails estão a funcionar.`
5. Clicar em **"Enviar Feedback"**
6. ✅ Deverás ver: "Feedback enviado com sucesso!"
7. ✅ Verificar o email marcosthenomad@gmail.com

---

## 📧 Como Serão os Emails

Receberás emails bonitos com o formato:

**Assunto:**
```
[EuConverto] 💡 Nova Funcionalidade: Teste de Email
```

**Corpo do Email:**
```
🎯 Novo Feedback Recebido

Tipo: 💡 Nova Funcionalidade
Título: Teste de Email
De: João Silva (joao@exemplo.com)
User ID: uuid-aqui
Data: 19/11/2025, 15:30:00

Mensagem:
Este é um teste para verificar se os emails estão a funcionar.
```

---

## 🔧 Resolução de Problemas

### Erro: "Feedback guardado! (Email não configurado)"
**Causa:** A variável `RESEND_API_KEY` não está configurada no Supabase.
**Solução:** Seguir o passo 3️⃣ para adicionar a API Key.

### Erro: "Feedback guardado! Email não enviado."
**Causa:** A API Key é inválida ou o Resend está com problemas.
**Solução:** 
1. Verificar se a API Key está correta
2. Verificar o limite de emails (3.000/mês)
3. Ver logs no Supabase: https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/logs/edge-functions

### Não recebo o email
**Verificar:**
1. ✅ Pasta de SPAM/Junk no Gmail
2. ✅ API Key está configurada no Supabase
3. ✅ Fez redeploy depois de adicionar a chave
4. ✅ Quota de emails não foi excedida

---

## 📊 Monitorizar Emails Enviados

### No Resend Dashboard

1. Ir para https://resend.com/emails
2. Ver todos os emails enviados
3. Ver status: `Delivered`, `Bounced`, `Failed`
4. Ver detalhes de cada email

### Nos Logs do Supabase

1. Ir para https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt/logs/edge-functions
2. Procurar por:
   - `Sending feedback email` (sucesso)
   - `Error sending email` (erro)

---

## 💰 Custos

**Plano Gratuito (Atual):**
- ✅ 3.000 emails/mês
- ✅ 100 emails/dia
- ✅ $0/mês

**Se precisares de mais:**
- **Plano Pro:** $20/mês
  - 50.000 emails/mês
  - 500 emails/dia
  - Domínios verificados ilimitados

---

## 🎯 Próximos Passos

Depois de tudo configurado:

1. ✅ Criar conta no Resend
2. ✅ Obter API Key
3. ✅ Adicionar ao Supabase como `RESEND_API_KEY`
4. ✅ Fazer redeploy do backend (`.\deploy.bat`)
5. ✅ Testar enviando um feedback
6. ✅ Verificar email em marcosthenomad@gmail.com
7. 🎉 Pronto! Sistema de feedback funcional

---

## 📝 Notas Importantes

- ✅ O feedback é **sempre guardado na base de dados**, mesmo se o email falhar
- ✅ Podes ver todos os feedbacks guardados em `feedback:{id}` na base de dados KV
- ✅ O sistema é fail-safe: se o Resend falhar, o feedback não é perdido
- ✅ Todos os feedbacks incluem o User ID para rastreabilidade

---

## 🔐 Segurança

- ✅ A API Key do Resend está guardada como variável de ambiente no Supabase
- ✅ Nunca exposta no código frontend
- ✅ Apenas o backend tem acesso
- ✅ Endpoint `/feedback` requer autenticação (token JWT)

---

**Pronto para receber feedback dos teus clientes! 🚀**

Se tiveres alguma dúvida durante a configuração, consulta a documentação do Resend: https://resend.com/docs
