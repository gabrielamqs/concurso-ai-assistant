import { TrendingUp, AlertCircle, CheckCircle2, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface Topic {
  name: string;
  frequency: number;
  yourProgress: number;
  priority: 'high' | 'medium' | 'low';
}

const mockTopics: Topic[] = [
  { name: 'Direito Constitucional', frequency: 85, yourProgress: 70, priority: 'high' },
  { name: 'Direito Administrativo', frequency: 78, yourProgress: 45, priority: 'high' },
  { name: 'Português - Interpretação', frequency: 92, yourProgress: 80, priority: 'medium' },
  { name: 'Raciocínio Lógico', frequency: 68, yourProgress: 35, priority: 'high' },
  { name: 'Informática', frequency: 55, yourProgress: 90, priority: 'low' },
];

export function TopicsInsights() {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <Target className="w-4 h-4 text-orange-600" />;
      case 'low':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Prioridade Alta';
      case 'medium':
        return 'Atenção';
      case 'low':
        return 'Manter';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-gray-900">Temas que Mais Caem</h3>
          <p className="text-sm text-gray-600">Otimize seu tempo de estudo</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockTopics.map((topic, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-gray-900">{topic.name}</p>
                  <Badge variant="outline" className={getPriorityColor(topic.priority)}>
                    {getPriorityIcon(topic.priority)}
                    <span className="ml-1 text-xs">{getPriorityLabel(topic.priority)}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">Cai {topic.frequency}% das vezes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">Seu domínio: {topic.yourProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={topic.yourProgress} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
