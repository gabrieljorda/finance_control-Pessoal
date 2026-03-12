import { Calendar } from 'lucide-react';

interface DateDisplayProps {
  displayText: string;
}

export const DateDisplay = ({ displayText }: DateDisplayProps) => {
  return (
    <div className="flex items-center justify-center sm:justify-start space-x-2 bg-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-3 w-full sm:w-auto">
      <Calendar size={18} className="text-purple-400 shrink-0" />
      <span className="text-white text-sm sm:text-base font-medium truncate">
        {displayText}
      </span>
    </div>
  );
};