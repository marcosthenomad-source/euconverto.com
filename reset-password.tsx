import { useState, useEffect } from 'react';
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent } from './components/ui/card';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

interface ResetPasswordPageProps {
  onNavigate?: (page: 'home' | 'login') => void;
  language: 'pt' | 'en';
}

export default function ResetPasswordPage({ onNavigate, language }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const translations = {
    pt: {
      title: 'Redefinir Palavra-passe',
      subtitle: 'Insira a sua nova palavra-passe',
      passwordLabel: 'Nova Palavra-passe',
      confirmPasswordLabel: 'Confirmar Palavra-passe',
      resetButton: 'Redefinir Palavra-passe',
      resetting: 'A redefinir...',
      successTitle: 'Palavra-passe alterada!',
      successMessage: 'A sua palavra-passe foi redefinida com sucesso.',
      goToLogin: 'Ir para o login',
      passwordMismatch: 'As palavras-passe não coincidem',
      passwordTooShort: 'A palavra-passe deve ter pelo menos 6 caracteres',
      invalidLink: 'Link de recuperação inválido ou expirado',
      errorGeneric: 'Erro ao redefinir palavra-passe. Tente novamente.'
    },
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your new password',
      passwordLabel: 'New Password',
      confirmPasswordLabel: 'Confirm Password',
      resetButton: 'Reset Password',
      resetting: 'Resetting...',
      successTitle: 'Password changed!',
      successMessage: 'Your password has been successfully reset.',
      goToLogin: 'Go to login',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters',
      invalidLink: 'Invalid or expired recovery link',
      errorGeneric: 'Error resetting password. Please try again.'
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Extract access token from URL hash (Supabase sends it as #access_token=...&type=recovery)
    const supabase = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );

    console.log('🔍 Reset Password Page - Checking for token...');
    console.log('   - Full URL:', window.location.href);
    console.log('   - Hash:', window.location.hash);
    console.log('   - Search:', window.location.search);

    // Get session from URL (Supabase will parse the hash automatically)
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('📨 Session check result:', session ? 'Found session' : 'No session');
      if (session?.access_token) {
        console.log('✅ Access token found!');
        setAccessToken(session.access_token);
      } else {
        console.log('❌ No access token - invalid or expired link');
        setError(t.invalidLink);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessToken) {
      setError(t.invalidLink);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accessToken,
            newPassword: password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || t.errorGeneric);
      }
    } catch (err) {
      console.error('Reset password error:', err);
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
                  <Lock className="w-8 h-8 text-[#2563eb]" />
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">{t.passwordLabel}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 pr-12"
                      required
                      disabled={!accessToken}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPasswordLabel}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 pr-12"
                      required
                      disabled={!accessToken}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !accessToken}
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8]"
                >
                  {loading ? t.resetting : t.resetButton}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-[#0f172a] mb-3">{t.successTitle}</h1>
                <p className="text-[#64748b] mb-6">{t.successMessage}</p>

                <Button
                  onClick={() => onNavigate?.('login')}
                  className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8]"
                >
                  {t.goToLogin}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}