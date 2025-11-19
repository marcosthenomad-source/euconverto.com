// Templates pré-configurados por setor

export interface Template {
  id: string;
  name: string;
  icon: string;
  config: {
    name: string;
    color: string;
    welcomeMessage: {
      pt: string;
      en: string;
    };
    companyName: string;
    schedule: {
      days: string[];
      openTime: string;
      closeTime: string;
    };
    services: {
      pt: string[];
      en: string[];
    };
  };
}

export const templates: Template[] = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    config: {
      name: 'Sofia',
      color: '#dc2626',
      welcomeMessage: {
        pt: 'Olá! Bem-vindo ao nosso restaurante! Como posso ajudar? 🍽️',
        en: 'Hello! Welcome to our restaurant! How can I help you? 🍽️'
      },
      companyName: 'Restaurante',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        openTime: '12:00',
        closeTime: '23:00'
      },
      services: {
        pt: ['Reserva de Mesa', 'Take-away', 'Catering', 'Eventos Privados'],
        en: ['Table Reservation', 'Takeaway', 'Catering', 'Private Events']
      }
    }
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    icon: '⚖️',
    config: {
      name: 'Dr. Ricardo',
      color: '#1e40af',
      welcomeMessage: {
        pt: 'Olá! Precisa de ajuda jurídica? Estou aqui para ajudar! ⚖️',
        en: 'Hello! Need legal help? I\'m here to assist you! ⚖️'
      },
      companyName: 'Escritório de Advogados',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        openTime: '09:00',
        closeTime: '18:00'
      },
      services: {
        pt: ['Consulta Jurídica', 'Direito Imobiliário', 'Direito Família', 'Direito Laboral'],
        en: ['Legal Consultation', 'Real Estate Law', 'Family Law', 'Labor Law']
      }
    }
  },
  {
    id: 'salon',
    name: 'Hair Salon',
    icon: '💇',
    config: {
      name: 'Ana',
      color: '#ec4899',
      welcomeMessage: {
        pt: 'Olá! Quer marcar um horário no salão? 💇✨',
        en: 'Hello! Want to book an appointment at the salon? 💇✨'
      },
      companyName: 'Salão de Beleza',
      schedule: {
        days: ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        openTime: '09:00',
        closeTime: '19:00'
      },
      services: {
        pt: ['Corte de Cabelo', 'Coloração', 'Madeixas', 'Manicure', 'Tratamentos'],
        en: ['Haircut', 'Hair Coloring', 'Highlights', 'Manicure', 'Treatments']
      }
    }
  },
  {
    id: 'dentist',
    name: 'Dentist',
    icon: '🦷',
    config: {
      name: 'Dr. Paulo',
      color: '#0891b2',
      welcomeMessage: {
        pt: 'Olá! Precisa de cuidar do seu sorriso? Marque já a sua consulta! 🦷',
        en: 'Hello! Need to take care of your smile? Book your appointment now! 🦷'
      },
      companyName: 'Clínica Dentária',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        openTime: '08:30',
        closeTime: '19:30'
      },
      services: {
        pt: ['Consulta Geral', 'Limpeza Dentária', 'Branqueamento', 'Ortodontia', 'Implantes'],
        en: ['General Checkup', 'Dental Cleaning', 'Whitening', 'Orthodontics', 'Implants']
      }
    }
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: '🏠',
    config: {
      name: 'Carla',
      color: '#16a34a',
      welcomeMessage: {
        pt: 'Olá! À procura da casa dos seus sonhos? Posso ajudar! 🏠',
        en: 'Hello! Looking for your dream home? I can help! 🏠'
      },
      companyName: 'Imobiliária',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        openTime: '09:00',
        closeTime: '19:00'
      },
      services: {
        pt: ['Compra de Imóvel', 'Venda de Imóvel', 'Arrendamento', 'Avaliação'],
        en: ['Property Purchase', 'Property Sale', 'Rental', 'Valuation']
      }
    }
  },
  {
    id: 'gym',
    name: 'Gym',
    icon: '💪',
    config: {
      name: 'Bruno',
      color: '#ea580c',
      welcomeMessage: {
        pt: 'Olá! Pronto para transformar o seu corpo? Vamos começar! 💪',
        en: 'Hello! Ready to transform your body? Let\'s start! 💪'
      },
      companyName: 'Ginásio',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        openTime: '06:00',
        closeTime: '22:00'
      },
      services: {
        pt: ['Treino Personal', 'Aulas de Grupo', 'Nutrição', 'Avaliação Física'],
        en: ['Personal Training', 'Group Classes', 'Nutrition', 'Physical Assessment']
      }
    }
  },
  {
    id: 'store',
    name: 'Online Store',
    icon: '🛍️',
    config: {
      name: 'Assistente',
      color: '#7c3aed',
      welcomeMessage: {
        pt: 'Olá! Bem-vindo à nossa loja! Como posso ajudar com a sua compra? 🛍️',
        en: 'Hello! Welcome to our store! How can I help with your purchase? 🛍️'
      },
      companyName: 'Loja Online',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
        openTime: '00:00',
        closeTime: '23:59'
      },
      services: {
        pt: ['Informações Produto', 'Estado da Encomenda', 'Devoluções', 'Suporte Técnico'],
        en: ['Product Info', 'Order Status', 'Returns', 'Technical Support']
      }
    }
  },
  {
    id: 'consultant',
    name: 'Consulting',
    icon: '📊',
    config: {
      name: 'Consultora',
      color: '#0369a1',
      welcomeMessage: {
        pt: 'Olá! Pronto para levar o seu negócio ao próximo nível? 📊',
        en: 'Hello! Ready to take your business to the next level? 📊'
      },
      companyName: 'Consultoria',
      schedule: {
        days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        openTime: '09:00',
        closeTime: '18:00'
      },
      services: {
        pt: ['Consultoria Estratégica', 'Marketing Digital', 'Análise Financeira', 'Transformação Digital'],
        en: ['Strategic Consulting', 'Digital Marketing', 'Financial Analysis', 'Digital Transformation']
      }
    }
  }
];

export const getTemplate = (id: string): Template | undefined => {
  return templates.find(t => t.id === id);
};
