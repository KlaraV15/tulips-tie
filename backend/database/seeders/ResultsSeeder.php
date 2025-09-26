<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Result;
use App\Models\User;
use App\Models\Quiz;

class ResultsSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $quizzes = Quiz::all();

        foreach ($users as $user) {
            $quiz = $quizzes->random();
            Result::factory()->create([
                'user_id' => $user->id,
                'quiz_id' => $quiz->id,
            ]);
        }
    }
}
