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
        'color_names',
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
        'default_width',
        'default_height',
        'fabric_reduction',
        'coverage_increase',
        'base_price',
        'price_per_sqm',
        'min_price',
        'max_price',
        'pricing_method',
        'price_modifiers'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'integer',
        'rating' => 'integer',
        'colors' => 'array',
        'color_names' => 'array',
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
        'default_width' => 'decimal:2',
        'default_height' => 'decimal:2',
        'fabric_reduction' => 'decimal:2',
        'coverage_increase' => 'decimal:2',
        'base_price' => 'decimal:2',
        'price_per_sqm' => 'decimal:2',
        'min_price' => 'decimal:2',
        'max_price' => 'decimal:2',
        'price_modifiers' => 'array'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

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

    public function getFinalPriceAttribute()
    {
        $price = $this->attributes['price'] ?? 0;
        $discount = $this->attributes['discount'] ?? null;

        if ($discount) {
            return $price - ($price * $discount / 100);
        }
        return $price;
    }

    public function getDiscountAmountAttribute()
    {
        $price = $this->attributes['price'] ?? 0;
        $discount = $this->attributes['discount'] ?? null;

        if ($discount) {
            return $price * $discount / 100;
        }
        return 0;
    }

    public function getHasDiscountAttribute()
    {
        $discount = $this->attributes['discount'] ?? null;
        return !is_null($discount) && $discount > 0;
    }

    public function getInStockAttribute()
    {
        $stock = $this->attributes['stock'] ?? 0;
        return $stock > 0;
    }

    public function getMainImageAttribute()
    {
        $image = $this->attributes['image'] ?? null;
        $images = $this->attributes['images'] ?? null;

        return $image ?: ($images[0] ?? '/images/curtain.png');
    }

    public function getProductImagesAttribute()
    {
        $images = $this->attributes['images'] ?? null;
        $image = $this->attributes['image'] ?? null;

        if ($images && is_string($images)) {
            $cleanImages = str_replace('\\/', '/', $images);
            $decodedImages = json_decode($cleanImages, true);
            if (is_array($decodedImages)) {
                return $decodedImages;
            }
        }

        if ($images && is_array($images)) {
            return $images;
        }

        if ($image) {
            return [$image];
        }

        return [
            '/images/curtain.png',
            '/images/curtain1.png',
            '/images/curtain.png',
            '/images/curtain1.png'
        ];
    }

    public function getProductColorsAttribute()
    {
        $colors = $this->attributes['colors'] ?? null;

        if ($colors) {
            // إذا كان JSON string، قم بفك تشفيره
            if (is_string($colors)) {
                $colors = json_decode($colors, true);
            }

            if (is_array($colors) && !empty($colors)) {
                return $colors;
            }
        }

        // ألوان افتراضية كـ fallback
        return ['#FFA500', '#87CEEB', '#DDA0DD', '#9370DB'];
    }

    public function getColorNamesAttribute()
    {
        // أولاً، تحقق من وجود أسماء ألوان في قاعدة البيانات
        if (isset($this->attributes['color_names'])) {
            $colorNames = $this->attributes['color_names'];

            if (is_string($colorNames)) {
                $colorNames = json_decode($colorNames, true);
            }

            if ($colorNames && is_array($colorNames)) {
                return $colorNames;
            }
        }

        // إذا لم تكن هناك أسماء ألوان مخزنة، إرجاع أسماء افتراضية بناءً على عدد الألوان
        $colors = $this->product_colors;
        $defaultNames = [];

        for ($i = 0; $i < count($colors); $i++) {
            $defaultNames[] = 'لون ' . ($i + 1);
        }

        return $defaultNames;
    }

    public function getFeaturesAttribute()
    {
        $specifications = $this->attributes['specifications'] ?? null;

        if ($specifications && isset($specifications['features'])) {
            return $specifications['features'];
        }

        return [
            'تمنع ما يقارب 90 - 96% من الأشعة فوق البنفسجية الضارة ، ظاهرة الوهج.',
            'شديدة التحمل و سهلة التنظيف',
            'يمكن تثبيتها بوضعيات متنوعة'
        ];
    }

    public function getMeasurementUnitsAttribute()
    {
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
        $min_width = $this->attributes['min_width'] ?? null;
        return $min_width ?: 35.000;
    }

    public function getDefaultHeightAttribute()
    {
        $min_height = $this->attributes['min_height'] ?? null;
        return $min_height ?: 35.000;
    }

    public function getFabricReductionAttribute()
    {
        $fabric_reduction = $this->attributes['fabric_reduction'] ?? null;
        return $fabric_reduction ?: 4.00;
    }

    public function getCoverageIncreaseAttribute()
    {
        $coverage_increase = $this->attributes['coverage_increase'] ?? null;
        return $coverage_increase ?: 5.00;
    }

    public function getPricesFromAttribute()
    {
        $min_price = $this->attributes['min_price'] ?? null;

        if ($min_price) {
            return $min_price;
        }

        switch ($this->pricing_method) {
            case 'area_based':
                $minArea = ($this->default_width / 100) * ($this->default_height / 100); // Convert cm to m²
                return $this->base_price + ($minArea * ($this->price_per_sqm ?? 0));

            case 'size_based':
                return $this->base_price;

            case 'custom':
                return $this->calculateCustomPrice();

            default:
                return $this->price;
        }
    }

    public function calculateDynamicPrice($width = null, $height = null, $options = [])
    {
        $width = $width ?: $this->default_width;
        $height = $height ?: $this->default_height;

        $basePrice = $this->base_price ?: $this->price;

        switch ($this->pricing_method) {
            case 'area_based':
                $area = ($width / 100) * ($height / 100);
                $price = $basePrice + ($area * ($this->price_per_sqm ?? 0));
                break;

            case 'size_based':
                $price = $this->calculateSizeBasedPrice($width, $height);
                break;

            case 'custom':
                $price = $this->calculateCustomPrice($width, $height, $options);
                break;

            default:
                $price = $basePrice;
        }

        $price = $this->applyPriceModifiers($price, $options);

        if ($this->has_discount) {
            $price = $price - ($price * $this->discount / 100);
        }

        return round($price, 2);
    }

    private function calculateSizeBasedPrice($width, $height)
    {
        $basePrice = $this->base_price ?: $this->price;

        $area = $width * $height;

        if ($area <= 5000) {
            return $basePrice;
        } elseif ($area <= 15000) {
            return $basePrice * 1.3;
        } elseif ($area <= 30000) {
            return $basePrice * 1.6;
        } else {
            return $basePrice * 2.0;
        }
    }

    private function calculateCustomPrice($width = null, $height = null, $options = [])
    {
        $basePrice = $this->base_price ?: $this->price;
        if ($width && $height) {
            $area = ($width / 100) * ($height / 100);
            $basePrice = $basePrice + ($area * ($this->price_per_sqm ?? 100));
        }

        return $basePrice;
    }

    private function applyPriceModifiers($price, $options = [])
    {
        $modifiers = $this->price_modifiers ?? [];

        foreach ($options as $optionKey => $optionValue) {
            if (isset($modifiers[$optionKey][$optionValue])) {
                $modifier = $modifiers[$optionKey][$optionValue];

                if (isset($modifier['type']) && isset($modifier['value'])) {
                    switch ($modifier['type']) {
                        case 'percentage':
                            $price = $price * (1 + $modifier['value'] / 100);
                            break;
                        case 'fixed':
                            $price = $price + $modifier['value'];
                            break;
                        case 'multiply':
                            $price = $price * $modifier['value'];
                            break;
                    }
                }
            }
        }

        return $price;
    }

    public function getPriceRangeAttribute()
    {
        $minPrice = $this->prices_from;

        $maxPrice = $this->max_price;
        if (!$maxPrice) {
            $maxWidth = $this->max_width ?: ($this->default_width * 3);
            $maxHeight = $this->max_height ?: ($this->default_height * 3);
            $maxPrice = $this->calculateDynamicPrice($maxWidth, $maxHeight);
        }

        return [
            'min' => $minPrice,
            'max' => $maxPrice,
            'currency' => 'ر.س',
            'display' => $minPrice == $maxPrice
                ? number_format($minPrice, 2) . ' ر.س'
                : 'تبدأ من ' . number_format($minPrice, 2) . ' ر.س'
        ];
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucfirst($value);
    }

    public function setBrandAttribute($value)
    {
        $this->attributes['brand'] = ucfirst($value);
    }
}
