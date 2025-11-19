// API Endpoint para buscar configurações do widget
// GET /api/widget/[id]

export default async function handler(req: any, res: any) {
  const { id } = req.query;

  // Por agora, retorna dados mock
  // Quando tiveres Supabase, fazes: SELECT * FROM widgets WHERE id = id
  
  const mockConfig = {
    clientId: id,
    assistantName: 'Assistente Virtual',
    primaryColor: '#2563eb',
    welcomeMessage: 'Olá! Como posso ajudar?',
    companyName: 'MinhaEmpresa',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      openTime: '09:00',
      closeTime: '18:00'
    },
    services: ['Consultoria', 'Website', 'Marketing Digital']
  };

  res.status(200).json(mockConfig);
}
