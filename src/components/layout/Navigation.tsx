// src/components/layout/Navigation.tsx
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, List, PlusCircle } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transações', icon: List },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  location.pathname === to
                    ? 'border-purple-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          
          {/* Botão rápido de nova transação */}
          <Link
            to="/transactions?new=true"
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <PlusCircle size={18} />
            <span className="hidden sm:inline">Nova</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};