// src/pages/NotFoundPage.tsx
import { useNavigate } from 'react-router-dom';
import { usePageNotFound } from '../hooks/usePageNotFound';

function NotFoundPage() {
  const navigate = useNavigate();
  usePageNotFound();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-extrabold text-brand-800 mb-4">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Página no encontrada</h1>
        <p className="text-slate-500 mb-8">
          La ruta que buscas no existe o fue movida.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-brand-800 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;