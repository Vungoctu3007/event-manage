<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class OrderItem extends Model
{
     use Notifiable, HasFactory;
    protected $primaryKey = 'order_item_id';

    protected $fillable = ['order_id', 'ticket_id', 'quantity', 'price_each', 'seat_id'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id');
    }
}
