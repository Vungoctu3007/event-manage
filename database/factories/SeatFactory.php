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
            'ticket_id' => Ticket::factory(),
            'event_id' => Event::factory(),
            'map_id' => SeatingMap::factory(),
            'seat_number' => $this->faker->numberBetween(1, 50),
            'seat_row' => $this->faker->randomLetter,
            'section' => $this->faker->randomElement(['orchestra', 'balcony', 'mezzanine', 'VIP']),
            'status' => $this->faker->randomElement(['available', 'reserved', 'sold']),
            'reserved_until' => $this->faker->optional(0.3)->dateTimeBetween('now', '+1 week'),
        ];
    }
}
