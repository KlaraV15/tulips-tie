import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Component that renders children based on user role
 *
 * @param {string} role - Required role ('admin' or 'user')
 * @param {React.ReactNode} children - Content to render if user has required role
 * @param {React.ReactNode} fallback - Optional fallback content if user doesn't have role
 */
export const RoleBasedRender = ({ role, children, fallback = null }) => {
  const { user } = useAuth();

  if (user?.role === role) {
    return children;
  }

  return fallback;
};

/**
 * Component that renders content only for admin users
 */
export const AdminOnly = ({ children, fallback = null }) => (
  <RoleBasedRender
    role="admin"
    fallback={fallback}>
    {children}
  </RoleBasedRender>
);

/**
 * Component that renders content only for regular users
 */
export const UserOnly = ({ children, fallback = null }) => (
  <RoleBasedRender
    role="user"
    fallback={fallback}>
    {children}
  </RoleBasedRender>
);

export default RoleBasedRender;
