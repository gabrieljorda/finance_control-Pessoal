// src/components/dashboard/charts/ExpensesPieChart.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useMemo } from 'react';
import { EmptyChart } from './EmptyChart';
import { CustomLabel } from './CustomLabel';
import { CustomTooltip } from './CustomTooltip';
import { ChartLegend } from './ChartLegend';
import { CHART_COLORS, CHART_CONFIG } from './constants';
import type { ChartDataItem } from '../../../types/charts';

interface ExpensesPieChartProps {
  data: ChartDataItem[];
  className?: string;
  showLegend?: boolean;
  showTotal?: boolean;
}

export const ExpensesPieChart = ({ 
  data, 
  className = '',
  showLegend = true,
  showTotal = true 
}: ExpensesPieChartProps) => {
  
  if (!data?.length) {
    return <EmptyChart className={className} />;
  }

  const total = useMemo(() => 
    data.reduce((sum, item) => sum + item.amount, 0), 
    [data]
  );

  return (
    <div className={`w-full ${className}`}>
      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={CHART_CONFIG.outerRadius}
              innerRadius={CHART_CONFIG.innerRadius}
              dataKey="amount"
              nameKey="category"
              paddingAngle={CHART_CONFIG.paddingAngle}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={CHART_COLORS.background}
                  strokeWidth={CHART_CONFIG.strokeWidth}
                />
              ))}
            </Pie>
            
            <Tooltip content={<CustomTooltip total={total} />} />
            
            {showLegend && (
              <Legend 
                content={<ChartLegend data={data} />}
                verticalAlign="bottom"
                height={50}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showTotal && (
        <div className="text-center mt-2 text-sm text-gray-400">
          Total: <span className="text-white font-medium">
            {total.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </span>
        </div>
      )}
    </div>
  );
};