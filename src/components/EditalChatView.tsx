import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ArrowLeft, FileText, Target, Sparkles, X, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ChatMessage } from './ChatMessage';
import { EditalViewer } from './EditalViewer';
import { Sidebar } from './Sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'questoes';
  pages?: number;
}

interface EditalChatViewProps {
  edital: {
    id: string;
    title: string;
    organization: string;
    location: string;
    vacancies: number;
    salary: string;
    inscriptionDeadline: string;
    examDate: string;
    status: 'aberto' | 'previsto' | 'encerrado';
    level: string;
  };
  onBack: () => void;
}

export function EditalChatView({ edital, onBack }: EditalChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Olá! Estou aqui para te ajudar com o edital de **${edital.title}**.\n\nPosso te ajudar a:\n• Entender os requisitos e conteúdo do edital\n• Criar um plano de estudos personalizado\n• Gerar questões e simulados\n• Analisar os temas mais importantes\n\nO que você gostaria de fazer?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editalViewOpen, setEditalViewOpen] = useState(false);
  const [editalSheetOpen, setEditalSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: '', type: 'pdf' as const });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRemoveMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const handleAddMaterial = () => {
    setDialogOpen(true);
  };

  const handleSaveMaterial = () => {
    if (newMaterial.title.trim()) {
      const material: Material = {
        id: Date.now().toString(),
        title: newMaterial.title,
        type: newMaterial.type,
        pages: newMaterial.type === 'text' ? undefined : Math.floor(Math.random() * 100) + 20
      };
      setMaterials([...materials, material]);
      setNewMaterial({ title: '', type: 'pdf' });
      setDialogOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        `Com base no edital de **${edital.title}**, ${
          userMessage.toLowerCase().includes('plano') 
            ? `aqui está uma sugestão de plano de estudos:\n\n**Fase 1 (4 semanas)** - Direito Constitucional\n• Princípios fundamentais (1 semana)\n• Direitos e garantias (2 semanas)\n• Organização do Estado (1 semana)\n\n**Fase 2 (4 semanas)** - Direito Administrativo\n• Princípios (1 semana)\n• Atos administrativos (2 semanas)\n• Licitações (1 semana)\n\n**Fase 3 (2 semanas)** - Português e Raciocínio Lógico\n\nQuer que eu detalhe alguma fase específica?`
            : userMessage.toLowerCase().includes('questões') || userMessage.toLowerCase().includes('simulado')
            ? `Vou gerar um simulado personalizado para ${edital.title}:\n\n**Questão 1 (Direito Constitucional):**\nSobre os princípios fundamentais da República Federativa do Brasil, assinale a alternativa correta:\n\na) A soberania é exercida exclusivamente pelo Poder Executivo\nb) A dignidade da pessoa humana é fundamento da República\nc) O pluralismo político não é considerado fundamento\nd) A cidadania não consta na Constituição\n\n**Questão 2 (Direito Administrativo):**\nQuanto aos princípios da Administração Pública...\n\nQuer continuar com mais questões?`
            : userMessage.toLowerCase().includes('matérias') || userMessage.toLowerCase().includes('disciplinas')
            ? `Para o edital de **${edital.title}**, as principais disciplinas são:\n\n**Alta Prioridade (caem muito):**\n• Direito Constitucional - 25% da prova\n• Direito Administrativo - 20% da prova\n\n**Média Prioridade:**\n• Português - 15% da prova\n• Raciocínio Lógico - 15% da prova\n\n**Outras disciplinas:**\n• Informática - 10%\n• Legislação Específica - 15%\n\nRecomendo focar 60% do seu tempo nas disciplinas de alta prioridade!`
            : `Sobre o edital de **${edital.title}**:\n\nO concurso oferece ${edital.vacancies} vagas com remuneração de ${edital.salary}. As inscrições ${edital.status === 'aberto' ? `estão abertas até ${edital.inscriptionDeadline}` : 'ainda serão abertas'}.\n\nÉ um edital para nível ${edital.level} e as provas estão previstas para ${edital.examDate}.\n\nPosso te ajudar a criar um plano de estudos específico para este concurso. Quer que eu faça isso?`
        }`
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
    <div className="flex h-full bg-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - Materiais */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar
          materials={materials}
          onRemoveMaterial={handleRemoveMaterial}
          onAddMaterial={handleAddMaterial}
          onClose={() => setSidebarOpen(false)}
          isMobile={true}
        />
      </aside>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-gray-900 truncate">{edital.title}</h2>
            <p className="text-xs text-gray-500">{edital.organization}</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditalSheetOpen(true)}
            className="md:hidden"
          >
            <FileText className="w-4 h-4 mr-2" />
            Ver Edital
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditalViewOpen(!editalViewOpen)}
            className="hidden md:flex"
          >
            <FileText className="w-4 h-4 mr-2" />
            {editalViewOpen ? 'Ocultar' : 'Ver'} Edital
          </Button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-700">IA Online</span>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="max-w-2xl w-full text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-2">Chat sobre {edital.title}</h3>
                    <p className="text-gray-600 mb-6">
                      Pergunte sobre o edital, crie planos de estudo ou gere questões personalizadas
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleSuggestionClick('Crie um plano de estudos para este edital')}
                        className="p-4 border-2 border-green-200 rounded-xl hover:bg-green-50 hover:border-green-400 transition-all text-left"
                      >
                        <Target className="w-5 h-5 text-green-600 mb-2" />
                        <p className="text-sm text-gray-700">Criar plano de estudos</p>
                      </button>
                      <button
                        onClick={() => handleSuggestionClick('Quais são as principais matérias deste edital?')}
                        className="p-4 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all text-left"
                      >
                        <FileText className="w-5 h-5 text-blue-600 mb-2" />
                        <p className="text-sm text-gray-700">Ver matérias principais</p>
                      </button>
                      <button
                        onClick={() => handleSuggestionClick('Gere questões sobre as matérias deste edital')}
                        className="p-4 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all text-left"
                      >
                        <Sparkles className="w-5 h-5 text-purple-600 mb-2" />
                        <p className="text-sm text-gray-700">Gerar questões</p>
                      </button>
                    </div>
                  </div>
                </div>
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
                        <p className="text-gray-500">Analisando o edital...</p>
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
                      placeholder={`Pergunte sobre ${edital.title}...`}
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

          {/* Edital Viewer - Desktop */}
          {editalViewOpen && (
            <aside className="hidden md:block w-96 border-l border-gray-200">
              <EditalViewer edital={edital} />
            </aside>
          )}
        </div>
      </div>

      {/* Mobile Edital Sheet */}
      <Sheet open={editalSheetOpen} onOpenChange={setEditalSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <div className="h-full">
            <EditalViewer edital={edital} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Material Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Material de Estudo</DialogTitle>
            <DialogDescription>
              Adicione PDFs, textos ou bancos de questões para estudar com a IA.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Material</Label>
              <Input
                id="title"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                placeholder="Ex: Direito Constitucional - Capítulo 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Material</Label>
              <Select
                value={newMaterial.type}
                onValueChange={(value: 'pdf' | 'text' | 'questoes') => 
                  setNewMaterial({ ...newMaterial, type: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="questoes">Banco de Questões</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveMaterial}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Adicionar Material
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
