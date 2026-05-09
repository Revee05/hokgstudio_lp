import { Link } from '@inertiajs/react';

export default function PlayerHeader({ course, currentLesson, sidebarOpen, setSidebarOpen, progress = 45 }) {
    return (
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <Link href={route('dashboard')} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                </Link>
                <div>
                    <h1 className="font-black text-gray-900 leading-tight">{course.title}</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{currentLesson?.title || 'Course Overview'}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 mr-4">
                    <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-orange-500 transition-all duration-1000" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-500">{progress}% COMPLETE</span>
                </div>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-gray-50 rounded-xl transition-all"
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
            </div>
        </header>
    );
}
