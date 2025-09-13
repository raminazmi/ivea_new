<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPageSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_key',
        'title_ar',
        'subtitle_ar',
        'description_ar',
        'button_text_ar',
        'button_url',
        'image_path',
        'background_image_path',
        'is_active',
        'sort_order',
        'settings'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'settings' => 'array'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public static function getSection($key)
    {
        return self::where('section_key', $key)
            ->where('is_active', true)
            ->first();
    }

    public static function getActiveSections()
    {
        return self::active()->ordered()->get();
    }

    public function getImageUrlAttribute()
    {
        return $this->image_path ? asset('storage/' . $this->image_path) : null;
    }

    public function getBackgroundImageUrlAttribute()
    {
        return $this->background_image_path ? asset('storage/' . $this->background_image_path) : null;
    }

    public function getSetting($key, $default = null)
    {
        return $this->settings[$key] ?? $default;
    }

    public function setSetting($key, $value)
    {
        $settings = $this->settings ?? [];
        $settings[$key] = $value;
        $this->settings = $settings;
        $this->save();
    }
}
