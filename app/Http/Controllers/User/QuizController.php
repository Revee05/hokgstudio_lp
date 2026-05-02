<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\QuizAnswer;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function submit(Request $request, Quiz $quiz)
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $attempt = QuizAttempt::create([
            'user_id' => Auth::id(),
            'quiz_id' => $quiz->id,
            'status' => 'pending',
        ]);

        $totalScore = 0;
        $questionsCount = $quiz->questions()->count();
        $hasEssay = false;

        foreach ($request->answers as $questionId => $answer) {
            $question = Question::find($questionId);
            $isCorrect = null;
            $score = 0;
            $optionId = null;
            $answerText = null;

            if ($question->type === 'multiple_choice') {
                $optionId = $answer;
                $correctOption = $question->options()->where('is_correct', true)->first();
                $isCorrect = ($correctOption && $correctOption->id == $optionId);
                if ($isCorrect) {
                    $score = 100 / $questionsCount;
                    $totalScore += $score;
                }
            } else {
                $answerText = $answer;
                $hasEssay = true;
            }

            QuizAnswer::create([
                'quiz_attempt_id' => $attempt->id,
                'question_id' => $questionId,
                'option_id' => $optionId,
                'answer_text' => $answerText,
                'is_correct' => $isCorrect,
                'score' => $score,
            ]);
        }

        $attempt->update([
            'score' => $totalScore,
            'status' => $hasEssay ? 'pending' : 'completed',
        ]);

        return back()->with('success', $hasEssay ? 'Quiz submitted! Waiting for mentor review.' : 'Quiz completed! Your score: ' . round($totalScore, 2));
    }
}
