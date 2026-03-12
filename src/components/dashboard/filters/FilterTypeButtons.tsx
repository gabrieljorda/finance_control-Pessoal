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
    <div className="flex flex-wrap gap-2 sm:gap-1 mb-4">
      {types.map(({ value, label }, index) => (
        <button
          key={value}
          onClick={() => onTypeChange(value)}
          className={`
            flex-1 sm:flex-none px-3 py-2 sm:px-4 sm:py-2 
            rounded-lg sm:rounded-none
            ${index === 0 ? 'sm:rounded-l-lg' : ''}
            ${index === types.length - 1 ? 'sm:rounded-r-lg' : ''}
            font-medium text-sm sm:text-base transition-colors
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