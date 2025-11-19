import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent } from './components/ui/card';
import { projectId, publicAnonKey } from './utils/supabase/info';

interface ForgotPasswordPageProps {
  onNavigate?: (page: 'home' | 'login' | 'signup') => void;
  language: 'pt' | 'en';
}

export default function ForgotPasswordPage({ onNavigate, language }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    pt: {
      title: 'Recuperar Palavra-passe',
      subtitle: 'Insira o seu email e enviaremos instruções de recuperação',
      emailLabel: 'Email',
      emailPlaceholder: 'seuemail@exemplo.com',
      sendButton: 'Enviar Instruções',
      sending: 'A enviar...',
      backToLogin: 'Voltar ao login',
      successTitle: 'Email enviado!',
      successMessage: 'Se o email existir na nossa base de dados, receberá instruções para recuperar a sua palavra-passe.',
      checkEmail: 'Verifique o seu email (incluindo spam)',
      errorGeneric: 'Erro ao processar pedido. Tente novamente.'
    },
    en: {
      title: 'Recover Password',
      subtitle: 'Enter your email and we will send recovery instructions',
      emailLabel: 'Email',
      emailPlaceholder: 'youremail@example.com',
      sendButton: 'Send Instructions',
      sending: 'Sending...',
      backToLogin: 'Back to login',
      successTitle: 'Email sent!',
      successMessage: 'If the email exists in our database, you will receive instructions to recover your password.',
      checkEmail: 'Check your email (including spam)',
      errorGeneric: 'Error processing request. Please try again.'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Use query params with a timestamp to force cache bypass
      const timestamp = Date.now();
      const redirectUrl = `https://logic-slip-74105898.figma.site/?page=reset-password&t=${timestamp}`;

      console.log('🚀 FORGOT PASSWORD - Sending request...');
      console.log('📧 Email:', email);
      console.log('🔗 Redirect URL:', redirectUrl);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            email,
            redirectUrl 
          })
        }
      );

      console.log('📨 Response status:', response.status);

      const data = await response.json();

      console.log('📦 Response data:', data);

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || t.errorGeneric);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h1 className="text-[#0f172a] mb-2">{t.title}</h1>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.emailLabel}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="h-12"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8]"
                >
                  {loading ? t.sending : t.sendButton}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => onNavigate?.('login')}
                  className="text-[#2563eb] hover:text-[#1d4ed8] text-sm flex items-center justify-center gap-2 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.backToLogin}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-[#0f172a] mb-3">{t.successTitle}</h1>
                <p className="text-[#64748b] mb-4">{t.successMessage}</p>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <p className="text-blue-800 text-sm">
                    📧 {t.checkEmail}
                  </p>
                </div>

                <Button
                  onClick={() => onNavigate?.('login')}
                  variant="outline"
                  className="w-full h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToLogin}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}