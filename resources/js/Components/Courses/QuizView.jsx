import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function QuizView({ quiz, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [pendingReview, setPendingReview] = useState(false);
    const [timeLeft, setTimeLeft] = useState(quiz.duration ? quiz.duration * 60 : null);

    const { post, processing } = useForm();

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
        post(route('quizzes.submit', quiz.id), {
            data: { answers },
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
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
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
                        className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest"
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
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
                                        : 'border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900/30'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                        answers[currentQuestion.id] === option.id ? 'border-orange-500 bg-orange-500' : 'border-gray-200 dark:border-gray-700'
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
                                className="w-full p-6 rounded-3xl border-2 border-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white focus:border-orange-500 transition-all min-h-[200px]"
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
                    disabled={!answers[currentQuestion.id] || processing}
                    onClick={handleNext}
                    className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                        answers[currentQuestion.id] && !processing
                            ? 'bg-orange-500 text-white shadow-xl shadow-orange-100 hover:scale-105'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {processing ? 'Submitting...' : (currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question')}
                </button>
            </div>
        </div>
    );
}
