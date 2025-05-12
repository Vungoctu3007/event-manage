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
        'event_id', 'ticket_type', 'price', 'total_quantity',
        'sold_quantity', 'sale_start', 'sale_end'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'ticket_id');
    }
}
