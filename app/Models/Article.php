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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc');
    }

    public function getFormattedDateAttribute()
    {
        return $this->date ? $this->date->format('d M Y') : now()->format('d M Y');
    }

    public function getFormattedReadTimeAttribute()
    {
        return $this->read_time . ' دقائق للقراءة';
    }

    public function getExcerptAttribute()
    {
        return Str::limit(strip_tags($this->content), 150);
    }

    public static function getCategories()
    {
        $categoryIds = self::query()->distinct()->pluck('category_id')->toArray();
        return \App\Models\Category::whereIn('id', $categoryIds)
            ->get(['id', 'name']);
    }
}
