import { RADIAN, CHART_CONFIG } from './constants';

// 1. Primeiro, definimos a interface das props
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string; // O Recharts também passa o nome
  value: number; // E o valor
}

// 2. Exportamos uma FUNÇÃO, não um componente
export const CustomLabel = (props: LabelProps) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent  } = props;

  // Não mostra labels muito pequenos
  if (percent < CHART_CONFIG.minPercentageForLabel) return null;

  // Calcula posição do label
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};