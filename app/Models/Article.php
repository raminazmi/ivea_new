<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
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
     * Boot the model and add event listeners.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Scope a query to only include published articles.
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope a query to only include featured articles.
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Scope a query to order by sort order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
    }

    /**
     * Get the formatted date attribute.
     */
    public function getFormattedDateAttribute()
    {
        return $this->date ? $this->date->format('d M Y') : now()->format('d M Y');
    }

    /**
     * Get the formatted read time attribute.
     */
    public function getFormattedReadTimeAttribute()
    {
        return $this->read_time . ' دقائق للقراءة';
    }

    /**
     * Get the excerpt of the content.
     */
    public function getExcerptAttribute()
    {
        return Str::limit(strip_tags($this->content), 150);
    }

    /**
     * Get all unique categories.
     */
    public static function getCategories()
    {
        return static::distinct()->pluck('category')->filter()->values();
    }
}
