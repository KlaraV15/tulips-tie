<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\Country;
use App\Models\Category;
use App\Models\Difficulty;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    protected $model = Question::class;

    public function definition(): array
    {
        return [
            'quiz_id' => Quiz::factory(),
            'text' => $this->faker->sentence(),
            'country_id' => Country::factory(),
            'category_id' => Category::factory(),
            'difficulty_id' => Difficulty::factory(),
        ];
    }
}
