<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseBundle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class BundleController extends Controller
{
    public function index(Request $request)
    {
        $bundles = CourseBundle::with(['mentor', 'courses'])
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Bundles/Index', [
            'bundles' => $bundles,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(CourseBundle $bundle)
    {
        $bundle->load(['mentor.user', 'courses']);

        return Inertia::render('Admin/Bundles/Review', [
            'bundle' => $bundle,
        ]);
    }

    public function approve(Request $request, CourseBundle $bundle)
    {
        $validated = $request->validate([
            'price' => 'required|numeric|min:0',
        ]);

        $bundle->update([
            'status'         => 'approved',
            'price'          => $validated['price'],
            'rejection_note' => null,
        ]);

        return Redirect::route('admin.bundles.index')->with('success', 'Bundle approved and price set.');
    }

    public function reject(Request $request, CourseBundle $bundle)
    {
        $validated = $request->validate([
            'rejection_note' => 'required|string|max:1000',
        ]);

        $bundle->update([
            'status'         => 'rejected',
            'rejection_note' => $validated['rejection_note'],
        ]);

        return Redirect::route('admin.bundles.index')->with('success', 'Bundle rejected.');
    }
}
