import {
  ArrowRight,
  CheckCircle,
  Brain,
  Target,
  TrendingUp,
  Bell,
  MessageSquare,
  Sparkles,
  BookOpen,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import logoImage  from '../assets/logo.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({
  onGetStarted,
}: LandingPageProps) {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description:
        "Assistente inteligente que analisa seu desempenho e cria estratégias de estudo sob medida.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Target,
      title: "Planos de Estudo",
      description:
        "Cronogramas personalizados baseados no edital, seu tempo disponível e seu nível.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Análise Inteligente",
      description:
        "Identifica os temas que mais caem e otimiza seu tempo de estudo.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Bell,
      title: "Alertas de Prazos",
      description:
        "Nunca perca um prazo de inscrição com notificações automáticas.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: MessageSquare,
      title: "Chat com Editais",
      description:
        "Converse com a IA sobre qualquer edital e tire suas dúvidas.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Sparkles,
      title: "Questões Personalizadas",
      description:
        "Simulados gerados com base nas suas dificuldades e no edital.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Busque seu Edital",
      description:
        "Encontre milhares de concursos atualizados com filtros inteligentes.",
      icon: BookOpen,
    },
    {
      step: "2",
      title: "Abra com a IA",
      description:
        'Clique em "Abrir com ConcursoAI" e converse sobre o edital.',
      icon: MessageSquare,
    },
    {
      step: "3",
      title: "Crie seu Plano",
      description:
        "A IA gera um plano de estudos personalizado para você.",
      icon: Calendar,
    },
    {
      step: "4",
      title: "Estude e Evolua",
      description:
        "Pratique com questões, acompanhe seu progresso e conquiste sua aprovação.",
      icon: Award,
    },
  ];

  const benefits = [
    "Economize tempo focando no que realmente importa",
    "Aumente sua taxa de aprovação com estudo direcionado",
    "Não perca mais prazos de inscrições",
    "Acesse milhares de questões e simulados",
    "Acompanhe sua evolução em tempo real",
    "Suporte de IA 24/7 para suas dúvidas",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="ConcursoAI"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-gray-900">ConcursoAI</h1>
              <p className="text-xs text-gray-500">
                Inteligência Artificial para Concursos
              </p>
            </div>
          </div>
          <Button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Começar Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200 mb-6">
            <img
              src={logoImage}
              alt="ConcursoAI"
              className="w- h-20"
            />
          </div>

          <h2 className="text-gray-900 mb-6">
            Sua Aprovação em Concursos Públicos Começa Aqui
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Prepare-se para concursos com a ajuda de
            Inteligência Artificial. Planos personalizados,
            questões adaptativas e análise inteligente dos temas
            que mais caem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8"
            >
              Começar Gratuitamente
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
            >
              Ver Como Funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-gray-900 mb-4">
              Recursos que Fazem a Diferença
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tecnologia de ponta para maximizar suas chances de
              aprovação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-gray-900 mb-4">
              Como Funciona
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Em 4 passos simples, você está no caminho da
              aprovação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <Icon className="w-8 h-8 text-blue-600" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white">
                          {step.step}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-gray-900 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-green-200 to-blue-200"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-gray-900 mb-4">
                Por Que Escolher o ConcursoAI?
              </h3>
              <p className="text-gray-600 mb-8">
                Mais do que uma plataforma de estudos, somos seu
                parceiro na jornada rumo à aprovação. Nossa IA
                trabalha 24/7 para garantir que você estude de
                forma inteligente, não apenas mais.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 bg-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        IA Avançada
                      </p>
                      <p className="text-sm text-gray-600">
                        Análise preditiva de desempenho
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        Foco no Resultado
                      </p>
                      <p className="text-sm text-gray-600">
                        Estude apenas o necessário
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900">
                        Conteúdo Personalizado
                      </p>
                      <p className="text-sm text-gray-600">
                        Adaptado ao seu nível
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
            <h3 className="mb-4">
              Pronto Para Transformar Seus Estudos?
            </h3>
            <p className="text-xl mb-8 text-green-50">
              Junte-se a milhares de concurseiros que já estão
              usando IA para acelerar sua aprovação.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
            >
              Começar Agora - É Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-green-100 mt-4">
              Sem cartão de crédito. Comece em menos de 1
              minuto.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={logoImage}
                alt="ConcursoAI"
                className="w-6 h-6"
              />
              <span className="text-gray-600">
                © 2024 ConcursoAI. Todos os direitos
                reservados.
              </span>
            </div>
            <div className="flex gap-6 text-gray-600">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
              >
                Sobre
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
              >
                Privacidade
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
              >
                Termos
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}