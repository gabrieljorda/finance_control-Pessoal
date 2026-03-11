// src/components/dashboard/filters/DateDisplay.tsx
import { Calendar } from 'lucide-react';

interface DateDisplayProps {
  displayText: string;
}

export const DateDisplay = ({ displayText }: DateDisplayProps) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-3">
      <Calendar size={20} className="text-purple-400" />
      <span className="text-white text-lg font-medium">
        {displayText}
      </span>
    </div>
  );
};