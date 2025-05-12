<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Payment extends Model
{
    use Notifiable, HasFactory;
    protected $primaryKey = 'payment_id';

    protected $fillable = ['order_id', 'payment_method', 'payment_status'];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
