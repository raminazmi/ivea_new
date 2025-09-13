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
        'offers_text_id',
        'featured_offers_setting_id',
        'image_path',
        'is_active'
    ];

    protected $casts = [
        'discount_percentage' => 'integer',
        'is_active' => 'boolean'
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function offersText()
    {
        return $this->belongsTo(OffersText::class);
    }

    public function featuredOffersSetting()
    {
        return $this->belongsTo(FeaturedOffersSetting::class);
    }

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
