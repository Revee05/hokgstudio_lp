<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bundle_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('bundle_bundle_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_bundle_id')->constrained()->onDelete('cascade');
            $table->foreignId('bundle_category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bundle_bundle_category');
        Schema::dropIfExists('bundle_categories');
    }
};
