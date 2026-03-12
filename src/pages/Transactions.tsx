import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import { useFilters } from '../hooks/useFilters';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionsTable } from '../components/transactions/TransactionsTable';
import { TransactionModal } from '../components/transactions/TransactionModal';

export const Transactions = () => {
  const { transactions, loading } = useFinance();
  const { filters, filteredTransactions, updateFilter, clearFilters } = useFilters(transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ← CRIAR A FUNÇÃO navigate
  

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setIsModalOpen(true);
      // Limpar o parâmetro da URL sem recarregar a página
      window.history.replaceState({}, '', '/transactions');
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando transações...</p>
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
              📋 Transações
            </h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Nova Transação</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TransactionFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        {/* Resumo */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">
            Mostrando <span className="text-white font-medium">{filteredTransactions.length}</span> transações
          </p>
          <p className="text-gray-400">
            Total:{' '}
            <span className="text-white font-medium">
              {filteredTransactions.reduce((acc, t) => 
                t.type === 'income' ? acc + t.amount : acc - t.amount, 0
              ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>
        </div>

        {/* Tabela */}
        <TransactionsTable transactions={filteredTransactions} />
      </main>

      {/* Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactionToEdit={null}
      />
    </div>
  );
};