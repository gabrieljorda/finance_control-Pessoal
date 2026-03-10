import { Link } from 'react-router-dom';
import { Input, Button } from '../ui';
import { useRegister } from '../../hooks/useRegister';

export const RegisterForm = () => {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  } = useRegister();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Nome completo"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Digite seu nome"
      />

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

      <Input
        label="Confirmar senha"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="••••••"
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
      >
        Criar conta
      </Button>

      <div className="text-center text-sm text-gray-400">
        Já tem uma conta?{' '}
        <Link to="/login" className="text-purple-400 hover:text-purple-300 transition">
          Fazer login
        </Link>
      </div>
    </form>
  );
};