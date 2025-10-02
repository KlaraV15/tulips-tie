<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\User;

class ResultController extends Controller
{

    public function index()
    {
        // 'results?user=12'


    }

    public function show() {}


    // Submit a result for a quiz
    public function store(Request $request)
    {
        // Validate quiz_id first
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'score' => 'required|integer|min:0',
        ]);

        $quiz = Quiz::find($request->quiz_id);

        // Calculate max possible score based on quiz questions and difficulty
        $maxPossibleScore = $quiz->questions()->count() * 20; // Assume max 20 points per question

        // Validate score against calculated maximum
        if ($request->score > $maxPossibleScore) {
            return response()->json(['error' => 'Score exceeds maximum possible score'], 422);
        }

        // Try to get authenticated user
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }

        $result = Result::create([
            'user_id' => $user->id,
            'quiz_id' => $quiz->id,
            'score' => $request->score,
        ]);

        return response()->json($result, 201);
    }


    // Get results for a user
    public function userResults($userId)
    {
        return response()->json(Result::where('user_id', $userId)->with('quiz')->get());
    }

    public function leaderboard()
    {
        // Get leaderboard: users ranked by total score
        $leaderboard = Result::selectRaw('
                user_id,
                SUM(score) as total_score,
                COUNT(*) as games_played,
                MAX(created_at) as last_played,
                AVG(score) as average_score
            ')
            ->with('user:id,username')
            ->groupBy('user_id')
            ->having('total_score', '>', 0)
            ->orderBy('total_score', 'desc')
            ->limit(50)
            ->get();

        return response()->json($leaderboard);
    }

    public function getUserStats($userId)
    {
        $stats = Result::where('user_id', $userId)
            ->selectRaw('
                COUNT(*) as games_played,
                SUM(score) as total_score,
                AVG(score) as average_score,
                MAX(score) as best_score,
                MAX(created_at) as last_played
            ')
            ->first();

        return response()->json($stats);
    }

    public function getGeneralStats()
    {
        $stats = [
            'total_results' => Result::count(),
            'total_users_with_results' => Result::distinct()->count('user_id'),
            'total_quizzes' => Quiz::count(),
            'total_questions' => Question::count(),
            'total_users' => User::count(),
            'average_score' => Result::avg('score'),
        ];

        return response()->json($stats);
    }
}
