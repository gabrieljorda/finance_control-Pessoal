import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyBarChartProps {
  data: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export const MonthlyBarChart = ({ data }: MonthlyBarChartProps) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" tickFormatter={(value) => formatCurrency(value)} />
          
          
          <Tooltip
            formatter={(value: any, name: any) => {
              const label = name === 'income' ? 'Receitas' : 'Despesas';
              return [formatCurrency(value), label];
            }}
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#fff'
            }}
          />
          
          <Legend 
            formatter={(value) => {
              const names = { income: 'Receitas', expense: 'Despesas' };
              return <span className="text-gray-300">{names[value as keyof typeof names]}</span>;
            }}
          />
          <Bar dataKey="income" fill="#10B981" name="income" />
          <Bar dataKey="expense" fill="#EF4444" name="expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};