<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class EventReview extends Model
{
    use Notifiable, HasFactory;
    protected $primaryKey = 'review_id';

    protected $fillable = ['user_id', 'event_id', 'rating', 'review_text'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
