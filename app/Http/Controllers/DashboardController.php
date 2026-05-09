<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\UserRole;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return match ($user->role) {
            UserRole::ADMIN => Inertia::render('Dashboard'),
            UserRole::MENTOR => Inertia::render('Mentor/Dashboard'),
            UserRole::MEMBER, UserRole::USER => (function () use ($user) {
                // Get user's completed lesson IDs
                $completedLessonIds = $user->lessonCompletions()->pluck('lesson_id')->toArray();
                $totalCompleted = count($completedLessonIds);

                $courses = $user->courses()
                    ->with(['mentor', 'categories'])
                    ->withCount('modules') // Load module count
                    ->get()
                    ->map(function ($course) use ($completedLessonIds) {
                        // Calculate total lessons in this course
                        $course->load('modules.lessons');
                        $totalLessons = $course->modules->sum(function ($module) {
                            return $module->lessons->count();
                        });

                        // Calculate completed lessons for this specific course
                        $completedInCourse = 0;
                        foreach ($course->modules as $module) {
                            foreach ($module->lessons as $lesson) {
                                if (in_array($lesson->id, $completedLessonIds)) {
                                    $completedInCourse++;
                                }
                            }
                        }

                        // Calculate percentage
                        $progress = $totalLessons > 0 ? round(($completedInCourse / $totalLessons) * 100) : 0;
                        $course->progress_percentage = $progress;
                        $course->total_lessons = $totalLessons;
                        $course->completed_lessons = $completedInCourse;

                        // Unload heavy relationships if not needed in the view
                        $course->unsetRelation('modules');

                        return $course;
                    });

                // Find last accessed lesson (for resume functionality)
                $lastCompletion = $user->lessonCompletions()->with('lesson.module.course')->latest()->first();
                $lastAccessedCourse = $lastCompletion ? $lastCompletion->lesson->module->course : null;
                $lastAccessedLesson = $lastCompletion ? $lastCompletion->lesson : null;

                // Add progress to last accessed course if exists
                if ($lastAccessedCourse) {
                    $match = $courses->firstWhere('id', $lastAccessedCourse->id);
                    if ($match) {
                        $lastAccessedCourse->progress_percentage = $match->progress_percentage;
                    }
                }

                return Inertia::render('User/Dashboard', [
                    'courses' => $courses,
                    'stats' => [
                        'total_enrolled' => $courses->count(),
                        'total_completed_lessons' => $totalCompleted,
                        'certificates' => $courses->where('progress_percentage', 100)->count(),
                    ],
                    'resume' => $lastAccessedCourse ? [
                        'course' => $lastAccessedCourse,
                        'lesson' => $lastAccessedLesson,
                    ] : null,
                ]);
            })(),
            default => Inertia::render('Dashboard'),
        };
    }
}
