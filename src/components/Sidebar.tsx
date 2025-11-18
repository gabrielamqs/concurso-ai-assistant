import { Plus, Upload, FileQuestion, BookOpen, X } from 'lucide-react';
import { Button } from './ui/button';
import { MaterialCard } from './MaterialCard';
import logoImage from 'figma:asset/2695f03bb56ff627adcb3e6ea5eedf274cba418f.png';

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'questoes';
  pages?: number;
}

interface SidebarProps {
  materials: Material[];
  onRemoveMaterial: (id: string) => void;
  onAddMaterial: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ materials, onRemoveMaterial, onAddMaterial, onClose, isMobile }: SidebarProps) {
  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="ConcursoAI" className="w-10 h-10" />
            <div>
              <h1 className="text-gray-900">ConcursoAI</h1>
              <p className="text-xs text-gray-500">Seu assistente de estudos</p>
            </div>
          </div>
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          onClick={onAddMaterial}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Material
        </Button>
      </div>

      {/* Materials List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-700">Materiais de Estudo</h3>
          <span className="text-xs text-gray-500">{materials.length}</span>
        </div>
        
        {materials.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-2">Nenhum material adicionado</p>
            <p className="text-gray-400 text-xs">
              Adicione PDFs, textos ou questões para começar a estudar
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                {...material}
                onRemove={onRemoveMaterial}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="outline" className="w-full justify-start text-gray-700" onClick={onAddMaterial}>
          <Upload className="w-4 h-4 mr-2" />
          Upload de Arquivo
        </Button>
        <Button variant="outline" className="w-full justify-start text-gray-700" onClick={onAddMaterial}>
          <FileQuestion className="w-4 h-4 mr-2" />
          Banco de Questões
        </Button>
      </div>
    </div>
  );
}
