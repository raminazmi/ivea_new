<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreparingForSummer extends Model
{
    use HasFactory;

    protected $table = 'preparing_for_summers';

    protected $fillable = [
        'title_ar',
        'description_ar',
        'button_text_ar',
        'button_url',
        'image_1_path',
        'image_1_alt',
        'image_1_url',
        'image_2_path',
        'image_2_alt',
        'image_2_url',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getImage1UrlAttribute()
    {
        return $this->image_1_path ? asset('storage/' . $this->image_1_path) : null;
    }

    public function getImage2UrlAttribute()
    {
        return $this->image_2_path ? asset('storage/' . $this->image_2_path) : null;
    }

    public static function getActive()
    {
        return self::active()->first();
    }
}