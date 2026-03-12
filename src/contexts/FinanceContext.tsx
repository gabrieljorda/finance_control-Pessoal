// src/contexts/FinanceContext.tsx - DEPOIS
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, Category } from '../types/finances';

// Mantenha as categorias (elas são fixas mesmo)
const defaultCategories: Category[] = [
  { id: '1', name: 'Alimentação', type: 'expense', color: '#EF4444', icon: '🍔' },
  { id: '2', name: 'Transporte', type: 'expense', color: '#3B82F6', icon: '🚗' },
  { id: '3', name: 'Moradia', type: 'expense', color: '#10B981', icon: '🏠' },
  { id: '4', name: 'Lazer', type: 'expense', color: '#F59E0B', icon: '🎮' },
  { id: '5', name: 'Saúde', type: 'expense', color: '#8B5CF6', icon: '🏥' },
  { id: '6', name: 'Salário', type: 'income', color: '#059669', icon: '💰' },
  { id: '7', name: 'Freelance', type: 'income', color: '#2563EB', icon: '💻' },
];

interface FinanceContextData {
  transactions: Transaction[];
  categories: Category[];
  loading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
}

const FinanceContext = createContext<FinanceContextData>({} as FinanceContextData);

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories] = useState<Category[]>(defaultCategories); // ← Categorias fixas
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem('@finance:transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        } else {
          // AGORA começa com array vazio em vez de mockTransactions
          setTransactions([]);
          localStorage.setItem('@finance:transactions', JSON.stringify([]));
        }
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
        setTransactions([]); // ← Array vazio em caso de erro
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Salvar no localStorage sempre que transactions mudar
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('@finance:transactions', JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev =>
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getTransactionById = (id: string) => {
    return transactions.find(t => t.id === id);
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      categories,
      loading,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionById,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};