<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountriesSeeder extends Seeder
{
    public function run(): void
    {
        $countries = ['Netherlands', 'Croatia'];

        foreach ($countries as $country) {
            Country::firstOrCreate(['name' => $country]);
        }
    }
}
