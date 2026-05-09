import QuizView from '@/Components/Courses/QuizView';

export default function LessonContent({ currentLesson, markAsComplete }) {
    if (!currentLesson) return null;

    const formatVideoUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        }
        if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return url;
    };

    return (
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
                                src={formatVideoUrl(currentLesson.content_data)} 
                                className="w-full h-full" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
        </div>
    );
}
