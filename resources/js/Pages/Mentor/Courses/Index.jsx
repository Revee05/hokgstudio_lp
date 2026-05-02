import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const DAY_LABELS = {
    monday: 'Sen', tuesday: 'Sel', wednesday: 'Rab',
    thursday: 'Kam', friday: 'Jum', saturday: 'Sab', sunday: 'Min',
};

export default function Index({ auth, courses, categories = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [mode, setMode] = useState(filters.mode || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [timeStatus, setTimeStatus] = useState(filters.time_status || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleFilter = () => {
        router.get(route('mentor.courses.index'), {
            search,
            type,
            mode: type === 'activity' ? mode : '',
            category_id: categoryId,
            time_status: timeStatus,
            status,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    // Trigger filter on select changes
    useEffect(() => {
        if (type || mode || categoryId || timeStatus || status) {
             handleFilter();
        }
    }, [type, mode, categoryId, timeStatus, status]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            handleFilter();
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (courseId) => {
        if (confirm('Yakin ingin menghapus kelas ini?')) {
            router.delete(route('mentor.courses.destroy', courseId));
        }
    };

    const selectClasses = "text-xs font-bold bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-xl focus:ring-[#FF7A00] focus:border-[#FF7A00]";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                            Kelas Saya
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Kelola produk digital dan aktivitas Anda.</p>
                    </div>
                    <Link
                        href={route('mentor.courses.create')}
                        className="inline-flex items-center px-6 py-3 bg-[#FF7A00] border border-transparent rounded-2xl font-bold text-sm text-white uppercase tracking-widest hover:bg-[#E66E00] focus:bg-[#E66E00] active:bg-[#CC6200] transition ease-in-out duration-150 shadow-lg shadow-orange-100"
                    >
                        + Buat Kelas Baru
                    </Link>
                </div>
            }
        >
            <Head title="Manajemen Kelas" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
                {/* Filter Bar */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-1">
                            <input
                                type="text"
                                placeholder="Cari judul..."
                                className="w-full text-xs font-bold bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-[#FF7A00]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Type */}
                        <select
                            className={selectClasses}
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Semua Jenis</option>
                            <option value="product">Product</option>
                            <option value="activity">Activity</option>
                        </select>

                        {/* Mode */}
                        {type === 'activity' && (
                            <select
                                className={selectClasses}
                                value={mode}
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <option value="">Semua Mode</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        )}

                        {/* Category */}
                        <select
                            className={selectClasses}
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        {/* Time Status */}
                        <select
                            className={selectClasses}
                            value={timeStatus}
                            onChange={(e) => setTimeStatus(e.target.value)}
                        >
                            <option value="">Status Waktu</option>
                            <option value="ongoing">Sedang Berlangsung</option>
                            <option value="ended">Sudah Berakhir</option>
                        </select>

                        {/* Status */}
                        <select
                            className={selectClasses}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Semua Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                {/* Courses Section */}
                {courses.data.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FF7A00]">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Kelas</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Anda belum membuat kelas apapun. Mulai berbagi ilmu Anda sekarang!</p>
                        <Link href={route('mentor.courses.create')} className="text-[#FF7A00] font-bold hover:underline">
                            Buat kelas pertama &rarr;
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {courses.data.map((course) => (
                                <div key={course.id} className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                        {course.thumbnail_url ? (
                                            <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm ${
                                                course.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                                            }`}>
                                                {course.status}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider shadow-sm ${
                                                course.type === 'activity' ? 'bg-[#FF7A00] text-white' : 'bg-indigo-500 text-white'
                                            }`}>
                                                {course.type}
                                            </span>
                                        </div>
                                        {course.categories && course.categories.length > 0 && (
                                            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                                                {course.categories.slice(0, 2).map((cat) => (
                                                    <span key={cat.id} className="px-1.5 py-0.5 rounded-full text-[7px] font-bold bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm">
                                                        {cat.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 line-clamp-1">{course.title}</h3>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 h-8">{course.description}</p>

                                        {/* Compact Schedule */}
                                        {course.type === 'activity' && (
                                            <div className="flex flex-col gap-1 mb-4 text-[10px] text-gray-400 font-bold uppercase">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1 h-1 rounded-full bg-[#FF7A00]"></div>
                                                    <span>{new Date(course.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} {course.end_date ? `- ${new Date(course.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}` : ''}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                                                    <span>{course.start_time?.substring(0, 5)} - {course.end_time?.substring(0, 5)}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <svg className="w-2.5 h-2.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 mr-1">Mentor:</span>
                                                    <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300 truncate max-w-[80px]">
                                                        {course.mentor?.name || 'Mentor'}
                                                    </span>
                                                </div>
                                                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Harga</span>
                                                <span className="text-sm font-black text-[#FF7A00]">
                                                    {course.price > 0 ? `Rp${new Intl.NumberFormat('id-ID').format(course.price)}` : 'Belum set'}
                                                </span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {course.type === 'product' && (
                                                    <Link
                                                        href={route('mentor.courses.curriculum', course.id)}
                                                        className="p-2 bg-orange-50 text-[#FF7A00] hover:bg-orange-100 rounded-xl transition-all"
                                                        title="Manage Curriculum"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                                    </Link>
                                                )}
                                                <Link
                                                    href={route('mentor.courses.edit', course.id)}
                                                    className="p-2 bg-gray-50 text-gray-400 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(course.id)}
                                                    className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Links */}
                        {courses.links && courses.links.length > 3 && (
                            <div className="mt-12 flex justify-center gap-2">
                                {courses.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                            link.active
                                                ? 'bg-[#FF7A00] text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-orange-50 hover:text-[#FF7A00] border border-gray-100 dark:border-gray-700'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
