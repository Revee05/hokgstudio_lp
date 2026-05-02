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
                        'mentor' => $request->user()->mentor ? [
                            'profession' => $request->user()->mentor->profession ?? '',
                            'city' => $request->user()->mentor->city ?? '',
                            'bio' => $request->user()->mentor->bio ?? '',
                            'experience' => $request->user()->mentor->experience ?? '',
                            'certification' => $request->user()->mentor->certification ?? '',
                            'contact' => $request->user()->mentor->contact ?? '',
                            'gender' => $request->user()->mentor->gender ?? '',
                            'birthdate' => $request->user()->mentor->birthdate ? $request->user()->mentor->birthdate->format('Y-m-d') : '',
                            'address' => $request->user()->mentor->address ?? '',
                            'social_links' => $request->user()->mentor->social_links ?? [],
                            'specialties' => $request->user()->mentor->specialties ?? [],
                            'avatar_url' => $request->user()->mentor->avatar 
                                ? \Illuminate\Support\Facades\Storage::disk('supabase')->url($request->user()->mentor->avatar)
                                : null,
                        ] : null,
                ] : null,
            ],
            'settings' => [
                'logo' => ($settings = \App\Models\Setting::first()) && $settings->logo_header
                    ? \Illuminate\Support\Facades\Storage::disk('supabase')->url($settings->logo_header)
                    : asset('images/logo_2.svg'),
                'favicon' => ($settings = \App\Models\Setting::first()) && $settings->favicon
                    ? \Illuminate\Support\Facades\Storage::disk('supabase')->url($settings->favicon)
                    : asset('icon_website.svg'),
            ],
        ];
    }
}
