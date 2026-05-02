<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'mentor_id',
        'type',
        'title',
        'description',
        'thumbnail',
        'price',
        'status',
        'mode',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'days',
        'location',
        'meet_link',
    ];

    protected $appends = ['thumbnail_url'];

    protected function casts(): array
    {
        return [
            'days' => 'array',
            'start_date' => 'date',
            'end_date' => 'date',
            'price' => 'decimal:2',
        ];
    }

    /**
     * Get the public URL for the thumbnail from Supabase.
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail) {
            return null;
        }

        // If it's already a full URL, just return it
        if (filter_var($this->thumbnail, FILTER_VALIDATE_URL)) {
            return $this->thumbnail;
        }

        $baseUrl = config('filesystems.disks.supabase.url');
        
        // If baseUrl is missing, try Storage facade
        if (!$baseUrl) {
            return \Illuminate\Support\Facades\Storage::disk('supabase')->url($this->thumbnail);
        }

        return rtrim($baseUrl, '/') . '/' . ltrim($this->thumbnail, '/');
    }

    public function mentor(): BelongsTo
    {
        return $this->belongsTo(Mentor::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(CourseCategory::class, 'course_course_category');
    }

    public function modules(): HasMany
    {
        return $this->hasMany(Module::class)->orderBy('order');
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function bundles(): BelongsToMany
    {
        return $this->belongsToMany(CourseBundle::class, 'course_bundle_items');
    }
}
