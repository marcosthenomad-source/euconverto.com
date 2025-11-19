import { useState } from 'react';
import { Trash2, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { projectId, publicAnonKey } from './utils/supabase/info';

export default function DebugPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [adminCreds, setAdminCreds] = useState<{ email: string; password: string } | null>(null);

  const handleDelete = async () => {
    if (!email) {
      setError('Por favor, insira um email');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/debug/delete-user/${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(data.message || 'Utilizador removido com sucesso!');
        setEmail('');
      } else {
        setError(data.error || 'Erro ao remover utilizador');
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAll = async () => {
    const confirmed = window.confirm(
      '⚠️ ATENÇÃO: Isto vai apagar TODAS as contas e criar uma conta ADMIN nova.\n\nTens a certeza?'
    );

    if (!confirmed) return;

    setResetLoading(true);
    setError('');
    setMessage('');
    setAdminCreds(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/debug/reset-all`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(data.message || 'Reset completo realizado com sucesso!');
        if (data.admin) {
          setAdminCreds(data.admin);
        }
      } else {
        setError(data.error || 'Erro ao fazer reset');
      }
    } catch (err: any) {
      console.error('Reset error:', err);
      setError('Erro ao conectar ao servidor');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* RESET ALL - Card Principal */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-red-600 to-red-700 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white mb-2">🔥 Reset Completo</h1>
              <p className="text-white/90">
                Apaga TODAS as contas e cria uma conta ADMIN permanente
              </p>
            </div>

            <Button
              onClick={handleResetAll}
              disabled={resetLoading}
              className="w-full h-14 bg-white text-red-600 hover:bg-gray-100 shadow-xl"
              size="lg"
            >
              {resetLoading ? 'A processar...' : '⚡ APAGAR TUDO E CRIAR ADMIN'}
            </Button>

            {adminCreds && (
              <div className="mt-6 p-6 bg-white/10 backdrop-blur rounded-lg border-2 border-white/30">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Conta ADMIN criada!
                </h3>
                <div className="space-y-3 bg-white/20 rounded p-4">
                  <div>
                    <p className="text-white/70 text-sm">Email:</p>
                    <p className="text-white select-all">{adminCreds.email}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Password:</p>
                    <p className="text-white select-all">{adminCreds.password}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Plano:</p>
                    <p className="text-white">Professional (2000 conversas/mês)</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Individual User */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-[#0f172a] mb-2">Apagar Conta Individual</h2>
              <p className="text-[#64748b]">
                Remove uma conta específica por email
              </p>
            </div>

            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {message && !adminCreds && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-green-700 text-sm">{message}</p>
                </div>
              )}

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email para remover</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="h-12"
                  />
                </div>

                <Button
                  onClick={handleDelete}
                  disabled={loading || !email}
                  variant="outline"
                  className="w-full h-12 border-red-300 text-red-600 hover:bg-red-50"
                >
                  {loading ? 'Apagando...' : '🗑️ Apagar Esta Conta'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-yellow-50">
            <CardContent className="p-6">
              <p className="text-yellow-800 text-sm mb-2">
                <strong>⚡ Reset Completo:</strong>
              </p>
              <ul className="text-yellow-700 text-sm space-y-1 ml-4 list-disc">
                <li>Apaga TODAS as contas</li>
                <li>Cria conta ADMIN permanente</li>
                <li>Email: admin@euconverto.com</li>
                <li>Plano Professional</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-blue-50">
            <CardContent className="p-6">
              <p className="text-blue-800 text-sm mb-2">
                <strong>📝 Como usar:</strong>
              </p>
              <ol className="text-blue-700 text-sm space-y-1 ml-4 list-decimal">
                <li>Clica "APAGAR TUDO E CRIAR ADMIN"</li>
                <li>Confirma a ação</li>
                <li>Guarda as credenciais</li>
                <li>Faz login no site</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}