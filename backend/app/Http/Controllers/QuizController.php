<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizController extends Controller
{
    // List all quizzes
    public function index()
    {
        return response()->json(Quiz::with('creator')->withCount('questions')->get());
    }

    // Show single quiz
    public function show(Quiz $quiz)
    {
        return response()->json($quiz->load('creator', 'questions'));
    }

    // Create a new quiz
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $quiz = Quiz::create([
            'title' => $request->title,
            'description' => $request->description,
            'creator_id' => $request->user()->id,
        ]);

        return response()->json($quiz, 201);
    }

    // Update a quiz
    public function update(Request $request, Quiz $quiz)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $quiz->update($request->only(['title', 'description']));
        return response()->json($quiz);
    }

    // Delete a quiz
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json(['message' => 'Quiz deleted']);
    }
}
