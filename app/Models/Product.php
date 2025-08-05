<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'collection',
        'description',
        'price',
        'discount',
        'image',
        'images',
        'rating',
        'tab',
        'category_id',
        'colors',
        'status',
        'stock',
        'sku',
        'weight',
        'dimensions',
        'featured',
        'is_offer',
        'is_bestseller',
        'sales_count',
        'published_at',
        'customization_options',
        'measurement_units',
        'opening_methods',
        'track_types',
        'lining_options',
        'min_width',
        'max_width',
        'min_height',
        'max_height',
        'fabric_reduction',
        'coverage_increase'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'integer',
        'rating' => 'integer',
        'colors' => 'array',
        'images' => 'array',
        'dimensions' => 'array',
        'specifications' => 'array',
        'stock' => 'integer',
        'weight' => 'decimal:2',
        'featured' => 'boolean',
        'is_offer' => 'boolean',
        'is_bestseller' => 'boolean',
        'sales_count' => 'integer',
        'published_at' => 'datetime',
        'customization_options' => 'array',
        'measurement_units' => 'array',
        'opening_methods' => 'array',
        'track_types' => 'array',
        'lining_options' => 'array',
        'min_width' => 'decimal:3',
        'max_width' => 'decimal:3',
        'min_height' => 'decimal:3',
        'max_height' => 'decimal:3',
        'fabric_reduction' => 'decimal:2',
        'coverage_increase' => 'decimal:2'
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByTab($query, $tab)
    {
        return $query->where('tab', $tab);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopeWithDiscount($query)
    {
        return $query->whereNotNull('discount')->where('discount', '>', 0);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeNew($query)
    {
        return $query->whereNotNull('published_at')
                    ->where('published_at', '>=', now()->subDays(30))
                    ->orderBy('published_at', 'desc');
    }

    public function scopeOffers($query)
    {
        return $query->where('is_offer', true)
                    ->whereNotNull('discount')
                    ->where('discount', '>', 0);
    }

    public function scopeBestsellers($query)
    {
        return $query->where('is_bestseller', true)
                    ->orderBy('sales_count', 'desc');
    }

    // Accessors
    /**
     * Get the final price after discount
     * @return float
     */
    public function getFinalPriceAttribute()
    {
        /** @var float $price */
        $price = $this->attributes['price'] ?? 0;
        /** @var int|null $discount */
        $discount = $this->attributes['discount'] ?? null;

        if ($discount) {
            return $price - ($price * $discount / 100);
        }
        return $price;
    }

    public function getDiscountAmountAttribute()
    {
        /** @var float $price */
        $price = $this->attributes['price'] ?? 0;
        /** @var int|null $discount */
        $discount = $this->attributes['discount'] ?? null;

        if ($discount) {
            return $price * $discount / 100;
        }
        return 0;
    }

    public function getHasDiscountAttribute()
    {
        /** @var int|null $discount */
        $discount = $this->attributes['discount'] ?? null;
        return !is_null($discount) && $discount > 0;
    }

    public function getInStockAttribute()
    {
        /** @var int $stock */
        $stock = $this->attributes['stock'] ?? 0;
        return $stock > 0;
    }

    public function getMainImageAttribute()
    {
        /** @var string|null $image */
        $image = $this->attributes['image'] ?? null;
        /** @var array|null $images */
        $images = $this->attributes['images'] ?? null;

        return $image ?: ($images[0] ?? '/images/curtain.png');
    }

    public function getProductImagesAttribute()
    {
        /** @var array|null $images */
        $images = $this->attributes['images'] ?? null;
        /** @var string|null $image */
        $image = $this->attributes['image'] ?? null;

        if ($images && is_array($images)) {
            return $images;
        }

        // Fallback images
        return [
            $image ?: '/images/curtain.png',
            '/images/curtain1.png',
            '/images/curtain.png',
            '/images/curtain1.png'
        ];
    }

    public function getProductColorsAttribute()
    {
        /** @var array|null $colors */
        $colors = $this->attributes['colors'] ?? null;

        if ($colors && is_array($colors)) {
            return $colors;
        }

        // Default colors
        return ['#FFA500', '#87CEEB', '#DDA0DD', '#9370DB'];
    }

    public function getColorNamesAttribute()
    {
        return ['برتقالي', 'أزرق', 'بنفسجي', 'بنفسجي غامق'];
    }

    public function getFeaturesAttribute()
    {
        /** @var array|null $specifications */
        $specifications = $this->attributes['specifications'] ?? null;

        if ($specifications && isset($specifications['features'])) {
            return $specifications['features'];
        }

        // Default features
        return [
            'تمنع ما يقارب 90 - 96% من الأشعة فوق البنفسجية الضارة ، ظاهرة الوهج.',
            'شديدة التحمل و سهلة التنظيف',
            'يمكن تثبيتها بوضعيات متنوعة'
        ];
    }

    public function getMeasurementUnitsAttribute()
    {
        /** @var array|null $measurement_units */
        $measurement_units = $this->attributes['measurement_units'] ?? null;

        if ($measurement_units && is_array($measurement_units)) {
            return $measurement_units;
        }

        return [
            ['value' => 'mm', 'label' => 'مم'],
            ['value' => 'cm', 'label' => 'سم'],
            ['value' => 'inch', 'label' => 'انش']
        ];
    }

    public function getOpeningMethodsAttribute()
    {
        /** @var array|null $opening_methods */
        $opening_methods = $this->attributes['opening_methods'] ?? null;

        if ($opening_methods && is_array($opening_methods)) {
            return $opening_methods;
        }

        return [
            ['value' => 'single', 'label' => 'فتحة واحدة'],
            ['value' => 'double', 'label' => 'فتحتين']
        ];
    }

    public function getTrackTypesAttribute()
    {
        /** @var array|null $track_types */
        $track_types = $this->attributes['track_types'] ?? null;

        if ($track_types && is_array($track_types)) {
            return $track_types;
        }

        return [
            ['value' => 'electric', 'label' => 'محرك كهربائي'],
            ['value' => 'manual', 'label' => 'بدون محرك كهربائي']
        ];
    }

    public function getLiningOptionsAttribute()
    {
        /** @var array|null $lining_options */
        $lining_options = $this->attributes['lining_options'] ?? null;

        if ($lining_options && is_array($lining_options)) {
            return $lining_options;
        }

        return [
            ['value' => 'with', 'label' => 'مع بطانة'],
            ['value' => 'without', 'label' => 'بدون بطانة']
        ];
    }

    public function getDefaultWidthAttribute()
    {
        /** @var float|null $min_width */
        $min_width = $this->attributes['min_width'] ?? null;
        return $min_width ?: 35.000;
    }

    public function getDefaultHeightAttribute()
    {
        /** @var float|null $min_height */
        $min_height = $this->attributes['min_height'] ?? null;
        return $min_height ?: 35.000;
    }

    public function getFabricReductionAttribute()
    {
        /** @var float|null $fabric_reduction */
        $fabric_reduction = $this->attributes['fabric_reduction'] ?? null;
        return $fabric_reduction ?: 4.00;
    }

    public function getCoverageIncreaseAttribute()
    {
        /** @var float|null $coverage_increase */
        $coverage_increase = $this->attributes['coverage_increase'] ?? null;
        return $coverage_increase ?: 5.00;
    }

    // Mutators
    /**
     * Set the name attribute
     * @param string $value
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucfirst($value);
    }

    /**
     * Set the brand attribute
     * @param string $value
     */
    public function setBrandAttribute($value)
    {
        $this->attributes['brand'] = ucfirst($value);
    }
}
