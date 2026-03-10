import type { Transaction } from '../../types/finances';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Alimentação': '🍔',
      'Transporte': '🚗',
      'Moradia': '🏠',
      'Lazer': '🎮',
      'Saúde': '🏥',
      'Salário': '💰',
      'Freelance': '💻',
    };
    return icons[category] || '📦';
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        Nenhuma transação encontrada
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Ícone da categoria */}
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                {getCategoryIcon(transaction.category)}
              </div>
              
              {/* Descrição e categoria */}
              <div>
                <h4 className="text-white font-medium">{transaction.description}</h4>
                <p className="text-sm text-gray-400">{transaction.category}</p>
              </div>
            </div>

            {/* Valor e data */}
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </p>
              <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};