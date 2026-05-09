<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoursePlayerController extends Controller
{
    public function index(Course $course, Lesson $lesson = null)
    {
        $user = auth()->user();
        
        // Access Control
        $hasAccess = $user->role === \App\Enums\UserRole::ADMIN || 
                     $course->mentor_id === $user->mentor?->id || 
                     $user->courses()->where('course_id', $course->id)->exists();

        if (!$hasAccess) {
            return redirect()->route('courses.show', $course)->with('error', 'Anda belum mendaftar di kelas ini.');
        }

        $course->load(['modules.lessons.completions' => function($query) {
            $query->where('user_id', auth()->id());
        }]);

        if (!$lesson && $course->modules->count() > 0 && $course->modules[0]->lessons->count() > 0) {
            $lesson = $course->modules[0]->lessons[0];
        }

        return Inertia::render('User/Courses/Player', [
            'course' => $course,
            'currentLesson' => $lesson ? $lesson->load([
                'quiz.questions.options', 
                'quiz.attempts' => function($query) {
                    $query->where('user_id', auth()->id())->with('answers')->latest();
                },
                'completions' => function($query) {
                    $query->where('user_id', auth()->id());
                }
            ]) : null,
        ]);
    }

    public function complete(Request $request, Lesson $lesson)
    {
        auth()->user()->lessonCompletions()->firstOrCreate([
            'lesson_id' => $lesson->id,
        ]);

        return back()->with('success', 'Lesson completed.');
    }
}
