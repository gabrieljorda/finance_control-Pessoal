import { ExpensesPieChart } from './charts/ExpensesPieChart';

interface ExpensesChartCardProps {
  data: Array<{ category: string; amount: number; color: string }>;
  filterType: string;
  total: number;
}

export const ExpensesChartCard = ({ data, filterType, total }: ExpensesChartCardProps) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">
        Despesas por Categoria ({filterType})
      </h2>
      
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Gráfico */}
        <div className="w-full md:w-1/2 h-50">
          <ExpensesPieChart data={data} />
        </div>
        
        {/* Legenda */}
        <div className="w-full md:w-1/2 space-y-2 max-h-50 overflow-y-auto">
          {data.map(item => {
            const percentage = total > 0 ? ((item.amount / total) * 100).toFixed(1) : '0';
            return (
              <div key={item.category} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-300">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-white font-medium">
                    {item.amount.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};