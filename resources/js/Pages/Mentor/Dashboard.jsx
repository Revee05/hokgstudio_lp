import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function MentorDashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                            Instructor Dashboard
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Hello Instructor, {user.name}!</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm bg-[#FF7A00] text-white">
                            Pro Instructor
                        </span>
                    </div>
                </div>
            }
        >
            <Head title="Instructor Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-2">Total Students</h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">124</p>
                            <span className="text-[10px] text-green-500 font-bold">+12% from last month</span>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-2">Active Courses</h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">8</p>
                            <span className="text-[10px] text-gray-400 font-medium">Across 3 categories</span>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-2">Course Rating</h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">4.9</p>
                            <span className="text-[10px] text-orange-400 font-bold">Excellent Performance</span>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-gray-400 text-[10px] uppercase tracking-widest mb-2">Estimated Earnings</h3>
                            <p className="text-3xl font-black text-gray-900 dark:text-gray-100">Rp 4.5M</p>
                            <span className="text-[10px] text-gray-400 font-medium">Pending payout</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Course List Placeholder */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900 dark:text-white">Recent Courses</h3>
                                <button className="text-xs font-bold text-[#FF7A00]">View All</button>
                            </div>
                            <div className="p-6 text-center text-gray-500 py-20">
                                <p>You haven't uploaded any courses recently.</p>
                                <button className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-bold">Create Course</button>
                            </div>
                        </div>

                        {/* Recent Reviews Placeholder */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-gray-900 dark:text-white">Latest Student Reviews</h3>
                                <button className="text-xs font-bold text-[#FF7A00]">View All</button>
                            </div>
                            <div className="p-6 text-center text-gray-500 py-20">
                                <p>No new reviews from your students yet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
