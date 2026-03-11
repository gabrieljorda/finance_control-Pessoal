// src/hooks/useSimpleDateFilter.ts - VERSÃO CORRETA COM TODOS OS EXPORTS
import { useState, useMemo } from 'react';

// 1. PRIMEIRO: Exportar o tipo (faltava isso!)
export type DateFilterType = 'day' | 'month' | 'year';

// 2. Exportar a interface
export interface DateFilter {
  type: DateFilterType;
  year: number;
  month: number; // 1-12
  day: number;
}

// 3. Exportar o hook
export const useSimpleDateFilter = () => {
  const today = new Date();
  
  const [filter, setFilter] = useState<DateFilter>({
    type: 'month',
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });

  const updateFilterType = (type: DateFilterType) => {
    setFilter(prev => ({ ...prev, type }));
  };

  const updateYear = (year: number) => {
    setFilter(prev => ({ ...prev, year }));
  };

  const updateMonth = (month: number) => {
    setFilter(prev => ({ ...prev, month }));
  };

  const updateDay = (day: number) => {
    setFilter(prev => ({ ...prev, day }));
  };

  const filterDisplayText = useMemo(() => {
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    switch (filter.type) {
      case 'day':
        return `${filter.day} de ${monthNames[filter.month - 1]} de ${filter.year}`;
      case 'month':
        return `${monthNames[filter.month - 1]} de ${filter.year}`;
      case 'year':
        return filter.year.toString();
    }
  }, [filter]);

  return {
    filter,
    filterDisplayText,
    updateFilterType,
    updateYear,
    updateMonth,
    updateDay,
  };
};