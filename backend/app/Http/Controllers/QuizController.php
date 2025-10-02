<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;

class QuizController extends Controller
{
    // List all quizzes with filtering
    public function index(Request $request)
    {
        $query = Quiz::with(['creator', 'questions.difficulty', 'questions.category', 'questions.country'])
            ->withCount('questions');

        // Filter by country
        if ($request->has('country_id') && $request->country_id && $request->country_id !== 'all') {
            $query->whereHas('questions.country', function ($q) use ($request) {
                $q->where('id', $request->country_id);
            });
        }

        // Filter by difficulty
        if ($request->has('difficulty_id') && $request->difficulty_id && $request->difficulty_id !== 'all') {
            $query->whereHas('questions.difficulty', function ($q) use ($request) {
                $q->where('id', $request->difficulty_id);
            });
        }

        // Filter by category

        if ($request->has('category_id') && $request->category_id && $request->category_id !== 'all') {
            $query->whereHas('questions.category', function ($q) use ($request) {
                $q->where('id', $request->category_id);
            });
        }

        // Filter by title (search)
        if ($request->has('title') && $request->title) {
            $query->where('title', 'LIKE', '%' . $request->title . '%');
        }

        return response()->json($query->get());
    }

    // Show single quiz
    public function show(Quiz $quiz)
    {
        return response()->json($quiz->load('creator', 'questions.options', 'questions.difficulty', 'questions.category', 'questions.country'));
    }

    // Create a new quiz
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*' => 'required|exists:questions,id',
        ]);

        //@TODO - use actual user id for creator_id instead of dummy
        $quiz = Quiz::create([
            'title' => $request->title,
            'description' => $request->description,
            'creator_id' => 1, // $request->user()->id,
        ]);

        $quiz->questions()->sync($request->questions);

        return response()->json($quiz, 201);
    }

    // Update a quiz
    public function update(Request $request, Quiz $quiz)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*' => 'required|exists:questions,id',
        ]);

        $quiz->update($request->only(['title', 'description']));
        $quiz->questions()->sync($request->questions);
        return response()->json($quiz);
    }

    // Delete a quiz
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return response()->json(['message' => 'Quiz deleted']);
    }

    // List all questions for a quiz
    public function getQuizQuestions(Quiz $quiz)
    {
        return response()->json($quiz->questions);
    }

    // Get a random quiz
    public function getRandomQuiz()
    {
        $quiz = Quiz::inRandomOrder()->first();

        if (!$quiz) {
            return response()->json(['message' => 'No quizzes available'], 404);
        }

        return response()->json($quiz);
    }
}
