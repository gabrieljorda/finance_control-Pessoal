import type { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  type?: 'income' | 'expense' | 'balance';
}

export const SummaryCard = ({ title, value, icon, type = 'balance' }: SummaryCardProps) => {
  const colors = {
    income: 'text-green-400',
    expense: 'text-red-400',
    balance: value >= 0 ? 'text-green-400' : 'text-red-400'
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{title}</span>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div className={`text-2xl font-bold ${colors[type]}`}>
        {formatCurrency(value)}
      </div>
    </div>
  );
};