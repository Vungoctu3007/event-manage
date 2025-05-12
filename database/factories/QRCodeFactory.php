<?php

namespace Database\Factories;

use App\Models\OrderItem;
use App\Models\QRCode;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QRCode>
 */
class QRCodeFactory extends Factory
{
   protected $model = QRCode::class;

    public function definition()
    {
        return [
            'order_item_id' => OrderItem::factory(),
            'qr_token' => $this->faker->unique()->uuid,
            'is_checked_in' => $this->faker->boolean(20), // 20% chance of being checked in
            'checked_in_time' => $this->faker->optional(0.2)->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
