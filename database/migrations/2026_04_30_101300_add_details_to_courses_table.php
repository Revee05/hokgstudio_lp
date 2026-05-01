<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('thumbnail')->nullable()->after('description');
            $table->decimal('price', 15, 2)->default(0)->after('thumbnail');
            $table->string('status')->default('draft')->after('price'); // draft, published, archived
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['thumbnail', 'price', 'status']);
        });
    }
};
