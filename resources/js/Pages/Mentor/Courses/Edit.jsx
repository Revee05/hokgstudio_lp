import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CourseForm from '@/Components/Courses/CourseForm';

export default function Edit({ course }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
                        Edit Course: {course.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Update your course information and content.</p>
                </div>
            }
        >
            <Head title={`Edit ${course.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                        <CourseForm course={course} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
