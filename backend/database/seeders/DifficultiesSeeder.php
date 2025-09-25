<?php
use Illuminate\Database\Seeder;
use App\Models\Difficulty;

class DifficultiesSeeder extends Seeder
{
    public function run(): void
    {
        Difficulty::insert([
            ['level' => 'easy'],
            ['level' => 'medium'],
            ['level' => 'hard'],
        ]);
    }
}
