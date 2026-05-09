<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('course_bundles', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable()->after('title');
        });

        // Fill existing slugs
        $bundles = \App\Models\CourseBundle::all();
        foreach ($bundles as $bundle) {
            $bundle->update([
                'slug' => Str::slug($bundle->title) . '-' . Str::random(5)
            ]);
        }

        Schema::table('course_bundles', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('course_bundles', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
