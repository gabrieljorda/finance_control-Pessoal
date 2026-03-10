import { useState } from 'react';
import { Edit, Trash2, ArrowUpDown } from 'lucide-react';
import type { Transaction } from '../../types/finances';
import { useFinance } from '../../contexts/FinanceContext';
import { TransactionModal } from './TransactionModal';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const { deleteTransaction, categories } = useFinance();
  const [sortField, setSortField] = useState<keyof Transaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.icon || '📦';
  };

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'amount') {
      aValue = a.amount;
      bValue = b.amount;
    } else if (sortField === 'date') {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12 bg-gray-900 rounded-xl border border-gray-800">
        <p className="text-lg mb-2">Nenhuma transação encontrada</p>
        <p className="text-sm">Tente ajustar os filtros ou adicione uma nova transação</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>Data</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  <button
                    onClick={() => handleSort('description')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>Descrição</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>Valor</span>
                    <ArrowUpDown size={14} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Pagamento
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <span className="flex items-center space-x-1">
                      <span>{getCategoryIcon(transaction.category)}</span>
                      <span>{transaction.category}</span>
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'income' 
                        ? 'bg-green-900/50 text-green-400' 
                        : 'bg-red-900/50 text-red-400'
                    }`}>
                      {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {transaction.paymentMethod === 'cash' && 'Dinheiro'}
                    {transaction.paymentMethod === 'debit' && 'Débito'}
                    {transaction.paymentMethod === 'credit' && 'Crédito'}
                    {transaction.paymentMethod === 'transfer' && 'Transferência'}
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-gray-400 hover:text-blue-400 mr-3 transition-colors"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transactionToEdit={editingTransaction}
      />
    </>
  );
};