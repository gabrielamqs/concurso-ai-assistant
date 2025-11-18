import { FileText, Trash2, BookOpen, FileCheck } from 'lucide-react';
import { Button } from './ui/button';

interface MaterialCardProps {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'questoes';
  pages?: number;
  onRemove: (id: string) => void;
}

export function MaterialCard({ id, title, type, pages, onRemove }: MaterialCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'questoes':
        return <FileCheck className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'questoes':
        return 'Questões';
      default:
        return 'Texto';
    }
  };

  return (
    <div className="group border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:bg-blue-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-700">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 truncate">{title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{getTypeLabel()}</span>
            {pages && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{pages} páginas</span>
              </>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
    </div>
  );
}
