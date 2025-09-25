<?php

use Illuminate\Database\Seeder;
use App\Models\Option;
use App\Models\Question;

class OptionsSeeder extends Seeder
{
    public function run(): void
    {
        $questions = Question::all();

        foreach ($questions as $question) {
            Option::factory()->count(4)->create([
                'question_id' => $question->id,
            ]);
        }
    }
}
