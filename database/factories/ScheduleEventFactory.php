<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\ScheduleEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ScheduleEvent>
 */
class ScheduleEventFactory extends Factory
{
    protected $model = ScheduleEvent::class;

    public function definition()
    {
        $startTime = $this->faker->dateTimeBetween('now', '+1 month');
        return [
            'event_id' => Event::factory(),
            'schedule_type' => $this->faker->randomElement(['performance', 'session', 'general']),
            'start_time' => $startTime,
            'end_time' => $this->faker->dateTimeBetween($startTime, $startTime->format('Y-m-d H:i:s').' +2 hours'),
            'description' => $this->faker->sentence,
        ];
    }
}
