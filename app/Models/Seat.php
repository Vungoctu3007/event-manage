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
        'event_id',
        'map_id',          // thêm map_id để biết ghế thuộc sơ đồ nào
        'seat_number',
        'seat_row',
        'section',
        'status',
        'reserved_until',
        'ticket_id',       // nếu ghế đã bán
        'x',               // vị trí x trên sơ đồ
        'y',               // vị trí y trên sơ đồ
        'width',           // kích thước ghế (nếu cần)
        'height',          // kích thước ghế (nếu cần)
    ];

    // Quan hệ
    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function map()
    {
        return $this->belongsTo(SeatingMap::class, 'map_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'seat_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }
}
