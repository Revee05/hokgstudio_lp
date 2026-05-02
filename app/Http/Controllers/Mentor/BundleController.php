<?php

namespace App\Http\Controllers\Mentor;

use App\Http\Controllers\Controller;
use App\Models\CourseBundle;
use App\Models\BundleCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class BundleController extends Controller
{
    public function index(Request $request)
    {
        $mentor = $request->user()->mentor;
        $bundles = $mentor->bundles()
            ->with(['courses', 'categories'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Mentor/Bundles/Index', [
            'bundles' => $bundles,
        ]);
    }

    public function create(Request $request)
    {
        $mentor = $request->user()->mentor;
        $courses = $mentor->courses()->select('id', 'title', 'type')->get();
        $categories = BundleCategory::orderBy('name')->get();

        return Inertia::render('Mentor/Bundles/Form', [
            'bundle' => null,
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail'   => 'nullable|image|max:2048',
            'course_ids'  => 'required|array|min:2',
            'course_ids.*' => 'exists:courses,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:bundle_categories,id',
            'new_categories' => 'nullable|string|max:255',
        ]);

        $mentor = $request->user()->mentor;

        $bundle = new CourseBundle($validated);
        $bundle->mentor_id = $mentor->id;
        $bundle->status = 'draft';

        if ($request->hasFile('thumbnail')) {
            $bundle->thumbnail = $request->file('thumbnail')->store('bundles/thumbnails', 'supabase');
        }

        $bundle->save();
        $bundle->courses()->sync($validated['course_ids']);

        // Handle categories
        $finalCategoryIds = $validated['category_ids'] ?? [];
        if (!empty($validated['new_categories'])) {
            $newCatNames = explode(',', $validated['new_categories']);
            foreach ($newCatNames as $name) {
                $trimmedName = trim($name);
                if ($trimmedName !== '') {
                    $category = BundleCategory::firstOrCreate(['name' => $trimmedName]);
                    $finalCategoryIds[] = $category->id;
                }
            }
        }
        $bundle->categories()->sync(array_unique($finalCategoryIds));

        return Redirect::route('mentor.bundles.index')->with('success', 'Bundle created successfully.');
    }

    public function edit(Request $request, CourseBundle $bundle)
    {
        $mentor = $request->user()->mentor;
        $courses = $mentor->courses()->select('id', 'title', 'type')->get();
        $categories = BundleCategory::orderBy('name')->get();

        return Inertia::render('Mentor/Bundles/Form', [
            'bundle'  => $bundle->load(['courses', 'categories']),
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, CourseBundle $bundle)
    {
        // Only allow editing if draft, rejected, or approved
        if (!in_array($bundle->status, ['draft', 'rejected', 'approved'])) {
            return back()->withErrors(['status' => 'Cannot edit a bundle that is currently pending review.']);
        }

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail'   => 'nullable|image|max:2048',
            'course_ids'  => 'required|array|min:2',
            'course_ids.*' => 'exists:courses,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:bundle_categories,id',
            'new_categories' => 'nullable|string|max:255',
        ]);



        $oldCourseIds = array_map('intval', $bundle->courses()->pluck('courses.id')->toArray());
        sort($oldCourseIds);
        
        $newCourseIds = array_map('intval', $validated['course_ids']);
        sort($newCourseIds);

        // Fill other fields
        $bundle->fill([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if exists
            if ($bundle->thumbnail) {
                try {
                    $oldPath = $bundle->thumbnail;
                    
                    // If it's a full URL, try to extract the relative path
                    if (filter_var($oldPath, FILTER_VALIDATE_URL)) {
                        $baseUrl = config('filesystems.disks.supabase.url');
                        if ($baseUrl && str_contains($oldPath, $baseUrl)) {
                            $oldPath = str_replace(rtrim($baseUrl, '/') . '/', '', $oldPath);
                        } else {
                            // If it's a URL from another source, we can't easily delete it via our disk
                            $oldPath = null;
                        }
                    }

                    if ($oldPath && \Illuminate\Support\Facades\Storage::disk('supabase')->exists($oldPath)) {
                        \Illuminate\Support\Facades\Storage::disk('supabase')->delete($oldPath);
                    }
                } catch (\Exception $e) {
                    // Ignore deletion errors
                }
            }
            $bundle->thumbnail = $request->file('thumbnail')->store('bundles/thumbnails', 'supabase');
        }

        // If courses changed and it was approved, move back to pending for re-review
        if ($bundle->status === 'approved' && $oldCourseIds !== $newCourseIds) {
            $bundle->status = 'pending';
        }

        $bundle->save();
        $bundle->courses()->sync($newCourseIds);

        // Handle categories
        $finalCategoryIds = $validated['category_ids'] ?? [];
        if (!empty($validated['new_categories'])) {
            $newCatNames = explode(',', $validated['new_categories']);
            foreach ($newCatNames as $name) {
                $trimmedName = trim($name);
                if ($trimmedName !== '') {
                    $category = BundleCategory::firstOrCreate(['name' => $trimmedName]);
                    $finalCategoryIds[] = $category->id;
                }
            }
        }
        $bundle->categories()->sync(array_unique($finalCategoryIds));

        return Redirect::route('mentor.bundles.index')->with('success', 'Bundle updated successfully.');
    }

    public function destroy(CourseBundle $bundle)
    {
        if ($bundle->thumbnail) {
            try {
                $oldPath = $bundle->thumbnail;
                if (filter_var($oldPath, FILTER_VALIDATE_URL)) {
                    $baseUrl = config('filesystems.disks.supabase.url');
                    if ($baseUrl && str_contains($oldPath, $baseUrl)) {
                        $oldPath = str_replace(rtrim($baseUrl, '/') . '/', '', $oldPath);
                    } else {
                        $oldPath = null;
                    }
                }

                if ($oldPath && Storage::disk('supabase')->exists($oldPath)) {
                    Storage::disk('supabase')->delete($oldPath);
                }
            } catch (\Exception $e) {
                // Ignore
            }
        }
        $bundle->delete();

        return back()->with('success', 'Bundle deleted.');
    }

    public function submit(CourseBundle $bundle)
    {
        if ($bundle->status !== 'draft' && $bundle->status !== 'rejected') {
            return back()->withErrors(['status' => 'Bundle is already submitted or approved.']);
        }

        $bundle->update(['status' => 'pending', 'rejection_note' => null]);

        return back()->with('success', 'Bundle submitted for admin review.');
    }
}
