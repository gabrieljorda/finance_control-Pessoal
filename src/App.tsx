// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FinanceProvider } from './contexts/FinanceContext';
import { AppRoutes } from './routes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <FinanceProvider> {/* ← Envolvemos tudo com o provider */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1F2937',
              color: '#fff',
              border: '1px solid #374151'
            },
          }}
        />
        <AppRoutes />
      </FinanceProvider>
    </BrowserRouter>
  );
}

export default App;