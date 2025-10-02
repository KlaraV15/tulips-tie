<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizController;

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
Route::middleware('auth:sanctum')->group(function () {
    // User profile
    Route::get('user', [UserController::class, 'profile']);
    Route::post('logout', [UserController::class, 'logout']);
    Route::post('resetpassword', [AuthController::class, 'resetPassword']);
});

// Fetch user results
Route::get('users/{user}/results', [ResultController::class, 'userResults']);

// Random quiz route
Route::get('quizzes/random', [QuizController::class, 'getRandomQuiz']);
Route::apiResource('quizzes', QuizController::class);


//questions CRUD actions
Route::apiResource('questions', QuestionsController::class);

//store results (requires authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('results', [ResultController::class, 'store']);
});

// Leaderboard and statistics endpoints
Route::get('leaderboard', [ResultController::class, 'leaderboard']);
Route::get('stats/general', [ResultController::class, 'getGeneralStats']);
Route::get('stats/user/{user}', [ResultController::class, 'getUserStats']);

// Admin endpoints
Route::get('admin/users/recent', [UserController::class, 'getRecentUsers']);


Route::apiResource('categories', CategoryController::class)->only(['index']);
Route::apiResource('countries', CountryController::class)->only(['index']);
Route::apiResource('difficulties', DifficultyController::class)->only(['index']);
Route::apiResource('users', UserController::class)->only(['index']);





//});

// ---------------------------
// PUBLIC ROUTES
// ---------------------------


// Lookup tables (categories, countries, difficulties)
