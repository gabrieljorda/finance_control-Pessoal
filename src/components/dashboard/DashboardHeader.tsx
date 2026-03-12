import { LogOut, PlusCircle, List } from 'lucide-react';

interface DashboardHeaderProps {
  onNewTransaction: () => void;
  onViewTransactions: () => void;
  onLogout: () => void;
}

export const DashboardHeader = ({ 
  onNewTransaction, 
  onViewTransactions, 
  onLogout 
}: DashboardHeaderProps) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            💰 Controle Financeiro
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={onNewTransaction}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <PlusCircle size={18} />
              <span className="hidden sm:inline">Nova</span>
            </button>

            <button
              onClick={onViewTransactions}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <List size={18} />
              <span className="hidden sm:inline">Lista</span>
            </button>

            <button
              onClick={onLogout}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};