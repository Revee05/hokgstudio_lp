import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, bundles }) {
    const handleDelete = (bundle) => {
        if (confirm('Yakin ingin menghapus paket ini?')) {
            router.delete(route('mentor.bundles.destroy', bundle.slug));
        }
    };

    const handleSubmit = (bundle) => {
        if (confirm('Kirim paket ini untuk ditinjau admin?')) {
            router.post(route('mentor.bundles.submit', bundle.slug));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-600';
            case 'pending': return 'bg-blue-100 text-blue-600';
            case 'rejected': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold leading-tight text-gray-900">
                            Bundle Courses
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Kelola paket kelas Anda untuk penawaran lebih menarik.</p>
                    </div>
                    <Link
                        href={route('mentor.bundles.create')}
                        className="inline-flex items-center px-6 py-3 bg-[#FF7A00] text-white rounded-2xl text-sm font-bold shadow-lg shadow-orange-100 hover:scale-105 transition-all"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                        Buat Paket Baru
                    </Link>
                </div>
            }
        >
            <Head title="Manage Bundles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {bundles.data.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] p-12 text-center border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">Belum Ada Paket</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">Gabungkan beberapa kelas Anda menjadi satu paket dengan harga spesial untuk menarik lebih banyak siswa.</p>
                            <Link
                                href={route('mentor.bundles.create')}
                                className="px-8 py-3 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all"
                            >
                                Buat Paket Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bundles.data.map((bundle) => (
                                <div key={bundle.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img 
                                            src={bundle.thumbnail_url || '/images/placeholder-course.jpg'} 
                                            alt={bundle.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(bundle.status)}`}>
                                                {bundle.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {bundle.categories?.map(cat => (
                                                <span key={cat.id} className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-bold rounded-lg uppercase tracking-wider">
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-[#FF7A00] transition-colors line-clamp-2 leading-snug">
                                            {bundle.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-6 flex-1">
                                            Terdiri dari <span className="font-bold text-gray-900">{bundle.courses_count || bundle.courses?.length} kelas</span> pilihan.
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 gap-2">
                                            <div className="flex gap-1">
                                                <Link
                                                    href={route('mentor.bundles.edit', bundle.slug)}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#FF7A00] hover:bg-orange-50 rounded-xl transition-all"
                                                    title="Edit Bundle"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(bundle)}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Delete Bundle"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                                </button>
                                            </div>

                                            {(bundle.status === 'draft' || bundle.status === 'rejected') && (
                                                <button
                                                    onClick={() => handleSubmit(bundle)}
                                                    className="px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                                                >
                                                    Submit for Review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {bundles.links && bundles.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {bundles.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        link.active 
                                            ? 'bg-[#FF7A00] text-white shadow-md shadow-orange-100' 
                                            : 'bg-white text-gray-500 hover:bg-gray-50'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
