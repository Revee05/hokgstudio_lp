import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ auth, attempts, courses = [], modules = [], users = [], filters = {} }) {
    const [selectedCourse, setSelectedCourse] = useState(filters.course_id || '');
    const [selectedModule, setSelectedModule] = useState(filters.module_id || '');
    const [selectedUser, setSelectedUser] = useState(filters.user_id || '');
    const [selectedQuizType, setSelectedQuizType] = useState(filters.quiz_type || '');

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-orange-100 text-orange-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        
        // Reset dependent filters only if course changes
        if (key === 'course_id') {
            newFilters.module_id = '';
            setSelectedModule('');
        }

        router.get(route('mentor.quizzes.index'), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div>
                    <h2 className="text-2xl font-extrabold leading-tight text-gray-900">
                        Quiz Review
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Pantau dan beri nilai pengerjaan kuis dari siswa Anda.</p>
                </div>
            }
        >
            <Head title="Quiz Review" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Filter Section */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Filter by Course</label>
                            <select 
                                value={selectedCourse}
                                onChange={(e) => {
                                    setSelectedCourse(e.target.value);
                                    handleFilterChange('course_id', e.target.value);
                                }}
                                className="w-full border-gray-100 bg-gray-50 rounded-xl text-sm font-bold focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                            >
                                <option value="">All Courses</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Filter by Module</label>
                            <select 
                                value={selectedModule}
                                onChange={(e) => {
                                    setSelectedModule(e.target.value);
                                    handleFilterChange('module_id', e.target.value);
                                }}
                                disabled={!selectedCourse}
                                className="w-full border-gray-100 bg-gray-50 rounded-xl text-sm font-bold focus:ring-[#FF7A00] focus:border-[#FF7A00] disabled:opacity-50"
                            >
                                <option value="">All Modules</option>
                                {modules.map(module => (
                                    <option key={module.id} value={module.id}>{module.title}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Quiz Type</label>
                            <select 
                                value={selectedQuizType}
                                onChange={(e) => {
                                    setSelectedQuizType(e.target.value);
                                    handleFilterChange('quiz_type', e.target.value);
                                }}
                                className="w-full border-gray-100 bg-gray-50 rounded-xl text-sm font-bold focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                            >
                                <option value="">All Types</option>
                                <option value="multiple_choice">Multiple Choice</option>
                                <option value="essay">Essay</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Filter by Student</label>
                            <select 
                                value={selectedUser}
                                onChange={(e) => {
                                    setSelectedUser(e.target.value);
                                    handleFilterChange('user_id', e.target.value);
                                }}
                                className="w-full border-gray-100 bg-gray-50 rounded-xl text-sm font-bold focus:ring-[#FF7A00] focus:border-[#FF7A00]"
                            >
                                <option value="">All Students</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end lg:justify-start">
                            <button 
                                onClick={() => {
                                    setSelectedCourse('');
                                    setSelectedModule('');
                                    setSelectedUser('');
                                    setSelectedQuizType('');
                                    router.get(route('mentor.quizzes.index'));
                                }}
                                className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Student</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Course & Lesson</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Score</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {attempts.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-8 py-20 text-center text-gray-500 italic">
                                                Belum ada pengerjaan kuis yang perlu ditinjau.
                                            </td>
                                        </tr>
                                    ) : (
                                        attempts.map((attempt) => (
                                            <tr key={attempt.id} className="group hover:bg-orange-50/30 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF7A00] font-black text-xs border-2 border-white shadow-sm overflow-hidden">
                                                            {attempt.user.avatar_url ? (
                                                                <img src={attempt.user.avatar_url} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                attempt.user.name.charAt(0)
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-900 text-sm leading-tight">{attempt.user.name}</span>
                                                            <span className="text-[10px] text-gray-400">{attempt.user.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-900 text-sm leading-tight">
                                                            {attempt.quiz?.lesson?.module?.course?.title || 'Unknown Course'}
                                                        </span>
                                                        <span className="text-[10px] text-[#FF7A00] font-bold uppercase tracking-wider">
                                                            Lesson: {attempt.quiz?.lesson?.title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(attempt.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(attempt.status)}`}>
                                                        {attempt.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className={`text-sm font-black ${attempt.score >= (attempt.quiz?.passing_score || 80) ? 'text-green-600' : 'text-gray-900'}`}>
                                                        {attempt.score || 0}
                                                        <span className="text-[10px] text-gray-400 ml-1 font-normal">/ 100</span>
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <Link
                                                        href={route('mentor.quizzes.show', attempt.id)}
                                                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF7A00] transition-all"
                                                    >
                                                        {attempt.status === 'pending' ? 'Grade Quiz' : 'View Details'}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

