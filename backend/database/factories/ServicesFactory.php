<?php

namespace Database\Factories;

use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Services>
 */
class ServicesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_bulstat' => Business::inRandomOrder()->first()->id ?? Business::factory(),
            'name'=> $this->faker->word,
            'price'=>$this->faker->numberBetween(30,200),
            'duration'=>$this->faker->numberBetween(30,200),
            'service_info' => $this->faker->text(),
            'status'=>$this->faker->randomElement([true, false]),
        ];
    }
}
