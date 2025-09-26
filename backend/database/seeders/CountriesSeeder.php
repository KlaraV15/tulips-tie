<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountriesSeeder extends Seeder
{
    public function run(): void
    {
        Country::insert([
            ['name' => 'netherlands'],
            ['name' => 'croatia'],
        ]);
    }
}
