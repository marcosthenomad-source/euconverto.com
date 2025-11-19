import { useState } from 'react';
import { CheckCircle, Circle, Copy, ExternalLink, Mail, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';

interface SetupGuidePageProps {
  onNavigate?: (page: 'home' | 'login' | 'forgot-password') => void;
  language: 'pt' | 'en';
}

export default function SetupGuidePage({ onNavigate, language }: SetupGuidePageProps) {
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const currentUrl = window.location.origin;

  const emailTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">euconverto.com</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 24px;">🔐 Recuperar Palavra-passe</h2>
              <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px; line-height: 1.6;">Olá!</p>
              <p style="margin: 0 0 30px 0; color: #64748b; font-size: 16px; line-height: 1.6;">
                Recebemos um pedido para recuperar a palavra-passe da sua conta em <strong style="color: #2563eb;">euconverto.com</strong>.
              </p>
              <table role="presentation" style="margin: 0 auto 30px auto;">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      Redefinir Palavra-passe
                    </a>
                  </td>
                </tr>
              </table>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 0 0 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">⚠️ <strong>Este link expira em 1 hora</strong></p>
              </div>
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">Se o botão não funcionar, copie este link:</p>
              <p style="margin: 0 0 30px 0; color: #2563eb; font-size: 14px; word-break: break-all; background-color: #f1f5f9; padding: 12px; border-radius: 6px; font-family: monospace;">
                {{ .ConfirmationURL }}
              </p>
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">🛡️ Não pediu esta recuperação?</p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">Ignore este email - a sua conta permanecerá segura.</p>
              </div>
              <p style="margin: 20px 0 0 0; color: #2563eb; font-size: 16px; font-weight: 600;">Equipa euconverto.com 🚀</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">© 2024 euconverto.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[#0f172a] mb-3">
            🚀 Guia de Configuração
          </h1>
          <p className="text-[#64748b] text-lg">
            3 passos simples para configurar a recuperação de password
          </p>
          <Badge className="mt-4 bg-blue-100 text-blue-800 border-0">
            ⏱️ Tempo estimado: 10 minutos
          </Badge>
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            {step1Done ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
            <span className={step1Done ? "text-green-600 font-semibold" : "text-gray-600"}>
              Redirect URLs
            </span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300 mt-3" />
          <div className="flex items-center gap-2">
            {step2Done ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
            <span className={step2Done ? "text-green-600 font-semibold" : "text-gray-600"}>
              Email (SMTP)
            </span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300 mt-3" />
          <div className="flex items-center gap-2">
            {step3Done ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
            <span className={step3Done ? "text-green-600 font-semibold" : "text-gray-600"}>
              Template
            </span>
          </div>
        </div>

        {/* Step 1: Redirect URLs */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <LinkIcon className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div className="flex-1">
                <h2 className="text-[#0f172a] mb-2">Passo 1: Configurar Redirect URLs</h2>
                <p className="text-[#64748b] mb-6">
                  Permite que o Supabase redirecione para o teu site após recuperação
                </p>

                {/* URL to copy */}
                <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
                  <p className="text-sm text-[#64748b] mb-3 font-semibold">🔗 Teu URL (já detetado):</p>
                  <div className="flex gap-2">
                    <code className="flex-1 bg-white px-4 py-3 rounded border border-blue-200 text-[#2563eb] break-all">
                      {currentUrl}/#reset-password
                    </code>
                    <Button
                      onClick={() => copyToClipboard(`${currentUrl}/#reset-password`, () => {})}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="text-[#0f172a] font-medium">Abre o Supabase Dashboard</p>
                      <Button
                        onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Abrir Supabase
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      2
                    </div>
                    <p className="text-[#64748b]">
                      Seleciona o teu projeto → <strong>Authentication</strong> → <strong>URL Configuration</strong>
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-[#64748b] mb-2">
                        Em <strong>Site URL</strong>, cola: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{currentUrl}</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="text-[#64748b] mb-2">
                        Em <strong>Redirect URLs</strong>, clica <strong>"Add URL"</strong> e cola:
                      </p>
                      <code className="bg-gray-100 px-3 py-2 rounded text-sm block">{currentUrl}/#reset-password</code>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      5
                    </div>
                    <p className="text-[#64748b]">
                      Clica <strong>"Save"</strong>
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setStep1Done(!step1Done)}
                  className={step1Done ? "bg-green-600 hover:bg-green-700" : "bg-[#2563eb] hover:bg-[#1d4ed8]"}
                >
                  {step1Done ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Passo 1 Concluído!
                    </>
                  ) : (
                    "Marquei como feito"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Email / SMTP */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-[#0f172a] mb-2">Passo 2: Configurar Email (SMTP)</h2>
                <p className="text-[#64748b] mb-6">
                  Permite enviar emails de recuperação
                </p>

                {/* SIMPLE VERSION - NO MAILTRAP */}
                <div className="bg-yellow-50 p-6 rounded-lg mb-6 border-2 border-yellow-400">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-[#0f172a] font-semibold mb-2">⚡ FORMA MAIS SIMPLES (SEM CONFIGURAR NADA)</h3>
                      <p className="text-[#64748b] text-sm mb-3">
                        O Supabase já tem email built-in! Não precisa configurar SMTP agora.
                      </p>
                      <div className="bg-white p-4 rounded border-2 border-yellow-300">
                        <p className="text-sm text-[#64748b] mb-2">
                          ⚠️ <strong>AVISO:</strong> Por agora, <strong>SALTA ESTE PASSO</strong>. Os emails vão funcionar com o serviço padrão do Supabase.
                        </p>
                        <p className="text-sm text-[#64748b]">
                          ✅ Podes configurar email personalizado mais tarde quando fores para produção.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setStep2Done(true)}
                    className="bg-yellow-600 hover:bg-yellow-700 w-full"
                  >
                    Saltar este passo (usar email padrão do Supabase)
                  </Button>
                </div>

                {/* Option A: Mailtrap - COLLAPSED */}
                <details className="bg-purple-50 p-6 rounded-lg mb-4 border border-purple-200">
                  <summary className="cursor-pointer text-[#0f172a] font-semibold mb-2">
                    📧 Opção Avançada: Configurar Mailtrap (Opcional)
                  </summary>
                  <div className="mt-4">
                    <p className="text-[#64748b] mb-4 text-sm">
                      ✅ Grátis • ✅ Vês emails numa interface web
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600">1.</span>
                        <div className="flex-1">
                          <p className="text-sm text-[#64748b]">Cria conta no Mailtrap:</p>
                          <Button
                            onClick={() => window.open('https://mailtrap.io', '_blank')}
                            variant="outline"
                            size="sm"
                            className="mt-1"
                          >
                            Abrir Mailtrap
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600">2.</span>
                        <p className="text-sm text-[#64748b]">Cria um <strong>Inbox</strong> de teste</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600">3.</span>
                        <p className="text-sm text-[#64748b]">Copia as credenciais SMTP</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600">4.</span>
                        <p className="text-sm text-[#64748b]">
                          Cola no Supabase → Settings → Auth → SMTP Settings
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Email Template */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-[#0f172a] mb-2">Passo 3: Personalizar Email Template</h2>
                <p className="text-[#64748b] mb-6">
                  Email bonito com cores da marca euconverto.com
                </p>

                {/* Template preview */}
                <div className="bg-orange-50 p-6 rounded-lg mb-6 border border-orange-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[#0f172a] font-semibold mb-1">Template HTML Pronto</p>
                      <p className="text-sm text-[#64748b]">Copia e cola no Supabase</p>
                    </div>
                    <Button
                      onClick={() => {
                        copyToClipboard(emailTemplate, setCopiedTemplate);
                      }}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {copiedTemplate ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar Template
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-orange-200 max-h-60 overflow-auto">
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap break-all">
                      {emailTemplate.substring(0, 500)}...
                    </pre>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      1
                    </div>
                    <p className="text-[#64748b]">
                      Copia o template acima (clica no botão "Copiar Template")
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-[#64748b] mb-2">
                        Supabase → <strong>Authentication</strong> → <strong>Email Templates</strong>
                      </p>
                      <Button
                        onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        Abrir Supabase
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      3
                    </div>
                    <p className="text-[#64748b]">
                      Clica em <strong>"Reset Password"</strong>
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      4
                    </div>
                    <p className="text-[#64748b]">
                      Cola o template HTML no campo de mensagem
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      5
                    </div>
                    <p className="text-[#64748b]">
                      Clica <strong>"Save"</strong>
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setStep3Done(!step3Done)}
                  className={step3Done ? "bg-green-600 hover:bg-green-700" : "bg-orange-600 hover:bg-orange-700"}
                >
                  {step3Done ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Passo 3 Concluído!
                    </>
                  ) : (
                    "Marquei como feito"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Status */}
        {step1Done && step2Done && step3Done && (
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white mb-3">🎉 Tudo Configurado!</h2>
              <p className="text-white/90 mb-6">
                A recuperação de password está pronta! Agora podes testar.
              </p>
              <Button
                onClick={() => window.location.hash = '#forgot-password'}
                className="bg-white text-green-600 hover:bg-gray-100"
                size="lg"
              >
                Testar Recuperação de Password
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help */}
        <Card className="mt-6 border-0 shadow-lg bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-semibold mb-1">💡 Precisa de ajuda?</p>
                <p className="text-blue-800 text-sm">
                  Se tiveres problemas, consulta os ficheiros detalhados: <code className="bg-white px-2 py-1 rounded">GUIA_RECUPERACAO_PASSWORD.md</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}