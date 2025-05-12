<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\SeatingMap;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SeatingMap>
 */
class SeatingMapFactory extends Factory
{
  protected $model = SeatingMap::class;

    public function definition()
    {
        return [
            'event_id' => Event::factory(),
            'map_type' => $this->faker->randomElement(['fixed', 'general', 'custom']),
            'configuration' => json_encode([
                'rows' => $this->faker->numberBetween(10, 50),
                'seats_per_row' => $this->faker->numberBetween(10, 30),
            ]),
        ];
    }
}
