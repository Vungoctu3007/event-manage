<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\ScheduleEvent;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition()
    {
        $saleStart = $this->faker->dateTimeBetween('-1 month', 'now');
        return [
            'schedule_id' => ScheduleEvent::factory(),
            'ticket_type' => $this->faker->randomElement(['adult', 'child', 'vip', 'student']),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'total_quantity' => $this->faker->numberBetween(50, 1000),
            'sold_quantity' => $this->faker->numberBetween(0, 50),
            'sale_start' => $saleStart,
            'sale_end' => $this->faker->dateTimeBetween($saleStart, '+1 month'),
            'description' => $this->faker->sentence(),
            'image_url' => $this->faker->imageUrl(640, 480, 'events', true),
        ];
    }
}
