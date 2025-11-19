(function() {
  'use strict';

  // Get config from window
  const config = window.euconvertoConfig || {};
  
  if (!config.assistantId) {
    console.error('❌ EuConverto Widget: assistantId is required');
    return;
  }

  // API Configuration
  const API_BASE = 'https://eyxcgkztplqkfwjzdflt.supabase.co/functions/v1/make-server-12d56551';

  // Widget state
  let isOpen = false;
  let chatStep = 'welcome';
  let formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };
  let assistantConfig = null;
  let isLoading = true;

  // Create container
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'euconverto-widget-container';
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  document.body.appendChild(widgetContainer);

  // Load assistant configuration
  async function loadConfig() {
    try {
      const response = await fetch(`${API_BASE}/widget/config/${config.assistantId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load widget configuration');
      }

      const data = await response.json();
      assistantConfig = data;
      isLoading = false;
      
      console.log('✅ EuConverto Widget loaded:', assistantConfig.name);
      
      // Initialize widget
      renderButton();
      
    } catch (error) {
      console.error('❌ Error loading EuConverto widget:', error);
      isLoading = false;
      // Show button anyway with defaults
      assistantConfig = {
        name: 'Assistente',
        welcomeMessage: 'Olá! Como posso ajudar?',
        color: '#2563eb',
        position: 'bottom-right',
        fields: ['name', 'email', 'phone', 'service', 'message'],
        enabled: true
      };
      renderButton();
    }
  }

  // Submit lead to backend
  async function submitLead() {
    try {
      const response = await fetch(`${API_BASE}/widget/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: config.assistantId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      const result = await response.json();
      console.log('✅ Lead submitted successfully:', result.leadId);
      return true;
      
    } catch (error) {
      console.error('❌ Error submitting lead:', error);
      return false;
    }
  }

  // Reset chat
  function resetChat() {
    chatStep = 'welcome';
    formData = { name: '', email: '', phone: '', service: '', message: '' };
    renderChat();
  }

  // Render chat messages
  function renderChatMessages() {
    const color = assistantConfig?.color || '#2563eb';
    const name = assistantConfig?.name || 'Assistente';
    const welcome = assistantConfig?.welcomeMessage || 'Olá! Como posso ajudar?';
    const messages = [];

    // Welcome message
    if (chatStep === 'welcome') {
      messages.push(`
        <div style="display: flex; gap: 8px; margin-bottom: 16px;">
          <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            💬
          </div>
          <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
            <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.5;">${welcome}</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            💬
          </div>
          <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 85%;">
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">Como prefere ser contactado?</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button onclick="euconvertoStartForm()" style="width: 100%; display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: ${color}; color: white; border: none; border-radius: 10px; font-size: 14px; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
                <span style="font-size: 18px;">📞</span>
                <span>Deixar os meus dados</span>
              </button>
            </div>
          </div>
        </div>
      `);
    }

    // Form steps
    if (chatStep === 'form') {
      // User clicked button
      messages.push(`
        <div style="display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 12px;">
          <div style="background: ${color}; color: white; border-radius: 16px; border-top-right-radius: 4px; padding: 12px 16px; max-width: 80%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0; font-size: 14px;">Deixar os meus dados</p>
          </div>
        </div>
      `);

      // Name field
      if (!formData.name) {
        messages.push(`
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              💬
            </div>
            <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
              <p style="margin: 0; font-size: 14px; color: #374151;">Perfeito! Qual é o seu nome?</p>
            </div>
          </div>
        `);
      } else {
        // Name answered
        messages.push(`
          <div style="display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 12px;">
            <div style="background: ${color}; color: white; border-radius: 16px; border-top-right-radius: 4px; padding: 12px 16px; max-width: 80%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="margin: 0; font-size: 14px;">${formData.name}</p>
            </div>
          </div>
        `);

        if (!formData.email) {
          messages.push(`
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                💬
              </div>
              <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
                <p style="margin: 0; font-size: 14px; color: #374151;">Prazer, ${formData.name}! Qual é o seu email?</p>
              </div>
            </div>
          `);
        } else {
          // Email answered
          messages.push(`
            <div style="display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 12px;">
              <div style="background: ${color}; color: white; border-radius: 16px; border-top-right-radius: 4px; padding: 12px 16px; max-width: 80%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <p style="margin: 0; font-size: 14px;">${formData.email}</p>
              </div>
            </div>
          `);

          if (!formData.phone) {
            messages.push(`
              <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  💬
                </div>
                <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
                  <p style="margin: 0; font-size: 14px; color: #374151;">Ótimo! E o seu telefone?</p>
                </div>
              </div>
            `);
          } else {
            // Phone answered
            messages.push(`
              <div style="display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 12px;">
                <div style="background: ${color}; color: white; border-radius: 16px; border-top-right-radius: 4px; padding: 12px 16px; max-width: 80%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <p style="margin: 0; font-size: 14px;">${formData.phone}</p>
                </div>
              </div>
            `);

            if (!formData.service) {
              const serviceOptions = assistantConfig?.serviceOptions || ['Consultoria', 'Desenvolvimento', 'Design', 'Marketing', 'Outro'];
              const serviceButtons = serviceOptions.map(service => `
                <button onclick="euconvertoSelectService('${service}')" style="width: 100%; padding: 10px 16px; background: #f3f4f6; border: none; border-radius: 8px; font-size: 14px; text-align: left; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                  ${service}
                </button>
              `).join('');

              messages.push(`
                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                  <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    💬
                  </div>
                  <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 85%;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #374151;">Que tipo de serviço procura?</p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      ${serviceButtons}
                    </div>
                  </div>
                </div>
              `);
            } else {
              // Service selected
              messages.push(`
                <div style="display: flex; gap: 8px; justify-content: flex-end; margin-bottom: 12px;">
                  <div style="background: ${color}; color: white; border-radius: 16px; border-top-right-radius: 4px; padding: 12px 16px; max-width: 80%; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <p style="margin: 0; font-size: 14px;">${formData.service}</p>
                  </div>
                </div>
              `);

              if (!formData.message) {
                messages.push(`
                  <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                    <div style="width: 32px; height: 32px; background: ${color}20; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      💬
                    </div>
                    <div style="background: white; border-radius: 16px; border-top-left-radius: 4px; padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
                      <p style="margin: 0; font-size: 14px; color: #374151;">Quer deixar alguma mensagem? (opcional)</p>
                    </div>
                  </div>
                `);
              }
            }
          }
        }
      }
    }

    // Success message
    if (chatStep === 'success') {
      messages.push(`
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <div style="width: 32px; height: 32px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            ✓
          </div>
          <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 16px; border-top-left-radius: 4px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
            <p style="margin: 0 0 8px 0; font-size: 15px; color: #166534; font-weight: 600;">✅ Mensagem enviada!</p>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #166534; line-height: 1.5;">Obrigado, ${formData.name}! Recebi os seus dados. Entraremos em contacto em breve! 🎉</p>
            <button onclick="euconvertoReset()" style="width: 100%; padding: 10px 16px; background: ${color}; color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; transition: all 0.2s;">
              Nova conversa
            </button>
          </div>
        </div>
      `);
    }

    return messages.join('');
  }

  // Render input
  function renderInput() {
    const color = assistantConfig?.color || '#2563eb';
    
    if (chatStep === 'welcome' || chatStep === 'success') {
      return '';
    }

    if (chatStep === 'form') {
      // Determine what field we're collecting
      let placeholder = '';
      let currentField = '';
      
      if (!formData.name) {
        placeholder = 'Digite o seu nome...';
        currentField = 'name';
      } else if (!formData.email) {
        placeholder = 'Digite o seu email...';
        currentField = 'email';
      } else if (!formData.phone) {
        placeholder = 'Digite o seu telefone...';
        currentField = 'phone';
      } else if (formData.service && !formData.message) {
        placeholder = 'Deixe a sua mensagem (opcional)...';
        currentField = 'message';
      } else {
        return ''; // No input needed (selecting service)
      }

      const isOptional = currentField === 'message';

      return `
        <div style="padding: 16px; background: white; border-top: 1px solid #e5e7eb;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <input 
              id="euconverto-input" 
              type="text" 
              placeholder="${placeholder}"
              style="flex: 1; padding: 12px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.2s;"
              onfocus="this.style.borderColor='${color}'"
              onblur="this.style.borderColor='#e5e7eb'"
              onkeypress="if(event.key==='Enter') euconvertoSubmitInput()"
            />
            ${isOptional ? `
              <button 
                onclick="euconvertoSkipMessage()"
                style="padding: 12px 16px; background: #f3f4f6; color: #6b7280; border: none; border-radius: 10px; font-size: 14px; cursor: pointer; font-weight: 500; white-space: nowrap;"
              >
                Pular
              </button>
            ` : ''}
            <button 
              onclick="euconvertoSubmitInput()"
              style="padding: 12px 20px; background: ${color}; color: white; border: none; border-radius: 10px; font-size: 18px; cursor: pointer; font-weight: 600; transition: all 0.2s;"
              onmouseover="this.style.transform='scale(1.05)'"
              onmouseout="this.style.transform='scale(1)'"
            >
              →
            </button>
          </div>
        </div>
      `;
    }

    return '';
  }

  // Render chat window
  function renderChat() {
    if (!assistantConfig) return;
    
    const color = assistantConfig.color || '#2563eb';
    const name = assistantConfig.name || 'Assistente';

    const chatHTML = `
      <div style="background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); width: 380px; max-height: 600px; display: flex; flex-direction: column; overflow: hidden;">
        <!-- Header -->
        <div style="padding: 20px; background: ${color}; color: white; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">
              💬
            </div>
            <div>
              <div style="font-weight: 600; font-size: 16px;">${name}</div>
              <div style="font-size: 13px; opacity: 0.9;">Online agora</div>
            </div>
          </div>
          <button onclick="euconvertoToggle()" style="background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer; font-size: 24px; padding: 8px; border-radius: 8px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            ×
          </button>
        </div>

        <!-- Messages -->
        <div id="euconverto-messages" style="flex: 1; overflow-y: auto; padding: 20px; background: #f9fafb; max-height: 450px;">
          ${renderChatMessages()}
        </div>

        <!-- Input -->
        ${renderInput()}
      </div>
    `;

    const chatWindow = document.getElementById('euconverto-chat');
    if (chatWindow) {
      chatWindow.innerHTML = chatHTML;
      
      // Scroll to bottom
      setTimeout(() => {
        const messagesDiv = document.getElementById('euconverto-messages');
        if (messagesDiv) {
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        
        // Focus input
        const input = document.getElementById('euconverto-input');
        if (input) {
          input.focus();
        }
      }, 100);
    }
  }

  // Render floating button
  function renderButton() {
    if (!assistantConfig) return;
    
    const color = assistantConfig.color || '#2563eb';
    const position = assistantConfig.position || 'bottom-right';
    
    // Update container position
    if (position === 'bottom-left') {
      widgetContainer.style.left = '20px';
      widgetContainer.style.right = 'auto';
    }

    widgetContainer.innerHTML = `
      <button 
        onclick="euconvertoToggle()"
        style="width: 64px; height: 64px; border-radius: 50%; background: ${color}; color: white; border: none; box-shadow: 0 4px 16px rgba(0,0,0,0.2); cursor: pointer; font-size: 28px; display: flex; align-items: center; justify-content: center; transition: all 0.3s; position: relative; animation: euconverto-pulse 2s infinite;"
        onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.3)'"
        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.2)'"
      >
        <span style="position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; background: #10b981; border: 3px solid white; border-radius: 50%; animation: euconverto-ping 2s infinite;"></span>
        💬
      </button>
      <style>
        @keyframes euconverto-pulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 4px 16px rgba(0,0,0,0.2), 0 0 0 8px ${color}20; }
        }
        @keyframes euconverto-ping {
          0% { transform: scale(1); opacity: 1; }
          50%, 100% { transform: scale(1.2); opacity: 0; }
        }
      </style>
    `;
  }

  // Global functions
  window.euconvertoToggle = function() {
    if (!assistantConfig) return;
    
    isOpen = !isOpen;
    if (isOpen) {
      widgetContainer.innerHTML = `<div id="euconverto-chat"></div>`;
      renderChat();
    } else {
      renderButton();
    }
  };

  window.euconvertoStartForm = function() {
    chatStep = 'form';
    renderChat();
  };

  window.euconvertoSelectService = function(service) {
    formData.service = service;
    renderChat();
  };

  window.euconvertoSubmitInput = async function() {
    const input = document.getElementById('euconverto-input');
    if (!input) return;
    
    const value = input.value.trim();
    if (!value && chatStep !== 'form') return;

    // Update form data based on current field
    if (!formData.name) {
      if (!value) return;
      formData.name = value;
    } else if (!formData.email) {
      if (!value) return;
      formData.email = value;
    } else if (!formData.phone) {
      if (!value) return;
      formData.phone = value;
    } else if (formData.service && !formData.message) {
      formData.message = value || ''; // Message is optional
      
      // Submit lead
      const success = await submitLead();
      if (success) {
        chatStep = 'success';
      }
    }

    renderChat();
  };

  window.euconvertoSkipMessage = async function() {
    formData.message = '';
    
    // Submit lead
    const success = await submitLead();
    if (success) {
      chatStep = 'success';
    }
    
    renderChat();
  };

  window.euconvertoReset = function() {
    resetChat();
  };

  // Initialize
  loadConfig();

  console.log('🚀 EuConverto Widget initializing...');
})();
