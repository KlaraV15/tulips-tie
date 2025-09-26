<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Result;
use App\Models\Category;
use App\Models\Country;
use App\Models\Difficulty;

// ---------------------------
// TEST ROUTES (No auth)
// ---------------------------

// Quick test JSON
Route::get('test-json', function () {
    return response()->json([
        'message' => 'API is working!',
        'time' => now()
    ]);
});

// Users
Route::get('users', function () {
    return response()->json(User::all());
});

// Quizzes
Route::get('quizzes', function () {
    return response()->json(Quiz::with('creator', 'questions')->get());
});
Route::get('quizzes/{quiz}', function (Quiz $quiz) {
    return response()->json($quiz->load('creator', 'questions'));
});

// Questions
Route::get('questions', function () {
    return response()->json(Question::with('quiz')->get());
});
Route::get('quizzes/{quiz}/questions', function (Quiz $quiz) {
    return response()->json($quiz->questions);
});

// Results
Route::get('results', function () {
    return response()->json(Result::with('user', 'quiz')->get());
});

// Lookup tables
Route::get('categories', function () {
    return response()->json(Category::all());
});
Route::get('countries', function () {
    return response()->json(Country::all());
});
Route::get('difficulties', function () {
    return response()->json(Difficulty::all());
});
