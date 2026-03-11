// src/components/dashboard/charts/CustomTooltip.tsx
import { formatCurrency } from '../../../utils/formatters';

interface TooltipPayload {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  total?: number;
}

export const CustomTooltip = ({ active, payload, total = 0 }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
      <p className="text-white font-medium mb-1">{item.name}</p>
      <p className="text-purple-400 font-semibold">
        {formatCurrency(item.value)}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {percentage}% do total
      </p>
    </div>
  );
};