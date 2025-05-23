<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Ticket extends Model
{
    use Notifiable, HasFactory;
    
    protected $primaryKey = 'ticket_id';

    protected $fillable = [
        'schedule_id',
        'ticket_name',
        'ticket_type',
        'price',
        'total_quantity',
        'sold_quantity',
        'sale_start',
        'sale_end',
        'description',
        'image_url',
    ];

    public function schedule()
    {
        return $this->belongsTo(ScheduleEvent::class, 'schedule_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'ticket_id');
    }
}