import { useState } from 'react';
import { Mail, Lock, User, Phone, Briefcase, ArrowRight, ArrowLeft, Check, ChevronDown, AlertCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { toast } from 'react-toastify';
import { auth } from './utils/api';

type Language = 'pt' | 'en';

interface SignupPageProps {
  onNavigate?: (page: 'home' | 'login' | 'dashboard', data?: { company: string; service: string }) => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function SignupPage({ onNavigate, language = 'pt', onLanguageChange }: SignupPageProps) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    password: '',
    confirmPassword: ''
  });

  const translations = {
    pt: {
      signup: 'Criar Conta',
      welcome: 'Comece a usar o Converto',
      subtitle: 'Configure o seu assistente virtual em minutos',
      step: 'Passo',
      of: 'de',
      personalInfo: 'Informação Pessoal',
      businessInfo: 'Informação do Negócio',
      security: 'Segurança',
      name: 'Nome completo',
      email: 'Email',
      phone: 'Telemóvel',
      company: 'Nome da Empresa',
      serviceType: 'Tipo de serviço',
      selectService: 'Selecione uma opção',
      services: {
        ecommerce: 'E-commerce / Loja Online',
        services: 'Prestação de Serviços',
        restaurant: 'Restaurante / Café',
        health: 'Saúde / Clínica',
        education: 'Educação / Formação',
        realestate: 'Imobiliário',
        automotive: 'Automóvel',
        beauty: 'Beleza / Estética',
        other: 'Outro'
      },
      password: 'Palavra-passe',
      confirmPassword: 'Confirmar palavra-passe',
      nextStep: 'Próximo',
      previousStep: 'Voltar',
      createAccount: 'Criar Conta',
      termsAgree: 'Ao criar conta, concorda com os',
      terms: 'Termos de Serviço',
      and: 'e',
      privacy: 'Política de Privacidade',
      alreadyHaveAccount: 'Já tem conta?',
      login: 'Entrar',
      orContinue: 'Ou continue com',
      backToHome: 'Voltar à página inicial',
      requiredFields: 'Por favor, preencha todos os campos obrigatórios',
      passwordMismatch: 'As palavras-passe não coincidem',
      accountCreated: 'Conta criada com sucesso',
      signupError: 'Erro ao criar conta. Tente novamente.'
    },
    en: {
      signup: 'Sign Up',
      welcome: 'Start using Converto',
      subtitle: 'Set up your virtual assistant in minutes',
      step: 'Step',
      of: 'of',
      personalInfo: 'Personal Information',
      businessInfo: 'Business Information',
      security: 'Security',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company Name',
      serviceType: 'Service type',
      selectService: 'Select an option',
      services: {
        ecommerce: 'E-commerce / Online Store',
        services: 'Service Provider',
        restaurant: 'Restaurant / Café',
        health: 'Health / Clinic',
        education: 'Education / Training',
        realestate: 'Real Estate',
        automotive: 'Automotive',
        beauty: 'Beauty / Aesthetics',
        other: 'Other'
      },
      password: 'Password',
      confirmPassword: 'Confirm password',
      nextStep: 'Next',
      previousStep: 'Back',
      createAccount: 'Create Account',
      termsAgree: 'By creating an account, you agree to our',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      alreadyHaveAccount: 'Already have an account?',
      login: 'Log In',
      orContinue: 'Or continue with',
      backToHome: 'Back to homepage',
      requiredFields: 'Please fill in all required fields',
      passwordMismatch: 'Passwords do not match',
      accountCreated: 'Account created successfully',
      signupError: 'Error creating account. Please try again.'
    }
  };

  const t = translations[language];

  const handleSubmit = async () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error(t.requiredFields);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.company || !formData.service) {
        toast.error(t.requiredFields);
        return;
      }
      setStep(3);
    } else {
      if (!formData.password || !formData.confirmPassword) {
        toast.error(t.requiredFields);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error(t.passwordMismatch);
        return;
      }

      // Create account with backend
      setError('');
      setLoading(true);

      try {
        await auth.signup(formData.email, formData.password, formData.name, 'starter');
        
        toast.success(t.accountCreated);
        
        // Auto-login after signup
        const loginResponse = await auth.signin(formData.email, formData.password);
        
        if (loginResponse.success) {
          setTimeout(() => {
            onNavigate?.('dashboard', { 
              company: formData.company, 
              service: formData.service 
            });
          }, 500);
        }
      } catch (err: any) {
        console.error('Signup error:', err);
        
        // Check if email already exists
        if (err.message.includes('já está registado') || err.message.includes('already registered')) {
          setError(language === 'pt' 
            ? 'Este email já está registado. Por favor, faça login.' 
            : 'This email is already registered. Please login.');
          toast.error(language === 'pt' 
            ? 'Email já existe. Tente fazer login.' 
            : 'Email already exists. Try logging in.');
        } else {
          setError(t.signupError);
          toast.error(t.signupError);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.company && formData.service;
    }
    if (step === 3) {
      return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 hover:shadow-lg transition-all border border-gray-200"
          >
            <span className="text-xl">{language === 'pt' ? '🇵🇹' : '🇬🇧'}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          
          {showLangDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[70px]">
              <button
                onClick={() => {
                  onLanguageChange?.('pt');
                  setShowLangDropdown(false);
                }}
                className="w-full px-3 py-2 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <span className="text-xl">🇵🇹</span>
              </button>
              <button
                onClick={() => {
                  onLanguageChange?.('en');
                  setShowLangDropdown(false);
                }}
                className="w-full px-3 py-2 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <span className="text-xl">🇬🇧</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-[#2563eb] mb-6">euconverto.com</h1>
              <h2 className="text-[#0f172a] mb-2">{t.welcome}</h2>
              <p className="text-[#64748b]">{t.subtitle}</p>
            </div>

            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-2">
                <div className="flex items-center">
                  {[1, 2, 3].map((stepNum, index) => (
                    <div key={stepNum} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        step >= stepNum 
                          ? 'bg-[#2563eb] text-white' 
                          : 'bg-gray-200 text-[#64748b]'
                      }`}>
                        {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                      </div>
                      {index < 2 && (
                        <div className={`h-1 w-20 mx-2 transition-all rounded ${
                          step > stepNum ? 'bg-[#2563eb]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-[#2563eb]/10 text-[#2563eb] border-0">
                  {t.step} {step} {t.of} 3
                </Badge>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#0f172a]">
                      {t.name}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-[#2563eb]"
                        placeholder={t.name}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#0f172a]">
                      {t.email}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-[#2563eb]"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#0f172a]">
                      {t.phone}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-[#2563eb]"
                        placeholder="+351 912 345 678"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Info */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#0f172a]">
                      {t.company}
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-[#2563eb]"
                        placeholder={t.company}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-[#0f172a]">
                      {t.serviceType}
                    </Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#2563eb] transition-colors text-[#0f172a] bg-white"
                      required
                    >
                      <option value="">{t.selectService}</option>
                      <option value="ecommerce">{t.services.ecommerce}</option>
                      <option value="services">{t.services.services}</option>
                      <option value="restaurant">{t.services.restaurant}</option>
                      <option value="health">{t.services.health}</option>
                      <option value="education">{t.services.education}</option>
                      <option value="realestate">{t.services.realestate}</option>
                      <option value="automotive">{t.services.automotive}</option>
                      <option value="beauty">{t.services.beauty}</option>
                      <option value="other">{t.services.other}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {step === 3 && (
                <div className="space-y-5">
                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-red-700 text-sm">{error}</p>
                        {error.includes('registado') || error.includes('registered') ? (
                          <button
                            type="button"
                            onClick={() => onNavigate?.('login')}
                            className="text-red-600 hover:text-red-800 underline text-sm mt-1"
                          >
                            {language === 'pt' ? 'Ir para login' : 'Go to login'}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#0f172a]">
                      {t.password}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-[#2563eb]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#0f172a]">
                      {t.confirmPassword}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-11 h-12 border-gray-200 focus:border-[#2563eb]"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-center text-sm text-[#64748b] bg-gray-50 p-4 rounded-lg">
                    {t.termsAgree}{' '}
                    <a href="#" className="text-[#2563eb] hover:underline">{t.terms}</a>
                    {' '}{t.and}{' '}
                    <a href="#" className="text-[#2563eb] hover:underline">{t.privacy}</a>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="flex-1 h-12 border-gray-200 hover:border-[#2563eb] hover:bg-gray-50"
                  >
                    {t.previousStep}
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={!isStepValid()}
                  className={`${step === 1 ? 'w-full' : 'flex-1'} h-12 bg-[#2563eb] hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {step === 3 ? t.createAccount : t.nextStep}
                  {step < 3 && <ArrowRight className="w-5 h-5" />}
                </Button>
              </div>
            </form>

            {/* Social Signup - Only on Step 1 */}
            {step === 1 && (
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-[#64748b]">
                      {t.orContinue}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 border-gray-200 hover:border-[#2563eb] hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>

                  <Button variant="outline" className="h-12 border-gray-200 hover:border-[#2563eb] hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-[#64748b]">
                {t.alreadyHaveAccount}{' '}
                <button 
                  onClick={() => onNavigate?.('login')} 
                  className="text-[#2563eb] hover:text-[#1e40af] transition-colors"
                >
                  {t.login}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to homepage */}
        <div className="text-center mt-6">
          <button 
            onClick={() => onNavigate?.('home')} 
            className="text-[#64748b] hover:text-[#0f172a] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
}