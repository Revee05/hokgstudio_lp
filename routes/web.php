<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home
Route::get('/', function () {
    //     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
// Route::get('/', function () {
    return view('pages.home.index');
});

// tentang kami
Route::get('/tentang-kami', [AboutController::class, 'index'])->name('tentang-kami');

// mentors
Route::get('/mentor', [MentorController::class, 'index'])->name('mentor.index');

// authenticated dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
