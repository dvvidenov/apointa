<?php


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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('business_bulstat');
            $table->foreign('business_bulstat')->references('bulstat')->on('businesses')->onDelete('cascade');
            $table->string('name');
            $table->decimal('price');
            $table->text('service_info')->nullable();
            $table->integer('duration');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
