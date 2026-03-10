// src/hooks/useFilters.ts - VERSÃO MELHORADA
import { useState, useMemo, useCallback } from 'react';
import type { Transaction } from '../types/finances';

interface Filters {
  startDate: string;
  endDate: string;
  category: string;
  type: 'all' | 'income' | 'expense';
  search: string;
}

export const useFilters = (transactions: Transaction[]) => {
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    category: 'all',
    type: 'all',
    search: '',
  });

  const filteredTransactions = useMemo(() => {
    // Se não tem transações, retorna array vazio
    if (!transactions || transactions.length === 0) {
      return [];
    }

    return transactions.filter(transaction => {
      // Filtro por tipo
      if (filters.type !== 'all' && transaction.type !== filters.type) {
        return false;
      }

      // Filtro por categoria
      if (filters.category !== 'all' && transaction.category !== filters.category) {
        return false;
      }

      // Filtro por data inicial - CONVERTENDO PARA COMPARAÇÃO CORRETA
      if (filters.startDate) {
        const transactionDate = new Date(transaction.date).getTime();
        const filterStartDate = new Date(filters.startDate).getTime();
        if (transactionDate < filterStartDate) {
          return false;
        }
      }

      // Filtro por data final - CONVERTENDO PARA COMPARAÇÃO CORRETA
      if (filters.endDate) {
        const transactionDate = new Date(transaction.date).getTime();
        const filterEndDate = new Date(filters.endDate).getTime();
        if (transactionDate > filterEndDate) {
          return false;
        }
      }

      // Filtro por busca na descrição
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase().trim();
        const description = transaction.description.toLowerCase();
        if (!description.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, filters]);

  // useCallback para evitar recriação desnecessária de funções
  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      startDate: '',
      endDate: '',
      category: 'all',
      type: 'all',
      search: '',
    });
  }, []);

  // FUNÇÕES ÚTEIS ADICIONAIS
  const getActiveFiltersCount = useCallback(() => {
    let count = 0;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.category !== 'all') count++;
    if (filters.type !== 'all') count++;
    if (filters.search) count++;
    return count;
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return getActiveFiltersCount() > 0;
  }, [getActiveFiltersCount]);

  return {
    filters,
    filteredTransactions,
    updateFilter,
    clearFilters,
    hasActiveFilters,        // ← Novo: saber se tem filtros ativos
    activeFiltersCount: getActiveFiltersCount(), // ← Novo: quantidade de filtros
  };
};