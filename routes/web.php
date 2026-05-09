<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\Mentor\CourseController as MentorCourseController;
use App\Http\Controllers\Mentor\CurriculumController;
use App\Http\Controllers\Mentor\QuizReviewController;
use App\Http\Controllers\Mentor\BundleController as MentorBundleController;
use App\Http\Controllers\User\CoursePlayerController;
use App\Http\Controllers\User\QuizController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// home
Route::get('/', function () {
    if (request()->header('X-Inertia')) {
        return response('', 409)
            ->header('X-Inertia-Location', url('/'));
    }
    return view('pages.home.index');
})->name('home');

// tentang kami
Route::get('/tentang-kami', [AboutController::class, 'index'])->name('tentang-kami');

// mentors
Route::get('/mentor', [MentorController::class, 'index'])->name('mentor.index');

// courses listing
Route::get('/courses', [\App\Http\Controllers\CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course}', [\App\Http\Controllers\CourseController::class, 'show'])->name('courses.show');
Route::get('/bundles/{bundle}', [\App\Http\Controllers\CourseController::class, 'showBundle'])->name('bundles.show');

// enrollment
Route::post('/enroll/course/{course}', [\App\Http\Controllers\EnrollmentController::class, 'enrollCourse'])->name('enroll.course');
Route::post('/enroll/bundle/{bundle}', [\App\Http\Controllers\EnrollmentController::class, 'enrollBundle'])->name('enroll.bundle');

// webhooks
Route::post('/webhooks/xendit', [\App\Http\Controllers\EnrollmentController::class, 'handleWebhook']);

// authenticated dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Mentor Routes
    Route::prefix('mentor')->name('mentor.')->group(function () {
        Route::resource('courses', MentorCourseController::class);
        
        // Curriculum Management
        Route::get('courses/{course}/curriculum', [CurriculumController::class, 'index'])->name('courses.curriculum');
        Route::post('courses/{course}/modules', [CurriculumController::class, 'storeModule'])->name('courses.modules.store');
        Route::post('modules/{module}/lessons', [CurriculumController::class, 'storeLesson'])->name('modules.lessons.store');
        Route::patch('lessons/{lesson}', [CurriculumController::class, 'updateLesson'])->name('lessons.update');
        Route::delete('modules/{module}', [CurriculumController::class, 'destroyModule'])->name('modules.destroy');
        Route::delete('lessons/{lesson}', [CurriculumController::class, 'destroyLesson'])->name('lessons.destroy');
        
        // Quiz Questions & Assets
        Route::post('lessons/{lesson}/questions', [CurriculumController::class, 'storeQuestion'])->name('lessons.questions.store');
        Route::patch('quizzes/{quiz}', [CurriculumController::class, 'updateQuiz'])->name('quizzes.update_settings');
        Route::delete('questions/{question}', [CurriculumController::class, 'destroyQuestion'])->name('questions.destroy');
        Route::delete('assets/{asset}', [CurriculumController::class, 'destroyAsset'])->name('assets.destroy');
        Route::post('editor/upload-image', [CurriculumController::class, 'uploadImage'])->name('editor.upload-image');

        // Quiz Reviews
        Route::get('quizzes', [QuizReviewController::class, 'index'])->name('quizzes.index');
        Route::get('quizzes/{attempt}', [QuizReviewController::class, 'show'])->name('quizzes.show');
        Route::patch('quizzes/{attempt}', [QuizReviewController::class, 'update'])->name('quizzes.update');

        // Bundles
        Route::resource('bundles', MentorBundleController::class);
        Route::post('bundles/{bundle}/submit', [MentorBundleController::class, 'submit'])->name('bundles.submit');
    });

    // Student / Player Routes
    Route::get('courses/{course}/learn/{lesson?}', [CoursePlayerController::class, 'index'])->name('courses.learn');
    Route::post('lessons/{lesson}/complete', [CoursePlayerController::class, 'complete'])->name('lessons.complete');
    Route::post('quizzes/{quiz}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');
});

require __DIR__ . '/auth.php';
