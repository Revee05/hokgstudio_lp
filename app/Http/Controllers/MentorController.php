<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use Illuminate\Http\Request;

class MentorController extends Controller
{
    public function index(Request $request)
    {
        $query = Mentor::query()->where('status', 'active');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('profession', 'like', "%{$search}%")
                ->orWhere('specialties', 'like', "%{$search}%");
        }

        $mentors = $query->latest()->paginate(6);

        return view('pages.mentors.index', compact('mentors'));
    }
}
