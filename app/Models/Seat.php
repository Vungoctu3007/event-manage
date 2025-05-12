<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Seat extends Model
{
    use Notifiable, HasFactory;
    protected $primaryKey = 'seat_id';

    protected $fillable = [
        'venue_id',
        'event_id',
        'seat_number',
        'seat_row',
        'section',
        'status',
        'reserved_until'
    ];

    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'seat_id');
    }
}
