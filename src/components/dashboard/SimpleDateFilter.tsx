// src/components/dashboard/SimpleDateFilter.tsx
import { Calendar } from 'lucide-react';
import type { DateFilterType } from '../../hooks/useSimpleDateFilter';

interface SimpleDateFilterProps {
  filterType: DateFilterType;
  year: number;
  month: number;
  day: number;
  displayText: string;
  onTypeChange: (type: DateFilterType) => void;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onDayChange: (day: number) => void;
}

export const SimpleDateFilter = ({
  filterType,
  year,
  month,
  day,
  displayText,
  onTypeChange,
  onYearChange,
  onMonthChange,
  onDayChange,
}: SimpleDateFilterProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const getDaysInMonth = () => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
      {/* Botões de seleção de tipo - IGUAL DA IMAGEM */}
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => onTypeChange('day')}
          className={`px-4 py-2 rounded-l-lg font-medium transition-colors ${
            filterType === 'day'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Dia
        </button>
        <button
          onClick={() => onTypeChange('month')}
          className={`px-4 py-2 font-medium transition-colors ${
            filterType === 'month'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Mês
        </button>
        <button
          onClick={() => onTypeChange('year')}
          className={`px-4 py-2 rounded-r-lg font-medium transition-colors ${
            filterType === 'year'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Ano
        </button>
      </div>

      {/* Display da data selecionada - IGUAL DA IMAGEM */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-3">
          <Calendar size={20} className="text-purple-400" />
          <span className="text-white text-lg font-medium">
            {displayText}
          </span>
        </div>

        {/* Seletores */}
        <div className="flex space-x-2">
          {filterType === 'year' && (
            <select
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          )}

          {filterType === 'month' && (
            <>
              <select
                value={month}
                onChange={(e) => onMonthChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {months.map((monthName, index) => (
                  <option key={index + 1} value={index + 1}>
                    {monthName}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </>
          )}

          {filterType === 'day' && (
            <>
              <select
                value={day}
                onChange={(e) => onDayChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {days.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => onMonthChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {months.map((monthName, index) => (
                  <option key={index + 1} value={index + 1}>
                    {monthName}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
};