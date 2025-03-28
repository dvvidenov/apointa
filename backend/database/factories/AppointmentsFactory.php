<?php

namespace Database\Factories;

use App\Models\Business;
use App\Models\Employees;
use App\Models\Services;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class AppointmentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
            'employees_id' =>Employees::inRandomOrder()->first()->id ?? Employees::factory(),
            'business_bulstat'=>Business::inRandomOrder()->first()->bulstat ?? Business::factory(),
            'services_id'=>Services::inRandomOrder()->first()->id ??Services::factory(),
            'appointment_date'=>$this->faker->date(),
            'status'=>$this->faker->randomElement(['pending','confirmed','cancelled']),
        ];
    }
}
