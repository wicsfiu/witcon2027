import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <p role="status" className="p-8">
        Loading…
      </p>
    );
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
}
