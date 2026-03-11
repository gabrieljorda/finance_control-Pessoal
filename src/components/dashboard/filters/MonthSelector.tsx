// src/components/dashboard/filters/MonthSelector.tsx
import { MONTHS } from './constants';

interface MonthSelectorProps {
  month: number;
  onChange: (month: number) => void;
}

export const MonthSelector = ({ month, onChange }: MonthSelectorProps) => {
  return (
    <select
      value={month}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {MONTHS.map((monthName, index) => (
        <option key={index + 1} value={index + 1}>
          {monthName}
        </option>
      ))}
    </select>
  );
};