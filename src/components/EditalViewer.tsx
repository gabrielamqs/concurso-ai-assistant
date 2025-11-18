import { Calendar, MapPin, GraduationCap, TrendingUp, FileText, Download, ExternalLink, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface EditalViewerProps {
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
}

export function EditalViewer({ edital }: EditalViewerProps) {
  const getStatusColor = () => {
    switch (edital.status) {
      case 'aberto':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'previsto':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'encerrado':
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusLabel = () => {
    switch (edital.status) {
      case 'aberto':
        return 'Inscrições Abertas';
      case 'previsto':
        return 'Previsto';
      case 'encerrado':
        return 'Encerrado';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Badge className={getStatusColor()}>
            {getStatusLabel()}
          </Badge>
          <Badge variant="outline">{edital.level}</Badge>
        </div>
        <h3 className="text-gray-900 mb-1">{edital.title}</h3>
        <p className="text-sm text-gray-600">{edital.organization}</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-gray-900 mb-3">Informações do Edital</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Localização:</span>
                <span className="text-gray-900">{edital.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Vagas:</span>
                <span className="text-gray-900">{edital.vacancies}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Remuneração:</span>
                <span className="text-gray-900">{edital.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Prova:</span>
                <span className="text-gray-900">{edital.examDate}</span>
              </div>
              {edital.status === 'aberto' && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded text-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700">
                    Inscrições até {edital.inscriptionDeadline}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-gray-900 mb-3">Principais Disciplinas</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Direito Constitucional</span>
                <Badge variant="outline" className="text-xs">Alta relevância</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Direito Administrativo</span>
                <Badge variant="outline" className="text-xs">Alta relevância</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Português</span>
                <Badge variant="outline" className="text-xs">Média relevância</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Raciocínio Lógico</span>
                <Badge variant="outline" className="text-xs">Média relevância</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-gray-900 mb-3">Requisitos</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Ensino {edital.level} completo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Idade mínima: 18 anos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Nacionalidade brasileira ou naturalização</span>
              </li>
            </ul>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          Ver Edital Completo
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Download className="w-4 h-4 mr-2" />
          Baixar PDF
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <ExternalLink className="w-4 h-4 mr-2" />
          Site Oficial
        </Button>
      </div>
    </Card>
  );
}
