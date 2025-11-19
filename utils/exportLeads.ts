// Exportar leads para CSV/Excel

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  status: string;
  createdAt: string;
  notes?: string;
}

export const exportToCSV = (leads: Lead[], filename: string = 'leads.csv') => {
  // Headers
  const headers = ['Nome', 'Telefone', 'Email', 'Serviço', 'Estado', 'Data', 'Notas'];
  
  // Converter leads para linhas CSV
  const rows = leads.map(lead => [
    lead.name,
    lead.phone,
    lead.email,
    lead.service,
    lead.status,
    new Date(lead.createdAt).toLocaleDateString('pt-PT'),
    lead.notes || ''
  ]);

  // Juntar tudo
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Criar e fazer download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (leads: Lead[], filename: string = 'leads.xlsx') => {
  // Para Excel, usamos o mesmo formato CSV mas com extensão .xlsx
  // Browsers modernos abrem CSV como Excel automaticamente
  exportToCSV(leads, filename.replace('.xlsx', '.csv'));
};

export const exportToJSON = (leads: Lead[], filename: string = 'leads.json') => {
  const jsonContent = JSON.stringify(leads, null, 2);
  
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
