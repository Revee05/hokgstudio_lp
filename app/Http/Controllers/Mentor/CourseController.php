<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = $request->user()->mentor->courses()
            ->latest()
            ->paginate(10);

        return Inertia::render('Mentor/Courses/Index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Mentor/Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'price' => 'nullable|numeric|min:0',
        ]);

        $mentor = $request->user()->mentor;

        $course = new Course($validated);
        $course->mentor_id = $mentor->id;

        if ($request->hasFile('thumbnail')) {
            $course->thumbnail = $request->file('thumbnail')->store('courses/thumbnails', 'supabase');
        }

        $course->save();

        return Redirect::route('mentor.courses.index')->with('success', 'Course created successfully.');
    }

    public function edit(Course $course)
    {
        return Inertia::render('Mentor/Courses/Edit', [
            'course' => $course,
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'price' => 'nullable|numeric|min:0',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($course->thumbnail) {
                Storage::disk('supabase')->delete($course->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('courses/thumbnails', 'supabase');
        }

        $course->update($validated);

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
