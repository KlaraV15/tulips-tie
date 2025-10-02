/**
 * Authentication and authorization utilities
 */

/**
 * Check if user has specific role
 * @param {Object} user - User object from auth context
 * @param {string} role - Required role ('admin' or 'user')
 * @returns {boolean}
 */
export const hasRole = (user, role) => {
  return user?.role === role;
};

/**
 * Check if user is admin
 * @param {Object} user - User object from auth context
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return hasRole(user, 'admin');
};

/**
 * Check if user is regular user
 * @param {Object} user - User object from auth context
 * @returns {boolean}
 */
export const isUser = (user) => {
  return hasRole(user, 'user');
};

/**
 * Get user role display name
 * @param {Object} user - User object from auth context
 * @returns {string}
 */
export const getRoleDisplayName = (user) => {
  if (!user?.role) return 'Guest';
  return user.role === 'admin' ? 'Administrator' : 'User';
};

/**
 * Check if user can access admin features
 * @param {Object} user - User object from auth context
 * @returns {boolean}
 */
export const canAccessAdmin = (user) => {
  return isAdmin(user);
};

/**
 * Check if user can access user features
 * @param {Object} user - User object from auth context
 * @returns {boolean}
 */
export const canAccessUser = (user) => {
  return isUser(user) || isAdmin(user); // Admin can access user features too
};
