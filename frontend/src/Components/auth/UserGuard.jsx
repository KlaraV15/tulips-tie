import React from 'react';
import { useAuthGuard } from '../../hooks/useAuthGuard.jsx';

/**
 * Component that guards user-only routes
 */
export const UserGuard = ({ children }) => {
  const { requireUser, loading } = useAuthGuard();

  const redirect = requireUser();
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

export default UserGuard;
