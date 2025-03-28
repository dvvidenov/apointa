<?php

namespace Database\Factories;

use App\Models\Categories;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Business>
 */
class BusinessFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $bulstat = $this->faker->unique()->numerify('############');
        $name = $this->faker->company();
        return [
            'bulstat'=>$bulstat,
            'user_id'=> User::factory(),
            'categories_id'=> Categories::inRandomOrder()->first()->id ??Categories::factory(),
            'name'=> $name,
            'slug' => Str::slug( $name, '-'), 
            'address'=>$this->faker->address(),
            'phone'=>$this->faker->phoneNumber(),
            'city'=>$this->faker->city(),
            'email'=>$this->faker->email(),
            'business_info' =>$this->faker->text(),
            'pos_payment'=>$this->faker->randomElement([true, false]),
            'status'=>$this->faker->randomElement([true, false]),
        ];
    }
}
