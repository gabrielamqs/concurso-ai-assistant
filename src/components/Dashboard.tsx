import { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { EditalCard } from './EditalCard';
import { StudyPlanCard } from './StudyPlanCard';
import { PerformanceCard } from './PerformanceCard';
import { TopicsInsights } from './TopicsInsights';
import { QuizGenerator } from './QuizGenerator';
import { StudySchedule } from './StudySchedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Target, Clock, Award, Brain } from 'lucide-react';

interface Edital {
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
  saved?: boolean;
}

interface StudyPlan {
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
}

const mockEditais: Edital[] = [
  {
    id: '1',
    title: 'Analista Judiciário - TRT 2ª Região',
    organization: 'Tribunal Regional do Trabalho',
    location: 'São Paulo - SP',
    vacancies: 25,
    salary: 'R$ 13.994,78',
    inscriptionDeadline: '15/12/2024',
    examDate: '23/02/2025',
    status: 'aberto',
    level: 'Superior'
  },
  {
    id: '2',
    title: 'Auditor Fiscal - SEFAZ SP',
    organization: 'Secretaria da Fazenda do Estado de SP',
    location: 'São Paulo - SP',
    vacancies: 50,
    salary: 'R$ 22.431,53',
    inscriptionDeadline: '20/12/2024',
    examDate: '15/03/2025',
    status: 'aberto',
    level: 'Superior'
  },
  {
    id: '3',
    title: 'Técnico Administrativo - INSS',
    organization: 'Instituto Nacional do Seguro Social',
    location: 'Nacional',
    vacancies: 1000,
    salary: 'R$ 5.905,79',
    inscriptionDeadline: '10/01/2025',
    examDate: '30/03/2025',
    status: 'previsto',
    level: 'Médio'
  },
  {
    id: '4',
    title: 'Analista do Banco Central - BACEN',
    organization: 'Banco Central do Brasil',
    location: 'Nacional',
    vacancies: 150,
    salary: 'R$ 20.924,80',
    inscriptionDeadline: '05/01/2025',
    examDate: '10/03/2025',
    status: 'previsto',
    level: 'Superior'
  },
  {
    id: '5',
    title: 'Agente da Polícia Federal',
    organization: 'Polícia Federal',
    location: 'Nacional',
    vacancies: 500,
    salary: 'R$ 12.522,50',
    inscriptionDeadline: '18/12/2024',
    examDate: '25/02/2025',
    status: 'aberto',
    level: 'Superior'
  },
  {
    id: '6',
    title: 'Técnico Judiciário - TJ SP',
    organization: 'Tribunal de Justiça de São Paulo',
    location: 'São Paulo - SP',
    vacancies: 200,
    salary: 'R$ 7.648,63',
    inscriptionDeadline: '28/12/2024',
    examDate: '20/03/2025',
    status: 'aberto',
    level: 'Médio'
  }
];

const mockStudyPlans: StudyPlan[] = [
  {
    id: '1',
    title: 'Plano TRT 2ª Região',
    edital: 'Analista Judiciário - TRT',
    examDate: '23/02/2025',
    progress: 45,
    totalSubjects: 8,
    completedSubjects: 3,
    hoursPerWeek: 20,
    daysUntilExam: 45,
    editalId: '1'
  },
  {
    id: '2',
    title: 'Preparação SEFAZ SP',
    edital: 'Auditor Fiscal - SEFAZ',
    examDate: '15/03/2025',
    progress: 30,
    totalSubjects: 12,
    completedSubjects: 4,
    hoursPerWeek: 25,
    daysUntilExam: 65,
    editalId: '2'
  },
  {
    id: '3',
    title: 'Estudo Polícia Federal',
    edital: 'Agente da Polícia Federal',
    examDate: '25/02/2025',
    progress: 60,
    totalSubjects: 10,
    completedSubjects: 6,
    hoursPerWeek: 30,
    daysUntilExam: 50,
    editalId: '5'
  }
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studyPlans, setStudyPlans] = useState(mockStudyPlans);
  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
    level: string[];
    location: string[];
  }>({
    status: [],
    level: [],
    location: []
  });

  const handleFilterChange = (filterType: 'status' | 'level' | 'location', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleDeletePlan = (planId: string) => {
    setStudyPlans(prev => prev.filter(plan => plan.id !== planId));
  };

  const handleEditPlan = (planId: string) => {
    console.log('Edit plan:', planId);
    // TODO: Implement edit functionality
  };

  const filteredEditais = mockEditais.filter(edital => {
    const matchesSearch = searchQuery === '' || 
      edital.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      edital.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      edital.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = activeFilters.status.length === 0 || 
      activeFilters.status.includes(edital.status);
    
    const matchesLevel = activeFilters.level.length === 0 || 
      activeFilters.level.includes(edital.level);
    
    const matchesLocation = activeFilters.location.length === 0 || 
      activeFilters.location.some(loc => edital.location.includes(loc));

    return matchesSearch && matchesStatus && matchesLevel && matchesLocation;
  });

  return (
    <div className="space-y-6">
      {/* Performance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PerformanceCard
            title="Questões Resolvidas"
            value="1.247"
            change={12}
            icon="trending"
            color="blue"
          />
          <PerformanceCard
            title="Taxa de Acerto"
            value="78%"
            change={5}
            icon="target"
            color="green"
          />
          <PerformanceCard
            title="Horas de Estudo"
            value="156h"
            change={8}
            icon="trending"
            color="purple"
          />
          <PerformanceCard
            title="Temas Dominados"
            value="24"
            change={15}
            icon="award"
            color="orange"
          />
        </div>

      {/* Tabs */}
      <Tabs defaultValue="editais" className="space-y-4">
        <TabsList>
          <TabsTrigger value="editais" className="gap-2">
            <FileText className="w-4 h-4" />
            Buscar Editais
          </TabsTrigger>
          <TabsTrigger value="planos" className="gap-2">
            <Target className="w-4 h-4" />
            Meus Planos
          </TabsTrigger>
          <TabsTrigger value="questoes" className="gap-2">
            <Brain className="w-4 h-4" />
            Questões
          </TabsTrigger>
        </TabsList>

          <TabsContent value="editais" className="space-y-4">
            <DashboardHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />

            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">
                  {filteredEditais.length} {filteredEditais.length === 1 ? 'edital encontrado' : 'editais encontrados'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEditais.map(edital => (
                  <EditalCard key={edital.id} {...edital} />
                ))}
              </div>

              {filteredEditais.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-900 mb-1">Nenhum edital encontrado</p>
                  <p className="text-gray-500 text-sm">
                    Tente ajustar seus filtros ou buscar por outros termos
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="planos" className="space-y-4">
            <div>
              <h3 className="text-gray-900 mb-1">Seus Planos de Estudo</h3>
              <p className="text-gray-600 mb-6">Acompanhe seu progresso e organize seus estudos</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studyPlans.map(plan => (
                    <StudyPlanCard 
                      key={plan.id} 
                      {...plan}
                      onDelete={handleDeletePlan}
                      onEdit={handleEditPlan}
                    />
                  ))}
                </div>

                {studyPlans.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-900 mb-1">Nenhum plano de estudo criado</p>
                    <p className="text-gray-500 text-sm">
                      Busque por editais e crie seu primeiro plano de estudos personalizado
                    </p>
                  </div>
                )}

                <StudySchedule />
              </div>

              <div className="lg:col-span-1">
                <TopicsInsights />
              </div>
            </div>
          </TabsContent>

        <TabsContent value="questoes" className="space-y-4">
          <div>
            <h3 className="text-gray-900 mb-1">Questões e Simulados</h3>
            <p className="text-gray-600 mb-6">Treine com questões personalizadas baseadas no seu desempenho</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <QuizGenerator />
            </div>
            <div className="lg:col-span-1">
              <TopicsInsights />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
