<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseBundle;
use App\Models\CourseCategory;
use App\Models\BundleCategory;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryName = $request->input('category');

        // Fetch Bundles (Section 1)
        $bundlesQuery = CourseBundle::with(['mentor', 'categories'])
            ->where('status', 'approved');

        if ($search) {
            $bundlesQuery->where('title', 'like', "%{$search}%");
        }

        if ($categoryName) {
            $bundlesQuery->whereHas('categories', function ($q) use ($categoryName) {
                $q->where('bundle_categories.name', $categoryName);
            });
        }

        $bundles = $bundlesQuery->latest()->paginate(8, ['*'], 'bundles_page');

        // Fetch Courses (Section 2)
        $coursesQuery = Course::with(['mentor', 'categories'])
            ->where('status', 'published');

        if ($search) {
            $coursesQuery->where('title', 'like', "%{$search}%");
        }

        if ($categoryName) {
            $coursesQuery->whereHas('categories', function ($q) use ($categoryName) {
                $q->where('course_categories.name', $categoryName);
            });
        }

        $courses = $coursesQuery->latest()->paginate(8, ['*'], 'courses_page');

        // Get unique category names from both
        $courseCats = CourseCategory::pluck('name')->toArray();
        $bundleCats = BundleCategory::pluck('name')->toArray();
        $categories = array_unique(array_merge($courseCats, $bundleCats));
        sort($categories);

        return view('pages.courses.index', compact('bundles', 'courses', 'categories', 'search', 'categoryName'));
    }
    public function show(Course $course)
    {
        $course->load(['mentor.user', 'categories', 'modules.lessons']);
        return view('pages.courses.show', compact('course'));
    }

    public function showBundle(CourseBundle $bundle)
    {
        $bundle->load(['mentor.user', 'categories', 'courses.mentor.user', 'courses.categories']);
        return view('pages.courses.bundle_show', compact('bundle'));
    }
}
