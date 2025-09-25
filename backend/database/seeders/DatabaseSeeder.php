<?php
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsersSeeder::class,
            CountriesSeeder::class,
            CategoriesSeeder::class,
            DifficultiesSeeder::class,
            QuizzesSeeder::class,
            QuestionsSeeder::class,
            OptionsSeeder::class,
            ResultsSeeder::class,
        ]);
    }
}
