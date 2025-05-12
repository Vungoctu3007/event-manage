<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class SeatingMap extends Model
{
     use Notifiable, HasFactory;
    protected $table = 'seating_maps';
    protected $primaryKey = 'map_id';
    protected $fillable = ['event_id', 'map_type', 'configuration'];
    protected $casts = [
        'configuration' => 'array',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id', 'venue_id');
    }

    public function seats()
    {
        return $this->hasMany(Seat::class, 'map_id', 'map_id');
    }
}
