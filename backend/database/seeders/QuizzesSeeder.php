<?php
use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\User;

class QuizzesSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        Quiz::factory(3)->create(['creator_id' => $user->id]);
    }
}
