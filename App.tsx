import { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Clock, Target, Palette, Rocket, Check, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import LoginPage from './login';
import SignupPage from './signup';
import DashboardWrapper from './components/DashboardWrapper';
import FlagIcon from './components/FlagIcon';
import DebugPage from './debug';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';
import SetupGuidePage from './setup-guide';
import ResetPasswordRedirect from './reset-password-redirect';

type Language = 'pt' | 'en';
type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'debug' | 'forgot-password' | 'reset-password' | 'setup-guide';

export default function App() {
  // FORCE RELOAD DETECTION - VERSION 3.0
  console.log('🚀🚀🚀 APP.TSX VERSION 3.0 LOADED 🚀🚀🚀');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Check if we're accessing special routes
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    const fullUrl = window.location.href;
    
    // DEBUG: Log everything
    console.log('🔍 APP INIT - URL Detection');
    console.log('   Full URL:', fullUrl);
    console.log('   Hash:', hash);
    console.log('   Search:', window.location.search);
    console.log('   Pathname:', window.location.pathname);
    
    // Check for page parameter (used for password reset redirect)
    if (urlParams.get('page') === 'reset-password') {
      console.log('✅ Detected: ?page=reset-password');
      return 'reset-password';
    }
    
    // Check for Supabase auth redirects in HASH (e.g., #access_token=...&type=recovery)
    if (hash.includes('access_token') || hash.includes('type=recovery')) {
      console.log('✅ Detected: Supabase auth in hash');
      return 'reset-password';
    }
    
    // Check for Supabase auth redirects in QUERY params
    if (urlParams.get('type') === 'recovery' || urlParams.get('access_token')) {
      console.log('✅ Detected: Supabase auth in query params');
      return 'reset-password';
    }
    
    if (hash === '#debug') return 'debug';
    if (hash === '#forgot-password') return 'forgot-password';
    if (hash === '#reset-password') return 'reset-password';
    if (hash === '#setup-guide') return 'setup-guide';
    
    console.log('📄 No special route detected, showing home');
    return 'home';
  });
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for hash changes (for password reset redirect)
  useEffect(() => {
    console.log('🎯 HASH CHANGE LISTENER INSTALLED');
    
    const checkHash = () => {
      const hash = window.location.hash;
      console.log('🔍 Hash changed:', hash);
      
      if (hash === '#reset-password') {
        console.log('✅ Navigating to reset-password page');
        setCurrentPage('reset-password');
      } else if (hash === '#login') {
        setCurrentPage('login');
      } else if (hash === '#signup') {
        setCurrentPage('signup');
      } else if (hash === '#forgot-password') {
        setCurrentPage('forgot-password');
      } else if (hash === '#dashboard') {
        setCurrentPage('dashboard');
      }
    };
    
    // Check hash on mount
    checkHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);
    
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  
  // Sincronizar com mudanças do localStorage (quando mudam no Dashboard)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('language');
      if (saved && (saved === 'pt' || saved === 'en')) {
        setLanguage(saved);
      }
    };
    
    // Verificar periodicamente (fallback para mudanças na mesma tab)
    const interval = setInterval(handleStorageChange, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signupData, setSignupData] = useState<{ company?: string; service?: string } | null>(null);

  // Render different pages based on currentPage
  if (currentPage === 'debug') {
    return <DebugPage />;
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPasswordPage onNavigate={(page) => setCurrentPage(page)} language={language} />;
  }

  if (currentPage === 'reset-password') {
    return <ResetPasswordPage onNavigate={(page) => setCurrentPage(page)} language={language} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={(page) => setCurrentPage(page)} language={language} onLanguageChange={handleSetLanguage} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onNavigate={(page, data) => {
      setCurrentPage(page);
      if (data) setSignupData(data);
    }} language={language} onLanguageChange={handleSetLanguage} />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardWrapper onNavigate={(page) => setCurrentPage(page)} signupData={signupData} language={language} />;
  }

  if (currentPage === 'setup-guide') {
    return <SetupGuidePage onNavigate={(page) => setCurrentPage(page)} language={language} />;
  }

  const translations = {
    pt: {
      nav: {
        benefits: 'Benefícios',
        howItWorks: 'Como Funciona',
        pricing: 'Preços',
        login: 'Entrar',
        getStarted: 'Começar Agora'
      },
      hero: {
        title: 'O Seu Assistente Virtual que Nunca Dorme',
        subtitle: 'Farto de ter o telemóvel sempre a tocar? Perguntas repetitivas? Clientes esquecidos?',
        description: 'Use o nosso assistente virtual e plataforma que trabalha 24/7 para si.',
        cta: 'Começar Agora',
        secondary: 'Ver Como Funciona'
      },
      benefits: {
        title: 'Porque deve usar o nosso assistente?',
        subtitle: 'O seu negócio não pode parar. Com o nosso assistente e plataforma, estará sempre disponível para os seus clientes!',
        support247: {
          title: 'Atendimento 24/7',
          description: 'O seu assistente está sempre disponível, mesmo quando está a dormir, de férias ou ocupado. Nunca mais perca um cliente.'
        },
        saveTime: {
          title: 'Poupa Tempo',
          description: 'Deixe o assistente responder às mesmas perguntas repetidamente. Foque-se no que realmente importa: fechar vendas e fazer crescer o seu negócio.'
        },
        platform: {
          title: 'Plataforma de Gestão',
          description: 'Acesso a uma plataforma onde pode organizar todos os seus leads, adicionar clientes e acompanhar o progresso das conversas.'
        },
        calendar: {
          title: 'Calendário Integrado',
          description: 'Organize todas as suas marcações num único lugar. Centralize reuniões, consultas e follow-ups diretamente na plataforma!'
        },
        customizable: {
          title: 'Totalmente Personalizável',
          description: 'Adapte as cores, mensagens e personalidade do assistente à sua marca! Parece mesmo parte do seu negócio.'
        },
        ready: {
          title: 'Pronto em Minutos',
          description: 'Não precisa de saber programar. Configure em minutos, cole um código no seu site e está pronto. Simples e rápido.'
        }
      },
      howItWorks: {
        title: 'Como Funciona?',
        subtitle: 'Em apenas 3 passos simples, o seu assistente estará a funcionar',
        step1: {
          title: 'Registe-se',
          description: 'Crie a sua conta em 2 minutos. Simples e rápido.'
        },
        step2: {
          title: 'Personalize',
          description: 'Escolha as cores, escreva as mensagens e ensine o assistente sobre o seu negócio. Interface simples e intuitiva.'
        },
        step3: {
          title: 'Copie para o seu site',
          description: 'Copie o código gerado automaticamente e cole no seu site. Funciona em qualquer website.'
        }
      },
      pricing: {
        title: 'Oferta de Lançamento',
        subtitle: 'Junte-se aos primeiros utilizadores e garanta o melhor preço para sempre!',
        launchBadge: 'Oferta de Lançamento - 50€ Desconto para sempre!',
        launch: {
          name: 'FOUNDING MEMBER',
          price: '€99',
          originalPrice: '€149',
          period: '/mês',
          description: 'Preço bloqueado para sempre - Vagas limitadas',
          features: [
            'Conversas ilimitadas',
            'Base de conhecimento (FAQs)',
            'Plataforma de gestão de leads',
            'Calendário integrado',
            'Suporte prioritário',
            'Exportação de dados',
            'Personalização total',
            '1 assistente'
          ],
          cta: 'Garantir Vaga Agora'
        }
      },
      cta: {
        title: 'Pronto para Nunca Mais Perder um Cliente?',
        subtitle: 'Comece hoje e veja os resultados imediatamente',
        button: 'Começar Agora →'
      },
      footer: {
        description: 'O seu assistente virtual que trabalha 24/7 para fazer crescer o seu negócio.',
        product: 'Produto',
        benefits: 'Benefícios',
        pricing: 'Preços',
        howItWorks: 'Como Funciona',
        company: 'Empresa',
        about: 'Sobre',
        copyright: 'Todos os direitos reservados.'
      }
    },
    en: {
      nav: {
        benefits: 'Benefits',
        howItWorks: 'How It Works',
        pricing: 'Pricing',
        login: 'Log In',
        getStarted: 'Get Started'
      },
      hero: {
        title: 'Your Virtual Assistant That Never Sleeps',
        subtitle: 'Tired of your phone always ringing? Repetitive questions? Forgotten customers?',
        description: 'Use our virtual assistant and platform that works 24/7 for you.',
        cta: 'Get Started',
        secondary: 'See How It Works'
      },
      benefits: {
        title: 'Why Should I Use Converto?',
        subtitle: "Your business can't stop. With our assistant and platform, you're always available for your customers!",
        support247: {
          title: '24/7 Support',
          description: "Your assistant is always available, even when you're sleeping, on vacation, or busy. Never lose a customer again."
        },
        saveTime: {
          title: 'Saves Time',
          description: 'Let the assistant answer the same questions repeatedly. Focus on what really matters: closing sales and growing your business.'
        },
        platform: {
          title: 'Management Platform',
          description: 'Access to a platform where you can organize all your leads, add clients, and track conversation progress.'
        },
        calendar: {
          title: 'Integrated Calendar',
          description: 'Organize all your appointments in one place. Centralize meetings, consultations, and follow-ups directly in the platform!'
        },
        customizable: {
          title: 'Fully Customizable',
          description: "Adapt colors, messages, and the assistant's personality to your brand! It really feels like part of your business."
        },
        ready: {
          title: 'Ready in Minutes',
          description: "No coding required. Set up in minutes, paste code on your website, and you're done. Simple and fast."
        }
      },
      howItWorks: {
        title: 'How Does It Work?',
        subtitle: 'In just 3 simple steps, your assistant will be up and running',
        step1: {
          title: 'Sign Up',
          description: 'Create your account in 2 minutes. Simple and fast.'
        },
        step2: {
          title: 'Customize',
          description: 'Choose colors, write messages, and teach the assistant about your business. Simple and intuitive interface.'
        },
        step3: {
          title: 'Paste on Website',
          description: 'Copy the automatically generated code and paste it on your website. Works on WordPress, Wix, Shopify, and any website.'
        }
      },
      pricing: {
        title: 'Simple and Transparent Plans',
        subtitle: 'Choose the ideal plan for your business. Cancel anytime.',
        popular: 'Most Popular',
        starter: {
          name: 'STARTER',
          price: '€49',
          period: '/month',
          description: 'For small businesses',
          features: [
            '1 assistant',
            '500 conversations/month',
            'No customization',
            'Limited FAQs',
            'Email support'
          ],
          cta: 'Get Started'
        },
        professional: {
          name: 'PROFESSIONAL',
          price: '€149',
          period: '/month',
          description: 'Most popular',
          features: [
            '1 assistant',
            '2,000 conversations/month',
            'Full customization',
            'Unlimited FAQs',
            'Lead management platform',
            'Integrations (Google, Email)',
            'Priority support'
          ],
          cta: 'Get Started'
        },
        business: {
          name: 'BUSINESS',
          price: '€299',
          period: '/month',
          description: 'For large companies',
          features: [
            '3 assistants',
            'Unlimited conversations',
            'Full customization',
            'White-label (no branding)',
            'API access',
            'All integrations',
            'Dedicated account manager'
          ],
          cta: 'Contact'
        }
      },
      cta: {
        title: 'Ready to Never Lose a Customer Again?',
        subtitle: 'Start today and see results immediately',
        button: 'Get Started →'
      },
      footer: {
        description: 'Your virtual assistant working 24/7 to grow your business.',
        product: 'Product',
        benefits: 'Benefits',
        pricing: 'Pricing',
        howItWorks: 'How It Works',
        company: 'Company',
        about: 'About',
        copyright: 'All rights reserved.'
      }
    }
  };

  const t = translations[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Reset Password Redirect Detector */}
      <ResetPasswordRedirect onDetected={() => {
        console.log('🎯 RESET PASSWORD REDIRECT DETECTED!');
        setCurrentPage('reset-password');
      }} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-[#2563eb]">
              euconverto.com
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('benefits')} className="text-[#0f172a] hover:text-[#2563eb] transition-colors">
                {t.nav.benefits}
              </button>
              <button onClick={() => scrollToSection('how')} className="text-[#0f172a] hover:text-[#2563eb] transition-colors">
                {t.nav.howItWorks}
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-[#0f172a] hover:text-[#2563eb] transition-colors">
                {t.nav.pricing}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
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
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden min-w-[70px]">
                    <button
                      onClick={() => {
                        handleSetLanguage('pt');
                        setShowLangDropdown(false);
                      }}
                      className="w-full px-3 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      <FlagIcon country="pt" size="sm" />
                    </button>
                    <button
                      onClick={() => {
                        handleSetLanguage('en');
                        setShowLangDropdown(false);
                      }}
                      className="w-full px-3 py-2 hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                      <FlagIcon country="gb" size="sm" />
                    </button>
                  </div>
                )}
              </div>

              <Button variant="outline" onClick={() => setCurrentPage('login')}>
                {t.nav.login}
              </Button>
              <Button onClick={() => scrollToSection('pricing')}>
                {t.nav.getStarted}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left py-2 text-[#0f172a]">
                {t.nav.benefits}
              </button>
              <button onClick={() => scrollToSection('how')} className="block w-full text-left py-2 text-[#0f172a]">
                {t.nav.howItWorks}
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-2 text-[#0f172a]">
                {t.nav.pricing}
              </button>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setCurrentPage('login')}>
                  {t.nav.login}
                </Button>
                <Button className="flex-1" onClick={() => scrollToSection('pricing')}>
                  {t.nav.getStarted}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#0ea5e9] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            ✨ {language === 'pt' ? 'Assistente Virtual Inteligente' : 'Smart Virtual Assistant'}
          </Badge>
          
          <h1 className="mb-6 text-white">
            {t.hero.title}
          </h1>
          
          <p className="text-xl mb-4 text-white/90">
            {t.hero.subtitle}
          </p>
          <p className="text-lg mb-10 text-white/80">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#2563eb] hover:bg-gray-100" onClick={() => scrollToSection('pricing')}>
              {t.hero.cta}
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2563eb] transition-all" onClick={() => scrollToSection('how')}>
              {t.hero.secondary}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-[#0f172a]">
              {t.benefits.title}
            </h2>
            <p className="text-xl text-[#64748b] max-w-3xl mx-auto">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="mb-3 text-[#0f172a]">{t.benefits.support247.title}</h3>
                <p className="text-[#64748b]">{t.benefits.support247.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="mb-3 text-[#0f172a]">{t.benefits.saveTime.title}</h3>
                <p className="text-[#64748b]">{t.benefits.saveTime.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="mb-3 text-[#0f172a]">{t.benefits.platform.title}</h3>
                <p className="text-[#64748b]">{t.benefits.platform.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="mb-3 text-[#0f172a]">{t.benefits.calendar.title}</h3>
                <p className="text-[#64748b]">{t.benefits.calendar.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-6">
                  <Palette className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="mb-3 text-[#0f172a]">{t.benefits.customizable.title}</h3>
                <p className="text-[#64748b]">{t.benefits.customizable.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="mb-3 text-[#0f172a]">{t.benefits.ready.title}</h3>
                <p className="text-[#64748b]">{t.benefits.ready.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-[#0f172a]">
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-[#64748b]">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-[#2563eb] opacity-20"></div>

            <div className="text-center relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <span className="text-white">1</span>
              </div>
              <h3 className="mb-3 text-[#0f172a]">{t.howItWorks.step1.title}</h3>
              <p className="text-[#64748b]">{t.howItWorks.step1.description}</p>
            </div>

            <div className="text-center relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <span className="text-white">2</span>
              </div>
              <h3 className="mb-3 text-[#0f172a]">{t.howItWorks.step2.title}</h3>
              <p className="text-[#64748b]">{t.howItWorks.step2.description}</p>
            </div>

            <div className="text-center relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                <span className="text-white">3</span>
              </div>
              <h3 className="mb-3 text-[#0f172a]">{t.howItWorks.step3.title}</h3>
              <p className="text-[#64748b]">{t.howItWorks.step3.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-[#0f172a]">
              {t.pricing.title}
            </h2>
            <p className="text-xl text-[#64748b]">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="flex justify-center">
            {/* Launch Plan - Single Centered Card */}
            <Card className="border-2 border-[#2563eb] shadow-2xl relative hover:shadow-3xl transition-all duration-300 w-full max-w-md">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Badge className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white px-6 py-2 text-sm">
                  🔥 {t.pricing.launchBadge}
                </Badge>
              </div>
              <CardContent className="p-10 flex flex-col">
                <div className="mb-8 text-center">
                  <p className="text-sm text-[#64748b] uppercase tracking-wider mb-3">{t.pricing.launch.name}</p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl text-[#64748b] line-through">{t.pricing.launch.originalPrice}</span>
                    <span className="text-5xl text-[#0f172a]">{t.pricing.launch.price}</span>
                    <span className="text-xl text-[#64748b]">{t.pricing.launch.period}</span>
                  </div>
                  <p className="text-[#2563eb] mt-2">{t.pricing.launch.description}</p>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {t.pricing.launch.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#2563eb] flex-shrink-0 mt-0.5" />
                      <span className="text-[#0f172a] text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="w-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:from-[#1e40af] hover:to-[#0284c7] text-white" onClick={() => setCurrentPage('signup')}>
                  {t.pricing.launch.cta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-white">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-10 text-white/90">
            {t.cta.subtitle}
          </p>
          <Button size="lg" className="bg-white text-[#2563eb] hover:bg-gray-100" onClick={() => scrollToSection('pricing')}>
            {t.cta.button}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="mb-4 text-white">euconverto.com</h3>
              <p className="text-white/70">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h4 className="mb-4">{t.footer.product}</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('benefits')} className="text-white/70 hover:text-white transition-colors">
                    {t.footer.benefits}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('pricing')} className="text-white/70 hover:text-white transition-colors">
                    {t.footer.pricing}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how')} className="text-white/70 hover:text-white transition-colors">
                    {t.footer.howItWorks}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">{t.footer.company}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    {t.footer.about}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/50">
            © 2025 euconverto.com {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}