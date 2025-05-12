<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Event;
use App\Models\Organizer;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EventFactory extends Factory
{
   protected $model = Event::class;

    public function definition()
    {
        $startTime = $this->faker->dateTimeBetween('now', '+1 year');
        return [
            'organizer_id' => Organizer::factory(),
            'category_id' => Category::factory(),
            'venue_id' => Venue::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph,
            'start_time' => $startTime,
            'end_time' => $this->faker->dateTimeBetween($startTime, $startTime->format('Y-m-d H:i:s').' +4 hours'),
            'status' => $this->faker->randomElement(['active', 'cancelled', 'sold_out']),
            'banner_url' => $this->faker->imageUrl(800, 400, 'event'),
        ];
    }
}
