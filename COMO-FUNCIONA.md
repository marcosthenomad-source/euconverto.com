# 🚀 Como Funciona o Sistema Widget Converto

## 📋 Visão Geral

O sistema permite que clientes criem chatbots personalizados e os instalem nos seus websites para capturar leads automaticamente.

---

## 🔄 Fluxo Completo

### 1️⃣ **Configuração no Dashboard**
- Cliente acede ao dashboard
- Configura o assistente:
  - Nome
  - Cor da marca
  - Mensagem de boas-vindas
  - Nome da empresa
  - Horário de funcionamento
  - Serviços oferecidos
- Sistema gera um **Widget ID único**

### 2️⃣ **Instalação no Website**
- Cliente clica em "Copiar Código"
- Recebe um snippet HTML com todas as configurações
- Cola o código no seu website antes do `</body>`

**Exemplo do código:**
```html
<script>
  window.convertoConfig = {
    clientId: 'widget_xyz789',
    assistantName: 'Maria',
    primaryColor: '#2563eb',
    welcomeMessage: 'Olá! Como posso ajudar?',
    companyName: 'MinhaEmpresa',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      openTime: '09:00',
      closeTime: '18:00'
    },
    services: ['Consultoria', 'Website', 'Marketing']
  };
</script>
<script src="https://cdn.euconverto.com/widget.js"></script>
```

### 3️⃣ **Widget Carrega no Site**
- Script `widget.js` é carregado
- Lê as configurações de `window.convertoConfig`
- Injeta o botão flutuante no canto inferior direito
- Widget fica pronto para uso

### 4️⃣ **Visitante Interage**
- Visitante clica no botão do widget
- Chat abre com 3 opções:
  - 📅 Ver Horário
  - 💼 Ver Serviços  
  - 📞 Quero ser contactado
- Fluxo totalmente controlado (sem input livre)

### 5️⃣ **Captura de Lead**
Quando visitante escolhe "Quero ser contactado":
1. Chatbot pergunta o **Nome**
2. Chatbot pergunta o **Telefone**
3. Chatbot pergunta o **Email**
4. Lead é enviado via POST para `/api/leads`

### 6️⃣ **Lead Guardado**
- API recebe o lead
- Guarda no banco de dados (Supabase)
- Cliente vê o lead na secção "Leads" do dashboard

---

## 📁 Estrutura dos Ficheiros

```
/
├── dashboard.tsx           → Dashboard do cliente
├── components/
│   └── WidgetPreview.tsx  → Preview do widget
├── public/
│   └── widget.js          → Script injetado nos sites
├── api/
│   ├── widget/[id].ts     → Retorna configs do widget
│   └── leads.ts           → Recebe leads capturados
└── demo-site.html         → Página de demonstração
```

---

## 🔌 APIs Criadas

### **GET /api/widget/[id]**
Retorna as configurações de um widget específico.

**Exemplo de resposta:**
```json
{
  "clientId": "widget_xyz789",
  "assistantName": "Maria",
  "primaryColor": "#2563eb",
  "welcomeMessage": "Olá!",
  "schedule": {...},
  "services": [...]
}
```

### **POST /api/leads**
Recebe um lead capturado pelo widget.

**Body esperado:**
```json
{
  "clientId": "widget_xyz789",
  "name": "João Silva",
  "phone": "+351 912345678",
  "email": "joao@email.com",
  "service": "Consultoria",
  "timestamp": "2024-11-15T10:30:00Z"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Lead recebido com sucesso!",
  "leadId": "lead_1234567890"
}
```

---

## 🧪 Como Testar

### Opção 1: Página Demo
1. Abre `/demo-site.html` no browser
2. Vês um website de exemplo com o widget ativo
3. Clica no botão azul no canto inferior direito
4. Testa o fluxo completo

### Opção 2: No Dashboard
1. Vai para "Configurar Assistente"
2. Vê o preview ao lado
3. Interage com o chat
4. Testa todas as funcionalidades

---

## 🔮 Próximos Passos (Produção)

### Quando conectares ao Supabase:

#### 1. **Tabela `widgets`**
```sql
CREATE TABLE widgets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  assistant_name TEXT,
  primary_color TEXT,
  welcome_message TEXT,
  company_name TEXT,
  schedule JSONB,
  services JSONB,
  created_at TIMESTAMP
);
```

#### 2. **Tabela `leads`**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  widget_id UUID REFERENCES widgets(id),
  name TEXT,
  phone TEXT,
  email TEXT,
  service TEXT,
  status TEXT DEFAULT 'novo',
  created_at TIMESTAMP
);
```

#### 3. **Atualizar APIs**
- `/api/widget/[id].ts` → Buscar do Supabase
- `/api/leads.ts` → Inserir no Supabase
- Dashboard → Buscar leads do Supabase

#### 4. **Hosting do widget.js**
- Upload para CDN (Cloudflare, AWS CloudFront, etc.)
- URL final: `https://cdn.euconverto.com/widget.js`

---

## 💡 Funcionalidades Atuais

✅ Widget totalmente funcional  
✅ Configuração personalizada (cores, mensagens, horário, serviços)  
✅ Fluxo controlado de captura de leads  
✅ Preview em tempo real no dashboard  
✅ Código pronto para copiar e colar  
✅ Responsive e mobile-friendly  
✅ Design profissional com glassmorphism  
✅ Dias sempre ordenados corretamente  
✅ Sistema de horário fancy com checkboxes  

---

## 🎯 Estado Atual

**Desenvolvimento:** ✅ Completo  
**Mock Data:** ✅ Funcional  
**APIs:** ✅ Criadas (mock)  
**Widget:** ✅ Funcional  
**Supabase:** ⏳ Pendente  

**Quando conectares ao Supabase, o sistema fica 100% pronto para produção!** 🚀

---

## 📞 Suporte

Em caso de dúvidas, verifica:
- `/demo-site.html` → Exemplo real
- Console do browser (F12) → Logs do widget
- `/public/widget.js` → Código completo do widget
