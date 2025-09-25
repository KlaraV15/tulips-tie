<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'text',
        'country_id',
        'category_id',
        'difficulty_id',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function difficulty()
    {
        return $this->belongsTo(Difficulty::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }
}
