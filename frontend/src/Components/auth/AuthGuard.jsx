import React from 'react';
import { useAuthGuard } from '../../hooks/useAuthGuard.jsx';

/**
 * Component that guards routes requiring authentication
 */
export const AuthGuard = ({ children }) => {
  const { requireAuth, loading } = useAuthGuard();

  const redirect = requireAuth();
  if (redirect) return redirect;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
