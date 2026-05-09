import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function UserDashboard({ courses = [], stats = null, resume = null }) {
    const user = usePage().props.auth.user;

    const defaultStats = {
        total_enrolled: 0,
        total_completed_lessons: 0,
        certificates: 0
    };
    
    const currentStats = stats || defaultStats;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900">
                            Learning Hub
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">What will you learn today, {user.name}?</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm bg-blue-600 text-white">
                            Student Account
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="User Dashboard" />

            <div className="py-12">
                <div className="w-full space-y-8">
                    
                    {/* Resume Learning Hero Section */}
                    {resume && resume.course && (
                        <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9900] rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-orange-200/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                            </div>
                            <div className="relative z-10 max-w-2xl">
                                <p className="text-sm font-black uppercase tracking-widest text-orange-100 mb-2">Pick Up Where You Left Off</p>
                                <h3 className="text-3xl font-black mb-4 leading-tight">{resume.course.title}</h3>
                                <p className="text-orange-50 mb-8 font-medium">Lanjutkan materi: <span className="font-bold">"{resume.lesson?.title}"</span></p>
                                
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    <Link 
                                        href={route('courses.learn', [resume.course.slug, resume.lesson?.slug])}
                                        className="bg-white text-[#FF7A00] px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-50 transition-colors shadow-lg"
                                    >
                                        Lanjutkan Belajar
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 h-2 bg-black/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-white rounded-full" style={{ width: `${resume.course.progress_percentage}%` }}></div>
                                        </div>
                                        <span className="text-sm font-bold text-white">{resume.course.progress_percentage}% Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Progress Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.382 0z"/></svg>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Courses Enrolled</h3>
                            <p className="text-4xl font-black text-gray-900">{currentStats.total_enrolled}</p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2H7a1 1 0 100-2h.01zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Lessons Completed</h3>
                            <p className="text-4xl font-black text-gray-900">{currentStats.total_completed_lessons}</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Certificates</h3>
                            <p className="text-4xl font-black text-gray-900">{currentStats.certificates}</p>
                        </div>
                    </div>

                    {/* Continue Learning Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">My Courses</h3>
                                    <p className="text-gray-500">Track your progress and continue learning.</p>
                                </div>
                                <a href="/courses" className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-gray-200 hover:-translate-y-1 transition-all">
                                    Browse More Courses
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.length === 0 ? (
                                    <div className="md:col-span-3 p-10 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                                        <p className="text-gray-400">You haven't joined any courses yet. Start your learning journey now!</p>
                                    </div>
                                ) : (
                                    courses.map((course) => (
                                        <div key={course.id} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 group hover:shadow-xl hover:shadow-orange-100/20 transition-all duration-300">
                                            <div className="aspect-video rounded-2xl bg-gray-200 mb-4 overflow-hidden relative">
                                                {course.thumbnail_url ? (
                                                    <img src={course.thumbnail_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Link 
                                                        href={route('courses.learn', course.slug)}
                                                        className="bg-white text-gray-900 px-6 py-2 rounded-xl font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all"
                                                    >
                                                        Continue
                                                    </Link>
                                                </div>
                                            </div>
                                            <h4 className="font-black text-gray-900 mb-1 truncate">{course.title}</h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Mentor: {course.mentor?.name}</p>
                                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200/50">
                                                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full transition-all duration-1000 ${
                                                                course.progress_percentage === 100 ? 'bg-green-500' : 'bg-[#FF7A00]'
                                                            }`} 
                                                            style={{ width: `${course.progress_percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className={`text-[10px] font-black ${
                                                        course.progress_percentage === 100 ? 'text-green-500' : 'text-[#FF7A00]'
                                                    }`}>
                                                        {course.progress_percentage}%
                                                    </span>
                                                </div>
                                            </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
