<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'image_path',
        'alt_text',
        'link_url',
        'link_text',
        'is_active',
        'sort_order',
        'button_text',
        'button_url'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    /**
     * Scope للحصول على الشرائح النشطة فقط
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope للترتيب حسب ترتيب العرض
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    /**
     * الحصول على جميع الشرائح النشطة مرتبة
     */
    public static function getActiveSlides()
    {
        return self::active()->ordered()->get();
    }

    /**
     * الحصول على صورة الشرائح للعرض
     */
    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }
}
