import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ChatMessage } from './ChatMessage';
import { EmptyState } from './EmptyState';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Com base nos seus materiais de estudo, posso te ajudar com isso. ${userMessage.includes('resuma') || userMessage.includes('Resuma') ? 'Aqui está um resumo dos principais pontos:\n\n1. Princípios fundamentais da Constituição\n2. Direitos e garantias individuais\n3. Organização do Estado brasileiro\n4. Estrutura dos Poderes\n\nGostaria que eu aprofundasse algum desses tópicos?' : userMessage.includes('questões') || userMessage.includes('Gere') ? 'Vou criar algumas questões baseadas no seu material:\n\n**Questão 1:** Sobre os princípios constitucionais, qual das alternativas está correta?\n\n**Questão 2:** Em relação aos direitos fundamentais, assinale a opção correta.\n\nQuer que eu gere o gabarito comentado?' : userMessage.includes('plano') ? 'Aqui está um plano de estudos sugerido:\n\n**Semana 1-2:** Direito Constitucional (4h/dia)\n**Semana 3-4:** Direito Administrativo (4h/dia)\n**Semana 5-6:** Português e Redação (3h/dia)\n**Diariamente:** Resolução de questões (1h)\n\nPosso ajustar esse plano às suas necessidades!' : 'Vou te explicar esse conceito de forma clara e objetiva, usando exemplos práticos dos seus materiais de estudo. Você gostaria de mais detalhes sobre algum aspecto específico?'}`,
      ];
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responses[0]
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (text: string) => {
    setInputValue(text);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && (
              <div className="flex gap-4 p-4 bg-blue-50">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-500">Pensando...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Faça uma pergunta sobre seus materiais..."
                className="min-h-[60px] max-h-[200px] resize-none pr-12"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-[60px] px-6"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            ConcursoAI pode cometer erros. Verifique informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
