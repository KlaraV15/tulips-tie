<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\Option;

class OptionsSeeder extends Seeder
{
    public function run(): void
    {
        $questions = Question::all();

        foreach ($questions as $question) {
            // Create 4 options per question
            Option::factory(4)->create([
                'question_id' => $question->id,
            ])->each(function ($option, $index) {
                // Make the first option correct
                if ($index === 0) $option->update(['is_correct' => true]);
            });
        }
    }
}
