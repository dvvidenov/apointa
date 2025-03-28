<?php

use App\Models\Employees;
use App\Models\Services;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Employees::class);
            $table->string('business_bulstat');
            $table->foreign('business_bulstat')->references('bulstat')->on('businesses')->onDelete('cascade');
            $table->foreignIdFor(Services::class);
            $table->date('appointment_date');
            $table->time('appointment_time')->nullable(); 
            $table->enum('status',['pending','confirmed','cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
