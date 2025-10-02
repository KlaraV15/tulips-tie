<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        return response()->json(User::all());
    }

    // Logout user (revoke token)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    // Get current authenticated user
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // Get recent users with stats (for admin)
    public function getRecentUsers()
    {
        $recentUsers = User::select('users.*')
            ->leftJoin('results', 'users.id', '=', 'results.user_id')
            ->selectRaw(
                'users.*,
                COUNT(results.id) as games_played,
                COALESCE(SUM(results.score), 0) as total_score,
                COALESCE(MAX(results.created_at), users.created_at) as last_activity'
            )
            ->groupBy('users.id')
            ->orderBy('users.created_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json($recentUsers);
    }
}
