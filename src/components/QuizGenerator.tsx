import { Brain, ChevronRight, FileQuestion, Sparkles, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface QuizSuggestion {
  title: string;
  description: string;
  questions: number;
  difficulty: 'fácil' | 'médio' | 'difícil';
  basedOn: string;
}

const mockSuggestions: QuizSuggestion[] = [
  {
    title: 'Simulado Direito Constitucional',
    description: 'Baseado nas suas áreas de menor domínio',
    questions: 20,
    difficulty: 'médio',
    basedOn: 'Seu desempenho recente'
  },
  {
    title: 'Questões CESPE - Português',
    description: 'Focado em interpretação de texto',
    questions: 15,
    difficulty: 'difícil',
    basedOn: 'Banco de questões carregado'
  },
  {
    title: 'Revisão Direito Administrativo',
    description: 'Temas que mais caem em concursos',
    questions: 25,
    difficulty: 'médio',
    basedOn: 'Análise de frequência'
  }
];

export function QuizGenerator() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'médio':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'difícil':
        return 'bg-red-100 text-red-700 border-red-300';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-5 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">Simulados Personalizados</h3>
            <p className="text-gray-600 mb-4">
              A IA analisa seu desempenho e cria questões focadas nas suas dificuldades
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Brain className="w-4 h-4 mr-2" />
              Gerar Novo Simulado
            </Button>
          </div>
        </div>
      </Card>

      <div>
        <h4 className="text-gray-900 mb-3">Sugestões Personalizadas</h4>
        <div className="space-y-3">
          {mockSuggestions.map((suggestion, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileQuestion className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h5 className="text-gray-900 mb-1">{suggestion.title}</h5>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.questions} questões
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(suggestion.difficulty)}`}>
                      {suggestion.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Target className="w-3 h-3" />
                      <span>{suggestion.basedOn}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-gray-900">Seu Progresso em Questões</h5>
          <span className="text-sm text-gray-600">Esta semana</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Questões resolvidas</span>
              <span className="text-gray-900">156 / 200</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl text-green-600">78%</p>
              <p className="text-xs text-gray-600">Taxa de acerto</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-2xl text-blue-600">12</p>
              <p className="text-xs text-gray-600">Simulados feitos</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-2xl text-purple-600">+5%</p>
              <p className="text-xs text-gray-600">Evolução</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
