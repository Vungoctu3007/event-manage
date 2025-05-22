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
            'configuration' => [
                'layout' => 'grid',
                'rows' => $this->faker->numberBetween(5, 20),
                'seats_per_row' => $this->faker->numberBetween(5, 20),
            ],
            'background_image' => $this->faker->imageUrl(800, 600, 'concert-hall'),
            'width' => 800,
            'height' => 600,
            'scale_ratio' => $this->faker->randomFloat(2, 0.5, 2.0),
        ];
    }
}
