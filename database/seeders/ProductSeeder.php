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
                'coverage_increase' => 5.00,
                'base_price' => 825.00,
                'price_per_sqm' => 30.00,
                'pricing_method' => 'area_based',
                'min_price' => 400.00,
                'max_price' => 2000.00,
                'default_width' => 120.00,
                'default_height' => 150.00,
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
                ],
                'base_price' => 650.00,
                'price_per_sqm' => 25.00,
                'pricing_method' => 'area_based',
                'min_price' => 300.00,
                'max_price' => 1500.00,
                'default_width' => 100.00,
                'default_height' => 120.00,
                'min_width' => 50.000,
                'max_width' => 400.000,
                'min_height' => 50.000,
                'max_height' => 250.000,
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
                ],
                'base_price' => 950.00,
                'price_per_sqm' => 35.00,
                'pricing_method' => 'area_based',
                'min_price' => 500.00,
                'max_price' => 2500.00,
                'default_width' => 150.00,
                'default_height' => 180.00,
                'min_width' => 60.000,
                'max_width' => 500.000,
                'min_height' => 60.000,
                'max_height' => 400.000,
            ],
            // منتج إضافي - ستائر مودرن
            [
                'name' => 'ستائر مودرن بتحكم ذكي - ذهبي',
                'brand' => 'SmartHome',
                'collection' => 'Premium Smart',
                'description' => 'ستائر ذكية يمكن التحكم بها عن بعد مع تصميم عصري أنيق',
                'price' => 1249.00,
                'discount' => 15,
                'image' => '/images/curtain.png',
                'images' => [
                    '/images/curtain.png',
                    '/images/curtain1.png',
                ],
                'rating' => 5,
                'tab' => 'featured',
                'category_id' => $categories->where('name', 'ستائر قماشية')->first()->id,
                'colors' => ['#FFD700', '#FFA500', '#FF8C00'],
                'status' => 'active',
                'stock' => 15,
                'sku' => 'SM-123',
                'featured' => true,
                'specifications' => [
                    'features' => [
                        'تحكم ذكي عبر التطبيق',
                        'مؤقت تلقائي للفتح والإغلاق',
                        'تصميم عصري فاخر'
                    ],
                    'material' => 'قماش ذكي عالي الجودة',
                    'dimensions' => 'متوفر بأحجام مختلفة',
                    'installation' => 'تركيب احترافي مطلوب'
                ],
                'weight' => 4.2,
                'dimensions' => [
                    'width' => 'متغير',
                    'height' => 'متغير',
                    'depth' => '3 سم'
                ],
                'base_price' => 1249.00,
                'price_per_sqm' => 45.00,
                'pricing_method' => 'area_based',
                'min_price' => 800.00,
                'max_price' => 3000.00,
                'default_width' => 160.00,
                'default_height' => 200.00,
                'min_width' => 80.000,
                'max_width' => 600.000,
                'min_height' => 80.000,
                'max_height' => 500.000,
            ],
            [
                'name' => 'ستائر بسيطة للمكاتب - أبيض',
                'brand' => 'Office Plus',
                'collection' => 'Budget Line',
                'description' => 'ستائر بسيطة وعملية مناسبة للمكاتب والاستخدام اليومي',
                'price' => 349.00,
                'discount' => 10,
                'image' => '/images/curtain1.png',
                'images' => [
                    '/images/curtain1.png',
                    '/images/curtain.png',
                ],
                'rating' => 3,
                'tab' => 'all',
                'category_id' => $categories->where('name', 'ستائر قماشية')->first()->id,
                'colors' => ['#FFFFFF', '#F8F8FF', '#F0F8FF'],
                'status' => 'active',
                'stock' => 100,
                'sku' => 'OP-567',
                'featured' => false,
                'specifications' => [
                    'features' => [
                        'سعر اقتصادي',
                        'سهولة في الاستخدام',
                        'مناسب للاستخدام المكتبي'
                    ],
                    'material' => 'قماش اقتصادي',
                    'dimensions' => 'أحجام محدودة',
                    'installation' => 'سهل التركيب بنفسك'
                ],
                'weight' => 1.2,
                'dimensions' => [
                    'width' => 'متغير',
                    'height' => 'متغير',
                    'depth' => '1 سم'
                ],
                'base_price' => 349.00,
                'price_per_sqm' => 15.00,
                'pricing_method' => 'area_based',
                'min_price' => 200.00,
                'max_price' => 800.00,
                'default_width' => 90.00,
                'default_height' => 110.00,
                'min_width' => 40.000,
                'max_width' => 300.000,
                'min_height' => 40.000,
                'max_height' => 200.000,
            ]
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
