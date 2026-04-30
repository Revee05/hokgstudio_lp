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
        Schema::table('mentors', function (Blueprint $table) {
            $table->string('city')->nullable()->after('address');
            $table->text('bio')->nullable()->after('city');
            $table->string('experience')->nullable()->after('bio');
            $table->text('certification')->nullable()->after('experience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mentors', function (Blueprint $table) {
            $table->dropColumn(['city', 'bio', 'experience', 'certification']);
        });
    }
};
