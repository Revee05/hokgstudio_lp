<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable()->after('title');
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable()->after('title');
        });

        // Populate existing slugs
        DB::table('courses')->get()->each(function ($course) {
            DB::table('courses')->where('id', $course->id)->update([
                'slug' => Str::slug($course->title) . '-' . $course->id
            ]);
        });

        DB::table('lessons')->get()->each(function ($lesson) {
            DB::table('lessons')->where('id', $lesson->id)->update([
                'slug' => Str::slug($lesson->title) . '-' . $lesson->id
            ]);
        });
        
        // Make non-nullable after populating
        Schema::table('courses', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('slug');
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
