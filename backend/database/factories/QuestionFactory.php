<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    protected $model = Question::class;

    public function definition(): array
    {
        return [
            'text' => $this->faker->sentence(10), // or ->sentence(10)
            'country_id' => 1,   // will be overridden in seeder
            'category_id' => 1,  // will be overridden in seeder
            'difficulty_id' => 1, // will be overridden in seeder
        ];
    }
}
