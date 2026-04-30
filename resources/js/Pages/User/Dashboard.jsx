import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function UserDashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Progress Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.382 0z"/></svg>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Courses Enrolled</h3>
                            <p className="text-4xl font-black text-gray-900 dark:text-gray-100">0</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="w-0 h-full bg-blue-500 rounded-full"></div>
                                </div>
                                <span className="text-xs font-bold text-gray-400">0% Average</span>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2H7a1 1 0 100-2h.01zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Assignments Done</h3>
                            <p className="text-4xl font-black text-gray-900 dark:text-gray-100">0</p>
                            <span className="text-xs font-bold text-gray-400 mt-2 block">No pending assignments</span>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Certificates</h3>
                            <p className="text-4xl font-black text-gray-900 dark:text-gray-100">0</p>
                        </div>
                    </div>

                    {/* Continue Learning Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl shadow-gray-100/50 dark:shadow-none border border-gray-50 dark:border-gray-700 overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Explore Courses</h3>
                                    <p className="text-gray-500">Find the right course to boost your skills.</p>
                                </div>
                                <button className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-gray-200 dark:shadow-none hover:-translate-y-1 transition-all">
                                    Browse All Courses
                                </button>
                            </div>

                            <div className="p-10 text-center border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-3xl">
                                <p className="text-gray-400">You haven't joined any courses yet. Start your learning journey now!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
