<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\QuizAttempt;
use App\Models\QuizAnswer;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizReviewController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $mentor = $user->mentor;
        
        if (!$mentor) {
            return Inertia::render('Mentor/Quizzes/Index', [
                'attempts' => [],
                'courses' => [],
                'modules' => [],
                'users' => [],
                'filters' => []
            ]);
        }

        $query = QuizAttempt::with(['user', 'quiz.lesson.module.course'])
            ->whereHas('quiz.lesson.module.course', function($q) use ($mentor) {
                $q->where('mentor_id', $mentor->id);
            });

        // Apply filters
        if ($request->filled('course_id')) {
            $query->whereHas('quiz.lesson.module.course', function($q) use ($request) {
                $q->where('id', $request->course_id);
            });
        }

        if ($request->filled('module_id')) {
            $query->whereHas('quiz.lesson.module', function($q) use ($request) {
                $q->where('id', $request->module_id);
            });
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('quiz_type')) {
            $query->whereHas('quiz.questions', function($q) use ($request) {
                $q->where('type', $request->quiz_type);
            });
        }

        $attempts = $query->orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Data for filters
        $courses = Course::where('mentor_id', $mentor->id)->get();
        
        $modules = [];
        if ($request->filled('course_id')) {
            $modules = \App\Models\Module::where('course_id', $request->course_id)->get();
        }

        // Get users enrolled in mentor's courses
        $usersQuery = User::query();
        if ($request->filled('course_id')) {
            $usersQuery->where(function($q) use ($request) {
                // Direct enrollment
                $q->whereHas('courses', function($sq) use ($request) {
                    $sq->where('courses.id', $request->course_id);
                })
                // Bundle enrollment
                ->orWhereHas('bundles.courses', function($sq) use ($request) {
                    $sq->where('courses.id', $request->course_id);
                });
            });
        } else {
            // All users in any of this mentor's courses
            $usersQuery->where(function($q) use ($mentor) {
                $q->whereHas('courses', function($sq) use ($mentor) {
                    $sq->where('mentor_id', $mentor->id);
                })
                ->orWhereHas('bundles.courses', function($sq) use ($mentor) {
                    $sq->where('mentor_id', $mentor->id);
                });
            });
        }
        $users = $usersQuery->distinct()->get(['users.id', 'users.name']);

        return Inertia::render('Mentor/Quizzes/Index', [
            'attempts' => $attempts,
            'courses' => $courses,
            'modules' => $modules,
            'users' => $users,
            'filters' => $request->only(['course_id', 'module_id', 'user_id', 'quiz_type'])
        ]);
    }

    public function show(QuizAttempt $attempt)
    {
        $attempt->load(['user', 'quiz.questions.options', 'answers.question', 'answers.option']);

        return Inertia::render('Mentor/Quizzes/Show', [
            'attempt' => $attempt
        ]);
    }

    public function update(Request $request, QuizAttempt $attempt)
    {
        $request->validate([
            'grades' => 'required|array',
            'mentor_feedback' => 'nullable|string',
        ]);

        foreach ($request->grades as $answerId => $score) {
            $answer = QuizAnswer::find($answerId);
            if ($answer) {
                $answer->update([
                    'score' => $score,
                    'is_correct' => $score > 0, // Simplified: any score > 0 is "correct"
                ]);
            }
        }

        // Recalculate total score
        $totalScore = $attempt->answers()->sum('score');

        $attempt->update([
            'score' => $totalScore,
            'status' => 'completed',
            'mentor_feedback' => $request->mentor_feedback,
        ]);

        return redirect()->route('mentor.quizzes.index')->with('success', 'Quiz graded successfully.');
    }
}
