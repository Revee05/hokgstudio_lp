import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const DAYS = [
    { value: 'monday', label: 'Sen' },
    { value: 'tuesday', label: 'Sel' },
    { value: 'wednesday', label: 'Rab' },
    { value: 'thursday', label: 'Kam' },
    { value: 'friday', label: 'Jum' },
    { value: 'saturday', label: 'Sab' },
    { value: 'sunday', label: 'Min' },
];

export default function CourseForm({ course = null, categories = [] }) {
    const [showNewCategory, setShowNewCategory] = useState(false);

    const { data, setData, post, processing, errors, transform } = useForm({
        type: course?.type || 'activity',
        title: course?.title || '',
        description: course?.description || '',
        category_ids: Array.isArray(course?.categories) ? course.categories.map(c => c.id) : [],
        new_categories: '',
        mode: course?.mode || 'offline',
        start_date: course?.start_date ? course.start_date.split('T')[0] : '',
        end_date: course?.end_date ? course.end_date.split('T')[0] : '',
        start_time: course?.start_time?.substring(0, 5) || '',
        end_time: course?.end_time?.substring(0, 5) || '',
        days: (() => {
            if (Array.isArray(course?.days)) return course.days;
            if (typeof course?.days === 'string') {
                try { return JSON.parse(course.days); } catch (e) { return []; }
            }
            return [];
        })(),
        location: course?.location || '',
        meet_link: course?.meet_link || '',
        thumbnail: null,
        _method: course ? 'patch' : 'post',
    });

    const toggleCategory = (id) => {
        const current = [...data.category_ids];
        const idx = current.indexOf(id);
        if (idx > -1) {
            current.splice(idx, 1);
        } else {
            current.push(id);
        }
        setData('category_ids', current);
    };

    const toggleDay = (day) => {
        const current = [...data.days];
        const idx = current.indexOf(day);
        if (idx > -1) {
            current.splice(idx, 1);
        } else {
            current.push(day);
        }
        setData('days', current);
    };

    const submit = (e) => {
        e.preventDefault();

        if (course) {
            transform((data) => ({
                ...data,
                _method: 'patch',
            }));
            post(route('mentor.courses.update', course.id), {
                forceFormData: true,
            });
        } else {
            post(route('mentor.courses.store'), {
                forceFormData: true,
            });
        }
    };

    const selectClasses = "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm";
    const textareaClasses = "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm";

    return (
        <form onSubmit={submit} className="space-y-8">
            {/* Section 0: Course Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Jenis Kelas</h3>
                    <p className="text-sm text-gray-500">Tentukan apakah kelas ini berupa produk digital atau aktivitas terjadwal.</p>
                </div>
                <div className="md:col-span-2">
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setData('type', 'activity')}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all text-left ${
                                data.type === 'activity'
                                    ? 'border-[#FF7A00] bg-orange-50'
                                    : 'border-gray-100 bg-white dark:bg-gray-800'
                            }`}
                        >
                            <div className="font-bold text-gray-900 dark:text-white">Activity</div>
                            <div className="text-xs text-gray-500">Kelas terjadwal (Workshop, Kursus, dll)</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('type', 'product')}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all text-left ${
                                data.type === 'product'
                                    ? 'border-[#FF7A00] bg-orange-50'
                                    : 'border-gray-100 bg-white dark:bg-gray-800'
                            }`}
                        >
                            <div className="font-bold text-gray-900 dark:text-white">Product</div>
                            <div className="text-xs text-gray-500">Produk digital (E-book, Video, dll)</div>
                        </button>
                    </div>
                    {data.type === 'product' && (
                        <p className="mt-4 text-xs font-bold text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-100 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            Setelah ini, Anda akan diarahkan untuk menyusun Modul, Materi, dan Kuis.
                        </p>
                    )}
                    <InputError message={errors.type} className="mt-2" />
                </div>
            </div>

            {/* Section 1: Category & Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kategori & Info Dasar</h3>
                    <p className="text-sm text-gray-500">Pilih kategori kelas dan isi informasi dasar kelas yang akan dibuat.</p>
                </div>
                <div className="md:col-span-2 space-y-6">
                    {/* Category */}
                    <div>
                        <InputLabel value="Kategori Kelas" />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => toggleCategory(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                                        data.category_ids.includes(cat.id)
                                            ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                                            : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-orange-200'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setShowNewCategory(!showNewCategory)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 border-dashed transition-all ${
                                    showNewCategory
                                        ? 'bg-gray-100 text-gray-700 border-gray-400'
                                        : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
                                }`}
                            >
                                {showNewCategory ? 'Batal Tambah' : '+ Kategori Baru'}
                            </button>
                        </div>

                        {showNewCategory && (
                            <div className="mt-4">
                                <InputLabel htmlFor="new_categories" value="Tambah Kategori Baru (Pisahkan dengan koma)" />
                                <TextInput
                                    id="new_categories"
                                    className="mt-1 block w-full"
                                    value={data.new_categories}
                                    onChange={(e) => setData('new_categories', e.target.value)}
                                    placeholder="Contoh: Desain Grafis, Bisnis, Marketing"
                                />
                                <p className="mt-1 text-[10px] text-gray-400">Gunakan koma (,) untuk menambahkan lebih dari satu kategori baru.</p>
                            </div>
                        )}
                        <InputError message={errors.category_ids || errors.new_categories} className="mt-2" />
                    </div>

                    {/* Title */}
                    <div>
                        <InputLabel htmlFor="title" value="Nama Kelas" />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            placeholder="Contoh: Masterclass Digital Illustration"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    {/* Description */}
                    <div>
                        <InputLabel htmlFor="description" value="Deskripsi Kelas" />
                        <textarea
                            id="description"
                            className={textareaClasses + " min-h-[120px]"}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan tentang kelas ini..."
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Section 2: Thumbnail */}
            <div className="pt-8 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Poster / Thumbnail</h3>
                    <p className="text-sm text-gray-500">Upload gambar poster atau thumbnail untuk kelas ini.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                    {course?.thumbnail_url && (
                        <div className="w-full max-w-md rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                            <img src={course.thumbnail_url} alt="Current thumbnail" className="w-full h-48 object-cover" />
                            <p className="text-xs text-gray-400 p-3">Thumbnail saat ini. Upload file baru untuk mengganti.</p>
                        </div>
                    )}
                    <div>
                        <InputLabel htmlFor="thumbnail" value="Upload Poster" />
                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#FF7A00] hover:file:bg-orange-100 transition-all"
                            onChange={(e) => setData('thumbnail', e.target.files[0])}
                        />
                        <InputError message={errors.thumbnail} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Section 3: Mode Pelaksanaan */}
            {data.type === 'activity' && (
                <div className="pt-8 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mode Pelaksanaan</h3>
                        <p className="text-sm text-gray-500">Tentukan apakah kelas dilaksanakan secara online atau offline.</p>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        {/* Radio Buttons */}
                        <div className="flex gap-4">
                            <label
                                className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    data.mode === 'offline'
                                        ? 'border-[#FF7A00] bg-orange-50/50'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="mode"
                                    value="offline"
                                    checked={data.mode === 'offline'}
                                    onChange={() => setData('mode', 'offline')}
                                    className="text-[#FF7A00] focus:ring-[#FF7A00]"
                                />
                                <div>
                                    <span className="font-bold text-gray-900 dark:text-white">Offline</span>
                                    <p className="text-xs text-gray-500">Tatap muka langsung</p>
                                </div>
                            </label>

                            <label
                                className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    data.mode === 'online'
                                        ? 'border-[#FF7A00] bg-orange-50/50'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="mode"
                                    value="online"
                                    checked={data.mode === 'online'}
                                    onChange={() => setData('mode', 'online')}
                                    className="text-[#FF7A00] focus:ring-[#FF7A00]"
                                />
                                <div>
                                    <span className="font-bold text-gray-900 dark:text-white">Online</span>
                                    <p className="text-xs text-gray-500">Via video conference</p>
                                </div>
                            </label>
                        </div>
                        <InputError message={errors.mode} className="mt-2" />

                        {/* Conditional Field */}
                        {data.mode === 'offline' ? (
                            <div>
                                <InputLabel htmlFor="location" value="Tempat Pelaksanaan" />
                                <TextInput
                                    id="location"
                                    className="mt-1 block w-full"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: Griya Bhayangkara Blok G-23, Sidoarjo"
                                />
                                <InputError message={errors.location} className="mt-2" />
                            </div>
                        ) : (
                            <div>
                                <InputLabel htmlFor="meet_link" value="Link Meeting" />
                                <TextInput
                                    id="meet_link"
                                    className="mt-1 block w-full"
                                    value={data.meet_link}
                                    onChange={(e) => setData('meet_link', e.target.value)}
                                    placeholder="Contoh: https://meet.google.com/abc-defg-hij"
                                />
                                <InputError message={errors.meet_link} className="mt-2" />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Section 4: Schedule */}
            {data.type === 'activity' && (
                <div className="pt-8 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Jadwal Kelas</h3>
                        <p className="text-sm text-gray-500">Atur periode, jam, dan hari pelaksanaan kelas.</p>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="start_date" value="Tanggal Mulai" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="end_date" value="Tanggal Selesai" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>
                        </div>

                        {/* Time Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="start_time" value="Jam Mulai" />
                                <TextInput
                                    id="start_time"
                                    type="time"
                                    className="mt-1 block w-full"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_time} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="end_time" value="Jam Selesai" />
                                <TextInput
                                    id="end_time"
                                    type="time"
                                    className="mt-1 block w-full"
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.end_time} className="mt-2" />
                            </div>
                        </div>

                        {/* Day Selection */}
                        <div>
                            <InputLabel value="Hari Pelaksanaan" />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {DAYS.map((day) => (
                                    <button
                                        key={day.value}
                                        type="button"
                                        onClick={() => toggleDay(day.value)}
                                        className={`px-5 py-2.5 rounded-2xl text-sm font-bold border-2 transition-all ${
                                            data.days.includes(day.value)
                                                ? 'bg-[#FF7A00] text-white border-[#FF7A00] shadow-md shadow-orange-100'
                                                : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                            <InputError message={errors.days} className="mt-2" />
                        </div>
                    </div>
                </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100 dark:border-gray-700">
                <PrimaryButton disabled={processing} className="bg-[#FF7A00] hover:bg-[#E66E00] px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs">
                    {course 
                        ? 'Simpan Perubahan' 
                        : (data.type === 'product' ? 'Buat Kelas & Atur Kurikulum' : 'Buat Kelas')}
                </PrimaryButton>
            </div>
        </form>
    );
}
