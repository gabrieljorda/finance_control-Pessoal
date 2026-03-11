// src/components/dashboard/filters/FilterTypeButtons.tsx
import type { DateFilterType } from '../../../hooks/useSimpleDateFilter';

interface FilterTypeButtonsProps {
  filterType: DateFilterType;
  onTypeChange: (type: DateFilterType) => void;
}

export const FilterTypeButtons = ({ filterType, onTypeChange }: FilterTypeButtonsProps) => {
  const types: Array<{ value: DateFilterType; label: string }> = [
    { value: 'day', label: 'Dia' },
    { value: 'month', label: 'Mês' },
    { value: 'year', label: 'Ano' }
  ];

  return (
    <div className="flex space-x-1 mb-4">
      {types.map(({ value, label }, index) => (
        <button
          key={value}
          onClick={() => onTypeChange(value)}
          className={`
            px-4 py-2 font-medium transition-colors
            ${index === 0 ? 'rounded-l-lg' : ''}
            ${index === types.length - 1 ? 'rounded-r-lg' : ''}
            ${filterType === value
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};