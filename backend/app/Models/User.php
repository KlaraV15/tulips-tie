<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function quizzes()
    {
        return $this->hasMany(Quiz::class, 'creator_id');
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
