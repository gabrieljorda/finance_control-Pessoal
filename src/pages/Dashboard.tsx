import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { ExpensesChartCard } from '../components/dashboard/ExpensesChartCard';
import { PeriodSummary } from '../components/dashboard/PeriodSummary';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { SimpleDateFilter } from '../components/dashboard/filters/SimpleDateFilter';
import { useSimpleDateFilter } from '../hooks/useSimpleDateFilter';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import { useDashboardData } from '../hooks/useDashboardData';
import { useFinance } from '../contexts/FinanceContext';
import { Wallet, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions } = useFinance();
  const [loading, setLoading] = useState(true);
  
  const { filter, filterDisplayText, updateFilterType, updateYear, updateMonth, updateDay } = useSimpleDateFilter();
  const filteredTransactions = useFilteredTransactions(transactions, filter);
  const dashboardData = useDashboardData(transactions, filteredTransactions);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@finance:token');
    if (!token) navigate('/login');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  const filterLabel = filter.type === 'day' ? 'dia' : filter.type === 'month' ? 'mês' : 'ano';

  return (
    <div className="min-h-screen bg-black">
      <DashboardHeader
        onNewTransaction={() => navigate('/transactions?new=true')}
        onViewTransactions={() => navigate('/transactions')}
        onLogout={handleLogout}
      />

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
          <SummaryCard title={`Saldo (${filterLabel})`} value={dashboardData.periodBalance} icon={<Wallet size={20} />} type="balance" />
          <SummaryCard title={`Receitas (${filterLabel})`} value={dashboardData.monthlyIncome} icon={<TrendingUp size={20} />} type="income" />
          <SummaryCard title={`Despesas (${filterLabel})`} value={dashboardData.monthlyExpense} icon={<TrendingDown size={20} />} type="expense" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpensesChartCard 
            data={dashboardData.expensesByCategory} 
            filterType={filterLabel}
            total={dashboardData.monthlyExpense}
          />
          
          <PeriodSummary
            totalTransactions={filteredTransactions.length}
            monthlyIncome={dashboardData.monthlyIncome}
            monthlyExpense={dashboardData.monthlyExpense}
            periodBalance={dashboardData.periodBalance}
            filterType={filterLabel}
          />
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Transações do Período</h2>
            <button onClick={() => navigate('/transactions')} className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
              <span>Ver todas</span>
              <ArrowRight size={18} />
            </button>
          </div>
          
          {filteredTransactions.length > 0 ? (
            <RecentTransactions transactions={dashboardData.recentTransactions} />
          ) : (
            <div className="text-center py-12 text-gray-400">Nenhuma transação encontrada</div>
          )}
        </div>
      </main>
    </div>
  );
};