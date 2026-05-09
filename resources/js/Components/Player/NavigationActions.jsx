import { Link } from '@inertiajs/react';

export default function NavigationActions({ 
    course, 
    currentLesson, 
    markAsComplete, 
    processing, 
    prevLesson, 
    nextLesson 
}) {
    if (!currentLesson) return null;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8">
            <div className="flex-1 w-full sm:w-auto">
                {prevLesson ? (
                    <Link 
                        href={route('courses.learn', [course.id, prevLesson.id])}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-300">Previous</span>
                            <span className="truncate max-w-[150px]">{prevLesson.title}</span>
                        </div>
                    </Link>
                ) : <div />}
            </div>
            
            {currentLesson.content_type !== 'quiz' && (
                <button 
                    onClick={markAsComplete}
                    disabled={processing}
                    className="w-full sm:w-auto px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-200 dark:shadow-none disabled:opacity-50 disabled:scale-100"
                >
                    {processing ? (
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </div>
                    ) : 'Mark as Complete'}
                </button>
            )}

            <div className="flex-1 w-full sm:w-auto flex justify-end">
                {nextLesson ? (
                    <Link 
                        href={route('courses.learn', [course.id, nextLesson.id])}
                        className="flex items-center gap-2 text-sm font-bold text-[#FF7A00] hover:text-[#E66E00] transition-all group text-right"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-orange-200">Next</span>
                            <span className="truncate max-w-[150px]">{nextLesson.title}</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                        </div>
                    </Link>
                ) : <div />}
            </div>
        </div>
    );
}
