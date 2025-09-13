<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NationalDayOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'description_ar',
        'button_text_ar',
        'button_url',
        'offer1_title',
        'offer1_discount_percentage',
        'offer1_category_slug',
        'offer1_category_name',
        'offer1_image_path',
        'offer1_link',
        'offer2_title',
        'offer2_discount_percentage',
        'offer2_category_slug',
        'offer2_category_name',
        'offer2_image_path',
        'offer2_link',
        'is_active'
    ];

    protected $casts = [
        'offer1_discount_percentage' => 'integer',
        'offer2_discount_percentage' => 'integer',
        'is_active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function getActive()
    {
        return self::active()->first();
    }

    public function getOffer1ImageAttribute()
    {
        if ($this->offer1_image_path) {
            return '/storage/' . $this->offer1_image_path;
        }

        $categoryImages = [
            'curtains' => '/images/curtain.png',
            'sofas' => '/images/sofa.png',
            'cabinets' => '/images/treasury_new.png',
            'wooden' => '/images/door.png'
        ];

        return $categoryImages[$this->offer1_category_slug] ?? '/images/default-offer.png';
    }

    public function getOffer2ImageAttribute()
    {
        if ($this->offer2_image_path) {
            return '/storage/' . $this->offer2_image_path;
        }

        $categoryImages = [
            'curtains' => '/images/curtain.png',
            'sofas' => '/images/sofa.png',
            'cabinets' => '/images/treasury_new.png',
            'wooden' => '/images/door.png'
        ];

        return $categoryImages[$this->offer2_category_slug] ?? '/images/default-offer.png';
    }
}
