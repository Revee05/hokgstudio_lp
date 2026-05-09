import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function MentorDashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900">
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

            <div className="space-y-10 pb-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { label: 'Total Students', value: '124', trend: '+12% from last month', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'blue' },
                        { label: 'Active Courses', value: '8', trend: 'Across 3 categories', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'orange' },
                        { label: 'Course Rating', value: '4.9', trend: 'Excellent Performance', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'yellow' },
                        { label: 'Estimated Earnings', value: 'Rp 4.5M', trend: 'Pending payout', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'green' }
                    ].map((item, idx) => (
                        <div key={idx} className="group relative bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-opacity-10 ${
                                    item.color === 'orange' ? 'bg-[#FF7A00] text-[#FF7A00]' : 
                                    item.color === 'blue' ? 'bg-blue-500 text-blue-500' : 
                                    item.color === 'yellow' ? 'bg-yellow-500 text-yellow-500' : 
                                    'bg-green-500 text-green-500'
                                }`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
                                </div>
                            </div>
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-1">{item.label}</h3>
                            <p className="text-3xl font-black text-gray-900 mb-2">{item.value}</p>
                            <span className={`text-[11px] font-bold ${item.color === 'orange' || item.color === 'yellow' ? 'text-orange-500' : item.color === 'blue' ? 'text-blue-500' : 'text-green-500'}`}>
                                {item.trend}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                    {/* Course List Placeholder */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Recent Courses</h3>
                                <p className="text-sm text-gray-400">Manage your latest educational content</p>
                            </div>
                            <button className="px-5 py-2 rounded-full text-xs font-bold text-[#FF7A00] bg-orange-50 hover:bg-[#FF7A00] hover:text-white transition-all">
                                View All
                            </button>
                        </div>
                        <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                            </div>
                            <p className="text-gray-500 font-medium mb-6 max-w-xs">You haven't uploaded any courses recently. Start sharing your knowledge today!</p>
                            <button className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-sm font-bold shadow-lg shadow-gray-200 hover:scale-105 transition-transform">
                                Create New Course
                            </button>
                        </div>
                    </div>

                    {/* Recent Reviews Placeholder */}
                    <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50">
                            <h3 className="text-xl font-black text-gray-900">Student Reviews</h3>
                            <p className="text-sm text-gray-400">What your students are saying</p>
                        </div>
                        <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                            </div>
                            <p className="text-gray-400 text-sm italic">No new reviews from your students yet. Keep up the great work!</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
