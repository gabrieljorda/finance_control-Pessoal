// src/components/auth/LoginForm.tsx (atualizado)
import { Link } from 'react-router-dom';
import { Input, Button } from '../ui';
import { useAuth } from '../../hooks/useAuth';
import { DemoCredentials } from './DemoCredentials';

export const LoginForm = () => {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    setDemoCredentials
  } = useAuth();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="E-mail"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="seu@email.com"
      />

      <Input
        label="Senha"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••"
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
      >
        Entrar
      </Button>

      <div className="text-center text-sm text-gray-400">
        Não tem uma conta?{' '}
        <Link to="/register" className="text-purple-400 hover:text-purple-300 transition">
          Cadastre-se
        </Link>
      </div>

      <DemoCredentials onFill={setDemoCredentials} />
    </form>
  );
};