<?php

use App\Models\User;
use App\Models\Categories;
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
        Schema::create('businesses', function (Blueprint $table) {
            $table->string('bulstat')->primary();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Categories::class);
            $table->string('name');
            $table->string('slug')->unique()->after('name');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->string('city');
            $table->json('working_hours')->nullable();
            $table->text('business_info')->nullable();
            $table->string('image')->nullable();
            $table->boolean('pos_payment')->default(false);
            $table->boolean('status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
