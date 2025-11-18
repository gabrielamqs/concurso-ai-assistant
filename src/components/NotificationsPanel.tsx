import { Bell, Calendar, FileText, CheckCircle, Clock, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Notification {
  id: string;
  type: 'deadline' | 'exam' | 'update' | 'achievement';
  title: string;
  message: string;
  time: string;
  read: boolean;
  urgent?: boolean;
}

interface NotificationsPanelProps {
  onClose?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Edital chegando ao fim!',
    message: 'As inscrições para Auditor Fiscal - SEFAZ SP encerram em 2 dias (20/12/2024)',
    time: 'Há 1 hora',
    read: false,
    urgent: true
  },
  {
    id: '2',
    type: 'exam',
    title: 'Simulado agendado',
    message: 'Você tem um simulado de Direito Constitucional agendado para amanhã às 14h',
    time: 'Há 3 horas',
    read: false,
    urgent: false
  },
  {
    id: '3',
    type: 'update',
    title: 'Edital de interesse aberto',
    message: 'Novo edital: Analista Judiciário - TRT 2ª Região está com inscrições abertas',
    time: 'Hoje',
    read: false
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Meta atingida! 🎉',
    message: 'Você completou 20 horas de estudo esta semana',
    time: 'Há 2 dias',
    read: true
  },
  {
    id: '5',
    type: 'deadline',
    title: 'Lembrete de estudo',
    message: 'Continue seu plano de Direito Constitucional',
    time: 'Há 3 dias',
    read: true
  }
];

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Clock className="w-5 h-5" />;
      case 'exam':
        return <Calendar className="w-5 h-5" />;
      case 'update':
        return <FileText className="w-5 h-5" />;
      case 'achievement':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string, urgent?: boolean) => {
    if (urgent) return 'bg-red-100 text-red-600';
    switch (type) {
      case 'deadline':
        return 'bg-orange-100 text-orange-600';
      case 'exam':
        return 'bg-blue-100 text-blue-600';
      case 'update':
        return 'bg-green-100 text-green-600';
      case 'achievement':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Card className="w-full max-w-md">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-700" />
          <h3 className="text-gray-900">Notificações</h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-600 text-white">{unreadCount}</Badge>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-2">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                notification.read 
                  ? 'hover:bg-gray-50' 
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <div className="flex gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type, notification.urgent)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-gray-200">
        <Button variant="ghost" className="w-full text-sm text-blue-600">
          Marcar todas como lidas
        </Button>
      </div>
    </Card>
  );
}
