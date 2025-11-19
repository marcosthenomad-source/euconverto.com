import { useEffect } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  alert: 'none' | '15min' | '1hour' | '1day';
}

export function useEventNotifications(events: CalendarEvent[]) {
  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Check events every minute
    const checkInterval = setInterval(() => {
      checkUpcomingEvents(events);
    }, 60000); // Check every minute

    // Check on mount
    checkUpcomingEvents(events);

    return () => clearInterval(checkInterval);
  }, [events]);
}

function checkUpcomingEvents(events: CalendarEvent[]) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const now = new Date();

  events.forEach(event => {
    if (event.alert === 'none') return;

    const eventDate = new Date(event.startDate);
    const alertMinutes = getAlertMinutes(event.alert);
    const alertTime = new Date(eventDate.getTime() - alertMinutes * 60000);

    // Check if we should send notification now (within 1 minute window)
    const timeDiff = alertTime.getTime() - now.getTime();
    
    if (timeDiff >= 0 && timeDiff < 60000) {
      // Check if we already sent this notification
      const storageKey = `notification_sent_${event.id}_${eventDate.toISOString()}`;
      const alreadySent = localStorage.getItem(storageKey);
      
      if (!alreadySent) {
        sendEventNotification(event, alertMinutes);
        localStorage.setItem(storageKey, 'true');
        
        // Clean up old notification flags after 24 hours
        setTimeout(() => {
          localStorage.removeItem(storageKey);
        }, 24 * 60 * 60 * 1000);
      }
    }
  });
}

function getAlertMinutes(alert: string): number {
  switch (alert) {
    case '15min':
      return 15;
    case '1hour':
      return 60;
    case '1day':
      return 24 * 60;
    default:
      return 0;
  }
}

function sendEventNotification(event: CalendarEvent, minutesBefore: number) {
  const timeText = minutesBefore < 60
    ? `${minutesBefore} minutos`
    : minutesBefore < 1440
    ? `${minutesBefore / 60} hora${minutesBefore / 60 > 1 ? 's' : ''}`
    : `${minutesBefore / 1440} dia${minutesBefore / 1440 > 1 ? 's' : ''}`;

  new Notification('🔔 Lembrete de Evento', {
    body: `${event.title}\nComeça em ${timeText}`,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: `event-${event.id}`,
    requireInteraction: false,
  });
}
