import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';

export default function QuizView({ quiz, onComplete, isCompleted = false }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [pendingReview, setPendingReview] = useState(false);
    const [timeLeft, setTimeLeft] = useState(quiz.duration ? quiz.duration * 60 : null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (timeLeft === null || showResults) return;

        if (timeLeft === 0) {
            calculateResults();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, showResults]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 font-bold">No questions available for this quiz.</p>
            </div>
        );
    }

    const userAttempt = quiz.attempts?.[0];
    const userAnswersMap = {};
    if (userAttempt && userAttempt.answers) {
        userAttempt.answers.forEach(a => {
            userAnswersMap[a.question_id] = a.option_id || a.answer_text;
        });
    }

    if (isCompleted) {
        return (
            <div className="space-y-10">
                <div className="bg-green-50 border border-green-100 rounded-3xl p-8 flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900">Quiz Sudah Selesai (Lulus)</h2>
                        <p className="text-sm text-green-700 mt-1">
                            Anda telah berhasil melewati kuis ini dengan skor <strong>{userAttempt?.score}%</strong>. Berikut adalah tinjauan jawaban Anda.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {quiz.questions.map((question, index) => {
                        const userAnswer = userAnswersMap[question.id];
                        const isCorrect = question.type === 'multiple_choice' 
                            ? question.options.find(o => o.is_correct)?.id === userAnswer
                            : true; // Simplification for review

                        return (
                            <div key={question.id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-xs font-black">
                                            {index + 1}
                                        </span>
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                                            isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {isCorrect ? 'Correct' : 'Incorrect'}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        {question.type === 'multiple_choice' ? 'Multiple Choice' : 'Essay'}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-6 leading-relaxed">
                                    {question.question_text}
                                </h3>

                                <div className="grid gap-3">
                                    {question.type === 'multiple_choice' ? (
                                        question.options.map((option) => {
                                            const isUserChoice = userAnswer === option.id;
                                            const isCorrectOption = option.is_correct;
                                            
                                            let borderClass = 'border-gray-50';
                                            let bgClass = 'bg-gray-50';
                                            let textClass = 'text-gray-500';

                                            if (isCorrectOption) {
                                                borderClass = 'border-green-500';
                                                bgClass = 'bg-green-50';
                                                textClass = 'text-green-700';
                                            } else if (isUserChoice && !isCorrectOption) {
                                                borderClass = 'border-red-500';
                                                bgClass = 'bg-red-50';
                                                textClass = 'text-red-700';
                                            }

                                            return (
                                                <div key={option.id} className={`p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${borderClass} ${bgClass} ${textClass}`}>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                        isCorrectOption ? 'border-green-500 bg-green-500' : (isUserChoice ? 'border-red-500 bg-red-500' : 'border-gray-200')
                                                    }`}>
                                                        {(isCorrectOption || isUserChoice) && (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-sm flex-1">{option.option_text}</span>
                                                    {isCorrectOption && (
                                                        <span className="text-[9px] font-black uppercase tracking-widest bg-green-200 text-green-800 px-2 py-0.5 rounded-md">Correct Answer</span>
                                                    )}
                                                    {isUserChoice && !isCorrectOption && (
                                                        <span className="text-[9px] font-black uppercase tracking-widest bg-red-200 text-red-800 px-2 py-0.5 rounded-md">Your Choice</span>
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Jawaban Anda:</p>
                                            <p className="text-sm text-gray-700 leading-relaxed italic">
                                                {userAnswer || 'Tidak ada jawaban.'}
                                            </p>
                                            {userAttempt?.mentor_feedback && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">Feedback Mentor:</p>
                                                    <p className="text-sm text-gray-600">{userAttempt.mentor_feedback}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleSelectOption = (optionId) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: optionId
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResults();
        }
    };

    const calculateResults = () => {
        setLoading(true);
        router.post(route('quizzes.submit', quiz.id), { answers }, {
            onFinish: () => setLoading(false),
            onSuccess: (page) => {
                const hasEssay = quiz.questions.some(q => q.type === 'essay');
                
                // For client-side UI immediate feedback
                let correctCount = 0;
                quiz.questions.forEach(q => {
                    const answer = answers[q.id];
                    if (q.type === 'multiple_choice') {
                        const correctOption = q.options.find(o => o.is_correct);
                        if (correctOption && answer === correctOption.id) {
                            correctCount++;
                        }
                    }
                });

                const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
                setScore(calculatedScore);
                setPendingReview(hasEssay);
                setShowResults(true);
                
                if (calculatedScore >= quiz.passing_score || hasEssay) {
                    onComplete();
                }
            }
        });
    };

    if (showResults) {
        const passed = score >= quiz.passing_score;
        return (
            <div className="text-center py-8 space-y-6 animate-in zoom-in duration-500">
                <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center border-8 ${
                    passed ? 'border-green-100 bg-green-50 text-green-600' : 'border-red-100 bg-red-50 text-red-600'
                }`}>
                    <span className="text-3xl font-black">{score}%</span>
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-900">
                        {pendingReview ? 'Quiz Submitted! 📝' : (passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪')}
                    </h3>
                    <p className="text-gray-500 mt-2">
                        {pendingReview 
                            ? 'Your essay answers are pending review by the mentor. You can continue to the next lesson.'
                            : (passed 
                                ? `You passed this quiz with a score of ${score}%.` 
                                : `You need ${quiz.passing_score}% to pass. You scored ${score}%.`)}
                    </p>
                </div>
                {!passed && (
                    <button 
                        onClick={() => {
                            setShowResults(false);
                            setCurrentQuestionIndex(0);
                            setAnswers({});
                        }}
                        className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest"
                    >
                        Retake Quiz
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <div className="flex items-center gap-4">
                    {timeLeft !== null && (
                        <span className={`flex items-center gap-1 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            {formatTime(timeLeft)}
                        </span>
                    )}
                    <span className="text-orange-500">Pass: {quiz.passing_score}%</span>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-600 leading-relaxed">
                    {currentQuestion.question_text}
                </h3>

                <div className="grid gap-3">
                    {currentQuestion.type === 'multiple_choice' ? (
                        currentQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelectOption(option.id)}
                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                                    answers[currentQuestion.id] === option.id
                                        ? 'border-[#FF7A00] bg-orange-50 text-[#FF7A00]'
                                        : 'border-gray-100 hover:border-orange-200'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                        answers[currentQuestion.id] === option.id ? 'border-orange-500 bg-orange-500' : 'border-gray-200'
                                    }`}>
                                        {answers[currentQuestion.id] === option.id && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <span className="font-bold text-sm">{option.option_text}</span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="space-y-4">
                            <textarea
                                className="w-full p-6 rounded-3xl border-2 border-gray-100 focus:border-orange-500 transition-all min-h-[200px]"
                                placeholder="Tuliskan jawaban Anda di sini..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleSelectOption(e.target.value)}
                            ></textarea>
                            <p className="text-[10px] text-gray-400 italic">Jawaban esai akan ditinjau oleh mentor (simulasi: otomatis dianggap benar untuk progres).</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    disabled={!answers[currentQuestion.id] || loading}
                    onClick={handleNext}
                    className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                        answers[currentQuestion.id] && !loading
                            ? 'bg-orange-500 text-white shadow-xl shadow-orange-100 hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {loading ? 'Submitting...' : (currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question')}
                </button>
            </div>
        </div>
    );
}
