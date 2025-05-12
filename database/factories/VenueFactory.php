<?php

namespace Database\Factories;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venue>
 */
class VenueFactory extends Factory
{
   protected $model = Venue::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company . ' Arena',
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'capacity' => $this->faker->numberBetween(100, 50000),
        ];
    }
}
