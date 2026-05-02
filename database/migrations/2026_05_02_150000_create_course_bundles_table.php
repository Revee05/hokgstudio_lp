<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_bundles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mentor_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->decimal('price', 12, 2)->nullable(); // Set by admin only
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected'])->default('draft');
            $table->text('rejection_note')->nullable();
            $table->timestamps();
        });

        Schema::create('course_bundle_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_bundle_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->timestamps();

            $table->unique(['course_bundle_id', 'course_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_bundle_items');
        Schema::dropIfExists('course_bundles');
    }
};
