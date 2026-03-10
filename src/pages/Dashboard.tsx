// src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  LogOut,
  RefreshCw,
  PlusCircle,
  List,
  ArrowRight
} from 'lucide-react';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { ExpensesPieChart } from '../components/dashboard/ExpensesPieChart';
import { MonthlyBarChart } from '../components/dashboard/MonthlyBarChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { getDashboardData } from '../utils/mockData';
import type { DashboardData } from '../types/finances';
import { useFinance } from '../contexts/FinanceContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions } = useFinance(); // Pegar transações do contexto
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados do dashboard
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        const dashboardData = getDashboardData();
        setData(dashboardData);
      } catch (error) {
        toast.error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [transactions]); // Recarregar quando transações mudarem

  // Verificar se usuário está logado
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

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const dashboardData = getDashboardData();
      setData(dashboardData);
      setLoading(false);
      toast.success('Dados atualizados!');
    }, 500);
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

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Erro ao carregar dados</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              💰 Controle Financeiro
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* BOTÃO: Nova Transação */}
              <button
                onClick={() => navigate('/transactions?new=true')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <PlusCircle size={18} />
                <span className="hidden sm:inline">Nova Transação</span>
              </button>

              {/* BOTÃO: Ver Todas Transações */}
              <button
                onClick={() => navigate('/transactions')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <List size={18} />
                <span className="hidden sm:inline">Ver Transações</span>
              </button>

              <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Atualizar dados"
              >
                <RefreshCw size={20} />
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Saldo Atual"
            value={data.balance}
            icon={<Wallet size={20} />}
            type="balance"
          />
          
          <SummaryCard
            title="Receitas do Mês"
            value={data.monthlyIncome}
            icon={<TrendingUp size={20} />}
            type="income"
          />
          
          <SummaryCard
            title="Despesas do Mês"
            value={data.monthlyExpense}
            icon={<TrendingDown size={20} />}
            type="expense"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Pizza - Despesas por Categoria */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Despesas por Categoria
            </h2>
            <div className="h-75">
              <ExpensesPieChart data={data.expensesByCategory} />
            </div>
          </div>

          {/* Gráfico de Barras - Evolução Mensal */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">
              Evolução Mensal
            </h2>
            <div className="h-75">
              <MonthlyBarChart data={data.monthlyEvolution} />
            </div>
          </div>
        </div>

        {/* Últimas Transações */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Últimas Transações
            </h2>
            <button
              onClick={() => navigate('/transactions')}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>Ver todas</span>
              <ArrowRight size={18} />
            </button>
          </div>
          <RecentTransactions transactions={data.recentTransactions} />
          
          {/* Botão adicional no final da lista (para mobile) */}
          {data.recentTransactions.length > 0 && (
            <div className="mt-4 text-center sm:hidden">
              <button
                onClick={() => navigate('/transactions')}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <span>Ver todas as transações</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};