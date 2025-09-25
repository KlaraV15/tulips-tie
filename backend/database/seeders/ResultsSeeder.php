<?php

use Illuminate\Database\Seeder;
use App\Models\Result;
use App\Models\User;
use App\Models\Quiz;

class ResultsSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $quiz = Quiz::first();

        Result::create([
            'user_id' => $user->id,
            'quiz_id' => $quiz->id,
            'score' => rand(0, 100),
        ]);
    }
}
