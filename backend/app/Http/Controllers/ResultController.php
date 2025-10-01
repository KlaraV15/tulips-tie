<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\Quiz;

class ResultController extends Controller
{

    public function index() {
       // 'results?user=12'



    }

    public function show() {

    }




    // Submit a result for a quiz
    public function store(Request $request, Quiz $quiz)
    {
        $request->validate([
            'score' => 'required|integer|min:0|max:100',
        ]);

        $result = Result::create([
            'user_id' => $request->user()->id,
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
}
