<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\Country;
use App\Models\Category;
use App\Models\Difficulty;

class QuestionsSeeder extends Seeder
{
    public function run(): void
    {
        $quizzes = Quiz::all();
        $country = Country::inRandomOrder()->first();
        $category = Category::inRandomOrder()->first();
        $difficulty = Difficulty::inRandomOrder()->first();

        // Create 10 questions
        $questions = Question::factory(10)->create([
            'country_id' => $country->id,
            'category_id' => $category->id,
            'difficulty_id' => $difficulty->id,
        ]);

        // Attach each question to 1–2 random quizzes
        foreach ($questions as $question) {
            $quizIds = $quizzes->random(rand(1, 2))->pluck('id');
            $question->quizzes()->attach($quizIds);
        }
    }
}
