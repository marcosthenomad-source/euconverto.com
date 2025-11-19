import { useState } from 'react';
import { Mail, Lock, ChevronDown, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { auth } from './utils/api';

type Language = 'pt' | 'en';

interface LoginPageProps {
  onNavigate?: (page: 'home' | 'signup' | 'dashboard' | 'forgot-password') => void;
  onScrollToPricing?: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function LoginPage({ onNavigate, onScrollToPricing, language = 'pt', onLanguageChange }: LoginPageProps) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const translations = {
    pt: {
      welcome: 'Bem-vindo de volta',
      subtitle: 'Entre na sua conta para continuar',
      email: 'Email',
      password: 'Palavra-passe',
      forgotPassword: 'Esqueceu a palavra-passe?',
      loginButton: 'Entrar',
      noAccount: 'Não tem conta?',
      createAccount: 'Criar conta',
      orContinue: 'Or continue with',
      backToHome: 'Voltar à página inicial',
      loginError: 'Email ou palavra-passe incorretos.'
    },
    en: {
      welcome: 'Welcome back',
      subtitle: 'Log in to your account to continue',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      loginButton: 'Log In',
      noAccount: "Don't have an account?",
      createAccount: 'Create account',
      orContinue: 'Or continue with',
      backToHome: 'Back to homepage',
      loginError: 'Incorrect email or password.'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await auth.signin(formData.email, formData.password);
      
      if (response.success) {
        // Redirect to dashboard
        onNavigate?.('dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(t.loginError);
    } finally {
      setLoading(false);
    }
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

      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-[#2563eb] mb-6">euconverto.com</h1>
              <h2 className="text-[#0f172a] mb-2">{t.welcome}</h2>
              <p className="text-[#64748b]">{t.subtitle}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate?.('forgot-password')}
                  className="text-sm text-[#2563eb] hover:text-[#1d4ed8]"
                >
                  {t.forgotPassword}
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8]"
              >
                {loading ? 'A entrar...' : t.loginButton}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-[#64748b]">
                  {t.orContinue}
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
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

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-[#64748b]">
                {t.noAccount}{' '}
                <button 
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }} 
                  className="text-[#2563eb] hover:text-[#1e40af] transition-colors"
                >
                  {t.createAccount}
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