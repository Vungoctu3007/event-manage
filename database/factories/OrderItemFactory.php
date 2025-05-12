<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Seat;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition()
    {
        return [
            'order_id' => Order::factory(),
            'ticket_id' => Ticket::factory(),
            'quantity' => $this->faker->numberBetween(1, 10),
            'price_each' => $this->faker->randomFloat(2, 10, 500),
            'seat_id' => $this->faker->optional(0.5)->randomElement(Seat::factory()->count(1)->create()->pluck('seat_id')->toArray()),
        ];
    }
}
