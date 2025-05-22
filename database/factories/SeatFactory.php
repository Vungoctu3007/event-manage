<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Seat;
use App\Models\SeatingMap;
use App\Models\Ticket;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    protected $model = Seat::class;

    public function definition()
    {
          return [
            'map_id' => SeatingMap::factory(),
            'event_id' => Event::factory(),
            'ticket_id' => Ticket::factory(), 
            'seat_number' => $this->faker->unique()->numberBetween(1, 100),
            'seat_row' => $this->faker->randomLetter,
            'section' => $this->faker->randomElement(['orchestra', 'balcony', 'mezzanine', 'VIP']),
            'status' => $this->faker->randomElement(['available', 'reserved', 'sold']),
            'reserved_until' => $this->faker->optional(0.2)->dateTimeBetween('now', '+7 days'),
        ];
    }
}
