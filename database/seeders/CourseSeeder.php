<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseCategory;
use App\Models\Mentor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Categories
        $categories = [
            'Seni Visual',
            'Ilustrasi Digital',
            'Desain Grafis',
            'Fotografi',
            'Seni Konseptual',
            'Pemasaran Seni',
            'Manajemen Kreatif',
        ];

        $categoryModels = [];
        foreach ($categories as $catName) {
            $categoryModels[] = CourseCategory::firstOrCreate(['name' => $catName]);
        }

        // 2. Get All Mentors
        $mentors = Mentor::all();

        if ($mentors->isEmpty()) {
            $this->command->warn('No mentors found. Please run MentorSeeder first.');
            return;
        }

        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        foreach ($mentors as $mentor) {
            // Create 3 courses for each mentor
            for ($i = 1; $i <= 3; $i++) {
                $mode = $i % 2 === 0 ? 'online' : 'offline';
                
                $course = Course::create([
                    'mentor_id' => $mentor->id,
                    'title' => "Kelas " . ($mode === 'online' ? 'Online' : 'Offline') . " {$mentor->name} #{$i}",
                    'description' => "Ini adalah deskripsi untuk kelas ke-{$i} dari mentor {$mentor->name}. Kelas ini dirancang untuk memberikan pemahaman mendalam tentang materi yang diajarkan.",
                    'price' => rand(100000, 1000000),
                    'status' => 'published',
                    'mode' => $mode,
                    'start_date' => now()->addDays(rand(1, 30)),
                    'end_date' => now()->addDays(rand(60, 90)),
                    'start_time' => '09:00',
                    'end_time' => '12:00',
                    'days' => array_intersect($days, [
                        $days[rand(0, 2)],
                        $days[rand(3, 6)]
                    ]),
                    'location' => $mode === 'offline' ? "Studio Hokg, G-23, Sidoarjo" : null,
                    'meet_link' => $mode === 'online' ? "https://meet.google.com/" . Str::random(10) : null,
                ]);

                // Attach 1-2 random categories
                $randomCats = collect($categoryModels)->random(rand(1, 2))->pluck('id');
                $course->categories()->attach($randomCats);
            }
        }
    }
}
