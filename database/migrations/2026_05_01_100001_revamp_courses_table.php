<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('mentor_id')->constrained('course_categories')->nullOnDelete();
            $table->enum('mode', ['online', 'offline'])->default('offline')->after('status');
            $table->date('start_date')->nullable()->after('mode');
            $table->date('end_date')->nullable()->after('start_date');
            $table->time('start_time')->nullable()->after('end_date');
            $table->time('end_time')->nullable()->after('start_time');
            $table->json('days')->nullable()->after('end_time');
            $table->string('location')->nullable()->after('days');
            $table->string('meet_link')->nullable()->after('location');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn([
                'category_id', 'mode', 'start_date', 'end_date',
                'start_time', 'end_time', 'days', 'location', 'meet_link',
            ]);
        });
    }
};
