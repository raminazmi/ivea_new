<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'discount_percentage',
        'category_slug',
        'category_name',
        'offers_text_id'
    ];

    protected $casts = [
        'discount_percentage' => 'integer'
    ];

    // Scope للترتيب حسب تاريخ الإنشاء (الأحدث أولاً)
    public function scopeOrdered($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // العلاقة مع نصوص العروض
    public function offersText()
    {
        return $this->belongsTo(OffersText::class);
    }

    // الحصول على صورة الفئة
    public function getCategoryImageAttribute()
    {
        $categoryImages = [
            'curtains' => '/images/curtain.png',
            'sofas' => '/images/sofa3.png',
            'cabinets' => '/images/treasury_new.png',
            'wooden' => '/images/chair.png'
        ];

        return $categoryImages[$this->category_slug] ?? '/images/default-offer.png';
    }
}