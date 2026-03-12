import { useMemo } from 'react';

interface DaySelectorProps {
  day: number;
  month: number;
  year: number;
  onChange: (day: number) => void;
  className?: string;
}

export const DaySelector = ({ day, month, year, onChange, className = '' }: DaySelectorProps) => {
  const days = useMemo(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [year, month]);

  return (
    <select
      value={day}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
    >
      {days.map(d => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  );
};