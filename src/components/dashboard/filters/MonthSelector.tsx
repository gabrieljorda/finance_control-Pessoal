import { MONTHS } from './constants';

interface MonthSelectorProps {
  month: number;
  onChange: (month: number) => void;
  className?: string;
}

export const MonthSelector = ({ month, onChange, className = '' }: MonthSelectorProps) => {
  return (
    <select
      value={month}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
    >
      {MONTHS.map((monthName, index) => (
        <option key={index + 1} value={index + 1}>
          {monthName}
        </option>
      ))}
    </select>
  );
};