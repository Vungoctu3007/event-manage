<?php

namespace Database\Factories;

use App\Models\Ticket;
use App\Models\TicketBooking;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TicketBooking>
 */
class TicketBookingFactory extends Factory
{
    protected $model = TicketBooking::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'ticket_id' => Ticket::factory(),
            'quantity' => $this->faker->numberBetween(1, 5),
            'ticket_code' => $this->faker->unique()->uuid,
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
            'purchase_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}