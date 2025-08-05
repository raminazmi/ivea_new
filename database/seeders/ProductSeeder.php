<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            [
                'name' => 'ستائر الرولر للوقاية الشمسية (سن سكرين) مطبوعة - أزرق',
                'brand' => 'Antartica',
                'collection' => 'Paragon I',
                'description' => 'ستائر رولر عالية الجودة للحماية من أشعة الشمس مع تصميم أنيق',
                'price' => 825.00,
                'discount' => 35,
                'image' => '/images/curtain.png',
                'images' => [
                    '/images/curtain.png',
                    '/images/curtain1.png',
                    '/images/curtain.png',
                    '/images/curtain1.png'
                ],
                'rating' => 4,
                'tab' => 'featured',
                'category_id' => $categories->where('name', 'ستائر قماشية')->first()->id,
                'colors' => ['#FFA500', '#87CEEB', '#DDA0DD', '#9370DB'],
                'status' => 'active',
                'stock' => 50,
                'sku' => '6-52CH',
                'featured' => true,
                'specifications' => [
                    'features' => [
                        'تمنع ما يقارب 90 - 96% من الأشعة فوق البنفسجية الضارة ، ظاهرة الوهج.',
                        'شديدة التحمل و سهلة التنظيف',
                        'يمكن تثبيتها بوضعيات متنوعة'
                    ],
                    'material' => 'قماش عالي الجودة',
                    'dimensions' => 'متوفر بأحجام مختلفة',
                    'installation' => 'سهل التركيب'
                ],
                'weight' => 2.5,
                'dimensions' => [
                    'width' => 'متغير',
                    'height' => 'متغير',
                    'depth' => '2 سم'
                ],
                'measurement_units' => [
                    ['value' => 'mm', 'label' => 'مم'],
                    ['value' => 'cm', 'label' => 'سم'],
                    ['value' => 'inch', 'label' => 'انش']
                ],
                'opening_methods' => [
                    ['value' => 'single', 'label' => 'فتحة واحدة'],
                    ['value' => 'double', 'label' => 'فتحتين']
                ],
                'track_types' => [
                    ['value' => 'electric', 'label' => 'محرك كهربائي'],
                    ['value' => 'manual', 'label' => 'بدون محرك كهربائي']
                ],
                'lining_options' => [
                    ['value' => 'with', 'label' => 'مع بطانة'],
                    ['value' => 'without', 'label' => 'بدون بطانة']
                ],
                'min_width' => 20.000,
                'max_width' => 300.000,
                'min_height' => 20.000,
                'max_height' => 300.000,
                'fabric_reduction' => 4.00,
                'coverage_increase' => 5.00
            ],
            [
                'name' => 'ستائر بليت كلاسيكية - رمادي',
                'brand' => 'Somfy',
                'collection' => 'Classic Series',
                'description' => 'ستائر بليت أنيقة بتصميم كلاسيكي تناسب جميع الأذواق',
                'price' => 650.00,
                'discount' => 25,
                'image' => '/images/curtain1.png',
                'images' => [
                    '/images/curtain1.png',
                    '/images/curtain.png',
                    '/images/curtain1.png',
                    '/images/curtain.png'
                ],
                'rating' => 5,
                'tab' => 'bestsellers',
                'category_id' => $categories->where('name', 'ستائر نبش')->first()->id,
                'colors' => ['#808080', '#A9A9A9', '#696969', '#2F4F4F'],
                'status' => 'active',
                'stock' => 30,
                'sku' => 'PL-789',
                'featured' => true,
                'specifications' => [
                    'features' => [
                        'تصميم كلاسيكي أنيق',
                        'سهولة في التحكم',
                        'تناسب جميع الغرف'
                    ],
                    'material' => 'قماش عالي الجودة',
                    'dimensions' => 'متوفر بأحجام مختلفة',
                    'installation' => 'سهل التركيب'
                ],
                'weight' => 1.8,
                'dimensions' => [
                    'width' => 'متغير',
                    'height' => 'متغير',
                    'depth' => '1.5 سم'
                ]
            ],
            [
                'name' => 'ستائر قماش عازلة للشمس - أبيض',
                'brand' => 'York',
                'collection' => 'SunShield',
                'description' => 'ستائر قماش عازلة للحرارة مع حماية كاملة من أشعة الشمس',
                'price' => 950.00,
                'discount' => 20,
                'image' => '/images/curtain.png',
                'images' => [
                    '/images/curtain.png',
                    '/images/curtain1.png',
                    '/images/curtain.png',
                    '/images/curtain1.png'
                ],
                'rating' => 4,
                'tab' => 'new',
                'category_id' => $categories->where('name', 'ستائر معتمة')->first()->id,
                'colors' => ['#FFFFFF', '#F5F5F5', '#E8E8E8', '#D3D3D3'],
                'status' => 'active',
                'stock' => 25,
                'sku' => 'SS-456',
                'featured' => false,
                'specifications' => [
                    'features' => [
                        'عزل حراري ممتاز',
                        'حماية من الأشعة فوق البنفسجية',
                        'سهولة في التنظيف والصيانة'
                    ],
                    'material' => 'قماش عازل للحرارة',
                    'dimensions' => 'متوفر بأحجام مختلفة',
                    'installation' => 'سهل التركيب'
                ],
                'weight' => 3.2,
                'dimensions' => [
                    'width' => 'متغير',
                    'height' => 'متغير',
                    'depth' => '2.5 سم'
                ]
            ]
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
