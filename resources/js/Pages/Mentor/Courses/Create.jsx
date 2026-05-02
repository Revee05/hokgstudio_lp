import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CourseForm from '@/Components/Courses/CourseForm';

export default function Create({ categories }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                        Buat Kelas Baru
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Isi detail kelas yang akan dibuat.</p>
                </div>
            }
        >
            <Head title="Buat Kelas Baru" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                        <CourseForm categories={categories} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
