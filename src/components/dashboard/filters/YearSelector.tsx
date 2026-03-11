// src/components/dashboard/filters/YearSelector.tsx
import { getYearOptions } from './constants';

interface YearSelectorProps {
  year: number;
  onChange: (year: number) => void;
}

export const YearSelector = ({ year, onChange }: YearSelectorProps) => {
  const years = getYearOptions();

  return (
    <select
      value={year}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {years.map(y => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  );
};