<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Organizer extends Model
{
    use Notifiable, HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'organizer_id';

    protected $fillable = ['organization_name', 'description', 'organizer_url'];



    public function events()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }
}
