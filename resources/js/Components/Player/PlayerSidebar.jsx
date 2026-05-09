import { Link } from '@inertiajs/react';

export default function PlayerSidebar({ course, currentLesson, sidebarOpen }) {
    return (
        <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-gray-100 transition-all duration-300 overflow-y-auto flex-shrink-0`}>
            <div className="p-6">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Course Content</h2>
                <div className="space-y-6">
                    {course.modules.map((module, mIdx) => (
                        <div key={module.id} className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center text-[10px] text-gray-500">{mIdx + 1}</span>
                                {module.title}
                            </h3>
                            <div className="space-y-1">
                                {module.lessons.map((lesson) => {
                                    const isCompleted = lesson.completions && lesson.completions.length > 0;
                                    const isActive = currentLesson?.id === lesson.id;
                                    
                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={route('courses.learn', [course.slug, lesson.slug])}
                                            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                                                isActive 
                                                    ? 'bg-orange-50 text-[#FF7A00]' 
                                                    : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                isCompleted 
                                                    ? 'bg-green-100 text-green-600' 
                                                    : (isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400')
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
    );
}
