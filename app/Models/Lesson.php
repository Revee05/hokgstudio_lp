<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lesson extends Model
{
    protected $fillable = ['module_id', 'title', 'slug', 'content_type', 'content_data', 'extra_description', 'order'];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected static function booted()
    {
        static::creating(function ($lesson) {
            if (empty($lesson->slug)) {
                $lesson->slug = \Illuminate\Support\Str::slug($lesson->title) . '-' . \Illuminate\Support\Str::random(5);
            }
        });
    }
    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function quiz(): HasOne
    {
        return $this->hasOne(Quiz::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(LessonAsset::class);
    }

    public function completions(): HasMany
    {
        return $this->hasMany(LessonCompletion::class);
    }

    public function isCompletedBy($userId): bool
    {
        return $this->completions()->where('user_id', $userId)->exists();
    }
}
