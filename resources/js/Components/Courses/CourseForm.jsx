import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function CourseForm({ course = null, submitAction }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        title: course?.title || '',
        description: course?.description || '',
        price: course?.price || 0,
        status: course?.status || 'draft',
        thumbnail: null,
        _method: course ? 'patch' : 'post',
    });

    const submit = (e) => {
        e.preventDefault();
        
        // Handle file upload correctly with Inertia
        if (course) {
            transform((data) => ({
                ...data,
                _method: 'patch',
            }));
            post(route('mentor.courses.update', course.id), {
                forceFormData: true,
            });
        } else {
            post(route('mentor.courses.store'));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Basic Information</h3>
                    <p className="text-sm text-gray-500">The title and description are the first things potential students will see.</p>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="Course Title" />
                        <TextInput
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                            placeholder="e.g. Masterclass in Digital Illustration"
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm min-h-[150px]"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Visuals & Pricing</h3>
                    <p className="text-sm text-gray-500">Upload a compelling thumbnail and set your price.</p>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <InputLabel htmlFor="thumbnail" value="Course Thumbnail" />
                        <input
                            id="thumbnail"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#FF7A00] hover:file:bg-orange-100 transition-all"
                            onChange={(e) => setData('thumbnail', e.target.files[0])}
                        />
                        <InputError message={errors.thumbnail} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="price" value="Price (IDR)" />
                            <TextInput
                                id="price"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                placeholder="0 for Free"
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="status" value="Status" />
                            <select
                                id="status"
                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-2xl shadow-sm"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100 dark:border-gray-700">
                <PrimaryButton disabled={processing} className="bg-[#FF7A00] hover:bg-[#E66E00] px-8 py-3 rounded-2xl">
                    {course ? 'Update Course' : 'Create Course'}
                </PrimaryButton>
            </div>
        </form>
    );
}
