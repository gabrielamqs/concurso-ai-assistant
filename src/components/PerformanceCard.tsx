import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';
import { Card } from './ui/card';

interface PerformanceCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: 'trending' | 'target' | 'award';
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export function PerformanceCard({ title, value, change, icon, color }: PerformanceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'trending':
        return TrendingUp;
      case 'target':
        return Target;
      case 'award':
        return Award;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
    }
  };

  const Icon = getIcon();

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${getColorClasses()} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <p className="text-2xl text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </Card>
  );
}
