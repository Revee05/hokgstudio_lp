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
        $course->load(['modules.lessons.completions' => function($query) {
            $query->where('user_id', auth()->id());
        }]);

        if (!$lesson && $course->modules->count() > 0 && $course->modules[0]->lessons->count() > 0) {
            $lesson = $course->modules[0]->lessons[0];
        }

        return Inertia::render('User/Courses/Player', [
            'course' => $course,
            'currentLesson' => $lesson ? $lesson->load('quiz.questions.options') : null,
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
