import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções completas
const translations = {
  pt: {
    // Homepage
    'nav.features': 'Funcionalidades',
    'nav.pricing': 'Preços',
    'nav.about': 'Sobre',
    'nav.login': 'Entrar',
    'nav.getStarted': 'Começar',
    'hero.title': 'Transforme visitantes em clientes com',
    'hero.subtitle': 'Chat inteligente',
    'hero.description': 'Capture leads automaticamente no seu website. Configure em minutos, veja resultados em horas.',
    'hero.cta': 'Começar Grátis',
    'hero.noCreditCard': 'Sem cartão de crédito',
    'features.title': 'Tudo o que precisa para capturar leads',
    'features.easySetup': 'Configuração Simples',
    'features.easySetupDesc': 'Cole um código no seu site e está pronto. Sem complicações.',
    'features.smartChat': 'Chat Inteligente',
    'features.smartChatDesc': 'Captura nome, email, telefone e interesse automaticamente.',
    'features.realTime': 'Tempo Real',
    'features.realTimeDesc': 'Veja os leads aparecerem instantaneamente no seu dashboard.',
    'features.customizable': 'Personalizável',
    'features.customizableDesc': 'Cores, mensagens, horários - tudo adaptado à sua marca.',
    'features.analytics': 'Estatísticas',
    'features.analyticsDesc': 'Saiba quantos visitantes interagem e convertem.',
    'features.multiSite': 'Multi-Site',
    'features.multiSiteDesc': 'Crie widgets diferentes para cada um dos seus websites.',
    'pricing.title': 'Preços simples e transparentes',
    'pricing.subtitle': 'Escolha o plano ideal para o seu negócio',
    'pricing.starter': 'Starter',
    'pricing.professional': 'Professional',
    'pricing.business': 'Business',
    'pricing.month': '/mês',
    'pricing.conversations': 'conversas/mês',
    'pricing.widget': 'widget',
    'pricing.widgets': 'widgets',
    'pricing.support': 'Suporte',
    'pricing.supportEmail': 'Email',
    'pricing.supportPriority': 'Prioritário',
    'pricing.supportDedicated': 'Dedicado',
    'pricing.analytics': 'Estatísticas básicas',
    'pricing.analyticsAdvanced': 'Estatísticas avançadas',
    'pricing.export': 'Exportar leads',
    'pricing.whatsapp': 'WhatsApp',
    'pricing.templates': 'Templates',
    'pricing.customBranding': 'Marca personalizada',
    'pricing.apiAccess': 'Acesso API',
    'pricing.choose': 'Escolher Plano',
    'footer.product': 'Produto',
    'footer.features': 'Funcionalidades',
    'footer.pricing': 'Preços',
    'footer.company': 'Empresa',
    'footer.about': 'Sobre',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos os direitos reservados.',
    
    // Login
    'login.title': 'Bem-vindo de volta',
    'login.subtitle': 'Entre na sua conta para continuar',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.remember': 'Lembrar-me',
    'login.forgot': 'Esqueci a password',
    'login.button': 'Entrar',
    'login.noAccount': 'Não tem conta?',
    'login.signUp': 'Criar conta',
    
    // Register
    'register.title': 'Criar conta',
    'register.subtitle': 'Comece a capturar leads em minutos',
    'register.step1': 'Informação da Conta',
    'register.step2': 'Informação Pessoal',
    'register.step3': 'Informação da Empresa',
    'register.name': 'Nome completo',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.phone': 'Telefone',
    'register.company': 'Nome da empresa',
    'register.website': 'Website',
    'register.next': 'Próximo',
    'register.back': 'Voltar',
    'register.create': 'Criar Conta',
    'register.hasAccount': 'Já tem conta?',
    'register.login': 'Entrar',
    
    // Dashboard
    'dashboard.overview': 'Visão Geral',
    'dashboard.configure': 'Configurar Assistente',
    'dashboard.leads': 'Leads',
    'dashboard.feedback': 'Feedback',
    'dashboard.account': 'Conta',
    'dashboard.logout': 'Sair',
    'dashboard.welcome': 'Bem-vindo',
    'dashboard.conversationsLeft': 'Conversas restantes',
    'dashboard.revenue': 'Faturação este mês',
    'dashboard.revenueChart': 'Faturação (Últimos 6 meses)',
    'dashboard.upgradePlan': 'Upgrade de Plano',
    'dashboard.assistant.title': 'Configurar o seu Assistente',
    'dashboard.assistant.name': 'Nome do Assistente',
    'dashboard.assistant.color': 'Cor Principal',
    'dashboard.assistant.welcome': 'Mensagem de Boas-vindas',
    'dashboard.assistant.company': 'Nome da Empresa',
    'dashboard.assistant.schedule': 'Horário de Funcionamento',
    'dashboard.assistant.selectDays': 'Selecione os dias',
    'dashboard.assistant.openTime': 'Abertura',
    'dashboard.assistant.closeTime': 'Fecho',
    'dashboard.assistant.services': 'Serviços Oferecidos',
    'dashboard.assistant.addService': 'Adicionar Serviço',
    'dashboard.assistant.preview': 'Preview do Widget',
    'dashboard.assistant.copyCode': 'Copiar Código',
    'dashboard.assistant.saveChanges': 'Guardar Alterações',
    'dashboard.assistant.changesSaved': 'Alterações guardadas!',
    'dashboard.assistant.codeCopied': 'Código copiado! Cole no seu website antes do </body>',
    'dashboard.assistant.loadTemplate': 'Carregar Template',
    'dashboard.assistant.templateSelect': 'Escolha um template por setor',
    'dashboard.assistant.custom': 'Personalizado',
    'dashboard.leads.title': 'Gestão de Leads',
    'dashboard.leads.search': 'Procurar por nome, email ou telefone...',
    'dashboard.leads.filter': 'Filtrar',
    'dashboard.leads.export': 'Exportar',
    'dashboard.leads.all': 'Todos',
    'dashboard.leads.new': 'Novos',
    'dashboard.leads.contacted': 'Contactados',
    'dashboard.leads.qualified': 'Qualificados',
    'dashboard.leads.converted': 'Convertidos',
    'dashboard.leads.lost': 'Perdidos',
    'dashboard.leads.name': 'Nome',
    'dashboard.leads.contact': 'Contacto',
    'dashboard.leads.service': 'Serviço',
    'dashboard.leads.date': 'Data',
    'dashboard.leads.status': 'Estado',
    'dashboard.leads.actions': 'Ações',
    'dashboard.leads.noLeads': 'Nenhum lead ainda',
    'dashboard.leads.startCapturing': 'Instale o widget no seu site para começar a capturar leads!',
    'dashboard.leads.exportSuccess': 'Leads exportados com sucesso!',
    'dashboard.feedback.title': 'Envie o seu Feedback',
    'dashboard.feedback.subtitle': 'Ajude-nos a melhorar o euconverto.com',
    'dashboard.feedback.message': 'A sua mensagem',
    'dashboard.feedback.placeholder': 'Diga-nos o que pensa, sugestões, problemas...',
    'dashboard.feedback.send': 'Enviar Feedback',
    'dashboard.feedback.success': 'Obrigado pelo feedback!',
    'dashboard.account.title': 'Informações da Conta',
    'dashboard.account.profile': 'Perfil',
    'dashboard.account.plan': 'Plano Atual',
    'dashboard.account.language': 'Idioma',
    'dashboard.account.notifications': 'Notificações',
    'dashboard.account.enablePush': 'Ativar Notificações Push',
    'dashboard.account.pushDesc': 'Receba alertas quando novos leads chegarem',
    'dashboard.account.enableBrowser': 'Ativar',
    'dashboard.account.pushEnabled': 'Notificações ativadas!',
    'dashboard.account.pushDisabled': 'Notificações desativadas',
    'dashboard.account.pushError': 'Erro ao ativar notificações',
    
    // Quick Actions
    'dashboard.quickActions.title': 'Próximos Passos',
    'dashboard.quickActions.step1': 'Configure o seu assistente na secção "Configurar Assistente"',
    'dashboard.quickActions.step2': 'Escolha o widget que mais gosta',
    'dashboard.quickActions.step3': 'Copie o código e cole no seu website',
    'dashboard.quickActions.step4': 'Comece a receber leads automaticamente!',
    
    // Widget Types
    'dashboard.widget.selectTitle': 'Escolha o Widget',
    'dashboard.widget.classicBubble': 'Classic Bubble',
    'dashboard.widget.minimalTab': 'Minimal Tab',
    'dashboard.widget.cardPopup': 'Card Popup',
    
    // Template Fast Start
    'dashboard.template.fastStart': 'Começar Rápido - Templates por Setor',
    'dashboard.template.description': 'Escolha um template pré-configurado para o seu setor e edite à vontade!',
    'dashboard.template.placeholder': 'Escolha um template...',
    'dashboard.template.customOption': 'Personalizado (do zero)',
    
    // Days of week
    'days.monday': 'Segunda',
    'days.tuesday': 'Terça',
    'days.wednesday': 'Quarta',
    'days.thursday': 'Quinta',
    'days.friday': 'Sexta',
    'days.saturday': 'Sábado',
    'days.sunday': 'Domingo',
    
    // Templates
    'template.restaurant': 'Restaurante',
    'template.lawyer': 'Advogado',
    'template.salon': 'Cabeleireiro',
    'template.dentist': 'Dentista',
    'template.realestate': 'Imobiliária',
    'template.gym': 'Ginásio',
    'template.store': 'Loja Online',
    'template.consultant': 'Consultoria',
  },
  
  en: {
    // Homepage
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started',
    'hero.title': 'Turn visitors into customers with',
    'hero.subtitle': 'Smart chat',
    'hero.description': 'Capture leads automatically on your website. Set up in minutes, see results in hours.',
    'hero.cta': 'Start Free',
    'hero.noCreditCard': 'No credit card required',
    'features.title': 'Everything you need to capture leads',
    'features.easySetup': 'Easy Setup',
    'features.easySetupDesc': 'Paste one code snippet on your site and you\'re done. No complications.',
    'features.smartChat': 'Smart Chat',
    'features.smartChatDesc': 'Captures name, email, phone and interest automatically.',
    'features.realTime': 'Real Time',
    'features.realTimeDesc': 'See leads appear instantly in your dashboard.',
    'features.customizable': 'Customizable',
    'features.customizableDesc': 'Colors, messages, schedules - everything adapted to your brand.',
    'features.analytics': 'Analytics',
    'features.analyticsDesc': 'Know how many visitors interact and convert.',
    'features.multiSite': 'Multi-Site',
    'features.multiSiteDesc': 'Create different widgets for each of your websites.',
    'pricing.title': 'Simple and transparent pricing',
    'pricing.subtitle': 'Choose the ideal plan for your business',
    'pricing.starter': 'Starter',
    'pricing.professional': 'Professional',
    'pricing.business': 'Business',
    'pricing.month': '/month',
    'pricing.conversations': 'conversations/month',
    'pricing.widget': 'widget',
    'pricing.widgets': 'widgets',
    'pricing.support': 'Support',
    'pricing.supportEmail': 'Email',
    'pricing.supportPriority': 'Priority',
    'pricing.supportDedicated': 'Dedicated',
    'pricing.analytics': 'Basic analytics',
    'pricing.analyticsAdvanced': 'Advanced analytics',
    'pricing.export': 'Export leads',
    'pricing.whatsapp': 'WhatsApp',
    'pricing.templates': 'Templates',
    'pricing.customBranding': 'Custom branding',
    'pricing.apiAccess': 'API access',
    'pricing.choose': 'Choose Plan',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.pricing': 'Pricing',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    // Login
    'login.title': 'Welcome back',
    'login.subtitle': 'Sign in to your account to continue',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot password',
    'login.button': 'Sign In',
    'login.noAccount': 'Don\'t have an account?',
    'login.signUp': 'Sign up',
    
    // Register
    'register.title': 'Create account',
    'register.subtitle': 'Start capturing leads in minutes',
    'register.step1': 'Account Information',
    'register.step2': 'Personal Information',
    'register.step3': 'Company Information',
    'register.name': 'Full name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.phone': 'Phone',
    'register.company': 'Company name',
    'register.website': 'Website',
    'register.next': 'Next',
    'register.back': 'Back',
    'register.create': 'Create Account',
    'register.hasAccount': 'Already have an account?',
    'register.login': 'Sign in',
    
    // Dashboard
    'dashboard.overview': 'Overview',
    'dashboard.configure': 'Configure Assistant',
    'dashboard.leads': 'Leads',
    'dashboard.feedback': 'Feedback',
    'dashboard.account': 'Account',
    'dashboard.logout': 'Logout',
    'dashboard.welcome': 'Welcome',
    'dashboard.conversationsLeft': 'Conversations left',
    'dashboard.revenue': 'Revenue this month',
    'dashboard.revenueChart': 'Revenue (Last 6 months)',
    'dashboard.upgradePlan': 'Upgrade Plan',
    'dashboard.assistant.title': 'Configure your Assistant',
    'dashboard.assistant.name': 'Assistant Name',
    'dashboard.assistant.color': 'Primary Color',
    'dashboard.assistant.welcome': 'Welcome Message',
    'dashboard.assistant.company': 'Company Name',
    'dashboard.assistant.schedule': 'Business Hours',
    'dashboard.assistant.selectDays': 'Select days',
    'dashboard.assistant.openTime': 'Opening',
    'dashboard.assistant.closeTime': 'Closing',
    'dashboard.assistant.services': 'Services Offered',
    'dashboard.assistant.addService': 'Add Service',
    'dashboard.assistant.preview': 'Widget Preview',
    'dashboard.assistant.copyCode': 'Copy Code',
    'dashboard.assistant.saveChanges': 'Save Changes',
    'dashboard.assistant.changesSaved': 'Changes saved!',
    'dashboard.assistant.codeCopied': 'Code copied! Paste it on your website before </body>',
    'dashboard.assistant.loadTemplate': 'Load Template',
    'dashboard.assistant.templateSelect': 'Choose a template by sector',
    'dashboard.assistant.custom': 'Custom',
    'dashboard.leads.title': 'Lead Management',
    'dashboard.leads.search': 'Search by name, email or phone...',
    'dashboard.leads.filter': 'Filter',
    'dashboard.leads.export': 'Export',
    'dashboard.leads.all': 'All',
    'dashboard.leads.new': 'New',
    'dashboard.leads.contacted': 'Contacted',
    'dashboard.leads.qualified': 'Qualified',
    'dashboard.leads.converted': 'Converted',
    'dashboard.leads.lost': 'Lost',
    'dashboard.leads.name': 'Name',
    'dashboard.leads.contact': 'Contact',
    'dashboard.leads.service': 'Service',
    'dashboard.leads.date': 'Date',
    'dashboard.leads.status': 'Status',
    'dashboard.leads.actions': 'Actions',
    'dashboard.leads.noLeads': 'No leads yet',
    'dashboard.leads.startCapturing': 'Install the widget on your site to start capturing leads!',
    'dashboard.leads.exportSuccess': 'Leads exported successfully!',
    'dashboard.feedback.title': 'Send your Feedback',
    'dashboard.feedback.subtitle': 'Help us improve euconverto.com',
    'dashboard.feedback.message': 'Your message',
    'dashboard.feedback.placeholder': 'Tell us what you think, suggestions, issues...',
    'dashboard.feedback.send': 'Send Feedback',
    'dashboard.feedback.success': 'Thanks for your feedback!',
    'dashboard.account.title': 'Account Information',
    'dashboard.account.profile': 'Profile',
    'dashboard.account.plan': 'Current Plan',
    'dashboard.account.language': 'Language',
    'dashboard.account.notifications': 'Notifications',
    'dashboard.account.enablePush': 'Enable Push Notifications',
    'dashboard.account.pushDesc': 'Get alerts when new leads arrive',
    'dashboard.account.enableBrowser': 'Enable',
    'dashboard.account.pushEnabled': 'Notifications enabled!',
    'dashboard.account.pushDisabled': 'Notifications disabled',
    'dashboard.account.pushError': 'Error enabling notifications',
    
    // Quick Actions
    'dashboard.quickActions.title': 'Next Steps',
    'dashboard.quickActions.step1': 'Configure your assistant in the "Configure Assistant" section',
    'dashboard.quickActions.step2': 'Choose the widget you like best',
    'dashboard.quickActions.step3': 'Copy the code and paste it on your website',
    'dashboard.quickActions.step4': 'Start receiving leads automatically!',
    
    // Widget Types
    'dashboard.widget.selectTitle': 'Choose the Widget',
    'dashboard.widget.classicBubble': 'Classic Bubble',
    'dashboard.widget.minimalTab': 'Minimal Tab',
    'dashboard.widget.cardPopup': 'Card Popup',
    
    // Template Fast Start
    'dashboard.template.fastStart': 'Quick Start - Sector Templates',
    'dashboard.template.description': 'Choose a pre-configured template for your sector and edit as you wish!',
    'dashboard.template.placeholder': 'Choose a template...',
    'dashboard.template.customOption': 'Custom (from scratch)',
    
    // Days of week
    'days.monday': 'Monday',
    'days.tuesday': 'Tuesday',
    'days.wednesday': 'Wednesday',
    'days.thursday': 'Thursday',
    'days.friday': 'Friday',
    'days.saturday': 'Saturday',
    'days.sunday': 'Sunday',
    
    // Templates
    'template.restaurant': 'Restaurant',
    'template.lawyer': 'Lawyer',
    'template.salon': 'Hair Salon',
    'template.dentist': 'Dentist',
    'template.realestate': 'Real Estate',
    'template.gym': 'Gym',
    'template.store': 'Online Store',
    'template.consultant': 'Consulting',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Se temos initialLanguage (vindo do App), usar esse
    if (initialLanguage) {
      return initialLanguage;
    }
    // Senão, ler do localStorage
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  // Sincronizar com initialLanguage quando mudar
  useEffect(() => {
    if (initialLanguage && initialLanguage !== language) {
      setLanguageState(initialLanguage);
    }
  }, [initialLanguage, language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};