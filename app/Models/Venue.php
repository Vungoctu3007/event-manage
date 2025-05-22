<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Venue extends Model
{
    use Notifiable, HasFactory;
    protected $primaryKey = 'venue_id';

    protected $fillable = ['name', 'address', 'city'];

    public function events()
    {
        return $this->hasMany(Event::class, 'venue_id');
    }

    public function seats()
    {
        return $this->hasMany(Seat::class, 'venue_id');
    }
}
