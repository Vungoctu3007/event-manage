<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ScheduleEvent extends Model
{
    use Notifiable, HasFactory;
    protected $table = 'schedule_events';
    protected $primaryKey = 'schedule_id';
    protected $fillable = [
        'event_id',
        'schedule_type',
        'start_time',
        'end_time',
    ];
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id', 'event_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'schedule_id', 'schedule_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'schedule_id', 'schedule_id');
    }
}
