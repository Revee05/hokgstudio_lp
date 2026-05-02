<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CourseBundle extends Model
{
    protected $fillable = [
        'mentor_id',
        'title',
        'description',
        'thumbnail',
        'price',
        'status',
        'rejection_note',
    ];

    protected $appends = ['thumbnail_url'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
        ];
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail) return null;

        if (filter_var($this->thumbnail, FILTER_VALIDATE_URL)) {
            return $this->thumbnail;
        }

        $baseUrl = config('filesystems.disks.supabase.url');
        
        if (!$baseUrl) {
            return \Illuminate\Support\Facades\Storage::disk('supabase')->url($this->thumbnail);
        }

        return rtrim($baseUrl, '/') . '/' . ltrim($this->thumbnail, '/');
    }

    public function mentor(): BelongsTo
    {
        return $this->belongsTo(Mentor::class);
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_bundle_items');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(BundleCategory::class, 'bundle_bundle_category');
    }
}
