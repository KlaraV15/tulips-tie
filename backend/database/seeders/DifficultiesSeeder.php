<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Difficulty;

class DifficultiesSeeder extends Seeder
{
    public function run(): void
    {
        $levels = ['Easy', 'Medium', 'Hard'];

        foreach ($levels as $level) {
            Difficulty::firstOrCreate(['level' => $level]);
        }
    }
}
