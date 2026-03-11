// src/components/dashboard/charts/ChartLegend.tsx
import { formatCurrency } from '../../../utils/formatters';

interface ChartLegendProps {
  data: Array<{ category: string; amount: number }>;
}

export const ChartLegend = ({ data }: ChartLegendProps) => {
  return (
    <ul className="space-y-1">
      {data.map((item) => (
        <li key={item.category} className="flex justify-between text-sm">
          <span className="text-gray-300">{item.category}</span>
          <span className="text-white font-medium">
            {formatCurrency(item.amount)}
          </span>
        </li>
      ))}
    </ul>
  );
};