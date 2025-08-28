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
        'features',
        'price',
        'discount',
        'image',
        'images',
        'tab',
        'category_id',
        'colors',
        'color_names',
        'status',
        'stock',
        'sku',
        'featured',
        'is_offer',
        'is_bestseller',
        'sales_count',
        'customization_options',
        'measurement_units',
        'opening_methods',
        'track_types',
        'lining_options',
        'product_options'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'integer',
        'colors' => 'array',
        'color_names' => 'array',
        'images' => 'array',
        'features' => 'array',
        'stock' => 'integer',
        'featured' => 'boolean',
        'is_offer' => 'boolean',
        'is_bestseller' => 'boolean',
        'sales_count' => 'integer',
        'customization_options' => 'array',
        'measurement_units' => 'array',
        'opening_methods' => 'array',
        'track_types' => 'array',
        'lining_options' => 'array',
        'product_options' => 'array',
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

    public function scopeBySubcategory($query)
    {
        return $query->whereHas('category', function ($q) {
            $q->whereNotNull('parent_id');
        });
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
        // المنتجات الجديدة هي التي تم إنشاؤها خلال الأسبوع الماضي
        return $query->where('created_at', '>=', now()->subWeek())
            ->orderBy('created_at', 'desc');
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
            if (is_string($colors)) {
                $colors = json_decode($colors, true);
            }

            if (is_array($colors) && !empty($colors)) {
                return $colors;
            }
        }
        return ['#FFA500', '#87CEEB', '#DDA0DD', '#9370DB'];
    }

    public function getColorNamesAttribute()
    {
        if (isset($this->attributes['color_names'])) {
            $colorNames = $this->attributes['color_names'];

            if (is_string($colorNames)) {
                $colorNames = json_decode($colorNames, true);
            }

            if ($colorNames && is_array($colorNames)) {
                return $colorNames;
            }
        }

        $colors = $this->product_colors;
        $defaultNames = [];

        for ($i = 0; $i < count($colors); $i++) {
            $defaultNames[] = 'لون ' . ($i + 1);
        }

        return $defaultNames;
    }

    public function getFeaturesAttribute()
    {
        $features = $this->attributes['features'] ?? null;

        if ($features) {
            if (is_string($features)) {
                $features = json_decode($features, true);
            }

            if (is_array($features) && !empty($features)) {
                return $features;
            }
        }

        return [
            'تمنع ما يقارب 90 - 96% من الأشعة فوق البنفسجية الضارة',
            'شديدة التحمل و سهلة التنظيف',
            'يمكن تثبيتها بوضعيات متنوعة',
            'مقاومة للحريق',
            'عازلة للحرارة',
            'مقاومة للرطوبة'
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

    public function getProductOptionsAttribute()
    {
        $productOptions = $this->attributes['product_options'] ?? null;

        if ($productOptions && is_array($productOptions)) {
            return $productOptions;
        }

        // إذا كان المنتج ينتمي لفئة الخشبيات، نعيد الخيارات الافتراضية
        if ($this->category && $this->category->slug === 'wooden') {
            return [
                'quantity' => [
                    'type' => 'number',
                    'label' => 'الكمية',
                    'min' => 1,
                    'max' => 100,
                    'default' => 1
                ],
                'decorative_partition' => [
                    'type' => 'checkbox',
                    'label' => 'فاصل ديكوري',
                    'default' => false
                ],
                'wall_shelf' => [
                    'type' => 'checkbox',
                    'label' => 'رف جداري',
                    'default' => false
                ],
                'tables_chairs' => [
                    'type' => 'checkbox',
                    'label' => 'طاوالت وكراسي خشبية',
                    'default' => false
                ],
                'wall_paneling' => [
                    'type' => 'checkbox',
                    'label' => 'ألواح وكسوة جدران',
                    'default' => false
                ],
                'bedroom_furniture' => [
                    'type' => 'checkbox',
                    'label' => 'أسرة غرف نوم',
                    'default' => false
                ],
                'dressers' => [
                    'type' => 'checkbox',
                    'label' => 'تسريحات',
                    'default' => false
                ]
            ];
        }

        return [];
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
