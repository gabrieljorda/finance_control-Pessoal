import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const Card = ({ children, className = '', padding = 'medium' }: CardProps) => {
  const paddings = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <div className={`
      bg-white rounded-xl shadow-2xl
      ${paddings[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};