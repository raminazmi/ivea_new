<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoryCustomizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // البحث عن الفئات الموجودة وتحديثها
        $categories = Category::all();

        foreach ($categories as $category) {
            // سيتم استخدام الـ method الموجود في الـ model للحصول على الخيارات الافتراضية
            // لا نحتاج لحفظ البيانات لأن الـ model سيعيد الخيارات تلقائياً
            // ولكن يمكننا حفظها إذا أردنا تخصيص معين

            if (stripos($category->name, 'ستائر') !== false) {
                $category->update([
                    'customization_fields' => [
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
                    ]
                ]);
            } elseif (stripos($category->name, 'كنب') !== false) {
                $category->update([
                    'customization_fields' => [
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
                    ]
                ]);
            } elseif (
                stripos($category->name, 'خزان') !== false ||
                stripos($category->name, 'خزائن') !== false
            ) {
                $category->update([
                    'customization_fields' => [
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
                    ]
                ]);
            } elseif (stripos($category->name, 'خشب') !== false) {
                $category->update([
                    'customization_fields' => [
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
                    ]
                ]);
            }
        }
    }
}
