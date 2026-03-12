interface PeriodSummaryProps {
  totalTransactions: number;
  monthlyIncome: number;
  monthlyExpense: number;
  periodBalance: number;
  filterType: string;
}

export const PeriodSummary = ({ 
  totalTransactions, 
  monthlyIncome, 
  monthlyExpense, 
  periodBalance}: PeriodSummaryProps) => {
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const average = totalTransactions > 0 
    ? (monthlyIncome + monthlyExpense) / totalTransactions 
    : 0;

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">
        Resumo do Período
      </h2>
      <div className="space-y-4">
        <SummaryItem 
          label="Total de transações:" 
          value={totalTransactions.toString()} 
        />
        <SummaryItem 
          label="Média por transação:" 
          value={formatCurrency(average)} 
        />
        <SummaryItem 
          label="Saldo do período:" 
          value={formatCurrency(periodBalance)}
          valueColor={periodBalance >= 0 ? 'text-green-400' : 'text-red-400'}
        />
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value, valueColor = 'text-white' }: { 
  label: string; 
  value: string; 
  valueColor?: string;
}) => (
  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
    <span className="text-gray-400">{label}</span>
    <span className={`font-bold ${valueColor}`}>{value}</span>
  </div>
);