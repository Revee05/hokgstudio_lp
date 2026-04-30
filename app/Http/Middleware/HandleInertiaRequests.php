<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    ...$request->user()->toArray(),
                    'role_label' => $request->user()->role->getFrontendLabel(),
                    'mentor' => [
                        'profession' => $request->user()->mentor->profession ?? '',
                        'city' => $request->user()->mentor->city ?? '',
                        'bio' => $request->user()->mentor->bio ?? '',
                        'experience' => $request->user()->mentor->experience ?? '',
                        'certification' => $request->user()->mentor->certification ?? '',
                        'specialties' => $request->user()->mentor->specialties ?? [],
                        'avatar_url' => $request->user()->mentor && $request->user()->mentor->avatar 
                            ? \Illuminate\Support\Facades\Storage::disk('supabase')->url($request->user()->mentor->avatar)
                            : null,
                    ],
                ] : null,
            ],
            'settings' => [
                'logo' => ($settings = \App\Models\Setting::first()) && $settings->logo_header
                    ? \Illuminate\Support\Facades\Storage::disk('supabase')->url($settings->logo_header)
                    : asset('images/logo_2.svg'),
            ],
        ];
    }
}
