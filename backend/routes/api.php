<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\DifficultyController;
use App\Http\Controllers\AuthController;
use \App\Http\Controllers\QuestionsController;

// ---------------------------
// AUTH ROUTES (PUBLIC)
// ---------------------------
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// ---------------------------
// PROTECTED ROUTES (AUTH REQUIRED)
// ---------------------------
//Route::middleware('auth:sanctum')->group(function () {

    // User profile
    Route::get('user', [UserController::class, 'profile']);
    Route::post('logout', [UserController::class, 'logout']);

    // Quiz CRUD
    Route::post('quizzes', [QuizController::class, 'store']);
    Route::put('quizzes/{quiz}', [QuizController::class, 'update']);
    Route::delete('quizzes/{quiz}', [QuizController::class, 'destroy']);

    // Question CRUD
    Route::post('quizzes/{quiz}/questions', [QuestionController::class, 'store']);
    Route::put('questions/{question}', [QuestionController::class, 'update']);
    Route::delete('questions/{question}', [QuestionController::class, 'destroy']);

    // Submit quiz result
    Route::post('quizzes/{quiz}/results', [ResultController::class, 'store']);

    // Fetch user results
    Route::get('users/{user}/results', [ResultController::class, 'userResults']);
//});

// ---------------------------
// PUBLIC ROUTES
// ---------------------------

// Fetch quizzes
Route::get('quizzes', [QuizController::class, 'index']);
Route::get('quizzes/{quiz}', [QuizController::class, 'show']);

// Fetch questions for a quiz
Route::get('quizzes/{quiz}/questions', [QuestionController::class, 'index']);

// Lookup tables (categories, countries, difficulties)
Route::get('categories', [CategoryController::class, 'index']);
Route::get('countries', [CountryController::class, 'index']);
Route::get('difficulties', [DifficultyController::class, 'index']);


Route::get('questions', [QuestionsController::class, 'index']);
