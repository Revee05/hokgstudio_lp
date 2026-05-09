import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function Show({ auth, attempt }) {
    const { data, setData, patch, processing } = useForm({
        grades: attempt.answers.reduce((acc, curr) => {
            acc[curr.id] = curr.score;
            return acc;
        }, {}),
        mentor_feedback: attempt.mentor_feedback || '',
    });

    const submitGrade = (e) => {
        e.preventDefault();
        patch(route('mentor.quizzes.update', attempt.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Review Submission</h2>}
        >
            <Head title="Review Submission" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Info Header */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Student</p>
                            <h3 className="text-xl font-bold text-gray-900">{attempt.user.name}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Current Score</p>
                            <h3 className="text-3xl font-black text-orange-600">{parseFloat(attempt.score).toFixed(1)}%</h3>
                        </div>
                    </div>

                    <form onSubmit={submitGrade} className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50">
                                <h3 className="text-lg font-bold">Answers & Grading</h3>
                            </div>
                            
                            <div className="p-8 space-y-12">
                                {attempt.answers.map((answer, index) => (
                                    <div key={answer.id} className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase text-gray-400">Question {index + 1} ({answer.question.type})</span>
                                                <p className="font-bold text-gray-900">{answer.question.question_text}</p>
                                            </div>
                                            {answer.question.type === 'multiple_choice' && (
                                                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${answer.is_correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {answer.is_correct ? 'CORRECT' : 'WRONG'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Student Answer:</p>
                                            <p className="text-sm font-medium text-gray-700 italic">
                                                {answer.question.type === 'multiple_choice' 
                                                    ? (answer.option?.option_text || 'No answer')
                                                    : (answer.answer_text || 'No answer')}
                                            </p>
                                        </div>

                                        {answer.question.type === 'essay' && (
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1">
                                                    <InputLabel value="Score for this answer (0 - max)" />
                                                    <TextInput 
                                                        type="number"
                                                        step="0.01"
                                                        className="w-full mt-1"
                                                        value={data.grades[answer.id]}
                                                        onChange={(e) => setData('grades', { ...data.grades, [answer.id]: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                            <InputLabel value="Mentor Feedback" />
                            <textarea
                                className="w-full p-6 rounded-3xl border-2 border-gray-100 focus:border-orange-500 transition-all min-h-[150px]"
                                placeholder="Give feedback to the student..."
                                value={data.mentor_feedback}
                                onChange={(e) => setData('mentor_feedback', e.target.value)}
                            ></textarea>

                            <div className="flex justify-end gap-3 pt-4">
                                <PrimaryButton disabled={processing} className="px-12 py-4">
                                    {processing ? 'Saving...' : 'Finalize Review'}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
