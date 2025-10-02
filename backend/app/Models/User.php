<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory;
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
    ];

    protected $attributes = [
        'role' => 'user',
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

    /**
     * Check if user has admin role
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user has regular user role
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }
}
