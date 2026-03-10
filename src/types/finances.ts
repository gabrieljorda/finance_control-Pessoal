// src/types/finances.ts - VERSÃO CORRETA COM TODOS OS EXPORTS

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'transfer';
  notes?: string;
}

export interface Category {  // ← AGORA TEM EXPORT!
  id: string;
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface DashboardData {
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  recentTransactions: Transaction[];
  expensesByCategory: {
    category: string;
    amount: number;
    color: string;
  }[];
  monthlyEvolution: {
    month: string;
    income: number;
    expense: number;
  }[];
}