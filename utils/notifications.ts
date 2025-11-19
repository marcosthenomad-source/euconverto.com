// Sistema de Notificações Push no Browser

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Este browser não suporta notificações');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options
    });
  }
};

export const sendLeadNotification = (leadName: string, service?: string) => {
  const title = '🎉 Novo Lead Capturado!';
  const body = service 
    ? `${leadName} está interessado em ${service}`
    : `${leadName} quer ser contactado`;

  sendNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'new-lead',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: {
      leadName,
      service,
      timestamp: Date.now()
    }
  });
};

export const isNotificationEnabled = (): boolean => {
  return Notification.permission === 'granted';
};
