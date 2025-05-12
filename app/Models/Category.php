<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Category extends Model
{
     use Notifiable, HasFactory;
     protected $primaryKey = 'category_id';


    protected $fillable = ['name'];

    public function events()
    {
        return $this->hasMany(Event::class, 'category_id');
    }
}
