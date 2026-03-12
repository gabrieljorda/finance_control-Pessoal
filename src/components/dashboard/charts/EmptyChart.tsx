interface EmptyChartProps {
  className?: string;
}

export const EmptyChart = ({ className = '' }: EmptyChartProps) => {
  return (
    <div className={`h-75 flex items-center justify-center text-gray-400 ${className}`}>
      <div className="text-center">
        <p className="text-lg mb-2">📊 Sem despesas</p>
        <p className="text-sm text-gray-500">Nenhuma despesa registrada no período</p>
      </div>
    </div>
  );
};