import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import PlayerHeader from '@/Components/Player/PlayerHeader';
import PlayerSidebar from '@/Components/Player/PlayerSidebar';
import LessonContent from '@/Components/Player/LessonContent';
import NavigationActions from '@/Components/Player/NavigationActions';

export default function Player({ auth, course, currentLesson }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const completionForm = useForm({});

    // Flatten lessons to calculate next/prev and progress
    const allLessons = useMemo(() => {
        return course.modules.flatMap(m => m.lessons);
    }, [course.modules]);

    const currentIndex = useMemo(() => {
        if (!currentLesson) return -1;
        return allLessons.findIndex(l => l.id === currentLesson.id);
    }, [allLessons, currentLesson]);

    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    const progressPercentage = useMemo(() => {
        const completed = allLessons.filter(l => l.completions && l.completions.length > 0).length;
        if (allLessons.length === 0) return 0;
        return Math.round((completed / allLessons.length) * 100);
    }, [allLessons]);

    const markAsComplete = () => {
        if (!currentLesson) return;
        completionForm.post(route('lessons.complete', currentLesson.id), {
            preserveScroll: true,
            onSuccess: () => {
                // If there's a next lesson, we could automatically redirect, 
                // but let's keep it manual for now so they can read.
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
            <Head title={`${course.title}${currentLesson ? ` - ${currentLesson.title}` : ''}`} />
            
            <PlayerHeader 
                course={course} 
                currentLesson={currentLesson} 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                progress={progressPercentage}
            />

            <div className="flex-1 flex overflow-hidden">
                <PlayerSidebar 
                    course={course} 
                    currentLesson={currentLesson} 
                    sidebarOpen={sidebarOpen} 
                />

                <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 p-6 md:p-12">
                    <div className="max-w-4xl mx-auto">
                        {!currentLesson ? (
                            <div className="py-20 text-center space-y-8">
                                {progressPercentage === 100 ? (
                                    <div className="animate-in zoom-in duration-700">
                                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">Course Completed! 🎉</h2>
                                        <p className="text-gray-500 mt-4 max-w-md mx-auto">Congratulations! You've successfully finished all the lessons in this course. Keep up the great work!</p>
                                        <div className="pt-8">
                                            <a 
                                                href={route('dashboard')}
                                                className="inline-flex items-center px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                            >
                                                Back to Learning Hub
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Welcome to {course.title}</h2>
                                        <p className="text-gray-500 mb-8">{course.description}</p>
                                        {allLessons.length > 0 && (
                                            <a 
                                                href={route('courses.learn', [course.id, allLessons[0].id])}
                                                className="inline-flex items-center px-8 py-4 bg-[#FF7A00] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#E66E00] transition-all shadow-xl shadow-orange-100"
                                            >
                                                Start Learning
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <LessonContent 
                                    currentLesson={currentLesson} 
                                    markAsComplete={markAsComplete} 
                                />
                                
                                <NavigationActions 
                                    course={course}
                                    currentLesson={currentLesson}
                                    markAsComplete={markAsComplete}
                                    processing={completionForm.processing}
                                    prevLesson={prevLesson}
                                    nextLesson={nextLesson}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
