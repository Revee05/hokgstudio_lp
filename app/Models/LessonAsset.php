<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonAsset extends Model
{
    protected $fillable = ['lesson_id', 'file_path', 'file_name', 'file_type'];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
    
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->file_path); // Or use Supabase if that's the setup
    }
}
