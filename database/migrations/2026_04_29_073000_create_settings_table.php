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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('logo_header')->nullable();
            $table->string('logo_admin_light')->nullable();
            $table->string('logo_admin_dark')->nullable();
            $table->text('footer_description')->nullable();
            $table->json('social_links')->nullable();
            $table->text('address')->nullable();
            $table->json('website_links')->nullable();
            $table->string('copyright_info')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
