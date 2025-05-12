<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class QRCode extends Model
{
     use Notifiable, HasFactory;
     protected $table = 'qr_codes';
    protected $primaryKey = 'qr_id';
    protected $fillable = [
        'order_item_id',
        'qr_token',
        'is_checked_in',
        'checked_in_time',
    ];
    protected $casts = [
        'is_checked_in' => 'boolean',
        'checked_in_time' => 'datetime',
    ];
    public $timestamps = false;

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class, 'order_item_id', 'order_item_id');
    }
}
