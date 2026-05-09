<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->morphs('payable'); // course or bundle
            $table->decimal('amount', 12, 2);
            $table->string('status')->default('pending'); // pending, completed, failed, expired
            $table->string('payment_method')->nullable();
            $table->string('external_id')->unique(); // Xendit Invoice ID
            $table->string('checkout_url')->nullable();
            $table->timestamps();
        });

        Schema::create('course_bundle_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_bundle_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['course_bundle_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_bundle_user');
        Schema::dropIfExists('transactions');
    }
};
