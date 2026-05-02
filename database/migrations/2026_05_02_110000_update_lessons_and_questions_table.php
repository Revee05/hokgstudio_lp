<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->text('extra_description')->nullable()->after('content_data');
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->string('type')->default('multiple_choice')->change(); // Change enum to string for more flexibility or update enum
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('extra_description');
        });
    }
};
