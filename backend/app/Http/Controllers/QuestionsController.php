<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index() {
        return Question::with(['country','category','difficulty'])->get();
    }
}
