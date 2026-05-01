import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, courses }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                            My Courses
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Manage and publish your educational content.</p>
                    </div>
                    <Link
                        href={route('mentor.courses.create')}
                        className="inline-flex items-center px-6 py-3 bg-[#FF7A00] border border-transparent rounded-2xl font-bold text-sm text-white uppercase tracking-widest hover:bg-[#E66E00] focus:bg-[#E66E00] active:bg-[#CC6200] transition ease-in-out duration-150 shadow-lg shadow-orange-100"
                    >
                        Create New Course
                    </Link>
                </div>
            }
        >
            <Head title="My Courses" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {courses.data.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FF7A00]">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Courses Found</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't created any courses yet. Start sharing your knowledge with the world today!</p>
                            <Link href={route('mentor.courses.create')} className="text-[#FF7A00] font-bold hover:underline">
                                Create your first course &rarr;
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.data.map((course) => (
                                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                                                course.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                                            }`}>
                                                {course.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-1">{course.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 h-10">{course.description}</p>
                                        
                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-700">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Price</span>
                                                <span className="text-lg font-black text-[#FF7A00]">
                                                    {course.price > 0 ? `Rp ${new Intl.NumberFormat('id-ID').format(course.price)}` : 'FREE'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('mentor.courses.edit', course.id)}
                                                    className="p-3 bg-gray-50 text-gray-400 hover:text-[#FF7A00] hover:bg-orange-50 rounded-2xl transition-all"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
