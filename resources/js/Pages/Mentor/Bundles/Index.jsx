import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const STATUS_STYLES = {
    draft:    { label: 'Draft',             cls: 'bg-gray-100 text-gray-600' },
    pending:  { label: 'Menunggu Review',   cls: 'bg-yellow-100 text-yellow-700' },
    approved: { label: 'Disetujui',         cls: 'bg-green-100 text-green-700' },
    rejected: { label: 'Ditolak',           cls: 'bg-red-100 text-red-700' },
};

export default function Index({ auth, bundles }) {
    const submit = (bundleId) => {
        if (confirm('Ajukan paket ini untuk review admin?')) {
            router.post(route('mentor.bundles.submit', bundleId));
        }
    };

    const destroy = (bundleId) => {
        if (confirm('Hapus paket ini?')) {
            router.delete(route('mentor.bundles.destroy', bundleId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Bundle Courses</h2>
                    <Link href={route('mentor.bundles.create')}>
                        <PrimaryButton>+ Buat Paket</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Paket Kelas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    {bundles.data.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                </svg>
                            </div>
                            <p className="text-gray-500 font-bold mb-2">Belum ada paket kelas.</p>
                            <p className="text-gray-400 text-sm">Buat paket yang menggabungkan beberapa kelas Anda.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {bundles.data.map((bundle) => {
                                const statusInfo = STATUS_STYLES[bundle.status] ?? STATUS_STYLES.draft;
                                const canEdit = ['draft', 'rejected', 'approved'].includes(bundle.status);

                                return (
                                    <div key={bundle.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                                        {/* Thumbnail */}
                                        <div className="h-40 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden relative">
                                            {bundle.thumbnail_url ? (
                                                <img src={bundle.thumbnail_url} className="w-full h-full object-cover" alt={bundle.title} />
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-12 h-12 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                                                    </svg>
                                                    <span className="text-[8px] text-orange-200 mt-2">No Thumbnail URL</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Status Badge */}
                                            <span className={`self-start text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${statusInfo.cls}`}>
                                                {statusInfo.label}
                                            </span>

                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">{bundle.title}</h3>
                                            
                                            {/* Category Badges */}
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {bundle.categories?.map(cat => (
                                                    <span key={cat.id} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-100">
                                                        {cat.name}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-xs text-gray-500 mb-4">{bundle.courses?.length ?? 0} kelas dalam paket</p>

                                            {/* Courses List */}
                                            <div className="space-y-1 mb-4 flex-1">
                                                {bundle.courses?.slice(0, 3).map(c => (
                                                    <div key={c.id} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                                                        <span className="truncate">{c.title}</span>
                                                    </div>
                                                ))}
                                                {(bundle.courses?.length ?? 0) > 3 && (
                                                    <p className="text-xs text-gray-400 ml-3.5">+{bundle.courses.length - 3} kelas lainnya</p>
                                                )}
                                            </div>

                                            {/* Price (if approved) */}
                                            {bundle.status === 'approved' && bundle.price && (
                                                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                                    <p className="text-xs text-green-600 font-medium">Harga ditetapkan Admin:</p>
                                                    <p className="text-lg font-black text-green-700">
                                                        Rp {Number(bundle.price).toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Rejection Note */}
                                            {bundle.status === 'rejected' && bundle.rejection_note && (
                                                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
                                                    <p className="text-xs font-bold text-red-600 mb-1">Catatan Admin:</p>
                                                    <p className="text-xs text-red-500">{bundle.rejection_note}</p>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="flex gap-2 mt-auto pt-4 border-t border-gray-50 dark:border-gray-700">
                                                {canEdit && (
                                                    <>
                                                        <Link
                                                            href={route('mentor.bundles.edit', bundle.id)}
                                                            className="flex-1 text-center text-xs font-bold px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition-colors"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => submit(bundle.id)}
                                                            className="flex-1 text-xs font-bold px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                                                        >
                                                            Ajukan
                                                        </button>
                                                    </>
                                                )}
                                                {bundle.status === 'pending' && (
                                                    <div className="flex-1 text-center text-xs text-yellow-600 font-medium py-2">
                                                        Sedang direview admin...
                                                    </div>
                                                )}
                                                {!['draft', 'rejected', 'pending'].includes(bundle.status) && (
                                                    <div className="flex-1 text-center text-xs text-green-600 font-bold py-2">✓ Aktif</div>
                                                )}
                                                <button
                                                    onClick={() => destroy(bundle.id)}
                                                    className="px-3 py-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
