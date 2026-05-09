<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Course;
use App\Models\Lesson;
use App\Models\CourseBundle;
use Illuminate\Support\Str;

echo "Filling Course slugs...\n";
foreach (Course::all() as $c) {
    if (empty($c->slug)) {
        $c->slug = Str::slug($c->title) . '-' . Str::random(5);
        $c->save();
        echo "Updated Course: {$c->title}\n";
    }
}

echo "Filling Lesson slugs...\n";
foreach (Lesson::all() as $l) {
    if (empty($l->slug)) {
        $l->slug = Str::slug($l->title) . '-' . Str::random(5);
        $l->save();
        echo "Updated Lesson: {$l->title}\n";
    }
}

echo "Filling Bundle slugs...\n";
foreach (CourseBundle::all() as $b) {
    if (empty($b->slug)) {
        $b->slug = Str::slug($b->title) . '-' . Str::random(5);
        $b->save();
        echo "Updated Bundle: {$b->title}\n";
    }
}
echo "Done!\n";
