import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Tag, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import EventModal from './EventModal';
import { Badge } from './ui/badge';
import { useEventNotifications } from '../hooks/useEventNotifications';

interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  location: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
  repeat: 'never' | 'daily' | 'weekly' | 'monthly';
  alert: 'none' | '15min' | '1hour' | '1day';
  color: string;
  tags: string[];
  createdAt: string;
}

interface CalendarTag {
  name: string;
  color: string;
}

interface CalendarPageProps {
  language: 'pt' | 'en';
}

export default function CalendarPage({ language }: CalendarPageProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [tags, setTags] = useState<CalendarTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Enable event notifications
  useEventNotifications(events);

  const translations = {
    pt: {
      title: 'Calendário',
      newEvent: 'Novo Evento',
      filterByTag: 'Filtrar por Tag',
      allTags: 'Todas',
      noEvents: 'Nenhum evento encontrado',
      addFirstEvent: 'Adicione o seu primeiro evento para começar!',
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      upcomingEvents: 'Próximos Eventos',
      allDay: 'Todo o dia',
      repeat: {
        never: 'Não repete',
        daily: 'Diariamente',
        weekly: 'Semanalmente',
        monthly: 'Mensalmente'
      }
    },
    en: {
      title: 'Calendar',
      newEvent: 'New Event',
      filterByTag: 'Filter by Tag',
      allTags: 'All',
      noEvents: 'No events found',
      addFirstEvent: 'Add your first event to get started!',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      upcomingEvents: 'Upcoming Events',
      allDay: 'All day',
      repeat: {
        never: 'Never',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly'
      }
    }
  };

  const t = translations[language];

  useEffect(() => {
    fetchEvents();
    fetchTags();
  }, []);

  const fetchEvents = async () => {
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
        const data = await response.json();
        console.log('📊 EVENTOS RECEBIDOS:', data.length);
        console.log('📅 TODOS OS EVENTOS:', data.map((e, i) => ({
          index: i + 1,
          title: e.title,
          startDate: e.startDate,
          formatted: new Date(e.startDate).toLocaleString('pt-PT'),
          dateParsed: `${new Date(e.startDate).getFullYear()}-${String(new Date(e.startDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(e.startDate).getDate()).padStart(2, '0')}`
        })));
        setEvents(data);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch events:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/tags`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTags(data);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSaveEvent = async (eventData: Partial<CalendarEvent>) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      
      if (selectedEvent) {
        // Update existing event
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/events/${selectedEvent.id}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
          }
        );

        if (response.ok) {
          await fetchEvents();
          setShowEventModal(false);
          setSelectedEvent(null);
          console.log('Event updated successfully');
        } else {
          const errorText = await response.text();
          console.error('Failed to update event:', response.status, errorText);
        }
      } else {
        // Create new event(s)
        console.log('Creating new event:', eventData);
        
        const eventsToCreate: Partial<CalendarEvent>[] = [];
        
        if (eventData.repeat === 'never' || !eventData.repeat) {
          // Single event
          eventsToCreate.push(eventData);
        } else {
          // Calculate recurring events for 6 months
          const startDate = new Date(eventData.startDate!);
          const endDate = new Date(eventData.endDate!);
          const duration = endDate.getTime() - startDate.getTime();
          
          const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
          console.log(`🔄 Criando eventos recorrentes (${eventData.repeat})`);
          console.log(`📅 Data inicial: ${startDate.toLocaleString('pt-PT')} - ${weekDays[startDate.getDay()]}`);
          
          let occurrences = 0;
          
          if (eventData.repeat === 'daily') {
            occurrences = 180; // 6 months
            for (let i = 0; i < occurrences; i++) {
              const newStartDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000)); // Add days in milliseconds
              const newEndDate = new Date(newStartDate.getTime() + duration);
              
              if (i < 5) { // Show first 5 events
                console.log(`  ${i + 1}. ${newStartDate.toLocaleDateString('pt-PT')} às ${newStartDate.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} - ${weekDays[newStartDate.getDay()]}`);
              }
              
              eventsToCreate.push({
                ...eventData,
                startDate: newStartDate.toISOString(),
                endDate: newEndDate.toISOString(),
                repeat: 'never' // Individual events don't need repeat flag
              });
            }
          } else if (eventData.repeat === 'weekly') {
            occurrences = 26; // ~6 months (26 weeks)
            console.log(`✅ Criando ${occurrences} eventos SEMANAIS sempre às ${weekDays[startDate.getDay()]}s:`);
            for (let i = 0; i < occurrences; i++) {
              const newStartDate = new Date(startDate.getTime() + (i * 7 * 24 * 60 * 60 * 1000)); // Add weeks in milliseconds
              const newEndDate = new Date(newStartDate.getTime() + duration);
              
              if (i < 10) { // Show first 10 weekly events
                console.log(`  ${i + 1}. ${newStartDate.toLocaleDateString('pt-PT')} às ${newStartDate.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} - ${weekDays[newStartDate.getDay()]} ✅`);
              }
              
              eventsToCreate.push({
                ...eventData,
                startDate: newStartDate.toISOString(),
                endDate: newEndDate.toISOString(),
                repeat: 'never'
              });
            }
            console.log(`  ... e mais ${occurrences - 10} eventos sempre às ${weekDays[startDate.getDay()]}s!`);
          } else if (eventData.repeat === 'monthly') {
            occurrences = 6; // 6 months
            const dayOfMonth = startDate.getDate();
            console.log(`✅ Criando ${occurrences} eventos MENSAIS sempre no dia ${dayOfMonth}:`);
            for (let i = 0; i < occurrences; i++) {
              const newStartDate = new Date(startDate);
              newStartDate.setMonth(startDate.getMonth() + i);
              
              const newEndDate = new Date(newStartDate.getTime() + duration);
              
              console.log(`  ${i + 1}. ${newStartDate.toLocaleDateString('pt-PT')} às ${newStartDate.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} - ${weekDays[newStartDate.getDay()]} (dia ${newStartDate.getDate()}) ✅`);
              
              eventsToCreate.push({
                ...eventData,
                startDate: newStartDate.toISOString(),
                endDate: newEndDate.toISOString(),
                repeat: 'never'
              });
            }
          }
        }
        
        // Create all events
        if (eventsToCreate.length === 1) {
          // Single event - use regular endpoint
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/events`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(eventsToCreate[0])
            }
          );
          
          if (response.ok) {
            await fetchEvents();
            setShowEventModal(false);
            setSelectedDate(null);
            console.log('✅ Created 1 event successfully');
          } else {
            const errorText = await response.text();
            console.error('Failed to create event:', response.status, errorText);
          }
        } else {
          // Multiple events - use BULK endpoint to avoid race condition
          console.log(`🔥 BULK CREATE: Sending ${eventsToCreate.length} events in ONE request`);
          
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/events/bulk`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ events: eventsToCreate })
            }
          );
          
          if (response.ok) {
            const result = await response.json();
            console.log(`✅ BULK CREATE SUCCESS: Created ${result.count} events!`);
            await fetchEvents();
            setShowEventModal(false);
            setSelectedDate(null);
          } else {
            const errorText = await response.text();
            console.error('❌ BULK CREATE FAILED:', response.status, errorText);
          }
        }
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      if (response.ok) {
        await fetchEvents();
        setShowEventModal(false);
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    const filtered = events.filter(event => {
      // Parse the event date properly without timezone issues
      const eventStartDate = new Date(event.startDate);
      const eventYear = eventStartDate.getFullYear();
      const eventMonth = eventStartDate.getMonth();
      const eventDay = eventStartDate.getDate();
      
      const eventDateStr = `${eventYear}-${String(eventMonth + 1).padStart(2, '0')}-${String(eventDay).padStart(2, '0')}`;
      
      // Debug: Log ALL events for August 22, 2025
      if (dateStr === '2025-08-22') {
        console.log(`🔍 Comparando:`, {
          procurando: dateStr,
          eventoRaw: event.startDate,
          eventoDate: eventStartDate.toLocaleString('pt-PT'),
          eventoParsed: eventDateStr,
          match: eventDateStr === dateStr
        });
      }
      
      // Check if event matches selected tags
      if (selectedTags.length > 0) {
        const hasMatchingTag = event.tags.some(tag => selectedTags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      
      return eventDateStr === dateStr;
    });
    
    // Log results for August 22, 2025
    if (dateStr === '2025-08-22') {
      console.log(`📅 Eventos em ${dateStr}:`, filtered.length);
    }
    
    return filtered;
  };

  const toggleTagFilter = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const renderMonth = (monthIndex: number) => {
    const year = currentYear + Math.floor(monthIndex / 12);
    const month = monthIndex % 12;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Debug log for August 2025
    if (month === 7 && year === 2025) {
      console.log(`🗓️ RENDERIZANDO AGOSTO ${year}:`, { monthIndex, currentYear, calculatedYear: year, calculatedMonth: month });
    }
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(year, month, day);
      const isToday = 
        new Date().getFullYear() === year &&
        new Date().getMonth() === month &&
        new Date().getDate() === day;
      
      days.push(
        <div
          key={day}
          className={`aspect-square p-1 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
            isToday ? 'bg-blue-50 border-blue-200' : ''
          }`}
          onClick={() => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            setSelectedDate(dateStr);
            setSelectedEvent(null);
            setShowEventModal(true);
          }}
        >
          <div className={`text-xs mb-1 ${isToday ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
            {day}
          </div>
          <div className="space-y-0.5">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className="text-[10px] px-1 py-0.5 rounded truncate"
                style={{ backgroundColor: event.color + '20', color: event.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[9px] text-gray-500 px-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <Card key={monthIndex} className="overflow-hidden bg-blue-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 text-center font-semibold">
          {t.months[month]} {year}
        </div>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {t.weekDays.map(day => (
              <div key={day} className="text-center text-[10px] font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>
        </CardContent>
      </Card>
    );
  };

  const upcomingEvents = events
    .filter(event => new Date(event.startDate) >= new Date())
    .filter(event => {
      if (selectedTags.length === 0) return true;
      return event.tags.some(tag => selectedTags.includes(tag));
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 10);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0f172a]">{t.title}</h1>
          <p className="text-[#64748b] mt-1">
            {language === 'pt' 
              ? 'Organize seus eventos e compromissos' 
              : 'Organize your events and appointments'}
          </p>
        </div>
        <Button onClick={() => {
          setSelectedEvent(null);
          setShowEventModal(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          {t.newEvent}
        </Button>
      </div>

      {/* Tag Filters */}
      {tags.length > 0 && (
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{t.filterByTag}:</span>
              <Badge
                variant={selectedTags.length === 0 ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTags([])}
              >
                {t.allTags}
              </Badge>
              {tags.map(tag => (
                <Badge
                  key={tag.name}
                  variant={selectedTags.includes(tag.name) ? "default" : "outline"}
                  className="cursor-pointer"
                  style={{
                    backgroundColor: selectedTags.includes(tag.name) ? tag.color : 'transparent',
                    borderColor: tag.color,
                    color: selectedTags.includes(tag.name) ? 'white' : tag.color
                  }}
                  onClick={() => toggleTagFilter(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar Grid - 2 years (24 months) */}
        <div className="lg:col-span-3">
          {/* Year Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentYear(currentYear - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-[#0f172a]">
              {currentYear}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentYear(currentYear + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* 12 Months Grid (1 year) */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 bg-blue-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {t.upcomingEvents}
              </h3>
              
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  <p>{t.noEvents}</p>
                  <p className="mt-2 text-xs">{t.addFirstEvent}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                      style={{ borderLeftWidth: '4px', borderLeftColor: event.color }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                    >
                      <div className="font-medium text-sm text-[#0f172a] mb-1">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>
                          {new Date(event.startDate).toLocaleDateString(language === 'pt' ? 'pt-PT' : 'en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        {!event.allDay && (
                          <div>
                            {new Date(event.startDate).toLocaleTimeString(language === 'pt' ? 'pt-PT' : 'en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                        {event.allDay && (
                          <div className="text-blue-600">{t.allDay}</div>
                        )}
                        {event.tags.length > 0 && (
                          <div className="flex gap-1 flex-wrap mt-2">
                            {event.tags.map(tagName => {
                              const tag = tags.find(t => t.name === tagName);
                              return (
                                <Badge
                                  key={tagName}
                                  variant="outline"
                                  className="text-[10px] px-1 py-0"
                                  style={{
                                    borderColor: tag?.color,
                                    color: tag?.color
                                  }}
                                >
                                  {tagName}
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          selectedDate={selectedDate}
          tags={tags}
          language={language}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
            setSelectedDate(null);
          }}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onTagsUpdate={(newTags) => {
            setTags(newTags);
            fetchTags();
          }}
        />
      )}
    </div>
  );
}