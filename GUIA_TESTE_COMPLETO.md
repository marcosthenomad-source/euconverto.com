# 🧪 Guia de Teste Completo - EuConverto

## ✅ Estado Atual
- ✅ Backend API completamente implementado e deployed
- ✅ Todos os endpoints criados: `/assistant`, `/events`, `/tags`, `/leads`
- ✅ Frontend configurado para usar os endpoints corretos
- ✅ Formato de resposta do `/leads` corrigido (array direto)

## 📋 Como Testar

### 1️⃣ Testar Login e Dashboard
1. Abrir a aplicação no browser
2. Fazer login com as tuas credenciais
3. ✅ **Verificar**: Não deve aparecer "Error loading data"
4. ✅ **Verificar**: Dashboard deve carregar sem erros na consola

### 2️⃣ Testar Configuração do Assistente
1. Ir para a aba "Configurar"
2. Alterar o nome do assistente, cor, mensagem de boas-vindas
3. ✅ **Verificar**: Não deve aparecer "Error saving assistant config"
4. ✅ **Verificar**: As alterações devem ser guardadas automaticamente
5. Recarregar a página (F5)
6. ✅ **Verificar**: As configurações devem persistir

### 3️⃣ Testar Leads
1. Ir para a aba "Leads"
2. ✅ **Verificar**: A lista de leads deve carregar
3. ✅ **Verificar**: Não deve haver erros na consola do browser
4. Criar um lead manualmente (se o dashboard tiver essa opção)
5. ✅ **Verificar**: O lead deve aparecer na lista

### 4️⃣ Testar Calendário
1. Ir para a aba "Calendário"
2. ✅ **Verificar**: Não deve aparecer "Failed to fetch events: 404"
3. ✅ **Verificar**: O calendário deve carregar vazio (sem eventos ainda)
4. Clicar em "Novo Evento"
5. Preencher os dados do evento:
   - Título: "Teste de Evento"
   - Data: Qualquer data futura
   - Hora: 10:00
   - Descrição: "Evento de teste"
6. Salvar o evento
7. ✅ **Verificar**: O evento deve aparecer no calendário
8. Recarregar a página (F5)
9. ✅ **Verificar**: O evento deve continuar a aparecer

### 5️⃣ Testar Tags
1. No calendário, tentar criar uma nova tag
2. ✅ **Verificar**: A tag deve ser criada sem erros
3. ✅ **Verificar**: A tag deve aparecer na lista de filtros

## 🔍 Como Verificar Erros

### Abrir a Consola do Browser
**Chrome/Edge:**
- Pressionar `F12`
- Ir para a aba "Console"

**Firefox:**
- Pressionar `F12`
- Ir para a aba "Console"

### O que Procurar
✅ **BOM** - Nenhum erro vermelho
✅ **BOM** - Mensagens de sucesso: "📊 EVENTOS RECEBIDOS: X"
❌ **MAU** - Erros 404 Not Found
❌ **MAU** - Erros 500 Internal Server Error
❌ **MAU** - Mensagens "Error loading data"
❌ **MAU** - Mensagens "Error saving assistant config"
❌ **MAU** - Mensagens "Failed to fetch events: 404"

## 🐛 Se Encontrares Erros

### 1. Verificar se o Backend foi Deployed
```powershell
# Abrir PowerShell na pasta do projeto
cd C:\Users\marco\OneDrive\Desktop\euconverto.com\euconverto.com
.\deploy.bat
```

### 2. Verificar a Consola do Browser
- Copiar a mensagem de erro completa
- Procurar por:
  - URL do endpoint que falhou
  - Status code (404, 500, etc.)
  - Mensagem de erro específica

### 3. Testar os Endpoints Manualmente

#### Testar Health Check
Abrir no browser:
```
https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/health
```
✅ **Deve retornar**: `{"status":"healthy","timestamp":"...","service":"euconverto-api"}`

#### Testar Endpoints Autenticados
Usar uma ferramenta como [Postman](https://www.postman.com/) ou [Thunder Client](https://www.thunderclient.com/):

**GET /assistant**
- URL: `https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/assistant`
- Headers:
  - `Authorization: Bearer SEU_ACCESS_TOKEN`
  - `Content-Type: application/json`
- ✅ **Deve retornar**: Configuração do assistente ou `null`

**GET /events**
- URL: `https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/events`
- Headers:
  - `Authorization: Bearer SEU_ACCESS_TOKEN`
  - `Content-Type: application/json`
- ✅ **Deve retornar**: Array de eventos `[]`

**GET /tags**
- URL: `https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/tags`
- Headers:
  - `Authorization: Bearer SEU_ACCESS_TOKEN`
  - `Content-Type: application/json`
- ✅ **Deve retornar**: Array de tags `[]`

**GET /leads**
- URL: `https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551/leads`
- Headers:
  - `Authorization: Bearer SEU_ACCESS_TOKEN`
  - `Content-Type: application/json`
- ✅ **Deve retornar**: Array de leads `[]`

## 📝 Notas Importantes

### Onde Encontrar o Access Token
1. Fazer login na aplicação
2. Abrir a consola do browser (F12)
3. Ir para a aba "Application" (Chrome) ou "Storage" (Firefox)
4. Ir para "Local Storage" > `http://localhost:5173`
5. Procurar pela chave `access_token`
6. Copiar o valor (começará com `eyJ...`)

### Estrutura dos Dados

**Assistant:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Maria",
  "color": "#2563eb",
  "welcomeMessage": "Olá! Como posso ajudar?",
  "companyName": "Minha Empresa",
  "schedule": {
    "days": ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
    "openTime": "09:00",
    "closeTime": "18:00"
  },
  "services": ["Consultoria", "Website", "Marketing"]
}
```

**Event:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "title": "Evento de Teste",
  "startDate": "2025-11-20T10:00:00Z",
  "endDate": "2025-11-20T11:00:00Z",
  "description": "Descrição do evento",
  "allDay": false,
  "repeat": "never",
  "tags": [],
  "createdAt": "2025-11-19T..."
}
```

**Tag:**
```json
{
  "id": "uuid",
  "name": "Urgente",
  "color": "#ef4444",
  "createdAt": "2025-11-19T..."
}
```

**Lead:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "assistantId": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "+351912345678",
  "serviceType": "Consultoria",
  "message": "Preciso de ajuda",
  "status": "new",
  "tags": [],
  "createdAt": "2025-11-19T..."
}
```

## 🎯 Checklist Final

Antes de fazer deploy para produção:

- [ ] Login funciona sem erros
- [ ] Dashboard carrega sem "Error loading data"
- [ ] Configuração do assistente guarda automaticamente
- [ ] Calendário carrega sem "Failed to fetch events: 404"
- [ ] É possível criar novos eventos
- [ ] Eventos persistem após recarregar a página
- [ ] Tags podem ser criadas
- [ ] Leads são carregados corretamente
- [ ] Não há erros na consola do browser
- [ ] Health check endpoint responde com status "healthy"

## 🚀 Próximos Passos

Depois de todos os testes passarem:

1. ✅ Fazer deploy do frontend para Vercel usando `deploy-site.bat`
2. ✅ Testar a aplicação em produção (euconverto.com)
3. ✅ Configurar os Redirect URLs no Supabase (seguir `CONFIGURAR_REDIRECT_URLS.md`)
4. ✅ Testar o widget do chatbot num website de teste
5. ✅ Criar leads de teste através do widget
6. ✅ Verificar se os leads aparecem no dashboard

---

**Boa sorte com os testes! 🍀**

Se encontrares algum problema, revê este guia e verifica cada passo cuidadosamente.
