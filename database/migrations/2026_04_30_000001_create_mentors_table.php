<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mentors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('address')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('contact')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('profession')->nullable();
            $table->string('avatar')->nullable();
            $table->string('cv')->nullable();
            $table->json('specialties')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mentors');
    }
};
