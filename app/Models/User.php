<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable, HasFactory;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'full_name',
        'email',
        'password_hash',
        'phone_number',
        'role',
    ];

    protected $hidden = [
        'password_hash',
    ];

    // Relations
    public function organizer()
    {
        return $this->hasOne(Organizer::class, 'user_id', 'user_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id', 'user_id');
    }

    public function reviews()
    {
        return $this->hasMany(EventReview::class, 'user_id', 'user_id');
    }
}
