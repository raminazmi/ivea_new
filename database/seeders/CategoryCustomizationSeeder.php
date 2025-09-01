<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoryCustomizationSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        foreach ($categories as $category) {
            if (
                stripos($category->name, 'ستائر') !== false ||
                stripos($category->name, 'ويفي') !== false ||
                stripos($category->name, 'إمريكي') !== false ||
                stripos($category->name, 'رول') !== false ||
                stripos($category->name, 'روماني') !== false
            ) {
                $category->update([
                    'customization_fields' => [
                        'quantity' => [
                            'label' => 'الكمية',
                            'type' => 'number',
                            'min' => 1,
                            'max' => 50,
                            'required' => true,
                            'default' => 1
                        ],
                        'color' => [
                            'label' => 'لون القماش',
                            'type' => 'color_selector',
                            'required' => true,
                            'with_other_option' => true
                        ],
                        'dimensions' => [
                            'label' => 'المقاس (عرض × ارتفاع)',
                            'type' => 'dimensions',
                            'required' => true,
                            'units' => ['سم', 'متر']
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
                        ],
                        'file_upload' => [
                            'label' => 'رفع صورة المساحة أو التصميم المطلوب',
                            'type' => 'file_upload',
                            'accept' => 'image/*,.pdf',
                            'max_files' => 5,
                            'required' => false
                        ]
                    ]
                ]);
            } elseif (
                stripos($category->name, 'كنب') !== false ||
                stripos($category->name, 'مودرن') !== false ||
                stripos($category->name, 'كلاسيك') !== false ||
                stripos($category->name, 'نيو كلاسيك') !== false
            ) {
                $category->update([
                    'customization_fields' => [
                        'quantity' => [
                            'label' => 'الكمية',
                            'type' => 'number',
                            'min' => 1,
                            'max' => 20,
                            'required' => true,
                            'default' => 1
                        ],
                        'room_type' => [
                            'label' => 'نوع المكان',
                            'type' => 'select',
                            'options' => [
                                'majlis' => 'مجلس',
                                'bedroom' => 'غرفة نوم',
                                'living_room' => 'غرفة جلوس',
                                'guest_room' => 'غرفة ضيوف',
                                'hall' => 'صالة'
                            ],
                            'required' => true
                        ],
                        'sofa_type' => [
                            'label' => 'نوع الكنب',
                            'type' => 'select',
                            'options' => [
                                'single' => 'كنبة فردية',
                                'double' => 'كنبة ثنائية',
                                'triple' => 'كنبة ثلاثية',
                                'l_shape' => 'زاوية (L Shape)'
                            ],
                            'required' => true
                        ],
                        'fabric_type' => [
                            'label' => 'نوع القماش',
                            'type' => 'select',
                            'options' => [
                                'velvet' => 'مخمل',
                                'cotton' => 'كتان',
                                'chenille' => 'شانل',
                                'linen' => 'لينين',
                                'microfiber' => 'ميكروفيبر',
                                'natural_leather' => 'جلد طبيعي',
                                'synthetic_leather' => 'جلد صناعي'
                            ],
                            'required' => true
                        ],
                        'fabric_color' => [
                            'label' => 'لون القماش',
                            'type' => 'color_selector',
                            'required' => true,
                            'with_other_option' => true
                        ],
                        'cushion_option' => [
                            'label' => 'خيار الحشو',
                            'type' => 'select',
                            'options' => [
                                'high_density_foam' => 'إسفنج عالي الكثافة',
                                'fiber_foam' => 'فيبر + إسفنج',
                                'feather' => 'ريش',
                                'memory_foam' => 'ميموري فوم'
                            ],
                            'required' => true
                        ],
                        'file_upload' => [
                            'label' => 'رفع صورة المساحة أو التصميم المطلوب',
                            'type' => 'file_upload',
                            'accept' => 'image/*,.pdf',
                            'max_files' => 5,
                            'required' => false
                        ]
                    ]
                ]);
            } elseif (
                stripos($category->name, 'خزان') !== false ||
                stripos($category->name, 'خزائن') !== false ||
                stripos($category->name, 'ملابس') !== false ||
                stripos($category->name, 'تخزين') !== false ||
                stripos($category->name, 'أحذية') !== false ||
                stripos($category->name, 'كتب') !== false ||
                stripos($category->name, 'أطفال') !== false
            ) {
                $category->update([
                    'customization_fields' => [
                        'quantity' => [
                            'label' => 'الكمية',
                            'type' => 'number',
                            'min' => 1,
                            'max' => 20,
                            'required' => true,
                            'default' => 1,
                            'description' => 'يحدد عدد الخزائن المطلوبة'
                        ],
                        'dimensions' => [
                            'label' => 'المساحة',
                            'type' => 'dimensions',
                            'required' => true,
                            'units' => ['سم'],
                            'fields' => ['width' => 'العرض', 'height' => 'الارتفاع']
                        ],
                        'opening_type' => [
                            'label' => 'نوع الفتح',
                            'type' => 'select',
                            'options' => [
                                'hinged' => 'أبواب مفصلية (Hinged)',
                                'sliding' => 'أبواب سحب (Sliding)',
                                'open' => 'مفتوحة (بدون أبواب)'
                            ],
                            'required' => true
                        ],
                        'wood_color' => [
                            'label' => 'لون الخشب / الطلاء',
                            'type' => 'color_selector',
                            'required' => true
                        ],
                        'door_material' => [
                            'label' => 'الخامات للأبواب',
                            'type' => 'select',
                            'options' => [
                                'wood' => 'خشب',
                                'glass' => 'زجاج'
                            ],
                            'required' => true
                        ],
                        'hinges_type' => [
                            'label' => 'المفصلات',
                            'type' => 'select',
                            'options' => [
                                'hydraulic' => 'هيدروليك (إغلاق ناعم)',
                                'regular' => 'عادي'
                            ],
                            'required' => true
                        ],
                        'closing_type' => [
                            'label' => 'الإغلاق',
                            'type' => 'select',
                            'options' => [
                                'soft_close' => 'سوفت كلوز (إغلاق هادئ)',
                                'regular' => 'عادي'
                            ],
                            'required' => true
                        ],
                        'additional_features' => [
                            'label' => 'الإضافات',
                            'type' => 'checkbox_multiple',
                            'options' => [
                                'led_lighting' => 'إضاءة داخلية LED',
                                'door_mirrors' => 'مرايا على الأبواب',
                                'organizational_drawers' => 'أدراج تنظيمية'
                            ],
                            'required' => false
                        ],
                        'file_upload' => [
                            'label' => 'رفع مخطط أو صورة للتصميم المطلوب',
                            'type' => 'file_upload',
                            'accept' => 'image/*,.pdf,.dwg',
                            'max_files' => 5,
                            'required' => false
                        ]
                    ]
                ]);
            } elseif (stripos($category->name, 'خشب') !== false) {
                $category->update([
                    'customization_fields' => [
                        'quantity' => [
                            'label' => 'الكمية',
                            'type' => 'number',
                            'min' => 1,
                            'max' => 50,
                            'required' => true,
                            'default' => 1
                        ],
                        'product_options' => [
                            'label' => 'خيارات المنتج (اختيار أكثر من خيار)',
                            'type' => 'checkbox_multiple',
                            'options' => [
                                'decorative_divider' => 'فاصل ديكوري',
                                'wall_shelf' => 'رف جداري',
                                'tables_chairs' => 'طاولات وكراسي خشبية',
                                'wall_panels' => 'ألواح وكسوة جدران',
                                'bedroom_beds' => 'أسرة غرف نوم',
                                'dressers' => 'تسريحات'
                            ],
                            'required' => true
                        ],
                        'file_upload' => [
                            'label' => 'رفع صورة التصميم أو المخطط المطلوب',
                            'type' => 'file_upload',
                            'accept' => 'image/*,.pdf,.dwg',
                            'max_files' => 5,
                            'required' => false
                        ]
                    ]
                ]);
            }
        }
    }
}