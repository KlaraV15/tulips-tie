import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Hook to protect routes based on authentication and roles
 */
export const useAuthGuard = () => {
  const { isAuthenticated, isAdmin, isUser, user, loading } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  const requireAuth = () => {
    if (loading) return null; // Show loading spinner
    if (!isAuthenticated) {
      return (
        <Navigate
          to="/login"
          state={{ from: location }}
          replace
        />
      );
    }
    return null;
  };

  // Redirect if user is admin
  const requireAdmin = () => {
    if (loading) return null;
    if (!isAuthenticated) {
      return (
        <Navigate
          to="/login"
          state={{ from: location }}
          replace
        />
      );
    }
    if (!isAdmin) {
      return (
        <Navigate
          to="/"
          replace
        />
      );
    }
    return null;
  };

  // Redirect if user is regular user
  const requireUser = () => {
    if (loading) return null;
    if (!isAuthenticated) {
      return (
        <Navigate
          to="/login"
          state={{ from: location }}
          replace
        />
      );
    }
    if (!isUser) {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }
    return null;
  };

  return {
    requireAuth,
    requireAdmin,
    requireUser,
    isAuthenticated,
    isAdmin,
    isUser,
    user,
    loading,
  };
};
