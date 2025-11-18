import { Calendar, Target, BookOpen, TrendingUp, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface StudyPlanProps {
  id: string;
  title: string;
  edital: string;
  examDate: string;
  progress: number;
  totalSubjects: number;
  completedSubjects: number;
  hoursPerWeek: number;
  daysUntilExam: number;
  editalId?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function StudyPlanCard({
  id,
  title,
  edital,
  examDate,
  progress,
  totalSubjects,
  completedSubjects,
  hoursPerWeek,
  daysUntilExam,
  editalId,
  onDelete,
  onEdit
}: StudyPlanProps) {
  const getUrgencyColor = () => {
    if (daysUntilExam <= 30) return 'text-red-600 bg-red-50';
    if (daysUntilExam <= 60) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const handleContinueStudying = () => {
    if (editalId) {
      window.dispatchEvent(
        new CustomEvent('openEditalChat', { detail: { editalId } })
      );
    }
  };

  const handleDeletePlan = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleEditPlan = () => {
    if (onEdit) {
      onEdit(id);
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{edital}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEditPlan}>Editar Plano</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeletePlan} className="text-red-600">Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Progresso Geral</span>
            <span className="text-gray-900">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Matérias</p>
              <p className="text-sm text-gray-900">{completedSubjects}/{totalSubjects}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Horas/semana</p>
              <p className="text-sm text-gray-900">{hoursPerWeek}h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Prova: {examDate}</span>
        </div>
        <Badge className={getUrgencyColor()}>
          {daysUntilExam} dias
        </Badge>
      </div>

      <Button 
        className="w-full mt-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        onClick={handleContinueStudying}
      >
        Continuar Estudando
      </Button>
    </Card>
  );
}
