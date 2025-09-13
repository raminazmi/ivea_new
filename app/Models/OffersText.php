<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OffersText extends Model
{
    protected $fillable = [
        'key',
        'title_ar',
        'description_ar',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    public static function getText($key, $type = 'title')
    {
        $text = self::where('key', $key)
            ->where('is_active', true)
            ->first();

        if (!$text) {
            return '';
        }

        $field = $type . '_ar';
        return $text->$field ?? '';
    }

    public static function getActiveTexts()
    {
        return self::where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }

    public static function getTextsArray()
    {
        $texts = self::getActiveTexts();
        $result = [];

        foreach ($texts as $text) {
            $result[$text->key] = [
                'title' => $text->title_ar,
                'description' => $text->description_ar
            ];
        }

        return $result;
    }

    public function offers()
    {
        return $this->hasMany(Offer::class);
    }
}
