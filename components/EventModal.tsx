import { useState, useEffect } from 'react';
import { X, Trash2, Plus, Tag as TagIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
  repeat: 'never' | 'daily' | 'weekly' | 'monthly';
  alert: 'none' | '15min' | '1hour' | '1day';
  color: string;
  tags: string[];
}

interface CalendarTag {
  name: string;
  color: string;
}

interface EventModalProps {
  event: CalendarEvent | null;
  selectedDate?: string | null;
  tags: CalendarTag[];
  language: 'pt' | 'en';
  onClose: () => void;
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete: (eventId: string) => void;
  onTagsUpdate: (tags: CalendarTag[]) => void;
}

export default function EventModal({ event, selectedDate, tags, language, onClose, onSave, onDelete, onTagsUpdate }: EventModalProps) {
  const [tab, setTab] = useState<'event' | 'reminder'>('event');
  const [title, setTitle] = useState(event?.title || '');
  const [location, setLocation] = useState(event?.location || '');
  const [allDay, setAllDay] = useState(event?.allDay || false);
  
  // Use selectedDate if provided, otherwise use event date or current date
  const getInitialStartDate = () => {
    if (event?.startDate) {
      return new Date(event.startDate).toISOString().slice(0, 16);
    }
    if (selectedDate) {
      return `${selectedDate}T09:00`;
    }
    return new Date().toISOString().slice(0, 16);
  };
  
  const getInitialEndDate = () => {
    if (event?.endDate) {
      return new Date(event.endDate).toISOString().slice(0, 16);
    }
    if (selectedDate) {
      return `${selectedDate}T10:00`;
    }
    return new Date(Date.now() + 3600000).toISOString().slice(0, 16);
  };
  
  const [startDate, setStartDate] = useState(getInitialStartDate());
  const [endDate, setEndDate] = useState(getInitialEndDate());
  const [repeat, setRepeat] = useState<'never' | 'daily' | 'weekly' | 'monthly'>(event?.repeat || 'never');
  const [alert, setAlert] = useState<'none' | '15min' | '1hour' | '1day'>(event?.alert || 'none');
  const [color, setColor] = useState(event?.color || '#2563eb');
  const [selectedTags, setSelectedTags] = useState<string[]>(event?.tags || []);
  const [showTagManager, setShowTagManager] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3b82f6');

  const translations = {
    pt: {
      event: 'Evento',
      reminder: 'Lembrete',
      title: 'Título',
      location: 'Localização',
      allDay: 'Todo o dia',
      starts: 'Início',
      ends: 'Fim',
      repeat: 'Repetir',
      alert: 'Alerta',
      color: 'Cor',
      tags: 'Tags',
      save: 'Guardar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      manageTags: 'Gerir Tags',
      newTag: 'Nova Tag',
      addTag: 'Adicionar',
      repeatOptions: {
        never: 'Nunca',
        daily: 'Diariamente',
        weekly: 'Semanalmente',
        monthly: 'Mensalmente'
      },
      alertOptions: {
        none: 'Nenhum',
        '15min': '15 minutos antes',
        '1hour': '1 hora antes',
        '1day': '1 dia antes'
      }
    },
    en: {
      event: 'Event',
      reminder: 'Reminder',
      title: 'Title',
      location: 'Location',
      allDay: 'All day',
      starts: 'Starts',
      ends: 'Ends',
      repeat: 'Repeat',
      alert: 'Alert',
      color: 'Color',
      tags: 'Tags',
      save: 'Save',
      delete: 'Delete',
      cancel: 'Cancel',
      manageTags: 'Manage Tags',
      newTag: 'New Tag',
      addTag: 'Add',
      repeatOptions: {
        never: 'Never',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly'
      },
      alertOptions: {
        none: 'None',
        '15min': '15 minutes before',
        '1hour': '1 hour before',
        '1day': '1 day before'
      }
    }
  };

  const t = translations[language];

  const predefinedColors = [
    '#2563eb', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
  ];

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title,
      location,
      allDay,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      repeat,
      alert,
      color,
      tags: selectedTags
    });
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    const newTag: CalendarTag = {
      name: newTagName.trim(),
      color: newTagColor
    };

    const updatedTags = [...tags, newTag];
    
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/tags`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tags: updatedTags })
        }
      );

      if (response.ok) {
        onTagsUpdate(updatedTags);
        setNewTagName('');
        setNewTagColor('#3b82f6');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const handleDeleteTag = async (tagName: string) => {
    const updatedTags = tags.filter(t => t.name !== tagName);
    
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-12d56551/tags`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ tags: updatedTags })
        }
      );

      if (response.ok) {
        onTagsUpdate(updatedTags);
        // Remove tag from selected tags
        setSelectedTags(prev => prev.filter(t => t !== tagName));
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-semibold text-[#0f172a]">
              {event ? t.event : t.event}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex">
            <button
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'event'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setTab('event')}
            >
              {t.event}
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'reminder'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setTab('reminder')}
            >
              {t.reminder}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tab === 'event' ? (
            <>
              {/* Title */}
              <div>
                <Label htmlFor="title">{t.title}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={language === 'pt' ? 'Reunião com cliente' : 'Client meeting'}
                  className="mt-1"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">{t.location}</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={language === 'pt' ? 'Zoom, Escritório, etc.' : 'Zoom, Office, etc.'}
                  className="mt-1"
                />
              </div>

              {/* All Day */}
              <div className="flex items-center justify-between">
                <Label htmlFor="allDay">{t.allDay}</Label>
                <Switch
                  id="allDay"
                  checked={allDay}
                  onCheckedChange={setAllDay}
                />
              </div>

              {/* Start Date/Time */}
              <div>
                <Label htmlFor="startDate">{t.starts}</Label>
                <Input
                  id="startDate"
                  type={allDay ? 'date' : 'datetime-local'}
                  value={allDay ? startDate.slice(0, 10) : startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* End Date/Time */}
              <div>
                <Label htmlFor="endDate">{t.ends}</Label>
                <Input
                  id="endDate"
                  type={allDay ? 'date' : 'datetime-local'}
                  value={allDay ? endDate.slice(0, 10) : endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Repeat */}
              <div>
                <Label htmlFor="repeat">{t.repeat}</Label>
                <Select value={repeat} onValueChange={(value: any) => setRepeat(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">{t.repeatOptions.never}</SelectItem>
                    <SelectItem value="daily">{t.repeatOptions.daily}</SelectItem>
                    <SelectItem value="weekly">{t.repeatOptions.weekly}</SelectItem>
                    <SelectItem value="monthly">{t.repeatOptions.monthly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color */}
              <div>
                <Label>{t.color}</Label>
                <div className="flex gap-3 mt-2">
                  {predefinedColors.map(c => (
                    <button
                      key={c}
                      className={`w-12 h-12 rounded-full transition-all ${
                        color === c ? 'ring-2 ring-offset-2 ring-blue-400 scale-110' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Alert */}
              <div>
                <Label htmlFor="alert">{t.alert}</Label>
                <Select value={alert} onValueChange={(value: any) => setAlert(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t.alertOptions.none}</SelectItem>
                    <SelectItem value="15min">{t.alertOptions['15min']}</SelectItem>
                    <SelectItem value="1hour">{t.alertOptions['1hour']}</SelectItem>
                    <SelectItem value="1day">{t.alertOptions['1day']}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                {language === 'pt' 
                  ? '💡 As notificações aparecerão no seu navegador na hora configurada. Certifique-se de que permitiu notificações para este site.'
                  : '💡 Notifications will appear in your browser at the configured time. Make sure you have enabled notifications for this site.'}
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 flex gap-3">
          {event && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (confirm(language === 'pt' ? 'Eliminar este evento?' : 'Delete this event?')) {
                  onDelete(event.id);
                }
              }}
              className="mr-auto"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {t.delete}
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="flex-1">
            {t.cancel}
          </Button>
          <Button onClick={handleSave} className="flex-1">
            {t.save}
          </Button>
        </div>
      </div>
    </div>
  );
}