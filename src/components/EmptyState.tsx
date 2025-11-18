import { MessageSquare, Sparkles, Brain, Target } from 'lucide-react';
import logoImage from '../assets/logo.png';

interface EmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  const suggestions = [
    {
      icon: Brain,
      text: 'Quais os temas mais importantes para TRT?',
      color: 'blue'
    },
    {
      icon: Target,
      text: 'Crie um plano de estudos de 3 meses',
      color: 'green'
    },
    {
      icon: MessageSquare,
      text: 'Explique como funciona o edital do INSS',
      color: 'blue'
    },
    {
      icon: Sparkles,
      text: 'Gere 10 questões de Direito Constitucional',
      color: 'green'
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <img src={logoImage} alt="ConcursoAI" className="w-24 h-24 mx-auto mb-6" />
        <h2 className="text-gray-900 mb-2">Bem-vindo ao ConcursoAI</h2>
        <p className="text-gray-600 mb-8">
          Seu assistente inteligente para estudar para concursos públicos. 
          Adicione seus materiais e comece a conversar para tirar dúvidas, 
          gerar resumos e criar planos de estudo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion.text)}
                className={`p-4 border-2 rounded-xl hover:shadow-md transition-all text-left group ${
                  suggestion.color === 'blue' 
                    ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' 
                    : 'border-green-200 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${
                  suggestion.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                }`} />
                <p className="text-gray-700 text-sm">{suggestion.text}</p>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>IA Avançada</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Respostas Precisas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
