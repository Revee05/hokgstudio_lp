<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'payable_id',
        'payable_type',
        'amount',
        'status',
        'payment_method',
        'external_id',
        'checkout_url',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent payable model (Course or CourseBundle).
     */
    public function payable(): MorphTo
    {
        return $this->morphTo();
    }
}
