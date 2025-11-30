import { GoogleGenerativeAI } from '@google/generative-ai';

// Interface para as informações do edital
export interface EditalInfo {
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
}

// Classe para gerenciar as chamadas da API Gemini
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  // Cria o contexto específico para cada edital
  private createEditalContext(edital: EditalInfo): string {
    // Define matérias típicas baseadas no tipo de edital
    const typicalSubjects = this.getTypicalSubjects(edital);

    return `
Você é um assistente especialista em concursos públicos, especificamente para o edital: "${edital.title}".

INFORMAÇÕES DO EDITAL:
- Órgão: ${edital.organization}
- Localização: ${edital.location}
- Vagas: ${edital.vacancies}
- Salário: ${edital.salary}
- Prazo de inscrição: ${edital.inscriptionDeadline}
- Data da prova: ${edital.examDate}
- Status: ${edital.status}
- Nível: ${edital.level}

MATERIAIS DE ESTUDO TÍPICOS PARA ESTE EDITAL:
${typicalSubjects}

REQUISITOS GERAIS:
- Ensino ${edital.level} completo
- Idade mínima: 18 anos
- Nacionalidade brasileira ou naturalização
- Não ter sido condenado por crime doloso

SUA MISSÃO:
Você deve ajudar o candidato a se preparar especificamente para este concurso, oferecendo:
1. Análise detalhada do edital e seus requisitos
2. Planos de estudo personalizados baseados nas matérias acima
3. Geração de questões e simulados sobre as matérias relevantes
4. Estratégias de estudo e dicas específicas para este concurso
5. Interpretação de pontos específicos do edital
6. Cronogramas de preparação considerando as datas importantes

IMPORTANTE:
- Sempre considere que você JÁ TEM acesso às informações completas deste edital
- Foque nas matérias específicas listadas acima
- Seja específico sobre pesos e conteúdos relevantes para ${edital.level}
- Considere o perfil do candidato e o tempo até a prova (${edital.examDate})
- Mantenha um tom profissional, motivador e didático
- Quando gerar questões, elas devem ser compatíveis com o nível ${edital.level}
- Use português brasileiro formal

VOCÊ JÁ CONHECE TODAS AS INFORMAÇÕES DESTE EDITAL ACIMA. NÃO PEÇA PARA O USUÁRIO FORNECER O EDITAL.

RESPONDA SEMPRE EM PORTUGUÊS BRASILEIRO.
`;
  }

  // Define matérias típicas baseadas no edital
  private getTypicalSubjects(edital: EditalInfo): string {
    const subjects: Record<string, string[]> = {
      'Analista Judiciário': [
        'Direito Constitucional (25% - Alta prioridade)',
        'Direito Administrativo (20% - Alta prioridade)',
        'Direito Processual Civil (15% - Alta prioridade)',
        'Direito do Trabalho (15% - Alta prioridade)',
        'Direito Previdenciário (10% - Média prioridade)',
        'Português (8% - Média prioridade)',
        'Raciocínio Lógico (4% - Baixa prioridade)',
        'Noções de Informática (3% - Baixa prioridade)'
      ],
      'Auditor Fiscal': [
        'Direito Tributário (25% - Alta prioridade)',
        'Direito Constitucional (20% - Alta prioridade)',
        'Direito Administrativo (20% - Alta prioridade)',
        'Contabilidade Geral (15% - Alta prioridade)',
        'Economia (10% - Média prioridade)',
        'Matemática Financeira (5% - Média prioridade)',
        'Português (3% - Baixa prioridade)',
        'Raciocínio Lógico (2% - Baixa prioridade)'
      ],
      'Técnico Administrativo': [
        'Português (25% - Alta prioridade)',
        'Matemática (20% - Alta prioridade)',
        'Conhecimentos Gerais (15% - Alta prioridade)',
        'Noções de Direito Administrativo (15% - Média prioridade)',
        'Noções de Informática (15% - Média prioridade)',
        'Raciocínio Lógico (10% - Média prioridade)'
      ],
      'Analista do Banco Central': [
        'Economia (25% - Alta prioridade)',
        'Direito Constitucional (20% - Alta prioridade)',
        'Direito Administrativo (15% - Alta prioridade)',
        'Matemática (15% - Alta prioridade)',
        'Estatística (10% - Média prioridade)',
        'Português (8% - Média prioridade)',
        'Inglês (5% - Baixa prioridade)',
        'Raciocínio Lógico (2% - Baixa prioridade)'
      ],
      'Agente da Polícia Federal': [
        'Direito Constitucional (20% - Alta prioridade)',
        'Direito Administrativo (18% - Alta prioridade)',
        'Direito Penal (15% - Alta prioridade)',
        'Direito Processual Penal (12% - Alta prioridade)',
        'Português (10% - Média prioridade)',
        'Raciocínio Lógico (8% - Média prioridade)',
        'Noções de Informática (7% - Média prioridade)',
        'Conhecimentos Gerais (5% - Baixa prioridade)',
        'Legislação Especial (5% - Baixa prioridade)'
      ]
    };

    // Tenta encontrar matérias específicas baseadas no título
    for (const [key, value] of Object.entries(subjects)) {
      if (edital.title.includes(key)) {
        return value.map(subject => `• ${subject}`).join('\n');
      }
    }

    // Fallback baseado no nível
    if (edital.level === 'Superior') {
      return `• Direito Constitucional (25% - Alta prioridade)
• Direito Administrativo (20% - Alta prioridade)
• Português (15% - Média prioridade)
• Raciocínio Lógico (10% - Média prioridade)
• Conhecimentos Específicos da Área (20% - Alta prioridade)
• Noções de Informática (5% - Baixa prioridade)
• Legislação Especial (5% - Baixa prioridade)`;
    } else {
      return `• Português (25% - Alta prioridade)
• Matemática (20% - Alta prioridade)
• Conhecimentos Gerais (15% - Alta prioridade)
• Noções de Direito Administrativo (15% - Média prioridade)
• Noções de Informática (15% - Média prioridade)
• Raciocínio Lógico (10% - Média prioridade)`;
    }
  }

  // Método principal para enviar mensagens
  async sendMessage(message: string, edital: EditalInfo, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    try {
      // Cria o contexto do edital
      const context = this.createEditalContext(edital);

      // Prepara o histórico da conversa para o formato da API
      // Filtra e garante que o histórico começa com uma mensagem do usuário
      let history = conversationHistory
        .filter(msg => msg.content.trim() !== '') // Remove mensagens vazias
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

      // Se o histórico não começa com 'user', encontra a primeira mensagem do usuário
      if (history.length > 0 && history[0].role !== 'user') {
        const firstUserIndex = history.findIndex(msg => msg.role === 'user');
        if (firstUserIndex !== -1) {
          history = history.slice(firstUserIndex);
        } else {
          // Se não há mensagem do usuário, limpa o histórico
          history = [];
        }
      }

      // Inicia o chat com o histórico
      const chat = this.model.startChat({
        history: history,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      });

      // Cria o prompt com contexto
      let prompt: string;
      if (history.length === 0) {
        // Primeira mensagem: inclui contexto completo
        prompt = `${context}\n\nMensagem do usuário: ${message}`;
      } else {
        // Mensagens subsequentes: inclui lembrete contextual
        const contextReminder = `Lembre-se: você está ajudando com o edital "${edital.title}" do ${edital.organization} (${edital.vacancies} vagas, salário de ${edital.salary}).\n\n`;
        prompt = `${contextReminder}Mensagem do usuário: ${message}`;
      }

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro na chamada da API Gemini:', error);

      // Verifica se é erro de autenticação
      if (error instanceof Error && (error.message.includes('API_KEY') || error.message.includes('401'))) {
        throw new Error('Chave da API inválida ou expirada. Verifique sua chave no Google AI Studio e certifique-se de que ela tem permissões para usar o Gemini API.');
      }

      // Verifica se é erro de quota
      if (error instanceof Error && error.message.includes('429')) {
        throw new Error('Limite de uso da API atingido. Tente novamente em alguns minutos ou considere fazer upgrade do plano.');
      }

      // Verifica se é erro de quota excedida
      if (error instanceof Error && error.message.includes('quota')) {
        throw new Error('Cota da API esgotada. Aguarde alguns minutos ou verifique seu plano de uso.');
      }

      // Verifica se é erro de modelo não encontrado
      if (error instanceof Error && error.message.includes('404') && error.message.includes('not found')) {
        throw new Error('Modelo da IA não encontrado. Verifique se sua chave da API tem acesso aos modelos Gemini e se a API está habilitada no Google Cloud Console.');
      }

      // Verifica se é erro de rede
      if (error instanceof Error && error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique sua conexão com a internet e tente novamente.');
      }

      throw new Error('Erro ao conectar com a IA. Verifique sua conexão e tente novamente.');
    }
  }

  // Método para gerar plano de estudos personalizado
  async generateStudyPlan(edital: EditalInfo, userPreferences?: string): Promise<string> {
    const prompt = `
Com base no edital "${edital.title}" para ${edital.organization}, crie um plano de estudos personalizado.

INFORMAÇÕES DO EDITAL:
- Nível: ${edital.level}
- Data da prova: ${edital.examDate}
- Status: ${edital.status}

${userPreferences ? `PREFERÊNCIAS DO USUÁRIO: ${userPreferences}` : ''}

Crie um plano de estudos detalhado incluindo:
1. Principais matérias e seus pesos aproximados
2. Cronograma semanal sugerido
3. Estratégias específicas para este concurso
4. Dicas de estudo e materiais recomendados
5. Pontos de atenção específicos deste edital

Formate a resposta de forma clara e organizada.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro ao gerar plano de estudos:', error);
      throw new Error('Erro ao gerar plano de estudos. Tente novamente.');
    }
  }

  // Método para gerar questões do edital
  async generateQuestions(edital: EditalInfo, subject?: string, quantity: number = 5): Promise<string> {
    const subjectText = subject ? ` sobre ${subject}` : ' sobre as principais matérias';

    const prompt = `
Para o edital "${edital.title}" (${edital.organization}), gere ${quantity} questões de múltipla escolha${subjectText}.

INFORMAÇÕES DO EDITAL:
- Nível: ${edital.level}
- Data da prova: ${edital.examDate}

REQUISITOS DAS QUESTÕES:
1. Devem ser realistas e pertinentes ao concurso
2. Nível de dificuldade adequado para ${edital.level}
3. 4 alternativas cada (A, B, C, D)
4. Gabarito comentado ao final
5. Foque em conteúdos relevantes para este tipo de concurso

Formate cada questão claramente, numeradas, e coloque o gabarito separado ao final.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Erro ao gerar questões:', error);
      throw new Error('Erro ao gerar questões. Tente novamente.');
    }
  }
}

// Instância singleton do serviço
let geminiService: GeminiService | null = null;

// Função para obter a instância do serviço
export function getGeminiService(): GeminiService {
  if (!geminiService) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      throw new Error(
        'Chave da API do Google Gemini não configurada.\n\n' +
        'Para usar o ConcursoAI, você precisa:\n' +
        '1. Obter uma chave da API em: https://makersuite.google.com/app/apikey\n' +
        '2. Criar um arquivo .env.local na raiz do projeto\n' +
        '3. Adicionar: VITE_GEMINI_API_KEY=sua_chave_aqui\n\n' +
        'Após configurar, recarregue a página.'
      );
    }
    geminiService = new GeminiService(apiKey);
  }
  return geminiService;
}
