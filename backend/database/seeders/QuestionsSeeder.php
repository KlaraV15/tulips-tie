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
        $quiz = Quiz::first();
        $country = Country::first();
        $category = Category::first();
        $difficulty = Difficulty::first();

        Question::factory(5)->create([
            'quiz_id' => $quiz->id,
            'country_id' => $country->id,
            'category_id' => $category->id,
            'difficulty_id' => $difficulty->id,
        ]);
    }
}
