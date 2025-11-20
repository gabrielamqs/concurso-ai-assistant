import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
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
    state: string[];
    salary: string[];
  };
  onFilterChange: (filterType: 'status' | 'state' | 'salary', value: string) => void;
}

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'Nacional'
];

const faixasSalario = [
  'Até R$ 5.000',
  'R$ 5.000 - R$ 10.000',
  'R$ 10.000 - R$ 15.000',
  'R$ 15.000 - R$ 20.000',
  'Acima de R$ 20.000'
];

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange
}: DashboardHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getActiveFiltersCount = () => {
    return activeFilters.status.length + activeFilters.state.length + activeFilters.salary.length;
  };

  const getEstadoLabel = (estado: string) => {
    if (estado === 'Nacional') return 'Nacional';
    const estadosNomes: { [key: string]: string } = {
      'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
      'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
      'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
      'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
      'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
      'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
      'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
    };
    return estadosNomes[estado] || estado;
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
        
        {/* <div className="relative">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-2 bg-blue-600 text-white px-1.5 py-0 h-5 min-w-5 pointer-events-none">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 max-h-[80vh] overflow-y-auto">
            <DropdownMenuLabel>Status do Edital</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={activeFilters.status.includes('aberto')}
              onCheckedChange={(checked: boolean | undefined) => {
                if (checked !== undefined) {
                  onFilterChange('status', 'aberto');
                }
              }}
            >
              Inscrições Abertas
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.status.includes('encerrado')}
              onCheckedChange={(checked: boolean | undefined) => {
                if (checked !== undefined) {
                  onFilterChange('status', 'encerrado');
                }
              }}
            >
              Inscrições Encerradas
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.status.includes('previsto')}
              onCheckedChange={(checked: boolean | undefined) => {
                if (checked !== undefined) {
                  onFilterChange('status', 'previsto');
                }
              }}
            >
              Previstos
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Estado</DropdownMenuLabel>
            <div className="max-h-48 overflow-y-auto">
              {estados.map(estado => (
                <DropdownMenuCheckboxItem
                  key={estado}
                  checked={activeFilters.state.includes(estado)}
                  onCheckedChange={(checked: boolean | undefined) => {
                    if (checked !== undefined) {
                      onFilterChange('state', estado);
                    }
                  }}
                >
                  {getEstadoLabel(estado)}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Faixa Salarial</DropdownMenuLabel>
            {faixasSalario.map(faixa => (
              <DropdownMenuCheckboxItem
                key={faixa}
                checked={activeFilters.salary.includes(faixa)}
                onCheckedChange={(checked: boolean | undefined) => {
                  if (checked !== undefined) {
                    onFilterChange('salary', faixa);
                  }
                }}
              >
                {faixa}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </div> */}
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Filtros ativos:</span>
          {activeFilters.status.map(status => (
            <Badge key={status} variant="secondary" className="gap-1">
              {status === 'aberto' ? 'Inscrições Abertas' : status === 'encerrado' ? 'Inscrições Encerradas' : 'Previstos'}
              <button
                onClick={() => onFilterChange('status', status)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.state.map(state => (
            <Badge key={state} variant="secondary" className="gap-1">
              {getEstadoLabel(state)}
              <button
                onClick={() => onFilterChange('state', state)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.salary.map(salary => (
            <Badge key={salary} variant="secondary" className="gap-1">
              {salary}
              <button
                onClick={() => onFilterChange('salary', salary)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
