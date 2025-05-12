<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TicketBooking extends Model
{
     use Notifiable, HasFactory;
    protected $table = 'user_tickets';
    protected $primaryKey = 'ticket_transaction_id';
    protected $fillable = [
        'user_id',
        'ticket_id',
        'quantity',
        'ticket_code',
        'payment_status',
        'purchase_date',
    ];
    protected $casts = [
        'purchase_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id', 'ticket_id');
    }
}
