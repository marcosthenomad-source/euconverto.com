import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Code, 
  Users, 
  User, 
  MessageSquare,
  LogOut,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit,
  X,
  Check,
  TrendingUp,
  Euro,
  Calendar,
  FileText,
  Bell,
  Globe,
  Rocket,
  ChevronDown
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import WidgetPreview from './components/WidgetPreview';
import { useLanguage } from './contexts/LanguageContext';
import { templates, getTemplate } from './data/templates';
import { exportToCSV } from './utils/exportLeads';
import { requestNotificationPermission, isNotificationEnabled, sendLeadNotification } from './utils/notifications';
import FlagIcon from './components/FlagIcon';
import CalendarWidget from './components/CalendarWidget';
import CalendarPage from './components/CalendarPage';
import { assistant as assistantAPI, auth, leads as leadsAPI, feedback as feedbackAPI } from './utils/api';

type Page = 'home' | 'login' | 'signup' | 'dashboard';
type DashboardSection = 'overview' | 'config' | 'leads' | 'feedback' | 'account' | 'calendar';
type LeadStatus = 'novo' | 'contactado' | 'progresso' | 'completo' | 'pago' | 'perdido';
type Plan = 'starter' | 'professional' | 'business';

interface LeadFile {
  id: string;
  name: string;
  size: number;
  url: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: LeadStatus;
  value: number;
  createdAt: Date;
  lastStatusChange: Date;
  files: LeadFile[];
  notes: string;
}

interface DashboardProps {
  onNavigate: (page: Page) => void;
  userPlan?: Plan;
  signupData?: { company?: string; service?: string } | null;
}

export default function Dashboard({ onNavigate, userPlan = 'professional', signupData }: DashboardProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [currentSection, setCurrentSection] = useState<DashboardSection>('overview');
  const [selectedWidget, setSelectedWidget] = useState<number>(1);
  
  // Feedback state
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [sendingFeedback, setSendingFeedback] = useState(false);
  
  // Get service label from signup
  const getServiceLabel = (serviceKey: string) => {
    const labels: Record<string, string> = {
      ecommerce: 'E-commerce / Loja Online',
      services: 'Prestação de Serviços',
      restaurant: 'Restaurante / Café',
      health: 'Saúde / Clínica',
      education: 'Educação / Formação',
      realestate: 'Imobiliário',
      automotive: 'Automóvel',
      beauty: 'Beleza / Estética',
      other: 'Outro'
    };
    return labels[serviceKey] || serviceKey;
  };
  
  const [assistantConfig, setAssistantConfig] = useState({
    name: 'Maria',
    color: '#2563eb',
    welcomeMessage: 'Olá! Como posso ajudar?',
    companyName: signupData?.company || '',
    schedule: {
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'] as string[],
      openTime: '09:00',
      closeTime: '18:00'
    },
    services: ['Consultoria', 'Website', 'Marketing'] as string[]
  });
  
  const now = new Date();
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Pedro Santos',
      email: 'pedro@exemplo.com',
      phone: '+351 912 345 678',
      service: 'Consultoria',
      status: 'novo',
      value: 0,
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      lastStatusChange: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      files: [],
      notes: ''
    },
    {
      id: '2',
      name: 'Ana Silva',
      email: 'ana@exemplo.com',
      phone: '+351 923 456 789',
      service: 'Website',
      status: 'contactado',
      value: 0,
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      lastStatusChange: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      files: [],
      notes: 'Cliente interessado em website e-commerce'
    },
    {
      id: '3',
      name: 'Carlos Ferreira',
      email: 'carlos@exemplo.com',
      phone: '+351 934 567 890',
      service: 'Marketing Digital',
      status: 'pago',
      value: 2500,
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      lastStatusChange: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      files: [],
      notes: 'Projeto concluído com sucesso'
    },
    {
      id: '4',
      name: 'Maria Costa',
      email: 'maria@exemplo.com',
      phone: '+351 945 678 901',
      service: 'SEO',
      status: 'novo',
      value: 0,
      createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
      lastStatusChange: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
      files: [],
      notes: ''
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [revenueView, setRevenueView] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [notificationsEnabled, setNotificationsEnabled] = useState(isNotificationEnabled());
  const [selectedTemplate, setSelectedTemplate] = useState<string>('custom');
  const [dashboardTheme, setDashboardTheme] = useState<'original' | 'purple' | 'green' | 'amber' | 'rose'>('original');
  const [showQuickActions, setShowQuickActions] = useState(() => {
    const stored = localStorage.getItem('showQuickActions');
    return stored !== null ? stored === 'true' : true;
  });

  // Theme colors
  const themeColors = {
    original: {
      logo: 'from-blue-600 to-blue-500',
      button: 'from-blue-500 to-indigo-500',
      buttonHover: 'from-blue-50 to-indigo-50 hover:text-blue-700',
      avatar: 'from-blue-500 to-indigo-600',
      card1: { bg: 'from-blue-50 to-indigo-50', text: 'text-blue-600', textDark: 'text-blue-900', accent: 'text-blue-600' },
      card2: { bg: 'from-teal-50 to-teal-50', text: 'text-teal-600', textDark: 'text-teal-900', accent: 'text-emerald-600' },
      card3: { bg: 'from-amber-50 to-yellow-50', text: 'text-amber-600', textDark: 'text-amber-900', accent: 'text-orange-600' },
      card4: { bg: 'from-cyan-50 to-sky-50', text: 'text-cyan-600', textDark: 'text-cyan-900', accent: 'text-sky-600' },
      badge: 'from-green-500 to-teal-500'
    },
    purple: {
      logo: 'from-violet-600 to-indigo-600',
      button: 'from-violet-500 to-indigo-500',
      buttonHover: 'from-violet-50 to-indigo-50 hover:text-violet-700',
      avatar: 'from-violet-500 to-purple-600',
      card1: { bg: 'from-violet-50 to-purple-50', text: 'text-violet-600', textDark: 'text-violet-900', accent: 'text-emerald-600' },
      card2: { bg: 'from-emerald-50 to-teal-50', text: 'text-emerald-600', textDark: 'text-emerald-900', accent: 'text-teal-600' },
      card3: { bg: 'from-amber-50 to-orange-50', text: 'text-amber-600', textDark: 'text-amber-900', accent: 'text-orange-600' },
      card4: { bg: 'from-cyan-50 to-sky-50', text: 'text-cyan-600', textDark: 'text-cyan-900', accent: 'text-sky-600' },
      badge: 'from-emerald-500 to-teal-500'
    },
    green: {
      logo: 'from-emerald-600 to-teal-600',
      button: 'from-emerald-500 to-teal-500',
      buttonHover: 'from-emerald-50 to-teal-50 hover:text-emerald-700',
      avatar: 'from-emerald-500 to-teal-600',
      card1: { bg: 'from-emerald-50 to-teal-50', text: 'text-emerald-600', textDark: 'text-emerald-900', accent: 'text-teal-600' },
      card2: { bg: 'from-blue-50 to-indigo-50', text: 'text-blue-600', textDark: 'text-blue-900', accent: 'text-indigo-600' },
      card3: { bg: 'from-amber-50 to-orange-50', text: 'text-amber-600', textDark: 'text-amber-900', accent: 'text-orange-600' },
      card4: { bg: 'from-purple-50 to-pink-50', text: 'text-purple-600', textDark: 'text-purple-900', accent: 'text-pink-600' },
      badge: 'from-blue-500 to-indigo-500'
    },
    amber: {
      logo: 'from-amber-600 to-orange-600',
      button: 'from-amber-500 to-orange-500',
      buttonHover: 'from-amber-50 to-orange-50 hover:text-amber-700',
      avatar: 'from-amber-500 to-orange-600',
      card1: { bg: 'from-amber-50 to-orange-50', text: 'text-amber-600', textDark: 'text-amber-900', accent: 'text-orange-600' },
      card2: { bg: 'from-teal-50 to-cyan-50', text: 'text-teal-600', textDark: 'text-teal-900', accent: 'text-cyan-600' },
      card3: { bg: 'from-purple-50 to-pink-50', text: 'text-purple-600', textDark: 'text-purple-900', accent: 'text-pink-600' },
      card4: { bg: 'from-blue-50 to-indigo-50', text: 'text-blue-600', textDark: 'text-blue-900', accent: 'text-indigo-600' },
      badge: 'from-teal-500 to-cyan-500'
    },
    rose: {
      logo: 'from-rose-600 to-pink-600',
      button: 'from-rose-500 to-pink-500',
      buttonHover: 'from-rose-50 to-pink-50 hover:text-rose-700',
      avatar: 'from-rose-500 to-pink-600',
      card1: { bg: 'from-rose-50 to-pink-50', text: 'text-rose-600', textDark: 'text-rose-900', accent: 'text-pink-600' },
      card2: { bg: 'from-blue-50 to-indigo-50', text: 'text-blue-600', textDark: 'text-blue-900', accent: 'text-indigo-600' },
      card3: { bg: 'from-amber-50 to-orange-50', text: 'text-amber-600', textDark: 'text-amber-900', accent: 'text-orange-600' },
      card4: { bg: 'from-emerald-50 to-teal-50', text: 'text-emerald-600', textDark: 'text-emerald-900', accent: 'text-teal-600' },
      badge: 'from-blue-500 to-indigo-500'
    }
  };

  const theme = themeColors[dashboardTheme];

  const handleCloseQuickActions = () => {
    setShowQuickActions(false);
    localStorage.setItem('showQuickActions', 'false');
  };

  // New Lead Form
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    notes: ''
  });

  // Edit Lead Form (separate from selectedLead for controlled inputs)
  const [editForm, setEditForm] = useState<{
    status: LeadStatus;
    value: string;
    phone: string;
    service: string;
    notes: string;
  } | null>(null);

  // Plan limits
  const planLimits = {
    starter: 500,
    professional: 2000,
    business: Infinity
  };

  const conversationsUsed = 127;
  const conversationsLimit = planLimits[userPlan];

  // Revenue data (mock)
  const revenueData = {
    day: [
      { name: '00h', value: 0 },
      { name: '04h', value: 0 },
      { name: '08h', value: 150 },
      { name: '12h', value: 300 },
      { name: '16h', value: 450 },
      { name: '20h', value: 600 },
      { name: '24h', value: 750 }
    ],
    week: [
      { name: 'Seg', value: 1200 },
      { name: 'Ter', value: 800 },
      { name: 'Qua', value: 1500 },
      { name: 'Qui', value: 2100 },
      { name: 'Sex', value: 2500 },
      { name: 'Sab', value: 400 },
      { name: 'Dom', value: 200 }
    ],
    month: [
      { name: 'Sem 1', value: 3500 },
      { name: 'Sem 2', value: 4200 },
      { name: 'Sem 3', value: 5800 },
      { name: 'Sem 4', value: 8700 }
    ],
    year: [
      { name: 'Jan', value: 18000 },
      { name: 'Fev', value: 22000 },
      { name: 'Mar', value: 25000 },
      { name: 'Abr', value: 28000 },
      { name: 'Mai', value: 32000 },
      { name: 'Jun', value: 35000 },
      { name: 'Jul', value: 30000 },
      { name: 'Ago', value: 27000 },
      { name: 'Set', value: 38000 },
      { name: 'Out', value: 42000 },
      { name: 'Nov', value: 45000 },
      { name: 'Dez', value: 50000 }
    ]
  };

  // Calculate total revenue based on selected view
  const getTotalRevenue = () => {
    const data = revenueData[revenueView];
    return data.reduce((sum, item) => sum + item.value, 0);
  };

  const totalRevenue = getTotalRevenue();

  // Get lead color based on days since last status change
  const getLeadColor = (lastStatusChange: Date, status: LeadStatus) => {
    // Se pago, retorna preto
    if (status === 'pago' || status === 'completo') return 'black';
    
    const daysSince = Math.floor((Date.now() - lastStatusChange.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSince <= 2) return 'green';
    if (daysSince <= 7) return 'yellow';
    return 'red';
  };

  const statusLabels: Record<LeadStatus, string> = {
    novo: 'Novo',
    contactado: 'Contactado',
    progresso: 'Em Progresso',
    completo: 'Completo',
    pago: 'Pago',
    perdido: 'Perda de Tempo'
  };

  // Filter out "perdido" leads and apply search/filter
  const filteredLeads = leads
    .filter(lead => lead.status !== 'perdido') // Leads perdidas desaparecem
    .filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.service.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

  const navItems = [
    { id: 'overview' as DashboardSection, icon: LayoutDashboard, label: 'Overview' },
    { id: 'config' as DashboardSection, icon: Settings, label: 'Configurar Assistente' },
    { id: 'leads' as DashboardSection, icon: Users, label: 'Leads' },
    { id: 'calendar' as DashboardSection, icon: Calendar, label: language === 'pt' ? 'Calendário' : 'Calendar' },
    { id: 'feedback' as DashboardSection, icon: MessageSquare, label: 'Feedback' },
    { id: 'account' as DashboardSection, icon: User, label: 'Conta' }
  ];

  // Handle adding new lead
  const handleAddLead = () => {
    if (!newLead.name || !newLead.email) {
      toast.error('Nome e Email são obrigatórios!');
      return;
    }

    const lead: Lead = {
      id: Date.now().toString(),
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      service: newLead.service,
      status: 'novo',
      value: 0,
      createdAt: new Date(),
      lastStatusChange: new Date(),
      files: [],
      notes: newLead.notes
    };

    setLeads([lead, ...leads]);
    setNewLead({ name: '', email: '', phone: '', service: '', notes: '' });
    setIsAddLeadOpen(false);
    toast.success('Lead adicionado com sucesso!');
  };

  // Handle opening edit dialog
  const handleOpenEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditForm({
      status: lead.status,
      value: lead.value.toString(),
      phone: lead.phone,
      service: lead.service,
      notes: lead.notes
    });
  };

  // Handle saving edited lead
  const handleSaveLead = () => {
    if (!selectedLead || !editForm) return;

    const statusChanged = editForm.status !== selectedLead.status;

    setLeads(leads.map(lead => 
      lead.id === selectedLead.id 
        ? {
            ...lead,
            status: editForm.status,
            value: parseFloat(editForm.value) || 0,
            phone: editForm.phone,
            service: editForm.service,
            notes: editForm.notes,
            lastStatusChange: statusChanged ? new Date() : lead.lastStatusChange // Reset timer se mudou status
          }
        : lead
    ));

    // Se mudou para "perdido", a lead vai desaparecer automaticamente pelo filtro
    if (editForm.status === 'perdido') {
      toast.success('Lead movido para o lixo');
    } else {
      toast.success('Lead atualizado com sucesso!');
    }

    setSelectedLead(null);
    setEditForm(null);
  };

  // Handle file upload (mock)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedLead || !e.target.files) return;

    const files = Array.from(e.target.files);
    const newFiles: LeadFile[] = files.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file)
    }));

    setLeads(leads.map(lead =>
      lead.id === selectedLead.id
        ? { ...lead, files: [...lead.files, ...newFiles] }
        : lead
    ));

    setSelectedLead({
      ...selectedLead,
      files: [...selectedLead.files, ...newFiles]
    });

    toast.success(`${files.length} ficheiro(s) adicionado(s)!`);
  };

  // Handle file delete
  const handleDeleteFile = (fileId: string) => {
    if (!selectedLead) return;

    setLeads(leads.map(lead =>
      lead.id === selectedLead.id
        ? { ...lead, files: lead.files.filter(f => f.id !== fileId) }
        : lead
    ));

    setSelectedLead({
      ...selectedLead,
      files: selectedLead.files.filter(f => f.id !== fileId)
    });

    toast.success('Ficheiro removido!');
  };

  // Handle delete lead
  const handleDeleteLead = async (leadId: string) => {
    try {
      await leadsAPI.delete(leadId);
      setLeads(leads.filter(lead => lead.id !== leadId));
      setSelectedLead(null);
      setEditForm(null);
      toast.success('Lead eliminado!');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Erro ao eliminar lead');
    }
  };

  // Handle send feedback
  const handleSendFeedback = async () => {
    if (!feedbackType || !feedbackTitle || !feedbackMessage) {
      toast.error('Por favor, preencha todos os campos!');
      return;
    }

    setSendingFeedback(true);
    try {
      const response = await feedbackAPI.send({
        type: feedbackType,
        title: feedbackTitle,
        message: feedbackMessage
      });
      
      toast.success(response.message || 'Feedback enviado com sucesso! Obrigado!');
      
      // Reset form
      setFeedbackType('');
      setFeedbackTitle('');
      setFeedbackMessage('');
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast.error('Erro ao enviar feedback. Por favor, tente novamente.');
    } finally {
      setSendingFeedback(false);
    }
  };

  // Load assistant config and leads on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load assistant config
        const assistantData = await assistantAPI.get();
        if (assistantData) {
          setAssistantConfig({
            name: assistantData.name || 'Maria',
            color: assistantData.color || '#2563eb',
            welcomeMessage: assistantData.welcomeMessage || 'Olá! Como posso ajudar?',
            companyName: assistantData.companyName || signupData?.company || '',
            schedule: assistantData.schedule || {
              days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
              openTime: '09:00',
              closeTime: '18:00'
            },
            services: assistantData.services || assistantData.serviceOptions || ['Consultoria', 'Website', 'Marketing']
          });
        }

        // Load leads
        const leadsData = await leadsAPI.getAll();
        if (leadsData && leadsData.length > 0) {
          const formattedLeads = leadsData.map((lead: any) => ({
            id: lead.id,
            name: lead.name || '',
            email: lead.email || '',
            phone: lead.phone || '',
            service: lead.service || '',
            status: (lead.status || 'novo') as LeadStatus,
            value: lead.value || 0,
            createdAt: new Date(lead.createdAt),
            lastStatusChange: new Date(lead.lastStatusChange || lead.createdAt),
            files: lead.files || [],
            notes: lead.notes || ''
          }));
          setLeads(formattedLeads);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Don't show error toast, just use defaults
      }
    };

    loadData();
  }, []);

  // Save assistant config when it changes (debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        await assistantAPI.update({
          name: assistantConfig.name,
          color: assistantConfig.color,
          welcomeMessage: assistantConfig.welcomeMessage,
          companyName: assistantConfig.companyName,
          schedule: assistantConfig.schedule,
          services: assistantConfig.services,
          serviceOptions: assistantConfig.services,
          position: 'bottom-right',
          enabled: true,
          fields: ['name', 'email', 'phone', 'service', 'message']
        });
      } catch (error) {
        console.error('Error saving assistant config:', error);
      }
    }, 1000); // Save 1 second after user stops typing

    return () => clearTimeout(timer);
  }, [assistantConfig]);

  // Copy code to clipboard
  const handleCopyCode = () => {
    // Get user ID from localStorage (set during login)
    const userId = auth.getUserId();
    const assistantId = `ast_${userId}`;
    
    const code = `<script>
  window.euconvertoConfig = {
    assistantId: '${assistantId}'
  };
</script>
<script src="${window.location.origin}/widget.js"></script>`;

    // Fallback method that works everywhere
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Código copiado! Cole no seu website antes do </body>');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Erro ao copiar. Selecione o código manualmente.');
    } finally {
      document.body.removeChild(textarea);
    }
  };

  // Handle enable notifications
  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationsEnabled(true);
      toast.success(t('dashboard.account.pushEnabled'));
      // Teste
      sendLeadNotification('João Silva', 'Consultoria');
    } else {
      toast.error(t('dashboard.account.pushError'));
    }
  };

  // Handle export leads
  const handleExportLeads = () => {
    const filteredLeads = leads
      .filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lead.phone.includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
        return matchesSearch && matchesFilter;
      })
      .map(lead => ({
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        service: lead.service,
        status: statusLabels[lead.status],
        createdAt: lead.createdAt.toISOString(),
        notes: lead.notes
      }));

    exportToCSV(filteredLeads as any, `leads_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success(t('dashboard.leads.exportSuccess'));
  };

  // Handle load template
  const handleLoadTemplate = (templateId: string) => {
    if (templateId === 'custom') {
      setSelectedTemplate('custom');
      return;
    }

    const template = getTemplate(templateId);
    if (!template) return;

    setAssistantConfig({
      name: template.config.name,
      color: template.config.color,
      welcomeMessage: template.config.welcomeMessage[language],
      companyName: template.config.companyName,
      schedule: template.config.schedule,
      services: template.config.services[language]
    });
    
    setSelectedTemplate(templateId);
    toast.success(`Template "${template.name}" carregado! Pode editar à vontade.`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/60 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-200/60">
          <h1 className={`text-xl font-semibold bg-gradient-to-r ${theme.logo} bg-clip-text text-transparent cursor-pointer`} onClick={() => onNavigate('home')}>
            euconverto.com
          </h1>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                currentSection === item.id
                  ? `bg-gradient-to-r ${theme.button} text-white shadow-md`
                  : `text-gray-600 hover:bg-gradient-to-r hover:${theme.buttonHover}`
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setCurrentSection('account')}
          >
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.avatar} text-white flex items-center justify-center shadow-md`}>
              J
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">João Silva</p>
              <p className="text-xs text-[#64748b]">{userPlan === 'professional' ? 'Professional' : userPlan === 'business' ? 'Business' : 'Starter'}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-2 justify-start text-[#64748b]"
            onClick={() => onNavigate('home')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-8 py-6 flex items-center justify-between shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800">
            {navItems.find(item => item.id === currentSection)?.label}
          </h2>
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FlagIcon country={language} size="sm" />
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showLangDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden min-w-[70px] z-50">
                <button
                  onClick={() => {
                    setLanguage('pt');
                    setShowLangDropdown(false);
                  }}
                  className="w-full px-3 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <FlagIcon country="pt" size="sm" />
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setShowLangDropdown(false);
                  }}
                  className="w-full px-3 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <FlagIcon country="gb" size="sm" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* OVERVIEW SECTION */}
          {currentSection === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-blue-600 mb-2 font-medium">Conversas Hoje</p>
                    <p className="text-3xl mb-1 font-semibold text-blue-900">12</p>
                    <p className="text-xs text-blue-600 font-medium">+8% vs ontem</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-blue-600 mb-2 font-medium">Leads este Mês</p>
                    <p className="text-3xl mb-1 font-semibold text-blue-900">{leads.filter(l => l.status !== 'perdido').length}</p>
                    <p className="text-xs text-blue-600 font-medium">Novos leads</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-blue-600 mb-2 font-medium">Taxa de Conversão</p>
                    <p className="text-3xl mb-1 font-semibold text-blue-900">24%</p>
                    <p className="text-xs text-blue-600 font-medium">Leads → Clientes</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-blue-600 mb-2 font-medium">Conversas Restantes</p>
                    <p className="text-3xl mb-1 font-semibold text-blue-900">
                      {conversationsLimit === Infinity ? '∞' : (conversationsLimit - conversationsUsed).toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      {conversationsLimit === Infinity ? 'Ilimitadas' : `de ${conversationsLimit.toLocaleString()}`}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Chart */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg mb-1">Faturação</h3>
                      <p className="text-3xl text-[#2563eb]">€{totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={revenueView === 'day' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRevenueView('day')}
                      >
                        Dia
                      </Button>
                      <Button
                        variant={revenueView === 'week' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRevenueView('week')}
                      >
                        Semana
                      </Button>
                      <Button
                        variant={revenueView === 'month' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRevenueView('month')}
                      >
                        Mês
                      </Button>
                      <Button
                        variant={revenueView === 'year' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setRevenueView('year')}
                      >
                        Ano
                      </Button>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData[revenueView]}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'white', 
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value) => ['€' + value, 'Faturação']}
                        labelStyle={{ color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2563eb" 
                        strokeWidth={3}
                        fill="url(#colorRevenue)"
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Calendar Widget */}
              <CalendarWidget
                language={language}
                onNavigate={(section) => setCurrentSection(section as DashboardSection)}
              />

              {/* Quick Actions */}
              {showQuickActions && (
                <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white relative">
                  <button
                    onClick={handleCloseQuickActions}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <CardContent className="p-6">
                    <h3 className="text-lg mb-2 font-semibold">🚀 {t('dashboard.quickActions.title')}</h3>
                    <ol className="space-y-2 text-sm text-white/95">
                      <li>1. {t('dashboard.quickActions.step1')}</li>
                      <li>2. {t('dashboard.quickActions.step2')}</li>
                      <li>3. {t('dashboard.quickActions.step3')}</li>
                      <li>4. {t('dashboard.quickActions.step4')}</li>
                    </ol>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* CONFIGURAR ASSISTENTE SECTION */}
          {currentSection === 'config' && (
            <div className="space-y-6">
              {/* Template Selection */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Rocket className="w-6 h-6 text-[#2563eb]" />
                    <h3 className="text-lg">⚡ {t('dashboard.template.fastStart')}</h3>
                  </div>
                  <p className="text-sm text-[#64748b] mb-4">
                    {t('dashboard.template.description')}
                  </p>
                  <Select value={selectedTemplate} onValueChange={handleLoadTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('dashboard.template.placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">
                        <div className="flex items-center gap-2">
                          <span>🎨</span>
                          <span>{t('dashboard.template.customOption')}</span>
                        </div>
                      </SelectItem>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center gap-2">
                            <span>{template.icon}</span>
                            <span>{t(`template.${template.id}`)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Widget Selection */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">{t('dashboard.widget.selectTitle')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Widget 1 - Classic Bubble */}
                    <div
                      onClick={() => setSelectedWidget(1)}
                      className={`relative cursor-pointer rounded-xl border-2 transition-all p-6 ${
                        selectedWidget === 1
                          ? 'border-[#2563eb] shadow-lg'
                          : 'border-gray-200 hover:border-[#2563eb]/50'
                      }`}
                    >
                      {selectedWidget === 1 && (
                        <div className="absolute -top-3 -right-3 bg-[#2563eb] text-white rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-8 mb-4 h-40 flex items-center justify-end">
                        <div className="flex items-center gap-3">
                          <div className="bg-white px-4 py-2 rounded-lg shadow-md text-sm whitespace-nowrap">
                            {assistantConfig.welcomeMessage}
                          </div>
                          <div 
                            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg flex-shrink-0"
                            style={{ background: assistantConfig.color }}
                          >
                            💬
                          </div>
                        </div>
                      </div>
                      <p className="text-center">{t('dashboard.widget.classicBubble')}</p>
                    </div>

                    {/* Widget 2 - Minimal Tab */}
                    <div
                      onClick={() => setSelectedWidget(2)}
                      className={`relative cursor-pointer rounded-xl border-2 transition-all p-6 ${
                        selectedWidget === 2
                          ? 'border-[#2563eb] shadow-lg'
                          : 'border-gray-200 hover:border-[#2563eb]/50'
                      }`}
                    >
                      {selectedWidget === 2 && (
                        <div className="absolute -top-3 -right-3 bg-[#2563eb] text-white rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-8 mb-4 h-40 flex items-center justify-end">
                        <div 
                          className="px-4 py-3 rounded-l-lg shadow-lg text-white text-sm flex items-center gap-2"
                          style={{ background: assistantConfig.color }}
                        >
                          <MessageSquare className="w-4 h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{assistantConfig.welcomeMessage}</span>
                        </div>
                      </div>
                      <p className="text-center">{t('dashboard.widget.minimalTab')}</p>
                    </div>

                    {/* Widget 3 - Full Chat Preview */}
                    <div
                      onClick={() => setSelectedWidget(3)}
                      className={`relative cursor-pointer rounded-xl border-2 transition-all p-6 ${
                        selectedWidget === 3
                          ? 'border-[#2563eb] shadow-lg'
                          : 'border-gray-200 hover:border-[#2563eb]/50'
                      }`}
                    >
                      {selectedWidget === 3 && (
                        <div className="absolute -top-3 -right-3 bg-[#2563eb] text-white rounded-full p-1">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 h-40 flex items-center justify-end pr-8 relative">
                        {/* Balão de fala */}
                        <div className="absolute bottom-[100px] right-[110px] bg-white px-4 py-3 rounded-[18px] shadow-lg max-w-[200px] animate-bubble-float">
                          <div className="text-sm leading-tight">
                            <span className="text-[#111827] font-semibold">{assistantConfig.welcomeMessage}</span>
                          </div>
                          {/* Seta do balão */}
                          <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white transform rotate-45 shadow-sm"></div>
                        </div>
                        
                        <div className="relative inline-block animate-character-bounce" style={{ width: '90px', height: '90px' }}>
                          {/* Ondas de atenção */}
                          <div className="absolute -top-1 -left-1 w-[100px] h-[100px] border-[3px] rounded-full opacity-0 pointer-events-none animate-ring-pulse" style={{ borderColor: assistantConfig.color }}></div>
                          <div className="absolute -top-1 -left-1 w-[100px] h-[100px] border-[3px] rounded-full opacity-0 pointer-events-none animate-ring-pulse-delay1" style={{ borderColor: assistantConfig.color }}></div>
                          <div className="absolute -top-1 -left-1 w-[100px] h-[100px] border-[3px] rounded-full opacity-0 pointer-events-none animate-ring-pulse-delay2" style={{ borderColor: assistantConfig.color }}></div>
                          
                          {/* Corpo do boneco */}
                          <div 
                            className="w-[90px] h-[90px] rounded-full relative flex items-center justify-center border-4 border-white shadow-lg"
                            style={{ 
                              background: `linear-gradient(135deg, ${assistantConfig.color} 0%, ${assistantConfig.color}dd 100%)`,
                              boxShadow: `0 8px 24px ${assistantConfig.color}66`
                            }}
                          >
                            {/* Rosto */}
                            <div className="flex flex-col items-center gap-2">
                              {/* Olhos */}
                              <div className="flex gap-4">
                                <div className="w-2 h-2 bg-white rounded-full animate-blink"></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-blink"></div>
                              </div>
                              {/* Sorriso */}
                              <div className="w-[22px] h-[11px] border-[3px] border-white border-t-0 rounded-b-[22px]"></div>
                            </div>
                          </div>
                          
                          {/* Braço com mão - VERSÃO CORRETA! */}
                          <div 
                            className="absolute w-[40px] h-[6px] rounded-[3px] animate-arm-wave"
                            style={{ 
                              background: assistantConfig.color,
                              top: '40px',
                              right: '-15px',
                              transformOrigin: 'left center'
                            }}
                          >
                            {/* Mão amarela */}
                            <div 
                              className="absolute w-[18px] h-[18px] bg-[#fbbf24] rounded-full"
                              style={{ 
                                right: '-9px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.6)'
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-center">{t('dashboard.widget.cardPopup')}</p>
                      <style>{`
                        @keyframes character-bounce {
                          0%, 100% { transform: translateY(0); }
                          50% { transform: translateY(-6px); }
                        }
                        .animate-character-bounce {
                          animation: character-bounce 2s ease-in-out infinite;
                        }
                        
                        @keyframes arm-wave {
                          0% { transform: rotate(40deg); }
                          25% { transform: rotate(-30deg); }
                          50% { transform: rotate(-50deg); }
                          75% { transform: rotate(-30deg); }
                          100% { transform: rotate(40deg); }
                        }
                        .animate-arm-wave {
                          animation: arm-wave 1s ease-in-out infinite;
                        }
                        
                        @keyframes blink {
                          0%, 96%, 100% { transform: scaleY(1); }
                          98% { transform: scaleY(0.1); }
                        }
                        .animate-blink {
                          animation: blink 4s infinite;
                        }
                        
                        @keyframes ring-pulse {
                          0% { transform: scale(0.9); opacity: 0.6; }
                          100% { transform: scale(1.5); opacity: 0; }
                        }
                        .animate-ring-pulse {
                          animation: ring-pulse 3s ease-out infinite;
                        }
                        .animate-ring-pulse-delay1 {
                          animation: ring-pulse 3s ease-out infinite 1s;
                        }
                        .animate-ring-pulse-delay2 {
                          animation: ring-pulse 3s ease-out infinite 2s;
                        }
                        
                        @keyframes bubble-float {
                          0% { transform: translateY(0); }
                          50% { transform: translateY(-10px); }
                          100% { transform: translateY(0); }
                        }
                        .animate-bubble-float {
                          animation: bubble-float 3s ease-in-out infinite;
                        }
                        
                        @keyframes emoji-wave {
                          0% { transform: translateY(0); }
                          50% { transform: translateY(-5px); }
                          100% { transform: translateY(0); }
                        }
                        .animate-emoji-wave {
                          animation: emoji-wave 1s ease-in-out infinite;
                        }
                      `}</style>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Configuration Form */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-6">Personalizar Assistente</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Assistente</Label>
                      <Input
                        id="name"
                        value={assistantConfig.name}
                        onChange={(e) => setAssistantConfig({ ...assistantConfig, name: e.target.value })}
                        placeholder="Ex: Maria, João"
                      />
                    </div>

                    <div>
                      <Label htmlFor="color">Cor Primária</Label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          id="color"
                          value={assistantConfig.color}
                          onChange={(e) => setAssistantConfig({ ...assistantConfig, color: e.target.value })}
                          className="w-14 h-14 rounded-lg border-2 border-gray-200 cursor-pointer"
                        />
                        <Input
                          value={assistantConfig.color}
                          readOnly
                          className="font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="welcome">Mensagem de Boas-Vindas</Label>
                      <Textarea
                        id="welcome"
                        value={assistantConfig.welcomeMessage}
                        onChange={(e) => setAssistantConfig({ ...assistantConfig, welcomeMessage: e.target.value })}
                        placeholder="Ex: Olá! Como posso ajudar?"
                        rows={3}
                      />
                    </div>

                    <div className="border-t pt-4 mt-2">
                      <h4 className="text-md mb-4">📋 Informação sobre o Negócio</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="companyName">Nome da Empresa *</Label>
                          <Input
                            id="companyName"
                            value={assistantConfig.companyName}
                            onChange={(e) => setAssistantConfig({ ...assistantConfig, companyName: e.target.value })}
                            placeholder="Ex: Construções Silva"
                          />
                        </div>

                        <div>
                          <Label>Horário de Funcionamento *</Label>
                          <div className="mt-2 space-y-3">
                            {/* Dias da semana */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <p className="text-sm text-gray-600 mb-3">Dias de funcionamento:</p>
                              <div className="flex flex-wrap gap-2">
                                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((dia) => {
                                  const isSelected = assistantConfig.schedule.days.includes(dia);
                                  return (
                                    <button
                                      key={dia}
                                      type="button"
                                      onClick={() => {
                                        const newDays = isSelected
                                          ? assistantConfig.schedule.days.filter(d => d !== dia)
                                          : [...assistantConfig.schedule.days, dia];
                                        setAssistantConfig({
                                          ...assistantConfig,
                                          schedule: { ...assistantConfig.schedule, days: newDays }
                                        });
                                      }}
                                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        isSelected
                                          ? 'bg-[#2563eb] text-white shadow-md'
                                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-[#2563eb]'
                                      }`}
                                    >
                                      {isSelected && '✓ '}{dia}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Horários */}
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <p className="text-sm text-gray-600 mb-3">Horário:</p>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Label htmlFor="openTime" className="text-xs text-gray-500">Abre às</Label>
                                  <Input
                                    id="openTime"
                                    type="time"
                                    value={assistantConfig.schedule.openTime}
                                    onChange={(e) => setAssistantConfig({
                                      ...assistantConfig,
                                      schedule: { ...assistantConfig.schedule, openTime: e.target.value }
                                    })}
                                    className="mt-1"
                                  />
                                </div>
                                <div className="text-2xl text-gray-400 mt-5">→</div>
                                <div className="flex-1">
                                  <Label htmlFor="closeTime" className="text-xs text-gray-500">Fecha às</Label>
                                  <Input
                                    id="closeTime"
                                    type="time"
                                    value={assistantConfig.schedule.closeTime}
                                    onChange={(e) => setAssistantConfig({
                                      ...assistantConfig,
                                      schedule: { ...assistantConfig.schedule, closeTime: e.target.value }
                                    })}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Preview do horário */}
                            {assistantConfig.schedule.days.length > 0 && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-800">
                                  📅 <strong>Horário configurado:</strong> {[...assistantConfig.schedule.days].sort((a, b) => {
                                    const order = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
                                    return order.indexOf(a) - order.indexOf(b);
                                  }).join(', ')} | {assistantConfig.schedule.openTime} - {assistantConfig.schedule.closeTime}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="services">Serviços Oferecidos * (separe por vírgulas)</Label>
                          <Textarea
                            id="services"
                            value={assistantConfig.services.join(', ')}
                            onChange={(e) => {
                              const servicesArray = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                              setAssistantConfig({ ...assistantConfig, services: servicesArray });
                            }}
                            placeholder="Ex: Chão radiante, Pintura, Remodelações, Carpintaria"
                            rows={3}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Estes serviços aparecerão como opções quando o cliente preencher o formulário
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        className="flex-1"
                        onClick={() => toast.success('Configurações guardadas!')}
                      >
                        Guardar Alterações
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setAssistantConfig({
                            name: 'Maria',
                            color: '#2563eb',
                            welcomeMessage: 'Olá! Como posso ajudar?',
                            companyName: '',
                            schedule: {
                              days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
                              openTime: '09:00',
                              closeTime: '18:00'
                            },
                            services: []
                          });
                          toast.success('Configurações repostas!');
                        }}
                      >
                        Repor Padrão
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* LIVE PREVIEW SECTION */}
              <Card className="border-0 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white p-6">
                    <h3 className="text-lg mb-1">🔴 Preview ao Vivo</h3>
                    <p className="text-sm text-white/80">O chat está aberto e pronto para testar - funciona a sério!</p>
                  </div>
                  <div className="p-6 bg-gray-100">
                    <WidgetPreview selectedWidget={selectedWidget} assistantConfig={assistantConfig} />
                  </div>
                </CardContent>
              </Card>

              {/* Code Section */}
              <Card className="border-0 shadow-sm bg-[#0f172a] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg mb-1">📋 Código de Instalação</h3>
                      <p className="text-sm text-white/60">Cole este código no seu website antes do tag &lt;/body&gt;</p>
                    </div>
                    <Button size="sm" variant="secondary" onClick={handleCopyCode}>
                      <Code className="w-4 h-4 mr-2" />
                      Copiar Código
                    </Button>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    <pre className="text-green-400">{`<script>
  window.euconvertoConfig = {
    assistantId: 'ast_${auth.getUserId()}'
  };
</script>
<script src="${window.location.origin}/widget.js"></script>`}</pre>
                  </div>
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-200">
                      💡 <strong>Dica:</strong> O widget irá aparecer automaticamente no canto inferior direito do seu site. 
                      Todas as leads capturadas aparecerão na secção "Leads" do seu dashboard!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* LEADS SECTION */}
          {currentSection === 'leads' && (
            <div className="space-y-6">
              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                  <Input
                    placeholder="Pesquisar leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as LeadStatus | 'all')}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="novo">Novo</SelectItem>
                    <SelectItem value="contactado">Contactado</SelectItem>
                    <SelectItem value="progresso">Em Progresso</SelectItem>
                    <SelectItem value="completo">Completo</SelectItem>
                    <SelectItem value="pago">Pago</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleExportLeads}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button onClick={() => setIsAddLeadOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Lead
                </Button>
              </div>

              {/* Leads List */}
              <div className="space-y-3">
                {filteredLeads.map((lead) => {
                  const color = getLeadColor(lead.lastStatusChange, lead.status);
                  const daysSince = Math.floor((Date.now() - lead.lastStatusChange.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <Card
                      key={lead.id}
                      className={`border-l-4 transition-all hover:shadow-md cursor-pointer ${
                        color === 'green' ? 'border-l-[#10b981]' :
                        color === 'yellow' ? 'border-l-[#f59e0b]' :
                        color === 'red' ? 'border-l-[#ef4444]' :
                        color === 'black' ? 'border-l-[#0f172a]' :
                        'border-l-gray-300'
                      }`}
                      onClick={() => handleOpenEditLead(lead)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg truncate">{lead.name}</h3>
                              <Badge variant={lead.status === 'pago' ? 'default' : 'secondary'}>
                                {statusLabels[lead.status]}
                              </Badge>
                              {daysSince === 0 && lead.status === 'novo' && (
                                <Badge className={`bg-gradient-to-r ${theme.badge} text-white shadow-sm`}>Novo Hoje!</Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-[#64748b]">
                              <div className="flex items-center gap-2">
                                <span>📧</span>
                                <span className="truncate">{lead.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>📱</span>
                                <span>{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>💼</span>
                                <span>{lead.service}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>há {daysSince} {daysSince === 1 ? 'dia' : 'dias'}</span>
                              </div>
                            </div>
                            {lead.status === 'pago' && lead.value > 0 && (
                              <div className="flex items-center gap-2 mt-2 text-[#10b981]">
                                <Euro className="w-4 h-4" />
                                <span className="font-semibold">€{lead.value.toLocaleString()}</span>
                              </div>
                            )}
                            {lead.files.length > 0 && (
                              <div className="flex items-center gap-2 mt-2 text-[#64748b] text-sm">
                                <FileText className="w-4 h-4" />
                                <span>{lead.files.length} ficheiro(s)</span>
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditLead(lead);
                          }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredLeads.length === 0 && (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-12 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-[#64748b]" />
                      <p className="text-[#64748b] mb-4">Nenhum lead encontrado</p>
                      <Button onClick={() => setIsAddLeadOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Primeiro Lead
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* FEEDBACK SECTION */}
          {currentSection === 'feedback' && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg mb-2">💡 Ajude-nos a Melhorar</h3>
                <p className="text-[#64748b] mb-6">
                  O seu feedback é essencial para crescermos juntos! Partilhe ideias, sugestões ou reporte problemas.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="feedbackType">Tipo de Feedback</Label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">💡 Nova Funcionalidade</SelectItem>
                        <SelectItem value="bug">🐛 Reportar Bug</SelectItem>
                        <SelectItem value="improvement">✨ Melhoria</SelectItem>
                        <SelectItem value="other">💬 Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="feedbackTitle">Título</Label>
                    <Input
                      id="feedbackTitle"
                      placeholder="Resumo do seu feedback"
                      value={feedbackTitle}
                      onChange={(e) => setFeedbackTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="feedbackMessage">Mensagem</Label>
                    <Textarea
                      id="feedbackMessage"
                      placeholder="Descreva a sua ideia, sugestão ou problema em detalhe..."
                      rows={6}
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                    />
                  </div>

                  <Button 
                    className="w-full"
                    onClick={handleSendFeedback}
                    disabled={sendingFeedback}
                  >
                    {sendingFeedback ? 'A enviar...' : 'Enviar Feedback'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CALENDAR SECTION */}
          {currentSection === 'calendar' && (
            <CalendarPage language={language} />
          )}

          {/* ACCOUNT SECTION */}
          {currentSection === 'account' && (
            <div className="space-y-6">
              {/* Profile */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-6">👤 {t('dashboard.account.profile')}</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountName">Nome</Label>
                      <Input id="accountName" defaultValue="João Silva" />
                    </div>
                    <div>
                      <Label htmlFor="accountEmail">Email</Label>
                      <Input id="accountEmail" type="email" defaultValue="joao@exemplo.com" />
                    </div>
                    <div>
                      <Label htmlFor="accountPlan">{t('dashboard.account.plan')}</Label>
                      <Input 
                        id="accountPlan" 
                        value={userPlan === 'professional' ? 'Professional' : userPlan === 'business' ? 'Business' : 'Starter'} 
                        disabled 
                      />
                    </div>
                    <Button onClick={() => toast.success(t('dashboard.assistant.changesSaved'))}>
                      {t('dashboard.assistant.saveChanges')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Language Settings */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-5 h-5 text-[#2563eb]" />
                    <h3 className="text-lg">🌍 {t('dashboard.account.language')}</h3>
                  </div>
                  <p className="text-sm text-[#64748b] mb-4">
                    Altere o idioma da interface do dashboard
                  </p>
                  <Select value={language} onValueChange={(value) => setLanguage(value as 'pt' | 'en')}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">
                        <div className="flex items-center gap-2">
                          <span>🇵🇹</span>
                          <span>Português</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="en">
                        <div className="flex items-center gap-2">
                          <span>🇬🇧</span>
                          <span>English</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Dashboard Theme */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Rocket className="w-5 h-5 text-[#2563eb]" />
                    <h3 className="text-lg">🎨 Tema do Dashboard</h3>
                  </div>
                  <p className="text-sm text-[#64748b] mb-4">
                    Personalize as cores do seu dashboard
                  </p>
                  <Select value={dashboardTheme} onValueChange={(value) => setDashboardTheme(value as any)}>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-indigo-500" />
                          <span>Original (Azul)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="purple">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-violet-500 to-purple-500" />
                          <span>Roxo/Violeta</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="green">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-teal-500" />
                          <span>Verde</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="amber">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-500 to-orange-500" />
                          <span>Âmbar/Laranja</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rose">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-gradient-to-r from-rose-500 to-pink-500" />
                          <span>Rosa</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Push Notifications */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-[#2563eb]" />
                    <h3 className="text-lg">🔔 {t('dashboard.account.notifications')}</h3>
                  </div>
                  <p className="text-sm text-[#64748b] mb-4">
                    {t('dashboard.account.pushDesc')}
                  </p>
                  {notificationsEnabled ? (
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">✅ Notificações ativadas!</span>
                    </div>
                  ) : (
                    <Button onClick={handleEnableNotifications} className="gap-2">
                      <Bell className="w-4 h-4" />
                      {t('dashboard.account.enableBrowser')}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-0 shadow-sm border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-2">⚠️ Zona de Perigo</h3>
                  <p className="text-[#64748b] mb-4">
                    Esta ação é irreversível. Todos os seus dados serão permanentemente eliminados.
                  </p>
                  <Button variant="destructive">
                    Eliminar Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Lead Manualmente</DialogTitle>
            <DialogDescription>
              Centralize todos os seus contactos num só lugar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newLeadName">Nome *</Label>
                <Input 
                  id="newLeadName" 
                  placeholder="Nome completo"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="newLeadEmail">Email *</Label>
                <Input 
                  id="newLeadEmail" 
                  type="email" 
                  placeholder="email@exemplo.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newLeadPhone">Telefone</Label>
                <Input 
                  id="newLeadPhone" 
                  placeholder="+351 912 345 678"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="newLeadService">Serviço</Label>
                <Input 
                  id="newLeadService" 
                  placeholder="Ex: Consultoria"
                  value={newLead.service}
                  onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="newLeadNotes">Notas</Label>
              <Textarea 
                id="newLeadNotes" 
                placeholder="Informações adicionais..." 
                rows={3}
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" onClick={handleAddLead}>Adicionar Lead</Button>
              <Button variant="outline" onClick={() => setIsAddLeadOpen(false)}>Cancelar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lead Details Dialog */}
      {selectedLead && editForm && (
        <Dialog open={!!selectedLead} onOpenChange={() => {
          setSelectedLead(null);
          setEditForm(null);
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedLead.name}</DialogTitle>
              <DialogDescription>{selectedLead.email}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estado</Label>
                  <Select 
                    value={editForm.status} 
                    onValueChange={(value) => setEditForm({ ...editForm, status: value as LeadStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="contactado">Contactado</SelectItem>
                      <SelectItem value="progresso">Em Progresso</SelectItem>
                      <SelectItem value="completo">Completo</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                      <SelectItem value="perdido">🗑️ Perda de Tempo (Move para lixo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="leadValue">Valor Pago (€)</Label>
                  <Input 
                    id="leadValue" 
                    type="number" 
                    value={editForm.value}
                    onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label>Telefone</Label>
                <Input 
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>

              <div>
                <Label>Serviço</Label>
                <Input 
                  value={editForm.service}
                  onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                />
              </div>

              <div>
                <Label>Notas</Label>
                <Textarea 
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  rows={4} 
                />
              </div>

              <div>
                <Label className="mb-2 block">Ficheiros</Label>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2563eb] transition-colors cursor-pointer block">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-[#64748b]" />
                  <p className="text-sm text-[#64748b]">
                    Arraste ficheiros ou clique para fazer upload
                  </p>
                  <p className="text-xs text-[#64748b] mt-1">
                    PDF, DOCX, imagens até 10MB
                  </p>
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    accept=".pdf,.docx,.doc,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                  />
                </label>
                {selectedLead.files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedLead.files.map((file) => (
                      <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-4 h-4 text-[#2563eb]" />
                        <span className="flex-1 text-sm">{file.name}</span>
                        <span className="text-xs text-[#64748b]">{(file.size / 1024).toFixed(0)} KB</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteFile(file.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1" onClick={handleSaveLead}>
                  Guardar Alterações
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedLead(null);
                    setEditForm(null);
                  }}
                >
                  Fechar
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    if (confirm('Tem certeza que deseja eliminar este lead?')) {
                      handleDeleteLead(selectedLead.id);
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}