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
    protected $fillable = [
        'event_id',
        'map_type',
        'configuration',
        'background_image',
        'width',
        'height',
        'scale_ratio',
    ];

    protected $casts = [
        'configuration' => 'array',
        'scale_ratio' => 'float',
        'width' => 'integer',
        'height' => 'integer',
    ];

    // Quan hệ với Event
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

 
    // Quan hệ với các Seat trong sơ đồ này
    public function seats()
    {
        return $this->hasMany(Seat::class, 'map_id', 'map_id');
    }
}
