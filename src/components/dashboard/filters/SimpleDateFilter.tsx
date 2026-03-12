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
    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 mb-6">
      <FilterTypeButtons 
        filterType={filterType} 
        onTypeChange={onTypeChange} 
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <DateDisplay displayText={displayText} />

        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          {filterType === 'year' && (
            <YearSelector 
              year={year} 
              onChange={onYearChange}
              className="flex-1 sm:flex-none"
            />
          )}

          {filterType === 'month' && (
            <>
              <MonthSelector 
                month={month} 
                onChange={onMonthChange}
                className="flex-1"
              />
              <YearSelector 
                year={year} 
                onChange={onYearChange}
                className="flex-1"
              />
            </>
          )}

          {filterType === 'day' && (
            <>
              <DaySelector 
                day={day} 
                month={month} 
                year={year} 
                onChange={onDayChange}
                className="flex-1"
              />
              <MonthSelector 
                month={month} 
                onChange={onMonthChange}
                className="flex-1"
              />
              <YearSelector 
                year={year} 
                onChange={onYearChange}
                className="flex-1"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};