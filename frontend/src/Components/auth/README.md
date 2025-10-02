# Role-Based Access Control (RBAC) Guards

This directory contains components and utilities for implementing role-based access control in the React frontend application.

## Components

### Guards

#### `AuthGuard`

Protects routes that require authentication. Redirects unauthenticated users to the login page.

```jsx
import AuthGuard from './auth/AuthGuard';

<Route
  path="/protected-route"
  element={
    <AuthGuard>
      <ProtectedComponent />
    </AuthGuard>
  }
/>;
```

#### `AdminGuard`

Protects admin-only routes. Redirects non-admin users to the home page.

```jsx
import AdminGuard from './auth/AdminGuard';

<Route
  path="/admin/dashboard"
  element={
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  }
/>;
```

#### `UserGuard`

Protects routes that are only accessible to regular users (not admins).

```jsx
import UserGuard from './auth/UserGuard';

<Route
  path="/user-only"
  element={
    <UserGuard>
      <UserComponent />
    </UserGuard>
  }
/>;
```

### Conditional Rendering

#### `RoleBasedRender`

Base component for role-based conditional rendering.

```jsx
import { RoleBasedRender } from './auth/RoleBasedRender';

<RoleBasedRender role="admin">
  <AdminOnlyContent />
</RoleBasedRender>;
```

#### `AdminOnly`

Renders content only for admin users.

```jsx
import { AdminOnly } from './auth/RoleBasedRender';

<AdminOnly>
  <AdminPanel />
</AdminOnly>

<AdminOnly fallback={<div>Access denied</div>}>
  <AdminPanel />
</AdminOnly>
```

#### `UserOnly`

Renders content only for regular users.

```jsx
import { UserOnly } from './auth/RoleBasedRender';

<UserOnly>
  <UserDashboard />
</UserOnly>;
```

## Hooks

### `useAuthGuard`

Custom hook for implementing guards and checking authentication status.

```jsx
import { useAuthGuard } from '../../hooks/useAuthGuard';

function MyComponent() {
  const { requireAuth, requireAdmin, requireUser, isAuthenticated, isAdmin, user } = useAuthGuard();

  const redirect = requireAuth();
  if (redirect) return redirect;

  return <div>Authenticated content</div>;
}
```

## Utilities

### `authUtils.js`

Utility functions for role checking and authentication.

```jsx
import { hasRole, isAdmin, isUser, getRoleDisplayName } from '../../utils/authUtils';

// Check if user has specific role
if (hasRole(user, 'admin')) {
  // Admin logic
}

// Check if user is admin
if (isAdmin(user)) {
  // Admin logic
}

// Get user role display name
const roleText = getRoleDisplayName(user); // "Administrator" or "User"
```

## Authentication Context

The `AuthContext` provides additional methods for role checking:

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { isAdmin, isUser, hasRole, user } = useAuth();

  return (
    <div>
      {isAdmin && <AdminMenu />}
      {isUser && <UserMenu />}
      {hasRole('admin') && <SuperAdminMenu />}
    </div>
  );
}
```

## Backend API Guards

Backend routes are protected using Laravel middleware:

### Admin Routes

```php
// Protected with admin middleware
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('admin/users/recent', [UserController::class, 'getRecentUsers']);
});
```

### Role-Specific Routes

```php
// Protected with role middleware
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::apiResource('quizzes', QuizController::class)->except(['index', 'show']);
});
```

## User Roles

- **`user`** - Regular users with basic permissions
- **`admin`** - Administrators with full access

## Usage Examples

### 1. Protecting Routes

```jsx
// App.jsx
<Route
  path="/admin/dashboard"
  element={
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  }
/>
```

### 2. Conditional Navigation

```jsx
<AdminOnly>
  <Link to="/admin/dashboard">Admin Dashboard</Link>
</AdminOnly>

<UserOnly>
  <Link to="/profile">My Profile</Link>
</UserOnly>
```

### 3. Component-Level Guards

```jsx
function UserProfile() {
  const { requireAuth } = useAuthGuard();

  const redirect = requireAuth();
  if (redirect) return redirect;

  return <div>User profile content</div>;
}
```

### 4. API Protection

```php
// Backend route protection
Route::middleware(['auth:sanctum', 'admin'])->get('/admin/users', [UserController::class, 'index']);
```
