import { getYearOptions } from './constants';

interface YearSelectorProps {
  year: number;
  onChange: (year: number) => void;
  className?: string;
}

export const YearSelector = ({ year, onChange, className = '' }: YearSelectorProps) => {
  const years = getYearOptions();

  return (
    <select
      value={year}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
    >
      {years.map(y => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  );
};