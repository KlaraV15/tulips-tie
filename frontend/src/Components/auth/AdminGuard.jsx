import React from 'react';
import { useAuthGuard } from '../../hooks/useAuthGuard.jsx';

/**
 * Component that guards admin routes
 */
export const AdminGuard = ({ children }) => {
  const { requireAdmin, loading } = useAuthGuard();

  const redirect = requireAdmin();
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

export default AdminGuard;
