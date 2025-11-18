import { useState } from 'react';
import { ArrowRight, Check, Search, MessageSquare, Brain, BookOpen } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

interface WelcomeTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeTour({ isOpen, onClose }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Search,
      title: 'Busque Editais',
      description: 'Encontre milhares de concursos públicos atualizados. Filtre por cargo, localização, salário e muito mais.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'IA Personalizada',
      description: 'Nossa IA analisa editais, cria planos de estudo personalizados e gera questões baseadas no seu desempenho.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageSquare,
      title: 'Chat por Edital',
      description: 'Abra qualquer edital com a IA. Tire dúvidas, crie planos de estudo personalizados e gere questões específicas.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Organize seus Estudos',
      description: 'Acompanhe seu progresso, receba notificações de prazos e otimize seu tempo focando nos temas que mais caem.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <div className="pt-6 pb-2">
          <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-center text-gray-900 mb-2">{step.title}</h2>
          <p className="text-center text-gray-600 mb-6">
            {step.description}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-blue-600'
                    : index < currentStep
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1"
              >
                Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`flex-1 bg-gradient-to-r ${step.color} hover:opacity-90`}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Começar
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
