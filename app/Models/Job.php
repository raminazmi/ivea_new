<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    protected $fillable = [
        'title',
        'description',
        'type',
        'category',
        'location',
        'salary_range',
        'requirements',
        'benefits',
        'status',
        'deadline'
    ];

    protected $casts = [
        'deadline' => 'date',
    ];

    /**
     * Get the applications for this job.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Scope a query to only include active jobs.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the full name attribute.
     */
    public function getFullTitleAttribute()
    {
        return $this->title;
    }
}
