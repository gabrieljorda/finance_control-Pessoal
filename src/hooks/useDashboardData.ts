import { useMemo } from 'react';
import type { Transaction } from '../types/finances';

export const useDashboardData = (_transactions: Transaction[], filteredTransactions: Transaction[]) => {
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Alimentação': '#EF4444',
      'Transporte': '#3B82F6',
      'Moradia': '#10B981',
      'Lazer': '#F59E0B',
      'Saúde': '#8B5CF6',
      'Salário': '#059669',
      'Freelance': '#2563EB',
    };
    return colors[category] || '#6B7280';
  };

  const dashboardData = useMemo(() => {
    const monthlyIncome = filteredTransactions
      .filter(t => t?.type === 'income')
      .reduce((sum, t) => sum + (t?.amount || 0), 0);

    const monthlyExpense = filteredTransactions
      .filter(t => t?.type === 'expense')
      .reduce((sum, t) => sum + (t?.amount || 0), 0);

    const periodBalance = monthlyIncome - monthlyExpense;

    const expensesByCategory = filteredTransactions
      .filter(t => t?.type === 'expense')
      .reduce((acc, t) => {
        const existing = acc.find(item => item.category === t.category);
        if (existing) {
          existing.amount += t.amount || 0;
        } else {
          acc.push({
            category: t.category,
            amount: t.amount || 0,
            color: getCategoryColor(t.category)
          });
        }
        return acc;
      }, [] as { category: string; amount: number; color: string; }[]);

    return {
      periodBalance,
      monthlyIncome,
      monthlyExpense,
      recentTransactions: filteredTransactions.slice(0, 10),
      expensesByCategory,
    };
  }, [filteredTransactions]);

  return dashboardData;
};