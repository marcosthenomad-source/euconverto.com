import { useState, useEffect } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { projectId } from '../utils/supabase/info';

interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
  repeat: string;
  alert: string;
  color: string;
  tags: string[];
}

interface CalendarWidgetProps {
  language: 'pt' | 'en';
  onNavigate: (page: string) => void;
}

export default function CalendarWidget({ language, onNavigate }: CalendarWidgetProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    pt: {
      title: 'Esta Semana',
      noEvents: 'Sem eventos esta semana',
      viewAll: 'Ver Calendário',
      today: 'Hoje',
      tomorrow: 'Amanhã',
      allDay: 'Todo o dia'
    },
    en: {
      title: 'This Week',
      noEvents: 'No events this week',
      viewAll: 'View Calendar',
      today: 'Today',
      tomorrow: 'Tomorrow',
      allDay: 'All day'
    }
  };

  const t = translations[language];

  useEffect(() => {
    fetchWeekEvents();
  }, []);

  const fetchWeekEvents = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/events`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      if (response.ok) {
        const allEvents = await response.json();
        
        // Filter events for this week
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        
        const weekEvents = allEvents
          .filter((event: CalendarEvent) => {
            const eventDate = new Date(event.startDate);
            return eventDate >= weekStart && eventDate < weekEnd;
          })
          .sort((a: CalendarEvent, b: CalendarEvent) => 
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        
        setEvents(weekEvents);
      }
    } catch (error) {
      console.error('Error fetching week events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRelativeDay = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);
    
    if (eventDay.getTime() === today.getTime()) {
      return t.today;
    } else if (eventDay.getTime() === tomorrow.getTime()) {
      return t.tomorrow;
    } else {
      return eventDate.toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2563eb]" />
              <h3 className="font-semibold text-[#0f172a]">{t.title}</h3>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400 text-sm">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2563eb]" />
            <h3 className="font-semibold text-[#0f172a]">{t.title}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('calendar')}
            className="text-[#2563eb] hover:text-[#1d4ed8]"
          >
            {t.viewAll}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>{t.noEvents}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {events.slice(0, 5).map(event => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border-l-4"
                style={{ borderLeftColor: event.color }}
                onClick={() => onNavigate('calendar')}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-[#0f172a] truncate">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getRelativeDay(event.startDate)}
                    {!event.allDay && (
                      <span className="ml-2">
                        {new Date(event.startDate).toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                    {event.allDay && (
                      <span className="ml-2 text-blue-600">{t.allDay}</span>
                    )}
                  </div>
                  {event.location && (
                    <div className="text-xs text-gray-400 mt-1 truncate">
                      📍 {event.location}
                    </div>
                  )}
                </div>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                  style={{ backgroundColor: event.color }}
                />
              </div>
            ))}
            
            {events.length > 5 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('calendar')}
                className="w-full text-[#2563eb] hover:text-[#1d4ed8]"
              >
                +{events.length - 5} {language === 'pt' ? 'mais' : 'more'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
