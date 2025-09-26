<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Quiz;

class QuestionController extends Controller
{
    // List all questions for a quiz
    public function index(Quiz $quiz)
    {
        return response()->json($quiz->questions);
    }

    // Create a new question
    public function store(Request $request, Quiz $quiz)
    {
        $request->validate([
            'text' => 'required|string',
            'country_id' => 'required|integer',
            'category_id' => 'required|integer',
            'difficulty_id' => 'required|integer',
        ]);

        $question = $quiz->questions()->create($request->only(['text', 'country_id', 'category_id', 'difficulty_id']));
        return response()->json($question, 201);
    }

    // Update question
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'text' => 'required|string',
            'country_id' => 'required|integer',
            'category_id' => 'required|integer',
            'difficulty_id' => 'required|integer',
        ]);

        $question->update($request->only(['text', 'country_id', 'category_id', 'difficulty_id']));
        return response()->json($question);
    }

    // Delete question
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json(['message' => 'Question deleted']);
    }
}
