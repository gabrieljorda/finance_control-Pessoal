// src/pages/Dashboard.tsx - VERSÃO CORRIGIDA
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  LogOut,
  PlusCircle,
  List,
  ArrowRight
} from 'lucide-react';

// IMPORTS - Verifique se todos esses arquivos existem!
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { ExpensesPieChart } from '../components/dashboard/charts/ExpensesPieChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { SimpleDateFilter } from '../components/dashboard/filters/SimpleDateFilter';
import { useSimpleDateFilter } from '../hooks/useSimpleDateFilter';
import { useFinance } from '../contexts/FinanceContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions } = useFinance();
  const [loading, setLoading] = useState(true);

  const {
    filter,
    filterDisplayText,
    updateFilterType,
    updateYear,
    updateMonth,
    updateDay,
  } = useSimpleDateFilter();

  // =============================================
  // FUNÇÕES AUXILIARES
  // =============================================
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

  // =============================================
  // FILTRO DE TRANSAÇÕES
  // =============================================
  const filteredTransactions = useMemo(() => {
    // Verifica se transactions existe
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

  // =============================================
  // DADOS DO DASHBOARD
  // =============================================
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

  // =============================================
  // EFFECTS
  // =============================================
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@finance:token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('@finance:token');
    localStorage.removeItem('@finance:user');
    toast.success('Logout realizado com sucesso!');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              💰 Controle Financeiro
            </h1>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/transactions?new=true')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <PlusCircle size={18} />
                <span className="hidden sm:inline">Nova</span>
              </button>

              <button
                onClick={() => navigate('/transactions')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <List size={18} />
                <span className="hidden sm:inline">Lista</span>
              </button>

              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                title="Sair"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SimpleDateFilter
          filterType={filter.type}
          year={filter.year}
          month={filter.month}
          day={filter.day}
          displayText={filterDisplayText}
          onTypeChange={updateFilterType}
          onYearChange={updateYear}
          onMonthChange={updateMonth}
          onDayChange={updateDay}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title={`Saldo (${filter.type === 'day' ? 'dia' : filter.type === 'month' ? 'mês' : 'ano'})`}
            value={dashboardData.periodBalance}
            icon={<Wallet size={20} />}
            type="balance"
          />

          <SummaryCard
            title={`Receitas (${filter.type === 'day' ? 'dia' : filter.type === 'month' ? 'mês' : 'ano'})`}
            value={dashboardData.monthlyIncome}
            icon={<TrendingUp size={20} />}
            type="income"
          />

          <SummaryCard
            title={`Despesas (${filter.type === 'day' ? 'dia' : filter.type === 'month' ? 'mês' : 'ano'})`}
            value={dashboardData.monthlyExpense}
            icon={<TrendingDown size={20} />}
            type="expense"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Despesas por Categoria ({filter.type === 'day' ? 'dia' : filter.type === 'month' ? 'mês' : 'ano'})
            </h2>
            <div className="h-75">
              <ExpensesPieChart data={dashboardData.expensesByCategory} />
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Resumo do Período
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Total de transações:</span>
                <span className="text-white font-bold">{filteredTransactions.length}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Média por transação:</span>
                <span className="text-white font-bold">
                  {filteredTransactions.length > 0
                    ? ((dashboardData.monthlyIncome + dashboardData.monthlyExpense) / filteredTransactions.length).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })
                    : 'R$ 0,00'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Saldo do período:</span>
                <span className={`font-bold ${
                  dashboardData.periodBalance >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {dashboardData.periodBalance.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Transações do Período
            </h2>
            <button
              onClick={() => navigate('/transactions')}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Ver todas</span>
              <ArrowRight size={18} />
            </button>
          </div>
          
          {filteredTransactions.length > 0 ? (
            <RecentTransactions transactions={dashboardData.recentTransactions} />
          ) : (
            <div className="text-center py-12 text-gray-400">
              Nenhuma transação encontrada para este período
            </div>
          )}
        </div>
      </main>
    </div>
  );
};