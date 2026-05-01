import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CourseForm from '@/Components/Courses/CourseForm';

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                        Create New Course
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Fill in the details to launch your new course.</p>
                </div>
            }
        >
            <Head title="Create Course" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                        <CourseForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
