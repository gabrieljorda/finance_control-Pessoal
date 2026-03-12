import type { Transaction, Category, DashboardData } from '../types/finances';

// Categorias pré-definidas
export const mockCategories: Category[] = [
  { id: '1', name: 'Alimentação', type: 'expense', color: '#EF4444', icon: '🍔' },
  { id: '2', name: 'Transporte', type: 'expense', color: '#3B82F6', icon: '🚗' },
  { id: '3', name: 'Moradia', type: 'expense', color: '#10B981', icon: '🏠' },
  { id: '4', name: 'Lazer', type: 'expense', color: '#F59E0B', icon: '🎮' },
  { id: '5', name: 'Saúde', type: 'expense', color: '#8B5CF6', icon: '🏥' },
  { id: '6', name: 'Salário', type: 'income', color: '#059669', icon: '💰' },
  { id: '7', name: 'Freelance', type: 'income', color: '#2563EB', icon: '💻' },
];

// Transações mockadas
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário Mensal',
    amount: 5000,
    type: 'income',
    category: 'Salário',
    date: '2026-03-05',
    paymentMethod: 'transfer',
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: 450,
    type: 'expense',
    category: 'Alimentação',
    date: '2026-03-06',
    paymentMethod: 'debit',
  },
  {
    id: '3',
    description: 'Uber',
    amount: 35,
    type: 'expense',
    category: 'Transporte',
    date: '2026-03-07',
    paymentMethod: 'credit',
  },
  {
    id: '4',
    description: 'Cinema',
    amount: 60,
    type: 'expense',
    category: 'Lazer',
    date: '2026-03-08',
    paymentMethod: 'debit',
  },
  {
    id: '5',
    description: 'Freelance Website',
    amount: 1200,
    type: 'income',
    category: 'Freelance',
    date: '2026-03-09',
    paymentMethod: 'transfer',
  },
  {
    id: '6',
    description: 'Aluguel',
    amount: 1500,
    type: 'expense',
    category: 'Moradia',
    date: '2026-03-01',
    paymentMethod: 'transfer',
  },
  {
    id: '7',
    description: 'Academia',
    amount: 100,
    type: 'expense',
    category: 'Saúde',
    date: '2026-03-02',
    paymentMethod: 'credit',
  },
  {
    id: '8',
    description: 'Restaurante',
    amount: 120,
    type: 'expense',
    category: 'Alimentação',
    date: '2026-03-03',
    paymentMethod: 'debit',
  },
  {
    id: '9',
    description: 'Gasolina',
    amount: 200,
    type: 'expense',
    category: 'Transporte',
    date: '2026-03-04',
    paymentMethod: 'debit',
  },
  {
    id: '10',
    description: 'Presente',
    amount: 150,
    type: 'expense',
    category: 'Lazer',
    date: '2026-03-10',
    paymentMethod: 'credit',
  },
];

// Função para calcular dados do dashboard
export const getDashboardData = (): DashboardData => {
  const currentMonth = '2026-03'; // Março de 2026
  
  // Filtrar transações do mês atual
  const monthlyTransactions = mockTransactions.filter(t => 
    t.date.startsWith(currentMonth)
  );

  // Calcular receitas do mês
  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular despesas do mês
  const monthlyExpense = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calcular saldo total (todas as transações)
  const balance = mockTransactions.reduce((sum, t) => 
    t.type === 'income' ? sum + t.amount : sum - t.amount, 0
  );

  // Despesas por categoria
  const expensesByCategory = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(item => item.category === t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        const category = mockCategories.find(c => c.name === t.category);
        acc.push({
          category: t.category,
          amount: t.amount,
          color: category?.color || '#6B7280'
        });
      }
      return acc;
    }, [] as { category: string; amount: number; color: string; }[]);

  // Evolução mensal (últimos 6 meses)
  const monthlyEvolution = [
    { month: 'Out/25', income: 4800, expense: 3200 },
    { month: 'Nov/25', income: 5200, expense: 3400 },
    { month: 'Dez/25', income: 6200, expense: 4100 },
    { month: 'Jan/26', income: 5100, expense: 3300 },
    { month: 'Fev/26', income: 5300, expense: 3500 },
    { month: 'Mar/26', income: monthlyIncome, expense: monthlyExpense },
  ];

  return {
    balance,
    monthlyIncome,
    monthlyExpense,
    recentTransactions: mockTransactions.slice(0, 10),
    expensesByCategory,
    monthlyEvolution,
  };
};