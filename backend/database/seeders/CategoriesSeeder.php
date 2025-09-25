<?php
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesSeeder extends Seeder
{
    public function run(): void
    {
        Category::insert([
            ['name' => 'geography'],
            ['name' => 'history'],
            ['name' => 'culture'],
            ['name' => 'politics'],
            ['name' => 'economy'],
            ['name' => 'sports'],
            ['name' => 'nature_wildlife'],
            ['name' => 'fun_facts'],
        ]);
    }
}
