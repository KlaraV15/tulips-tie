<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return Question::with(['country','category','difficulty'])->get();
    }

    // Create a new question
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'text' => 'required|string',
            'country_id' => 'required|integer|exists:countries,id',
            'category_id' => 'required|integer|exists:categories,id',
            'difficulty_id' => 'required|integer|exists:difficulties,id',
        ]);

        $question = Question::create($request->only(['text', 'country_id', 'category_id', 'difficulty_id']));
        return response()->json($question, 201);
    }

    // Update question
    public function update(Request $request, Question $question): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'text' => 'required|string',
            'country_id' => 'required|integer|exists:countries,id',
            'category_id' => 'required|integer|exists:categories,id',
            'difficulty_id' => 'required|integer|exists:difficulties,id',
        ]);

        $question->update($request->only(['text', 'country_id', 'category_id', 'difficulty_id']));
        return response()->json($question);
    }

    // Delete question
    public function destroy(Question $question): \Illuminate\Http\JsonResponse
    {
        $question->delete();
        return response()->json(['message' => 'Question deleted']);
    }
}
