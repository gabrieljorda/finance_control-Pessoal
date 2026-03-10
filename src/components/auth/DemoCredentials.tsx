import { Button } from '../ui';

interface DemoCredentialsProps {
  onFill: () => void;
}

export const DemoCredentials = ({ onFill }: DemoCredentialsProps) => {
  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-lg border-2 border-dashed border-gray-700">
      <p className="text-sm text-gray-400 mb-2">
        <span className="font-semibold text-gray-200">🔑 Dados para teste:</span>
      </p>
      <p className="text-sm text-gray-400 mb-3">
        Email: demo@email.com<br />
        Senha: 123456
      </p>
      <Button
        variant="success"
        onClick={onFill}
        fullWidth
      >
        Preencher dados de teste
      </Button>
    </div>
  );
};