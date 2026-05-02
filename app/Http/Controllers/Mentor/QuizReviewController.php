<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\QuizAttempt;
use App\Models\QuizAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizReviewController extends Controller
{
    public function index()
    {
        $attempts = QuizAttempt::with(['user', 'quiz.lesson.module.course'])
            ->orderBy('status', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Mentor/Quizzes/Index', [
            'attempts' => $attempts
        ]);
    }

    public function show(QuizAttempt $attempt)
    {
        $attempt->load(['user', 'quiz.questions.options', 'answers.question']);

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
