# 🚀 DEPLOY MANUAL VIA SUPABASE DASHBOARD

## ❌ Problema
O Supabase CLI não instala devido a permissões do Windows.

## ✅ Solução: Deploy Manual (5 minutos)

---

## PASSO 1: Acede ao Supabase Dashboard

1. Vai a: https://supabase.com/dashboard/project/eyxcgkztplqkfwjzdflt
2. Faz login na tua conta Supabase
3. No menu lateral esquerdo, clica em **"Edge Functions"**

---

## PASSO 2: Verifica/Cria a Function

### Se JÁ EXISTE uma function chamada `make-server-12d56551`:
- Clica nela
- Vai ao **Step 3**

### Se NÃO EXISTE:
1. Clica em **"New Function"** ou **"Create Function"**
2. Nome: `make-server-12d56551`
3. Clica em **"Create"**

---

## PASSO 3: Atualiza o Código

1. Na página da function `make-server-12d56551`
2. Procura o botão **"Edit Function"** ou separador **"Code"**
3. Vai ver um editor de código
4. **APAGA TODO** o código que lá está
5. Abre o ficheiro do projeto: `/supabase/functions/server/index.ts`
6. **COPIA TODO** o conteúdo desse ficheiro
7. **COLA** no editor do Supabase Dashboard
8. Clica em **"Save"** ou **"Deploy"**

---

## PASSO 4: Verifica a RESEND_API_KEY

1. No Supabase Dashboard, vai a **"Project Settings"** (ícone de engrenagem)
2. No menu lateral, clica em **"Edge Functions"**
3. Scroll down até **"Function Secrets"** ou **"Environment Variables"**
4. Confirma que existe: `RESEND_API_KEY` com valor `re_...`
   - ✅ Se JÁ EXISTE: Continua para Step 5
   - ❌ Se NÃO EXISTE: 
     - Clica **"New Secret"**
     - Name: `RESEND_API_KEY`
     - Value: (tua API key do Resend)
     - Save

---

## PASSO 5: Testa o Backend

Abre no browser:
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```

**Resposta esperada:**
```json
{"status":"ok"}
```

Se vires isto: ✅ **BACKEND DEPLOYADO COM SUCESSO!**

---

## PASSO 6: Testa o Feedback

1. Abre a tua aplicação euconverto.com
2. Faz login
3. Vai à secção **"Feedback"**
4. Preenche o formulário:
   - Tipo: "Nova Funcionalidade"
   - Título: "Teste do sistema de email"
   - Mensagem: "Este é um teste!"
5. Clica em **"Enviar Feedback"**
6. Verifica o teu email: **marcosthenomad@gmail.com** 📧

---

## 🎉 PRONTO!

Se recebeste o email, o sistema está **100% funcional**!

---

## ⚠️ Troubleshooting

### Não recebi o email:
1. Verifica a pasta de SPAM
2. Confirma que a RESEND_API_KEY está correta
3. No Resend.com, vai a "Logs" para ver se o email foi enviado
4. Verifica se o email do Resend está verificado

### O backend não responde (erro 404):
1. Confirma que o nome da function é exatamente: `make-server-12d56551`
2. Confirma que fizeste "Deploy" depois de colar o código
3. Espera 30 segundos e testa novamente

### Erro ao fazer deploy:
1. Confirma que copiaste TODO o código de `/supabase/functions/server/index.ts`
2. Inclui também o código do `/supabase/functions/server/kv_store.ts` se pedido

---

## 📞 Precisa de Ajuda?

Se nada disto funcionar, envia-me:
- Screenshot do erro
- URL que estás a tentar aceder
- Logs do browser (F12 > Console)
