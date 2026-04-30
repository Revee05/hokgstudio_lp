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
        Schema::create('about_us', function (Blueprint $table) {
            $table->id();
            // Section 1: About
            $table->string('about_title');
            $table->text('about_description');
            $table->string('about_image')->nullable();
            
            // Section 2: Team (JSON for repeater)
            $table->json('team_members')->nullable();
            
            // Section 3: Learning Steps (JSON for repeater)
            $table->json('learning_steps')->nullable();
            
            // Section 4: CTA
            $table->string('cta_title');
            $table->text('cta_description');
            $table->string('cta_wa_link');
            $table->string('cta_form_link');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_us');
    }
};
