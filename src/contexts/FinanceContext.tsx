import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Transaction, Category } from '../types/finances';
import { mockTransactions, mockCategories } from '../utils/mockData';

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
  const [categories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem('@finance:transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        } else {
          // Se não tiver dados, usar mockados
          setTransactions(mockTransactions);
          localStorage.setItem('@finance:transactions', JSON.stringify(mockTransactions));
        }
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
        setTransactions(mockTransactions);
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