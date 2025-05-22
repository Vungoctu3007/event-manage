<?php

namespace Database\Factories;

use App\Models\Organizer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organizer>
 */
class OrganizerFactory extends Factory
{
    protected $model = Organizer::class;

    public function definition()
    {
        return [
            'organization_name' => $this->faker->company,
            'description' => $this->faker->paragraph,
            'organizer_url' => $this->faker->imageUrl(200, 200, 'logo'),
        ];
    }
}
