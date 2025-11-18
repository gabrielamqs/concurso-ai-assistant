import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: typeof Zap;
  color: string;
  buttonText: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Para começar seus estudos",
    icon: Zap,
    color: "from-gray-500 to-gray-600",
    buttonText: "Plano Atual",
    features: [
      "Busca de editais limitada",
      "10 questões por dia",
      "1 plano de estudo ativo",
      "Chat com IA (limitado)",
      "Notificações básicas",
    ],
  },
  {
    name: "Premium",
    price: "R$ 29,90",
    period: "/mês",
    description: "Para estudantes dedicados",
    icon: Crown,
    color: "from-blue-600 to-green-600",
    buttonText: "Assinar Premium",
    popular: true,
    features: [
      "Busca ilimitada de editais",
      "Questões ilimitadas",
      "Planos de estudo ilimitados",
      "Chat com IA ilimitado",
      "Upload de PDFs e materiais",
      "Análise de desempenho detalhada",
      "Simulados personalizados",
      "Notificações de prazos",
      "Suporte prioritário",
    ],
  },
  {
    name: "Pro",
    price: "R$ 49,90",
    period: "/mês",
    description: "Para concurseiros profissionais",
    icon: Sparkles,
    color: "from-purple-600 to-pink-600",
    buttonText: "Assinar Pro",
    features: [
      "Tudo do Premium",
      "IA avançada com GPT-4",
      "Análise preditiva de bancas",
      "Mentoria por IA",
      "Grupo exclusivo de estudos",
      "Webinars mensais",
      "Materiais exclusivos",
      "Garantia de aprovação*",
      "Acesso vitalício a conteúdos",
    ],
  },
];

export function PricingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-gray-900 mb-3">
          Escolha o plano ideal para sua aprovação
        </h2>
        <p className="text-gray-600">
          Acelere seus estudos com recursos exclusivos e IA
          personalizada. Cancele quando quiser.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`p-6 relative ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-xl scale-105"
                  : "border border-gray-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
                  Mais Popular
                </Badge>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                  >
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} hover:opacity-90`
                    : plan.name === "Gratuito"
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                }`}
                disabled={plan.name === "Gratuito"}
              >
                {plan.buttonText}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto pt-8 border-t border-gray-200">
        <h3 className="text-gray-900 mb-4 text-center">
          Perguntas Frequentes
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-gray-900 mb-2">
              Como funciona a garantia de aprovação?
            </h4>
            <p className="text-sm text-gray-600">
              No plano Pro, se você seguir o plano de estudos
              recomendado e não for aprovado em 12 meses,
              renovamos sua assinatura gratuitamente por mais 6
              meses.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-gray-900 mb-2">
              Posso cancelar a qualquer momento?
            </h4>
            <p className="text-sm text-gray-600">
              Sim! Você pode cancelar sua assinatura a qualquer
              momento. Não há multas ou taxas de cancelamento.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-gray-900 mb-2">
              Quais formas de pagamento são aceitas?
            </h4>
            <p className="text-sm text-gray-600">
              Aceitamos cartão de crédito, PIX e boleto
              bancário. O pagamento é processado de forma
              segura.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-4">
          Mais de 50.000 estudantes confiam no ConcursoAI
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>Sem Fidelidade</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span>Suporte 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}