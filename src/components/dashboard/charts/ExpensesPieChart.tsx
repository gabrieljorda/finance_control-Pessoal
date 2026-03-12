import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  category: string;
  amount: number;
  color: string;
}

interface ExpensesPieChartProps {
  data: ChartDataItem[];
  className?: string;
}

export const ExpensesPieChart = ({ data, className = '' }: ExpensesPieChartProps) => {
  
  if (!data?.length) {
    return (
      <div className={`w-full h-full flex items-center justify-center text-gray-400 ${className}`}>
        <p className="text-sm">Sem despesas no período</p>
      </div>
    );
  }



  // Constante para conversão de ângulos
  const RADIAN = Math.PI / 180;

  // Função para renderizar as labels com porcentagem
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    // Só mostra porcentagem se for maior que 5%
    if (percent < 0.05) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          fontWeight: 600
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius="90%"
            dataKey="amount"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="#1F2937"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};