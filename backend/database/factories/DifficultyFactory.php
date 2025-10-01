<?php

namespace Database\Factories;

use App\Models\Difficulty;
use Illuminate\Database\Eloquent\Factories\Factory;

class DifficultyFactory extends Factory
{
    protected $model = Difficulty::class;

    public function definition(): array
    {
        return [
            'level' => $this->faker->unique()->randomElement(['easy', 'medium', 'hard']),
        ];
    }
}
