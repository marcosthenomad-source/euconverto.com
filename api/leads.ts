// API Endpoint para receber leads capturados
// POST /api/leads

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientId, name, phone, email, service, timestamp } = req.body;

  // Validação básica
  if (!clientId || !name || !phone || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Por agora, só log no console
  console.log('🎉 NOVO LEAD CAPTURADO!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Cliente ID:', clientId);
  console.log('Nome:', name);
  console.log('Telefone:', phone);
  console.log('Email:', email);
  console.log('Serviço:', service || 'Não especificado');
  console.log('Timestamp:', timestamp);
  console.log('━━━━━━━━━━━━━━━━━━━━━━\n');

  // Quando tiveres Supabase, fazes:
  // const { data, error } = await supabase
  //   .from('leads')
  //   .insert([{ client_id: clientId, name, phone, email, service, created_at: timestamp }])

  // Por agora, simula sucesso
  res.status(200).json({ 
    success: true, 
    message: 'Lead recebido com sucesso!',
    leadId: `lead_${Date.now()}`
  });
}
