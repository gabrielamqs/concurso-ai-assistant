import { Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ScheduleItem {
  day: string;
  date: string;
  tasks: {
    time: string;
    subject: string;
    duration: string;
    completed: boolean;
    type: 'study' | 'practice' | 'review';
  }[];
}

const mockSchedule: ScheduleItem[] = [
  {
    day: 'Segunda',
    date: '04/11',
    tasks: [
      { time: '08:00', subject: 'Direito Constitucional', duration: '2h', completed: true, type: 'study' },
      { time: '14:00', subject: 'Questões de Português', duration: '1h', completed: true, type: 'practice' },
      { time: '19:00', subject: 'Revisão Geral', duration: '1h', completed: false, type: 'review' }
    ]
  },
  {
    day: 'Terça',
    date: '05/11',
    tasks: [
      { time: '08:00', subject: 'Direito Administrativo', duration: '2h', completed: false, type: 'study' },
      { time: '14:00', subject: 'Raciocínio Lógico', duration: '1h30', completed: false, type: 'practice' }
    ]
  },
  {
    day: 'Quarta',
    date: '06/11',
    tasks: [
      { time: '08:00', subject: 'Português - Gramática', duration: '2h', completed: false, type: 'study' },
      { time: '14:00', subject: 'Simulado CESPE', duration: '3h', completed: false, type: 'practice' }
    ]
  }
];

export function StudySchedule() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study':
        return 'bg-blue-100 text-blue-700';
      case 'practice':
        return 'bg-green-100 text-green-700';
      case 'review':
        return 'bg-purple-100 text-purple-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'study':
        return 'Estudo';
      case 'practice':
        return 'Prática';
      case 'review':
        return 'Revisão';
    }
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-gray-900">Cronograma Semanal</h3>
            <p className="text-sm text-gray-600">Organizado pela IA</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Personalizar
        </Button>
      </div>

      <div className="space-y-4">
        {mockSchedule.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${dayIndex === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <p className="text-gray-900">{day.day}</p>
              <p className="text-sm text-gray-500">{day.date}</p>
            </div>
            
            <div className="space-y-2 ml-4 pl-2 border-l-2 border-gray-200">
              {day.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className={`p-3 rounded-lg border transition-colors ${
                    task.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 pt-0.5">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`${task.completed ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                          {task.subject}
                        </p>
                        <Badge variant="outline" className={`text-xs flex-shrink-0 ${getTypeColor(task.type)}`}>
                          {getTypeLabel(task.type)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.time}</span>
                        </div>
                        <span>•</span>
                        <span>{task.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progresso da semana</span>
          <span className="text-gray-900">3 de 8 tarefas concluídas</span>
        </div>
      </div>
    </Card>
  );
}
