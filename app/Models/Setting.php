<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'logo_header',
        'logo_admin_light',
        'logo_admin_dark',
        'favicon',
        'footer_description',
        'social_links',
        'address',
        'website_links',
        'copyright_info',
    ];

    protected $casts = [
        'social_links' => 'array',
        'website_links' => 'array',
    ];

    protected $appends = ['logo_header_url', 'logo_admin_light_url', 'logo_admin_dark_url', 'favicon_url'];

    public function getLogoHeaderUrlAttribute(): ?string
    {
        if (!$this->logo_header) return null;
        return rtrim(config('filesystems.disks.supabase.url'), '/') . '/' . ltrim($this->logo_header, '/');
    }

    public function getLogoAdminLightUrlAttribute(): ?string
    {
        if (!$this->logo_admin_light) return null;
        return rtrim(config('filesystems.disks.supabase.url'), '/') . '/' . ltrim($this->logo_admin_light, '/');
    }

    public function getLogoAdminDarkUrlAttribute(): ?string
    {
        if (!$this->logo_admin_dark) return null;
        return rtrim(config('filesystems.disks.supabase.url'), '/') . '/' . ltrim($this->logo_admin_dark, '/');
    }

    public function getFaviconUrlAttribute(): ?string
    {
        if (!$this->favicon) return null;
        return rtrim(config('filesystems.disks.supabase.url'), '/') . '/' . ltrim($this->favicon, '/');
    }

    protected static function booted()
    {
        static::updating(function ($model) {
            // Hapus Logo Header lama
            if ($model->isDirty('logo_header')) {
                $old = $model->getOriginal('logo_header');
                if ($old) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($old);
            }

            // Hapus Logo Admin Light lama
            if ($model->isDirty('logo_admin_light')) {
                $old = $model->getOriginal('logo_admin_light');
                if ($old) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($old);
            }

            // Hapus Logo Admin Dark lama
            if ($model->isDirty('logo_admin_dark')) {
                $old = $model->getOriginal('logo_admin_dark');
                if ($old) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($old);
            }

            // Hapus Favicon lama
            if ($model->isDirty('favicon')) {
                $old = $model->getOriginal('favicon');
                if ($old) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($old);
            }
        });

        static::deleting(function ($model) {
            if ($model->logo_header) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->logo_header);
            if ($model->logo_admin_light) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->logo_admin_light);
            if ($model->logo_admin_dark) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->logo_admin_dark);
            if ($model->favicon) \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->favicon);
        });
    }
}

