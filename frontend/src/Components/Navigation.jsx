import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AdminOnly, UserOnly } from './auth/RoleBasedRender';
import { Button } from './ui/Button';
import { Shield, User, BarChart3 } from 'lucide-react';

export default function Navigation() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      {/* User-specific navigation */}
      <UserOnly>
        <Link to="/categories">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Browse Quizzes
          </Button>
        </Link>
      </UserOnly>

      {/* Admin-specific navigation */}
      <AdminOnly>
        <Link to="/admin/dashboard">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
        <Link to="/admin/users/recent">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Manage Users
          </Button>
        </Link>
      </AdminOnly>

      {/* Common logout button */}
      <Button
        onClick={logout}
        variant="outline"
        size="sm"
        className="text-red-600 border-red-400 hover:bg-red-50 hover:text-red-700 hover:border-red-500">
        Logout
      </Button>
    </div>
  );
}
