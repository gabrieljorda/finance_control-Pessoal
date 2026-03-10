import { AuthLayout } from '../components/layout/AuthLayout';
import { LoginForm } from '../components/auth';

export const Login = () => {
  return (
    <AuthLayout
      title="💰 Controle Financeiro Pessoal"
      subtitle="Faça login para acessar suas finanças"
    >
      <LoginForm />
    </AuthLayout>
  );
};