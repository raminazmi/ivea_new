<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedOffersSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'description_ar',
        'button_text_ar',
        'button_url',
        'is_active'
    ];

    protected $casts = [
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

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
