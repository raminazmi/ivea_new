<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class Color extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_en',
        'hex_code',
        'image',
        'is_active',
        'sort_order',
        'description'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    protected $appends = [
        'image_url'
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_colors')
            ->withPivot([
                'product_image',
                'price_adjustment',
                'is_default',
                'is_available',
                'stock_quantity'
            ])
            ->withTimestamps();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            if (str_starts_with($this->image, 'http')) {
                return $this->image;
            }
            return Storage::url($this->image);
        }
        return null;
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($color) {
            if ($color->image && Storage::exists($color->image)) {
                Storage::delete($color->image);
            }
        });
    }
}
