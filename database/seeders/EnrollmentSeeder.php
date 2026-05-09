<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseBundle;
use App\Models\Transaction;
use App\Models\Mentor;
use App\Models\Lesson;
use App\Models\LessonCompletion;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create a Student User
        $student = User::firstOrCreate(
            ['email' => 'student@gmail.com'],
            [
                'name' => 'Budi Siswa',
                'password' => Hash::make('password'),
                'role' => UserRole::MEMBER,
                'email_verified_at' => now(),
            ]
        );

        // 2. Ensure we have courses
        $courses = Course::all();
        if ($courses->isEmpty()) {
            $this->command->warn('No courses found. Please run CourseSeeder first.');
            return;
        }

        // 3. Create a Bundle if none exists
        $mentor = Mentor::first() ?? Mentor::factory()->create();
        $bundle = CourseBundle::firstOrCreate(
            ['title' => 'Paket Masterpiece Digital Art'],
            [
                'mentor_id' => $mentor->id,
                'description' => 'Bundel lengkap untuk menguasai ilustrasi digital dari nol.',
                'price' => 1500000,
                'status' => 'approved',
            ]
        );

        // Attach 3 random courses to this bundle if empty
        if ($bundle->courses()->count() === 0) {
            $bundleCourses = $courses->random(3);
            $bundle->courses()->attach($bundleCourses->pluck('id'));
        }

        // 4. Enroll Student in 1 Individual Course
        $singleCourse = $courses->random();
        $student->courses()->syncWithoutDetaching([$singleCourse->id]);

        // Create Transaction for Single Course
        Transaction::create([
            'user_id' => $student->id,
            'payable_id' => $singleCourse->id,
            'payable_type' => Course::class,
            'amount' => $singleCourse->price,
            'status' => 'completed',
            'payment_method' => 'Xendit - OVO',
            'external_id' => 'TRX-' . strtoupper(Str::random(10)),
        ]);

        // 5. Enroll Student in Bundle
        $student->bundles()->syncWithoutDetaching([$bundle->id]);
        
        // Also enroll in all courses within the bundle (standard platform behavior)
        $student->courses()->syncWithoutDetaching($bundle->courses->pluck('id'));

        // Create Transaction for Bundle
        Transaction::create([
            'user_id' => $student->id,
            'payable_id' => $bundle->id,
            'payable_type' => CourseBundle::class,
            'amount' => $bundle->price,
            'status' => 'completed',
            'payment_method' => 'Xendit - Virtual Account',
            'external_id' => 'TRX-' . strtoupper(Str::random(10)),
        ]);

        // 6. Add some Lesson Completions for the single course to show progress
        $lessons = $singleCourse->modules()->with('lessons')->get()->pluck('modules.*.lessons')->flatten();
        if ($lessons->count() > 0) {
            // Complete 2 lessons
            $toComplete = $lessons->take(2);
            foreach ($toComplete as $lesson) {
                LessonCompletion::firstOrCreate([
                    'user_id' => $student->id,
                    'lesson_id' => $lesson->id,
                ]);
            }
        }

        $this->command->info('Student seeded with courses, bundles, and completions!');
    }
}
