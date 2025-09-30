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
//Route::middleware('auth:sanctum')->group(function () {

    // User profile
    Route::get('user', [UserController::class, 'profile']);
    Route::post('logout', [UserController::class, 'logout']);





// Fetch user results
Route::get('users/{user}/results', [ResultController::class, 'userResults']);


    Route::apiResource('quizzes', QuizController::class);


    //questions CRUD actions
    Route::apiResource('questions', QuestionsController::class);

    //store results
    Route::apiResource('results', ResultController::class)->only(['store'/*,'index','show'*/]);


    Route::apiResource('categories', CategoryController::class)->only(['index']);
    Route::apiResource('countries', CountryController::class)->only(['index']);
    Route::apiResource('difficulties', DifficultyController::class)->only(['index']);






//});

// ---------------------------
// PUBLIC ROUTES
// ---------------------------


// Lookup tables (categories, countries, difficulties)




