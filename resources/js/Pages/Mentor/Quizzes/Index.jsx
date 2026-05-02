import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, attempts }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Quiz Submissions</h2>}
        >
            <Head title="Quiz Submissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-3xl border border-gray-100 dark:border-gray-700">
                        <div className="p-8">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Review Student Progress</h3>
                            
                            {attempts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-gray-400 font-medium">No quiz submissions found yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-50 dark:border-gray-700">
                                                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Student</th>
                                                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Course / Quiz</th>
                                                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                                                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Score</th>
                                                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-gray-400">Submitted At</th>
                                                <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                            {attempts.map((attempt) => (
                                                <tr key={attempt.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">
                                                                {attempt.user.name.charAt(0)}
                                                            </div>
                                                            <span className="font-bold text-sm text-gray-900 dark:text-white">{attempt.user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{attempt.quiz.lesson.module.course.title}</span>
                                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{attempt.quiz.lesson.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                                            attempt.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                                        }`}>
                                                            {attempt.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 font-bold text-sm">
                                                        {parseFloat(attempt.score).toFixed(1)}%
                                                    </td>
                                                    <td className="py-4 px-4 text-xs text-gray-500">
                                                        {new Date(attempt.created_at).toLocaleString()}
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <Link 
                                                            href={route('mentor.quizzes.show', attempt.id)}
                                                            className="text-orange-600 font-black text-xs uppercase tracking-widest hover:underline"
                                                        >
                                                            Review
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
