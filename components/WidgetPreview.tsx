import { useState } from 'react';
import { X, Clock, Briefcase, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface WidgetPreviewProps {
  selectedWidget: number;
  assistantConfig: {
    name: string;
    color: string;
    welcomeMessage: string;
    companyName: string;
    schedule: {
      days: string[];
      openTime: string;
      closeTime: string;
    };
    services: string[];
  };
}

export default function WidgetPreview({ selectedWidget, assistantConfig }: WidgetPreviewProps) {
  const [chatStep, setChatStep] = useState<'menu' | 'showSchedule' | 'showServices' | 'captureForm'>('menu');
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    selectedService: ''
  });

  const resetChat = () => {
    setChatStep('menu');
    setFormStep(0);
    setFormData({ name: '', phone: '', email: '', selectedService: '' });
  };

  // Função para ordenar dias pela ordem correta da semana
  const sortDays = (days: string[]) => {
    const order = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    return [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  };

  const formatSchedule = () => {
    if (assistantConfig.schedule.days.length === 0) return 'Não configurado';
    const sortedDays = sortDays(assistantConfig.schedule.days);
    return `${sortedDays.join(', ')} | ${assistantConfig.schedule.openTime} - ${assistantConfig.schedule.closeTime}`;
  };

  const renderChatMessages = () => {
    const messages = [];

    // Mensagem de boas-vindas (sempre aparece)
    messages.push(
      <div key="welcome" className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
          💬
        </div>
        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
          <p className="text-sm">{assistantConfig.welcomeMessage}</p>
        </div>
      </div>
    );

    // Menu inicial - 3 botões
    if (chatStep === 'menu') {
      messages.push(
        <div key="menu" className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            💬
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
            <p className="text-sm mb-3">Como posso ajudar-te hoje?</p>
            <div className="space-y-2">
              <button
                onClick={() => setChatStep('showSchedule')}
                className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
              >
                <Clock className="w-4 h-4" />
                <span>Ver Horário</span>
              </button>
              <button
                onClick={() => setChatStep('showServices')}
                className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
              >
                <Briefcase className="w-4 h-4" />
                <span>Ver Serviços</span>
              </button>
              <button
                onClick={() => setChatStep('captureForm')}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-white rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
                style={{ background: assistantConfig.color }}
              >
                <Phone className="w-4 h-4" />
                <span>Quero ser contactado</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Mostrar horário
    if (chatStep === 'showSchedule') {
      messages.push(
        <div key="schedule-click" className="flex gap-2 justify-end">
          <div 
            className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
            style={{ background: assistantConfig.color }}
          >
            <p className="text-sm">🕒 Ver Horário</p>
          </div>
        </div>
      );
      messages.push(
        <div key="schedule-response" className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            💬
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
            <p className="text-sm mb-2">📅 <strong>Estamos abertos:</strong></p>
            <p className="text-sm text-gray-700">{formatSchedule()}</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setChatStep('menu')}
            >
              ← Voltar ao menu
            </Button>
          </div>
        </div>
      );
    }

    // Mostrar serviços
    if (chatStep === 'showServices') {
      messages.push(
        <div key="services-click" className="flex gap-2 justify-end">
          <div 
            className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
            style={{ background: assistantConfig.color }}
          >
            <p className="text-sm">💼 Ver Serviços</p>
          </div>
        </div>
      );
      messages.push(
        <div key="services-response" className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            💬
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
            <p className="text-sm mb-3">Estes são os nossos serviços:</p>
            <div className="space-y-2">
              {(assistantConfig.services.length > 0 ? assistantConfig.services : ['Consultoria', 'Website', 'Marketing']).map((service) => (
                <button
                  key={service}
                  onClick={() => {
                    setFormData({ ...formData, selectedService: service });
                    setChatStep('captureForm');
                  }}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors text-left"
                >
                  {service}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 w-full"
              onClick={() => setChatStep('menu')}
            >
              ← Voltar ao menu
            </Button>
          </div>
        </div>
      );
    }

    // Captura de leads
    if (chatStep === 'captureForm') {
      // Mostrar qual botão foi clicado
      if (formData.selectedService) {
        messages.push(
          <div key="service-selected" className="flex gap-2 justify-end">
            <div 
              className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
              style={{ background: assistantConfig.color }}
            >
              <p className="text-sm">{formData.selectedService}</p>
            </div>
          </div>
        );
      } else {
        messages.push(
          <div key="contact-clicked" className="flex gap-2 justify-end">
            <div 
              className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
              style={{ background: assistantConfig.color }}
            >
              <p className="text-sm">📞 Quero ser contactado</p>
            </div>
          </div>
        );
      }

      // Mensagem inicial de captura
      if (formStep === 0) {
        messages.push(
          <div key="capture-intro" className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              💬
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
              <p className="text-sm">Obrigado pela preferência! Dá-nos os teus dados e vamos entrar em contacto o mais rápido possível! 🚀</p>
              <p className="text-sm mt-2">Mas primeiro, preciso de algumas informações tuas. Qual é o teu nome?</p>
            </div>
          </div>
        );
      }

      // Nome respondido
      if (formStep >= 1) {
        messages.push(
          <div key="name-response" className="flex gap-2 justify-end">
            <div 
              className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
              style={{ background: assistantConfig.color }}
            >
              <p className="text-sm">{formData.name}</p>
            </div>
          </div>
        );
        messages.push(
          <div key="phone-question" className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              💬
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
              <p className="text-sm">Prazer, {formData.name}! Qual é o teu contacto telefónico?</p>
            </div>
          </div>
        );
      }

      // Telefone respondido
      if (formStep >= 2) {
        messages.push(
          <div key="phone-response" className="flex gap-2 justify-end">
            <div 
              className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
              style={{ background: assistantConfig.color }}
            >
              <p className="text-sm">{formData.phone}</p>
            </div>
          </div>
        );
        messages.push(
          <div key="email-question" className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              💬
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
              <p className="text-sm">Perfeito! E o teu email?</p>
            </div>
          </div>
        );
      }

      // Email respondido - Finalização
      if (formStep >= 3) {
        messages.push(
          <div key="email-response" className="flex gap-2 justify-end">
            <div 
              className="rounded-2xl rounded-tr-none px-4 py-3 text-white max-w-[80%]"
              style={{ background: assistantConfig.color }}
            >
              <p className="text-sm">{formData.email}</p>
            </div>
          </div>
        );
        messages.push(
          <div key="success" className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              💬
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
              <p className="text-sm">✅ Obrigado, {formData.name}!</p>
              <p className="text-sm mt-2">Recebi os teus dados. A nossa equipa vai entrar em contacto em breve! 🎉</p>
              <Button
                size="sm"
                className="mt-3 w-full"
                style={{ background: assistantConfig.color }}
                onClick={() => {
                  resetChat();
                  toast.success('🎉 Lead capturado! Apareceria na secção Leads');
                }}
              >
                Recomeçar
              </Button>
            </div>
          </div>
        );
      }
    }

    return messages;
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gray-300 relative" style={{ height: '600px' }}>
        {/* Mockup de website em background */}
        <div className="h-full overflow-y-auto bg-gray-50">
          {/* Mock Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <div className="text-xl">{assistantConfig.companyName || 'MinhaEmpresa.pt'}</div>
            <div className="flex gap-6 text-sm text-gray-600">
              <span>Início</span>
              <span>Serviços</span>
              <span>Sobre</span>
              <span>Contacto</span>
            </div>
          </div>
          
          {/* Mock Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 px-8 py-16 text-center">
            <h1 className="text-3xl mb-3 text-gray-800">Bem-vindo ao nosso Website</h1>
            <p className="text-lg text-gray-600 mb-6">Esta é uma demonstração do seu widget</p>
            <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm">
              Saiba Mais
            </div>
          </div>
          
          {/* Mock Content */}
          <div className="px-8 py-8 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        {/* Chat Widget - SEMPRE ABERTO e fixo no preview */}
        <div className="absolute bottom-6 right-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[380px] h-[550px] flex flex-col overflow-hidden border-2" style={{ borderColor: assistantConfig.color }}>
            {/* Chat Header */}
            <div 
              className="p-4 text-white flex items-center justify-between"
              style={{ background: assistantConfig.color }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  💬
                </div>
                <div>
                  <div className="font-semibold">{assistantConfig.name}</div>
                  <div className="text-xs text-white/80">Online</div>
                </div>
              </div>
              <button 
                onClick={resetChat}
                className="text-white/80 hover:text-white transition-colors"
                title="Recomeçar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {renderChatMessages()}
            </div>

            {/* Input Area - só aparece durante captura de leads */}
            {chatStep === 'captureForm' && formStep < 3 && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder={
                      formStep === 0 ? "Digite o teu nome..." :
                      formStep === 1 ? "Digite o teu telefone..." :
                      formStep === 2 ? "Digite o teu email..." :
                      "Mensagem..."
                    }
                    type={formStep === 2 ? "email" : formStep === 1 ? "tel" : "text"}
                    value={
                      formStep === 0 ? formData.name :
                      formStep === 1 ? formData.phone :
                      formStep === 2 ? formData.email :
                      ''
                    }
                    onChange={(e) => {
                      if (formStep === 0) setFormData({ ...formData, name: e.target.value });
                      if (formStep === 1) setFormData({ ...formData, phone: e.target.value });
                      if (formStep === 2) setFormData({ ...formData, email: e.target.value });
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        if (formStep === 0 && formData.name) setFormStep(1);
                        if (formStep === 1 && formData.phone) setFormStep(2);
                        if (formStep === 2 && formData.email) setFormStep(3);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    style={{ background: assistantConfig.color }}
                    size="icon"
                    onClick={() => {
                      if (formStep === 0 && formData.name) setFormStep(1);
                      if (formStep === 1 && formData.phone) setFormStep(2);
                      if (formStep === 2 && formData.email) setFormStep(3);
                    }}
                  >
                    →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}