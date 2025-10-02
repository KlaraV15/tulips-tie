<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Check if user is authenticated
        if (!auth('sanctum')->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth('sanctum')->user();

        // Check if user has the required role
        if ($user->role !== $role) {
            return response()->json(['message' => 'Access denied. Insufficient permissions.'], 403);
        }

        return $next($request);
    }
}
