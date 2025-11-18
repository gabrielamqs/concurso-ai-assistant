import { Calendar, MapPin, GraduationCap, Clock, TrendingUp, BookmarkPlus, Bookmark, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { useState } from 'react';

interface EditalProps {
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

export function EditalCard({ 
  id, 
  title, 
  organization, 
  location, 
  vacancies, 
  salary, 
  inscriptionDeadline, 
  examDate,
  status,
  level,
  saved: initialSaved = false
}: EditalProps) {
  const [saved, setSaved] = useState(initialSaved);

  const getStatusColor = () => {
    switch (status) {
      case 'aberto':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'previsto':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'encerrado':
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'aberto':
        return 'Inscrições Abertas';
      case 'previsto':
        return 'Previsto';
      case 'encerrado':
        return 'Encerrado';
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getStatusColor()}>
              {getStatusLabel()}
            </Badge>
            <Badge variant="outline">{level}</Badge>
          </div>
          <h4 className="text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{organization}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSaved(!saved)}
          className="flex-shrink-0"
        >
          {saved ? (
            <Bookmark className="w-5 h-5 fill-blue-600 text-blue-600" />
          ) : (
            <BookmarkPlus className="w-5 h-5 text-gray-500" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <GraduationCap className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{vacancies} vagas</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{examDate}</span>
        </div>
      </div>

      {status === 'aberto' && (
        <div className="flex items-center gap-2 p-2 bg-orange-50 rounded text-sm mb-3">
          <Clock className="w-4 h-4 text-orange-600" />
          <span className="text-orange-700">
            Inscrições até {inscriptionDeadline}
          </span>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Ver Edital
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          onClick={() => {
            // This will be handled by parent component
            const event = new CustomEvent('openEditalChat', { detail: { editalId: id } });
            window.dispatchEvent(event);
          }}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Abrir com ConcursoAI
        </Button>
      </div>
    </Card>
  );
}
