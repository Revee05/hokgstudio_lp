import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import QuizView from '@/Components/Courses/QuizView';

export default function Player({ auth, course, currentLesson }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const completionForm = useForm({});

    const markAsComplete = () => {
        if (!currentLesson) return;
        completionForm.post(route('lessons.complete', currentLesson.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
            <Head title={course.title} />
            
            {/* Player Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard')} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    </Link>
                    <div>
                        <h1 className="font-black text-gray-900 dark:text-white leading-tight">{course.title}</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{currentLesson?.title || 'Course Overview'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 mr-4">
                        <div className="w-32 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-orange-500 transition-all duration-1000" 
                                style={{ width: '45%' }}
                            ></div>
                        </div>
                        <span className="text-[10px] font-black text-gray-500">45% COMPLETE</span>
                    </div>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 overflow-y-auto flex-shrink-0`}>
                    <div className="p-6">
                        <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">Course Content</h2>
                        <div className="space-y-6">
                            {course.modules.map((module, mIdx) => (
                                <div key={module.id} className="space-y-3">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[10px] text-gray-500">{mIdx + 1}</span>
                                        {module.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {module.lessons.map((lesson) => {
                                            const isCompleted = lesson.completions && lesson.completions.length > 0;
                                            const isActive = currentLesson?.id === lesson.id;
                                            
                                            return (
                                                <Link
                                                    key={lesson.id}
                                                    href={route('courses.learn', [course.id, lesson.id])}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                                                        isActive 
                                                            ? 'bg-orange-50 dark:bg-orange-900/20 text-[#FF7A00]' 
                                                            : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                                    }`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                        isCompleted 
                                                            ? 'bg-green-100 text-green-600' 
                                                            : (isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400')
                                                    }`}>
                                                        {isCompleted ? (
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                                        ) : (
                                                            <span className="text-[9px] font-bold">
                                                                {lesson.content_type === 'video' && 'V'}
                                                                {lesson.content_type === 'article' && 'A'}
                                                                {lesson.content_type === 'quiz' && 'Q'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-orange-600' : ''}`}>
                                                        {lesson.title}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        {!currentLesson ? (
                            <div className="py-20 text-center">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Welcome to {course.title}</h2>
                                <p className="text-gray-500 mb-8">{course.description}</p>
                                {course.modules.length > 0 && (
                                    <Link 
                                        href={route('courses.learn', [course.id, course.modules[0].lessons[0]?.id])}
                                        className="inline-flex items-center px-8 py-4 bg-[#FF7A00] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#E66E00] transition-all shadow-xl shadow-orange-100"
                                    >
                                        Start Learning
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                {/* Lesson Title */}
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{currentLesson.title}</h2>
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <span>Module: {currentLesson.module?.title}</span>
                                        <span>•</span>
                                        <span className="text-orange-500">{currentLesson.content_type}</span>
                                    </div>
                                </div>

                                {/* Content Display */}
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                                    {currentLesson.content_type === 'video' && (
                                        <div className="aspect-video bg-black flex items-center justify-center relative group">
                                            {currentLesson.content_data ? (
                                                <iframe 
                                                    src={currentLesson.content_data} 
                                                    className="w-full h-full" 
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <div className="text-gray-500 text-center p-12">
                                                    <svg className="w-20 h-20 mx-auto mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                                                    <p className="font-bold">Video not available</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {currentLesson.content_type === 'video' && currentLesson.extra_description && (
                                        <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50">
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Informasi Tambahan</h4>
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <div dangerouslySetInnerHTML={{ __html: currentLesson.extra_description }}></div>
                                            </div>
                                        </div>
                                    )}

                                    {currentLesson.content_type === 'article' && (
                                        <div className="p-8 md:p-12 bg-white dark:bg-gray-900">
                                            <div className="prose dark:prose-invert prose-orange max-w-none 
                                                prose-headings:font-black prose-headings:tracking-tight
                                                prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
                                                prose-img:rounded-3xl prose-img:shadow-xl">
                                                <div dangerouslySetInnerHTML={{ __html: currentLesson.content_data || 'No content provided.' }}></div>
                                            </div>
                                        </div>
                                    )}

                                    {currentLesson.content_type === 'quiz' && (
                                        <div className="p-8 md:p-12">
                                            <QuizView quiz={currentLesson.quiz} onComplete={markAsComplete} />
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Actions */}
                                <div className="flex justify-between items-center pt-8">
                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                                        Previous Lesson
                                    </button>
                                    
                                    {currentLesson.content_type !== 'quiz' && (
                                        <button 
                                            onClick={markAsComplete}
                                            disabled={completionForm.processing}
                                            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-200 dark:shadow-none"
                                        >
                                            {completionForm.processing ? 'Saving...' : 'Mark as Complete'}
                                        </button>
                                    )}

                                    <button className="flex items-center gap-2 text-sm font-bold text-[#FF7A00] hover:text-[#E66E00] transition-all">
                                        Next Lesson
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
