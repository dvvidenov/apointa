<?php

namespace Database\Seeders;

use App\Models\Appointments;
use App\Models\Business;
use App\Models\Categories;
use App\Models\User;
use App\Models\Services;
use App\Models\Employees;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Categories::factory(5)->create();
        Business::factory(10)->create();
        Services::factory(20)->create();
        Employees::factory(20)->create();
        Appointments::factory(40)->create();
    }
}
