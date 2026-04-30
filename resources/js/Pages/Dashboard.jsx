import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                            {user.role === 'admin' ? 'Admin Central' : 
                             user.role === 'mentor' ? 'Instructor Dashboard' : 
                             'Learning Hub'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Selamat datang kembali, {user.name}!</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                            user.role === 'admin' ? 'bg-red-500 text-white' :
                            user.role === 'mentor' ? 'bg-[#FF7A00] text-white' :
                            'bg-blue-600 text-white'
                        }`}>
                            {user.role === 'admin' ? 'System Admin' :
                             user.role === 'mentor' ? 'Pro Instructor' :
                             'Student Member'}
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Role Specific Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">
                                {user.role === 'admin' ? 'Total Users' : 
                                 user.role === 'mentor' ? 'My Students' : 
                                 'Courses Joined'}
                            </h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">0</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">
                                {user.role === 'admin' ? 'Total Revenue' : 
                                 user.role === 'mentor' ? 'Active Courses' : 
                                 'In Progress'}
                            </h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">
                                {user.role === 'admin' ? 'Rp 0' : '0'}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">
                                {user.role === 'admin' ? 'System Health' : 
                                 user.role === 'mentor' ? 'Average Rating' : 
                                 'Completed'}
                            </h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">
                                {user.role === 'admin' ? 'Optimal' : '0.0'}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-xl shadow-gray-100/50 sm:rounded-3xl dark:bg-gray-800 dark:shadow-none border border-gray-50 dark:border-gray-700">
                        <div className="p-10 text-center">
                            <div className="inline-flex p-4 rounded-full bg-orange-50 dark:bg-orange-900/20 mb-4">
                                <svg className="w-8 h-8 text-[#FF7A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {user.role === 'admin' ? 'Monitor System Activity' : 
                                 user.role === 'mentor' ? 'Manage Your Knowledge' : 
                                 'Start Your Journey'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                {user.role === 'admin' ? 'You have full access to manage courses, mentors, and system configurations.' : 
                                 user.role === 'mentor' ? 'Create new courses or manage your existing students from this dashboard.' : 
                                 'Explore our wide range of digital courses and start learning today to build your future.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
