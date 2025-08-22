<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'status',
        'sort_order',
        'color',
        'customization_fields',
        'parent_id'
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'customization_fields' => 'array'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id')->ordered();
    }

    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    public function scopeMainCategories($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeSubCategories($query)
    {
        return $query->whereNotNull('parent_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }

    public function getProductsCountAttribute()
    {
        return $this->products()->count();
    }

    public function getActiveProductsCountAttribute()
    {
        return $this->products()->active()->count();
    }

    public function getCustomizationFieldsAttribute()
    {
        if (!empty($this->attributes['customization_fields'])) {
            return json_decode($this->attributes['customization_fields'], true);
        }

        return $this->getDefaultCustomizationFields();
    }

    public function getDefaultCustomizationFields()
    {
        $categoryName = strtolower($this->name);

        if (str_contains($categoryName, 'ستائر') || str_contains($categoryName, 'curtain')) {
            return [
                'color' => [
                    'label' => 'اللون',
                    'type' => 'color_selector',
                    'required' => true
                ],
                'dimensions' => [
                    'label' => 'المقاس (عرض × ارتفاع)',
                    'type' => 'dimensions',
                    'required' => true,
                    'units' => ['سم', 'متر', 'انش']
                ],
                'opening_method' => [
                    'label' => 'طريقة الفتح',
                    'type' => 'select',
                    'options' => [
                        'single' => 'فتحة واحدة',
                        'double' => 'فتحتين'
                    ],
                    'required' => true
                ],
                'track_type' => [
                    'label' => 'نوع السكة',
                    'type' => 'select',
                    'options' => [
                        'electric' => 'محرك كهربائي',
                        'manual' => 'بدون محرك كهربائي'
                    ],
                    'required' => true
                ],
                'lining_option' => [
                    'label' => 'وجود بطانة',
                    'type' => 'select',
                    'options' => [
                        'with' => 'مع البطانة',
                        'without' => 'بدون بطانة'
                    ],
                    'required' => true
                ]
            ];
        } elseif (str_contains($categoryName, 'كنب') || str_contains($categoryName, 'sofa')) {
            return [
                'sofa_type' => [
                    'label' => 'نوع الكنب',
                    'type' => 'select',
                    'options' => [
                        'corner' => 'زاوية',
                        'triple' => 'ثلاثي',
                        'double' => 'ثنائي',
                        'single' => 'مفرد'
                    ],
                    'required' => true
                ],
                'fabric_type' => [
                    'label' => 'القماش',
                    'type' => 'select',
                    'options' => [
                        'velvet' => 'مخمل',
                        'linen' => 'كتّان',
                        'leather' => 'جلد'
                    ],
                    'required' => true
                ],
                'color' => [
                    'label' => 'اللون',
                    'type' => 'color_selector',
                    'required' => true
                ],
                'dimensions' => [
                    'label' => 'القياس (الطول × العمق × الارتفاع)',
                    'type' => 'dimensions_3d',
                    'required' => true,
                    'units' => ['سم', 'متر']
                ]
            ];
        } elseif (str_contains($categoryName, 'خزان') || str_contains($categoryName, 'closet') || str_contains($categoryName, 'wardrobe')) {
            return [
                'closet_type' => [
                    'label' => 'نوع الخزانة',
                    'type' => 'select',
                    'options' => [
                        'sliding_doors' => 'أبواب سحاب',
                        'hinged_doors' => 'مفصلية',
                        'open' => 'مفتوحة'
                    ],
                    'required' => true
                ],
                'usage' => [
                    'label' => 'الاستخدام',
                    'type' => 'select',
                    'options' => [
                        'bedroom' => 'غرفة نوم',
                        'walk_in' => 'غرفة ملابس',
                        'kitchen' => 'مطبخ'
                    ],
                    'required' => true
                ],
                'interior_color' => [
                    'label' => 'اللون الداخلي',
                    'type' => 'color_selector',
                    'required' => true
                ],
                'exterior_color' => [
                    'label' => 'اللون الخارجي',
                    'type' => 'color_selector',
                    'required' => true
                ],
                'drawers_count' => [
                    'label' => 'عدد الأدراج',
                    'type' => 'number',
                    'min' => 0,
                    'max' => 20,
                    'required' => false
                ],
                'shelves_count' => [
                    'label' => 'عدد الأرفف',
                    'type' => 'number',
                    'min' => 0,
                    'max' => 30,
                    'required' => false
                ],
                'interior_lighting' => [
                    'label' => 'الإضاءة الداخلية',
                    'type' => 'select',
                    'options' => [
                        'with' => 'مع إضاءة',
                        'without' => 'بدون إضاءة'
                    ],
                    'required' => false
                ]
            ];
        } elseif (str_contains($categoryName, 'خشب') || str_contains($categoryName, 'wood')) {
            return [
                'product_type' => [
                    'label' => 'المنتج',
                    'type' => 'select',
                    'options' => [
                        'buffet' => 'بوفيه',
                        'coffee_table' => 'طاولة قهوة',
                        'bedside_table' => 'كومدينو',
                        'bookshelf' => 'مكتبة'
                    ],
                    'required' => true
                ],
                'material' => [
                    'label' => 'الخامة',
                    'type' => 'select',
                    'options' => [
                        'mdf' => 'MDF',
                        'natural_wood' => 'خشب طبيعي'
                    ],
                    'required' => true
                ],
                'finish' => [
                    'label' => 'التشطيب',
                    'type' => 'select',
                    'options' => [
                        'matte' => 'مطفي',
                        'glossy' => 'لامع',
                        'textured' => 'ملمس خشن'
                    ],
                    'required' => true
                ],
                'color_pattern' => [
                    'label' => 'اللون والنقشة',
                    'type' => 'color_selector',
                    'required' => true
                ],
                'dimensions' => [
                    'label' => 'القياس (الطول × العرض × الارتفاع)',
                    'type' => 'dimensions_3d',
                    'required' => false,
                    'units' => ['سم', 'متر']
                ]
            ];
        } else {
            return [
                'color' => [
                    'label' => 'اللون',
                    'type' => 'color_selector',
                    'required' => false
                ],
                'dimensions' => [
                    'label' => 'المقاس',
                    'type' => 'dimensions',
                    'required' => false,
                    'units' => ['سم', 'متر', 'انش']
                ]
            ];
        }
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucfirst($value);
        $this->attributes['slug'] = Str::slug($value);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    public function getAllProductsCount()
    {
        return $this->products()->count();
    }
}
