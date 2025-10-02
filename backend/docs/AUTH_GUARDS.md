# Authentication Guards and Role-Based Access Control

This document describes the role-based authentication system implemented in the Laravel backend.

## Overview

The application implements a role-based access control (RBAC) system with two user roles:

-   **`user`** - Regular users with standard permissions
-   **`admin`** - Administrators with elevated permissions

## User Model

The `User` model includes:

-   Default role assignment (`user` role by default)
-   Helper methods for role checking:
    -   `isAdmin()` - Checks if user has admin role
    -   `isUser()` - Checks if user has user role

```php
// User model attributes
protected $attributes = [
    'role' => 'user',
];

// Helper methods
public function isAdmin(): bool
{
    return $this->role === 'admin';
}

public function isUser(): bool
{
    return $this->role === 'user';
}
```

## Middleware

### RoleMiddleware

Checks if the authenticated user has a specific role.

**Usage:**

```php
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Admin-only routes
});
```

**Parameters:**

-   `role` - Required role ('user' or 'admin')

**Response:**

-   401 if not authenticated
-   403 if user doesn't have required role
-   Proceeds to route if user has required role

### AdminMiddleware

Simplified middleware specifically for admin access.

**Usage:**

```php
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Admin-only routes
});
```

**Response:**

-   401 if not authenticated
-   403 if user is not admin
-   Proceeds to route if user is admin

## Route Protection Examples

### 1. Admin Protected Routes

```php
// admin.php routes file
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users/recent', [UserController::class, 'getRecentUsers']);
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::apiResource('users', UserController::class);
});
```

### 2. Role-Based Routes

```php
// Different permissions based on role
Route::middleware('auth:sanctum')->group(function () {
    // Admin can create/update/delete categories
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    });

    // Regular users can create/update quizzes
    Route::middleware('role:user')->group(function () {
        Route::apiResource('quizzes', QuizController::class)->except(['index', 'show']);
    });
});
```

### 3. Mixed Route Protection

```php
// Public routes (no authentication required)
Route::apiResource('quizzes', QuizController::class)->only(['index', 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [UserController::class, 'profile']);
    Route::post('logout', [UserController::class, 'logout']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('admin/users/recent', [UserController::class, 'getRecentUsers']);
});
```

## Authentication Flow

1. **Registration/Login**: User registers or logs in and receives an authentication token
2. **Token Validation**: Subsequent API calls include the token in headers
3. **Middleware Processing**:
    - `auth:sanctum` validates the token
    - `role:admin` or `admin` checks user role
    - Route executes if all checks pass

## Error Responses

### Authentication Errors

```json
{
    "message": "Unauthorized"
}
```

HTTP Status: 401

### Authorization Errors

```json
{
    "message": "Access denied. Admin access required."
}
```

```json
{
    "message": "Access denied. Insufficient permissions."
}
```

HTTP Status: 403

## Creating Custom Roles

### 1. Update User Model

```php
// Add new role check methods
public function isSuperAdmin(): bool
{
    return $this->role === 'super_admin';
}
```

### 2. Create Custom Middleware

```php
// Create custom middleware for specific roles
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    // Super admin routes
});
```

### 3. Update User Factory (for testing)

```php
// Add new role options for testing
$roles = ['user', 'admin', 'super_admin'];
$this->faker->randomElement($roles);
```

## Testing

### Example Tests

```php
public function test_admin_can_access_admin_routes()
{
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin, 'sanctum')
        ->get('/api/admin/users/recent');

    $response->assertStatus(200);
}

public function test_user_cannot_access_admin_routes()
{
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user, 'sanctum')
        ->get('/api/admin/users/recent');

    $response->assertStatus(403);
}
```

## Security Considerations

1. **Token Validation**: Always validate tokens on protected routes
2. **Role Verification**: Verify roles on every protected resource
3. **Error Handling**: Provide appropriate error messages without exposing sensitive information
4. **Middleware Order**: Place auth middleware before role middleware
5. **Database Seeding**: Ensure admin users are created with proper roles during seeding

## Migration and Seeding

### User Migration

Ensure users table has role column:

```php
$table->string('role')->default('user');
```

### Admin User Seeding

```php
// Create admin user during seeding
User::create([
    'username' => 'admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('password'),
    'role' => 'admin'
]);
```
