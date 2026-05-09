import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';
import RichTextEditor from '@/Components/RichTextEditor';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Form({ auth, bundle, courses, categories = [] }) {
    const isEdit = !!bundle;
    const isApproved = bundle?.status === 'approved';

    const { data, setData, post, patch, processing, errors, progress } = useForm({
        title:          bundle?.title          ?? '',
        description:    bundle?.description    ?? '',
        thumbnail:      null,
        course_ids:     bundle?.courses?.map(c => c.id)    ?? [],
        category_ids:   bundle?.categories?.map(c => c.id) ?? [],
        new_categories: '',
    });

    const toggleCourse = (id) => {
        setData('course_ids',
            data.course_ids.includes(id)
                ? data.course_ids.filter(i => i !== id)
                : [...data.course_ids, id]
        );
    };

    const toggleCategory = (id) => {
        setData('category_ids',
            data.category_ids.includes(id)
                ? data.category_ids.filter(i => i !== id)
                : [...data.category_ids, id]
        );
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            patch(route('mentor.bundles.update', bundle.slug));
        } else {
            post(route('mentor.bundles.store'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {isEdit ? `Edit Paket: ${bundle.title}` : 'Buat Paket Kelas Baru'}
                </h2>
            }
        >
            <Head>
                <title>{isEdit ? 'Edit Paket' : 'Buat Paket'}</title>
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
                <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
            </Head>

            <div className="py-12">
                {/* No Courses Warning Modal */}
                {!isEdit && courses.length === 0 && (
                    <Modal show={true} closeable={false}>
                        <div className="p-10 text-center">
                            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Belum Ada Kelas</h3>
                            <p className="text-gray-500 mb-8">
                                Untuk membuat sebuah Paket (Bundle), Anda harus memiliki setidaknya **2 kelas aktif** terlebih dahulu. Saat ini Anda belum membuat kelas apapun.
                            </p>
                            <div className="flex flex-col gap-3">
                                <a 
                                    href={route('mentor.courses.create')}
                                    className="w-full inline-flex justify-center items-center px-6 py-4 bg-orange-500 border border-transparent rounded-2xl font-black text-sm text-white uppercase tracking-widest hover:bg-orange-600 active:bg-orange-700 transition duration-150 shadow-lg shadow-orange-100"
                                >
                                    Buat Kelas Sekarang
                                </a>
                                <a 
                                    href={route('mentor.bundles.index')}
                                    className="w-full inline-flex justify-center items-center px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-xs uppercase hover:bg-gray-100 transition duration-150"
                                >
                                    Kembali ke Daftar Paket
                                </a>
                            </div>
                        </div>
                    </Modal>
                )}

                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-8" encType="multipart/form-data">
                        {isApproved && (
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col gap-2">
                                <div className="flex gap-3 items-center">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    <p className="text-xs text-blue-600 font-bold">Informasi: Paket ini sudah disetujui.</p>
                                </div>
                                <p className="text-[11px] text-blue-500">Anda tetap dapat mengubah judul, deskripsi, kategori, dan thumbnail tanpa mempengaruhi status. Namun, jika Anda **mengubah daftar kelas**, paket akan otomatis kembali ke status **Menunggu Review** untuk diverifikasi ulang oleh admin.</p>
                            </div>
                        )}
                        {/* Basic Info Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Informasi Paket</h3>

                            <div>
                                <InputLabel htmlFor="title" value="Judul Bundle *" />
                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Deskripsi Bundle" />
                                <RichTextEditor
                                    value={data.description}
                                    onChange={val => setData('description', val)}
                                    placeholder="Jelaskan tentang paket ini..."
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="thumbnail" value="Thumbnail Bundle" />
                                <div className="mt-2 flex items-start gap-4">
                                    {isEdit && bundle.thumbnail_url && !data.thumbnail && (
                                        <div className="w-32 aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                                            <img src={bundle.thumbnail_url} className="w-full h-full object-cover" alt="Current thumbnail" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                            onChange={e => setData('thumbnail', e.target.files[0])}
                                        />
                                        {isEdit && bundle.thumbnail_url && <p className="mt-1 text-[10px] text-gray-400">Pilih file baru jika ingin mengubah thumbnail.</p>}
                                    </div>
                                </div>
                                {progress && (
                                    <div className="mt-2 w-full bg-gray-100 rounded-full h-1">
                                        <div className="bg-orange-500 h-1 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
                                    </div>
                                )}
                                <InputError message={errors.thumbnail} className="mt-1" />
                            </div>
                        </div>

                        {/* Categories Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
                            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Kategori Bundle</h3>

                            <div>
                                <InputLabel value="Pilih Kategori Terdaftar" className="mb-3" />
                                {categories.length === 0 ? (
                                    <p className="text-gray-400 text-xs italic">Belum ada kategori terdaftar.</p>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map(cat => {
                                            const isSelected = data.category_ids.includes(cat.id);
                                            return (
                                                <button
                                                    key={cat.id}
                                                    type="button"
                                                    onClick={() => toggleCategory(cat.id)}
                                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                                        isSelected
                                                            ? 'bg-orange-500 border-orange-500 text-white shadow-md'
                                                            : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300'
                                                    }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                <InputError message={errors.category_ids} className="mt-1" />
                            </div>

                            <div className="pt-4 border-t border-gray-50">
                                <InputLabel htmlFor="new_categories" value="Tambah Kategori Baru secara Manual" />
                                <TextInput
                                    id="new_categories"
                                    className="mt-1 block w-full"
                                    placeholder="Contoh: Design, Marketing, Coding (Pisahkan dengan koma)"
                                    value={data.new_categories}
                                    onChange={e => setData('new_categories', e.target.value)}
                                />
                                <p className="mt-1 text-[10px] text-gray-400 italic">Gunakan tanda koma (,) untuk menambahkan lebih dari satu kategori.</p>
                                <InputError message={errors.new_categories} className="mt-1" />
                            </div>
                        </div>

                        {/* Course Picker Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="flex justify-between items-center mb-5">
                                <div>
                                    <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Pilih Kelas *</h3>
                                    {isApproved && <p className="text-[10px] text-orange-500 font-bold mt-1">⚠️ Mengubah ini akan memicu review ulang admin.</p>}
                                </div>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${data.course_ids.length >= 2 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {data.course_ids.length} dipilih (min. 2)
                                </span>
                            </div>
                            <InputError message={errors.course_ids} className="mb-3" />

                            {courses.length === 0 ? (
                                <p className="text-gray-400 text-sm italic">Anda belum memiliki kelas. Buat kelas terlebih dahulu.</p>
                            ) : (
                                <div className="space-y-2">
                                    {courses.map(course => {
                                        const selected = data.course_ids.includes(course.id);
                                        return (
                                            <button
                                                key={course.id}
                                                type="button"
                                                onClick={() => toggleCourse(course.id)}
                                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                                                    selected
                                                        ? 'border-orange-400 bg-orange-50'
                                                        : 'border-gray-100 hover:border-orange-200'
                                                }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                                    {selected && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm text-gray-900 truncate">{course.title}</p>
                                                    <p className="text-[10px] text-gray-400 uppercase font-bold">{course.type}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end gap-3 pb-6">
                            <a href={route('mentor.bundles.index')} className="px-6 py-3 rounded-2xl text-gray-500 hover:text-gray-700 font-medium">
                                Batal
                            </a>
                            <PrimaryButton disabled={processing || data.course_ids.length < 2}>
                                {processing ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Buat Paket')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
