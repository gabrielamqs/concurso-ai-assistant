import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilters: {
    status: string[];
    level: string[];
    location: string[];
  };
  onFilterChange: (filterType: 'status' | 'level' | 'location', value: string) => void;
}

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange
}: DashboardHeaderProps) {
  const getActiveFiltersCount = () => {
    return activeFilters.status.length + activeFilters.level.length + activeFilters.location.length;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-gray-900 mb-1">Buscar Editais</h2>
        <p className="text-gray-600">Encontre concursos públicos e crie seu plano de estudos personalizado</p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Busque por cargo, órgão ou área..."
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {getActiveFiltersCount() > 0 && (
                <Badge className="ml-2 bg-blue-600 text-white px-1.5 py-0 h-5 min-w-5">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={activeFilters.status.includes('aberto')}
              onCheckedChange={() => onFilterChange('status', 'aberto')}
            >
              Inscrições Abertas
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.status.includes('previsto')}
              onCheckedChange={() => onFilterChange('status', 'previsto')}
            >
              Previstos
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Nível</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={activeFilters.level.includes('Superior')}
              onCheckedChange={() => onFilterChange('level', 'Superior')}
            >
              Superior
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.level.includes('Médio')}
              onCheckedChange={() => onFilterChange('level', 'Médio')}
            >
              Médio
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.level.includes('Fundamental')}
              onCheckedChange={() => onFilterChange('level', 'Fundamental')}
            >
              Fundamental
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Localização</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={activeFilters.location.includes('Nacional')}
              onCheckedChange={() => onFilterChange('location', 'Nacional')}
            >
              Nacional
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.location.includes('SP')}
              onCheckedChange={() => onFilterChange('location', 'SP')}
            >
              São Paulo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.location.includes('RJ')}
              onCheckedChange={() => onFilterChange('location', 'RJ')}
            >
              Rio de Janeiro
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {activeFilters.status.map(status => (
            <Badge key={status} variant="secondary" className="gap-1">
              {status === 'aberto' ? 'Inscrições Abertas' : 'Previstos'}
              <button
                onClick={() => onFilterChange('status', status)}
                className="ml-1 hover:bg-gray-300 rounded-full"
              >
                ×
              </button>
            </Badge>
          ))}
          {activeFilters.level.map(level => (
            <Badge key={level} variant="secondary" className="gap-1">
              {level}
              <button
                onClick={() => onFilterChange('level', level)}
                className="ml-1 hover:bg-gray-300 rounded-full"
              >
                ×
              </button>
            </Badge>
          ))}
          {activeFilters.location.map(location => (
            <Badge key={location} variant="secondary" className="gap-1">
              {location}
              <button
                onClick={() => onFilterChange('location', location)}
                className="ml-1 hover:bg-gray-300 rounded-full"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
