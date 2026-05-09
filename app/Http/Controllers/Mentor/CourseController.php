<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $mentor = $request->user()->mentor;

        if (!$mentor) {
            return Inertia::render('Mentor/Courses/Index', [
                'courses' => new \Illuminate\Pagination\LengthAwarePaginator([], 0, 12),
                'categories' => CourseCategory::orderBy('name')->get(),
                'filters' => $request->only(['search', 'type', 'mode', 'category_id', 'time_status', 'status']),
            ]);
        }

        $query = $mentor->courses()
            ->with(['categories', 'mentor']);

        // Search
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Mode (Online/Offline) - usually for activity
        if ($request->filled('mode')) {
            $query->where('mode', $request->mode);
        }

        // Category
        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('course_categories.id', $request->category_id);
            });
        }

        // Time Status
        if ($request->filled('time_status')) {
            if ($request->time_status === 'ongoing') {
                $query->where('end_date', '>=', now()->toDateString());
            } elseif ($request->time_status === 'ended') {
                $query->where('end_date', '<', now()->toDateString());
            }
        }

        // Status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $courses = $query->latest()->paginate(12)->withQueryString();
        $categories = CourseCategory::orderBy('name')->get();

        return Inertia::render('Mentor/Courses/Index', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => $request->only(['search', 'type', 'mode', 'category_id', 'time_status', 'status']),
        ]);
    }

    public function create()
    {
        $categories = CourseCategory::orderBy('name')->get();

        return Inertia::render('Mentor/Courses/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:product,activity',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:course_categories,id',
            'new_categories' => 'nullable|string|max:255',
            'mode' => 'required_if:type,activity|nullable|in:online,offline',
            'start_date' => 'required_if:type,activity|nullable|date',
            'end_date' => 'required_if:type,activity|nullable|date|after_or_equal:start_date',
            'start_time' => 'required_if:type,activity|nullable|date_format:H:i',
            'end_time' => 'required_if:type,activity|nullable|date_format:H:i|after:start_time',
            'days' => 'required_if:type,activity|nullable|array|min:1',
            'days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'location' => 'required_if:mode,offline|nullable|string|max:500',
            'meet_link' => 'required_if:mode,online|nullable|string|max:500',
        ]);

        $mentor = $request->user()->mentor;

        // Handle new categories creation
        $finalCategoryIds = $validated['category_ids'] ?? [];
        if (!empty($validated['new_categories'])) {
            $newCatNames = explode(',', $validated['new_categories']);
            foreach ($newCatNames as $name) {
                $trimmedName = trim($name);
                if ($trimmedName !== '') {
                    $category = CourseCategory::firstOrCreate(['name' => $trimmedName]);
                    $finalCategoryIds[] = $category->id;
                }
            }
        }

        unset($validated['category_ids'], $validated['new_categories']);

        $course = new Course($validated);
        $course->mentor_id = $mentor->id;
        $course->status = 'draft';

        if ($request->hasFile('thumbnail')) {
            $course->thumbnail = $request->file('thumbnail')->store('courses/thumbnails', 'supabase');
        }

        $course->save();

        // Sync multiple categories
        $course->categories()->sync(array_unique($finalCategoryIds));

        if ($course->type === 'product') {
            return Redirect::route('mentor.courses.curriculum', $course)->with('success', 'Kelas berhasil dibuat. Silakan susun kurikulum Anda!');
        }

        return Redirect::route('mentor.courses.index')->with('success', 'Course created successfully.');
    }

    public function edit(Course $course)
    {
        $categories = CourseCategory::orderBy('name')->get();

        return Inertia::render('Mentor/Courses/Edit', [
            'course' => $course->load(['categories', 'mentor']),
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'type' => 'required|in:product,activity',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:course_categories,id',
            'new_categories' => 'nullable|string|max:255',
            'mode' => 'required_if:type,activity|nullable|in:online,offline',
            'start_date' => 'required_if:type,activity|nullable|date',
            'end_date' => 'required_if:type,activity|nullable|date|after_or_equal:start_date',
            'start_time' => 'required_if:type,activity|nullable|date_format:H:i',
            'end_time' => 'required_if:type,activity|nullable|date_format:H:i|after:start_time',
            'days' => 'required_if:type,activity|nullable|array|min:1',
            'days.*' => 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'location' => 'required_if:mode,offline|nullable|string|max:500',
            'meet_link' => 'required_if:mode,online|nullable|string|max:500',
        ]);

        // Handle new categories creation
        $finalCategoryIds = $validated['category_ids'] ?? [];
        if (!empty($validated['new_categories'])) {
            $newCatNames = explode(',', $validated['new_categories']);
            foreach ($newCatNames as $name) {
                $trimmedName = trim($name);
                if ($trimmedName !== '') {
                    $category = CourseCategory::firstOrCreate(['name' => $trimmedName]);
                    $finalCategoryIds[] = $category->id;
                }
            }
        }

        unset($validated['category_ids'], $validated['new_categories']);

        if ($request->hasFile('thumbnail')) {
            if ($course->thumbnail) {
                Storage::disk('supabase')->delete($course->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('courses/thumbnails', 'supabase');
        }

        // Clear conditional fields based on mode
        if ($validated['mode'] === 'online') {
            $validated['location'] = null;
        } else {
            $validated['meet_link'] = null;
        }

        $course->update($validated);

        // Sync multiple categories
        $course->categories()->sync(array_unique($finalCategoryIds));

        return Redirect::route('mentor.courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        if ($course->thumbnail) {
            Storage::disk('supabase')->delete($course->thumbnail);
        }
        $course->delete();

        return Redirect::route('mentor.courses.index')->with('success', 'Course deleted successfully.');
    }
}
