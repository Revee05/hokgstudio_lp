<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    use HasFactory;

    protected $table = 'about_us';

    protected $fillable = [
        'about_title',
        'about_description',
        'about_image',
        'team_members',
        'learning_steps',
        'cta_title',
        'cta_description',
        'cta_wa_link',
        'cta_form_link',
    ];

    protected $casts = [
        'team_members' => 'array',
        'learning_steps' => 'array',
    ];

    /**
     * Boot the model and handle file deletions.
     */
    protected static function booted()
    {
        // Menghapus file lama saat record diupdate
        static::updating(function ($model) {
            // Hapus About Image lama
            if ($model->isDirty('about_image')) {
                $oldImage = $model->getOriginal('about_image');
                if ($oldImage) {
                    \Illuminate\Support\Facades\Storage::disk('supabase')->delete($oldImage);
                }
            }

            // Hapus foto tim yang dihapus dari repeater
            if ($model->isDirty('team_members')) {
                $oldMembers = $model->getOriginal('team_members') ?? [];
                $newMembers = $model->team_members ?? [];
                
                $oldPhotos = collect($oldMembers)->pluck('photo')->filter()->toArray();
                $newPhotos = collect($newMembers)->pluck('photo')->filter()->toArray();

                $deletedPhotos = array_diff($oldPhotos, $newPhotos);
                foreach ($deletedPhotos as $photo) {
                    \Illuminate\Support\Facades\Storage::disk('supabase')->delete($photo);
                }
            }
        });

        // Menghapus semua file saat record dihapus
        static::deleting(function ($model) {
            if ($model->about_image) {
                \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->about_image);
            }

            if ($model->team_members) {
                foreach ($model->team_members as $member) {
                    if (isset($member['photo'])) {
                        \Illuminate\Support\Facades\Storage::disk('supabase')->delete($member['photo']);
                    }
                }
            }
        });
    }
}
