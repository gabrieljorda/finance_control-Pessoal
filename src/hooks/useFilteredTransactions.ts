import { useMemo } from 'react';
import type { Transaction } from '../types/finances';
import type { DateFilter } from './useSimpleDateFilter';

export const useFilteredTransactions = (
  transactions: Transaction[], 
  filter: DateFilter
) => {
  return useMemo(() => {
    if (!transactions || !Array.isArray(transactions)) {
      return [];
    }

    return transactions.filter(transaction => {
      try {
        const transactionDate = new Date(transaction.date);
        const transactionYear = transactionDate.getFullYear();
        const transactionMonth = transactionDate.getMonth() + 1;
        const transactionDay = transactionDate.getDate();

        switch (filter.type) {
          case 'year':
            return transactionYear === filter.year;
          case 'month':
            return transactionYear === filter.year && transactionMonth === filter.month;
          case 'day':
            return transactionYear === filter.year && 
                   transactionMonth === filter.month && 
                   transactionDay === filter.day;
          default:
            return true;
        }
      } catch (error) {
        console.error('Erro ao filtrar transação:', transaction, error);
        return false;
      }
    });
  }, [transactions, filter]);
};