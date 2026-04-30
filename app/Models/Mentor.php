<?php

namespace App\Models;

use App\Enums\Gender;
use App\Enums\MentorStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mentor extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'city',
        'gender',
        'contact',
        'birthdate',
        'profession',
        'bio',
        'experience',
        'certification',
        'avatar',
        'cv',
        'specialties',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'specialties' => 'array',
            'status' => MentorStatus::class,
            'gender' => Gender::class,
            'birthdate' => 'date',
        ];
    }

    /**
     * Boot the model and handle file deletions.
     */
    protected static function booted()
    {
        static::updating(function ($model) {
            // Hapus Avatar lama
            if ($model->isDirty('avatar')) {
                $oldAvatar = $model->getOriginal('avatar');
                if ($oldAvatar) {
                    \Illuminate\Support\Facades\Storage::disk('supabase')->delete($oldAvatar);
                }
            }

            // Hapus CV lama
            if ($model->isDirty('cv')) {
                $oldCv = $model->getOriginal('cv');
                if ($oldCv) {
                    \Illuminate\Support\Facades\Storage::disk('supabase')->delete($oldCv);
                }
            }
        });

        static::deleting(function ($model) {
            if ($model->avatar) {
                \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->avatar);
            }
            if ($model->cv) {
                \Illuminate\Support\Facades\Storage::disk('supabase')->delete($model->cv);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    /**
     * Get the public URL for the avatar from Supabase.
     */
    public function getAvatarUrlAttribute(): ?string
    {
        if (! $this->avatar) {
            return null;
        }

        return config('filesystems.disks.supabase.url') . '/' . config('filesystems.disks.supabase.bucket') . '/' . $this->avatar;
    }

    /**
     * Get the public URL for the CV from Supabase.
     */
    public function getCvUrlAttribute(): ?string
    {
        if (! $this->cv) {
            return null;
        }

        return config('filesystems.disks.supabase.url') . '/' . config('filesystems.disks.supabase.bucket') . '/' . $this->cv;
    }
}
