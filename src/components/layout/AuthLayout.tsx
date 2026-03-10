import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-md p-8 border border-gray-800 shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-400">
              {subtitle}
            </p>
          )}
        </div>

        {children}

        <p className="text-center text-sm text-gray-500 mt-6">
          Versão pessoal • Controle suas finanças
        </p>
      </div>
    </div>
  );
};
