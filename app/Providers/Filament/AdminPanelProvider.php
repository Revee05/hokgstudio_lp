<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Enums\Width;

use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandLogo(
                fn() =>
                \App\Models\Setting::first()?->logo_admin_light
                // ini pakai logo dark supaya bisa dilihat saat mode light
                ? \Illuminate\Support\Facades\Storage::disk('supabase')->url(\App\Models\Setting::first()->logo_admin_dark)
                : asset('images/logo-dark.svg')
            )
            ->darkModeBrandLogo(
                // ini pakai logo light supaya bisa dilihat saat mode dark
                fn() =>
                \App\Models\Setting::first()?->logo_admin_dark
                ? \Illuminate\Support\Facades\Storage::disk('supabase')->url(\App\Models\Setting::first()->logo_admin_light)
                : asset('images/logo-white.svg')
            )
            ->favicon(
                fn() =>
                \App\Models\Setting::first()?->favicon
                ? \Illuminate\Support\Facades\Storage::disk('supabase')->url(\App\Models\Setting::first()->favicon)
                : asset('icon_website.svg')
            )
            ->brandLogoHeight('3rem')
            ->colors([
                'primary' => Color::Amber,
            ])
            ->maxContentWidth(Width::Full)

            ->navigationGroups([
                'Kelas',
                'Data Mentor',
                'Transaksi',
                'Pengaturan',
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\Filament\Clusters')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
