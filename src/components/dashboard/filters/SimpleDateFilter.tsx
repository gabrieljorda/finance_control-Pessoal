// src/components/dashboard/filters/SimpleDateFilter.tsx
import { FilterTypeButtons } from './FilterTypeButtons';
import { DateDisplay } from './DateDisplay';
import { YearSelector } from './YearSelector';
import { MonthSelector } from './MonthSelector';
import { DaySelector } from './DaySelector';
import type { DateFilterType } from '../../../hooks/useSimpleDateFilter';

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
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
      <FilterTypeButtons 
        filterType={filterType} 
        onTypeChange={onTypeChange} 
      />

      <div className="flex items-center justify-between">
        <DateDisplay displayText={displayText} />

        <div className="flex space-x-2">
          {filterType === 'year' && (
            <YearSelector year={year} onChange={onYearChange} />
          )}

          {filterType === 'month' && (
            <>
              <MonthSelector month={month} onChange={onMonthChange} />
              <YearSelector year={year} onChange={onYearChange} />
            </>
          )}

          {filterType === 'day' && (
            <>
              <DaySelector 
                day={day} 
                month={month} 
                year={year} 
                onChange={onDayChange} 
              />
              <MonthSelector month={month} onChange={onMonthChange} />
              <YearSelector year={year} onChange={onYearChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};