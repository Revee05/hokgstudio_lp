<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\UserRole;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return match ($user->role) {
            UserRole::ADMIN => redirect('/admin'),
            UserRole::MENTOR => Inertia::render('Mentor/Dashboard'),
            UserRole::MEMBER, UserRole::USER => Inertia::render('User/Dashboard'),
            default => Inertia::render('Dashboard'),
        };
    }
}
