<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'creator_id',
    ];

    protected $appends = [
        'predominant_difficulty',
        'predominant_category',
        'predominant_country'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id', 'id');
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class)->withTimestamps();
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    // Calculate the most common difficulty among quiz questions
    public function getPredominantDifficultyAttribute()
    {
        if (!$this->relationLoaded('questions')) {
            return null;
        }

        $difficultyCounts = [];
        foreach ($this->questions as $question) {
            $diffId = $question->difficulty_id;
            $diffLevel = $question->difficulty?->level ?? 'Unknown';
            $difficultyCounts[$diffId] = [
                'level' => $diffLevel,
                'count' => ($difficultyCounts[$diffId]['count'] ?? 0) + 1
            ];
        }

        if (empty($difficultyCounts)) {
            return null;
        }

        // Find the difficulty with the highest count
        $maxCount = max(array_column($difficultyCounts, 'count'));
        $predominantDiff = array_find($difficultyCounts, function ($diff) use ($maxCount) {
            return $diff['count'] === $maxCount;
        });

        return $predominantDiff ? $predominantDiff['level'] : 'Mixed';
    }

    // Calculate the most common category among quiz questions
    public function getPredominantCategoryAttribute()
    {
        if (!$this->relationLoaded('questions')) {
            return null;
        }

        $categoryCounts = [];
        foreach ($this->questions as $question) {
            $catId = $question->category_id;
            $catName = $question->category?->name ?? 'Unknown';
            $categoryCounts[$catId] = [
                'name' => $catName,
                'count' => ($categoryCounts[$catId]['count'] ?? 0) + 1
            ];
        }

        if (empty($categoryCounts)) {
            return null;
        }

        // Find the category with the highest count
        $maxCount = max(array_column($categoryCounts, 'count'));
        $predominantCat = array_find($categoryCounts, function ($cat) use ($maxCount) {
            return $cat['count'] === $maxCount;
        });

        return $predominantCat ? $predominantCat['name'] : 'Mixed';
    }

    // Calculate the most common country among quiz questions
    public function getPredominantCountryAttribute()
    {
        if (!$this->relationLoaded('questions')) {
            return null;
        }

        $countryCounts = [];
        foreach ($this->questions as $question) {
            $countryId = $question->country_id;
            $countryName = $question->country?->name ?? 'Unknown';
            $countryCounts[$countryId] = [
                'name' => $countryName,
                'count' => ($countryCounts[$countryId]['count'] ?? 0) + 1
            ];
        }

        if (empty($countryCounts)) {
            return null;
        }

        // Find the country with the highest count
        $maxCount = max(array_column($countryCounts, 'count'));
        $predominantCountry = array_find($countryCounts, function ($country) use ($maxCount) {
            return $country['count'] === $maxCount;
        });

        return $predominantCountry ? $predominantCountry['name'] : 'Mixed';
    }
}

// Helper function for array operations
if (!function_exists('array_find')) {
    function array_find(array $array, callable $callback)
    {
        foreach ($array as $key => $value) {
            if ($callback($value, $key)) {
                return $array[$key];
            }
        }
        return null;
    }
}
