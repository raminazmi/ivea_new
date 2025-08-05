<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'category',
        'image',
        'date',
        'read_time',
        'author',
        'author_image',
        'author_bio',
        'meta_description',
        'meta_keywords',
        'is_published',
        'featured',
        'sort_order'
    ];

    protected $casts = [
        'date' => 'date',
        'is_published' => 'boolean',
        'featured' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Scope a query to only include published tools.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope a query to only include featured tools.
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Get the formatted date attribute.
     */
    public function getFormattedDateAttribute()
    {
        /** @var \Carbon\Carbon $date */
        $date = $this->date ?? \Carbon\Carbon::now();
        return $date->format('d M Y');
    }

    /**
     * Get the formatted read time attribute.
     */
    public function getFormattedReadTimeAttribute()
    {
        /** @var int $readTime */
        $readTime = $this->read_time ?? 0;
        return $readTime . ' دقائق للقراءة';
    }

    /**
     * Get the excerpt of the content.
     */
    public function getExcerptAttribute()
    {
        /** @var string $content */
        $content = $this->content ?? '';
        return \Str::limit(strip_tags($content), 150);
    }
}
