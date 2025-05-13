<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Event extends Model
{
    use Notifiable, HasFactory;

    protected $primaryKey = 'event_id';

    public $timestamps = false;

    protected $fillable = [
        'organizer_id',
        'category_id',
        'venue_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'status',
        'banner_url',
        'logo_url',
        'background_url',
    ];

    public function organizer()
    {
        return $this->belongsTo(Organizer::class, 'organizer_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class, 'venue_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'event_id');
    }

    public function seats()
    {
        return $this->hasMany(Seat::class, 'event_id');
    }

    public function reviews()
    {
        return $this->hasMany(EventReview::class, 'event_id');
    }
}
