<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ExtendedProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $products = [
            [
                'name' => 'ستائر رولر شفافة للإضاءة الطبيعية - بيج',
                'brand' => 'LightMax',
                'collection' => 'Natural Light',
                'description' => 'ستائر شفافة تسمح بمرور الإضاءة الطبيعية مع الحفاظ على الخصوصية',
                'price' => 650.00,
                'discount' => 20,
                'image' => '/images/curtain.png',
                'images' => ['/images/curtain.png', '/images/curtain1.png'],
                'rating' => 4,
                'tab' => 'new',
                'category_id' => 3,
                'colors' => ['#F5F5DC', '#D2B48C', '#DEB887'],
                'status' => 'active',
                'stock' => 40,
                'sku' => 'LM-890E',
                'featured' => false,
                'specifications' => [
                    'features' => [
                        'شفافية مدروسة للإضاءة الطبيعية',
                        'حماية من الأنظار دون حجب النور',
                        'مقاوم للرطوبة'
                    ],
                    'material' => 'قماش شفاف عالي الجودة',
                    'dimensions' => 'متوفر بأحجام مختلفة',
                    'installation' => 'سهل التركيب'
                ],
                'weight' => 1.8,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '1.8 سم'],
                'base_price' => 650.00,
                'price_per_sqm' => 22.00,
                'pricing_method' => 'area_based',
                'min_price' => 350.00,
                'max_price' => 1200.00,
                'default_width' => 110.00,
                'default_height' => 140.00,
                'min_width' => 50.000,
                'max_width' => 400.000,
                'min_height' => 50.000,
                'max_height' => 300.000,
            ],
            [
                'name' => 'ستائر معتمة كاملة للنوم - أسود',
                'brand' => 'SleepWell',
                'collection' => 'Blackout Pro',
                'description' => 'ستائر معتمة 100% مثالية لغرف النوم وقاعات السينما المنزلية',
                'price' => 950.00,
                'discount' => 25,
                'image' => '/images/curtain1.png',
                'images' => ['/images/curtain1.png', '/images/curtain.png'],
                'rating' => 5,
                'tab' => 'bestsellers',
                'category_id' => $categories->where('name', 'ستائر معتمة')->first()?->id ?? 1,
                'colors' => ['#000000', '#2F2F2F', '#1C1C1C'],
                'status' => 'active',
                'stock' => 25,
                'sku' => 'SW-345',
                'featured' => true,
                'specifications' => [
                    'features' => [
                        'إعتام كامل 100%',
                        'عزل صوتي ممتاز',
                        'مقاوم للتجعد والتآكل'
                    ],
                    'material' => 'قماش معتم متعدد الطبقات',
                    'dimensions' => 'متوفر بأحجام كبيرة',
                    'installation' => 'تركيب احترافي مفضل'
                ],
                'weight' => 3.8,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '3.2 سم'],
                'base_price' => 950.00,
                'price_per_sqm' => 38.00,
                'pricing_method' => 'area_based',
                'min_price' => 600.00,
                'max_price' => 2200.00,
                'default_width' => 180.00,
                'default_height' => 220.00,
                'min_width' => 70.000,
                'max_width' => 600.000,
                'min_height' => 70.000,
                'max_height' => 400.000,
            ],
            [
                'name' => 'ستائر قماش مزخرفة للصالات - أحمر',
                'brand' => 'Royal Design',
                'collection' => 'Palace Collection',
                'description' => 'ستائر فاخرة مزخرفة بتصميمات كلاسيكية مناسبة للصالات الراقية',
                'price' => 1450.00,
                'discount' => 30,
                'image' => '/images/curtain.png',
                'images' => ['/images/curtain.png', '/images/curtain1.png'],
                'rating' => 5,
                'tab' => 'featured',
                'category_id' => $categories->where('name', 'ستائر قماشية')->first()?->id ?? 1,
                'colors' => ['#8B0000', '#DC143C', '#B22222'],
                'status' => 'active',
                'stock' => 12,
                'sku' => 'RD-678',
                'featured' => true,
                'specifications' => [
                    'features' => [
                        'تصميمات كلاسيكية فاخرة',
                        'قماش عالي الجودة مقاوم للبهتان',
                        'تصنيع يدوي بعناية فائقة'
                    ],
                    'material' => 'قماش فاخر مزخرف',
                    'dimensions' => 'أحجام فاخرة كبيرة',
                    'installation' => 'تركيب احترافي مطلوب'
                ],
                'weight' => 5.5,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '4 سم'],
                'base_price' => 1450.00,
                'price_per_sqm' => 55.00,
                'pricing_method' => 'area_based',
                'min_price' => 900.00,
                'max_price' => 4000.00,
                'default_width' => 200.00,
                'default_height' => 280.00,
                'min_width' => 100.000,
                'max_width' => 800.000,
                'min_height' => 100.000,
                'max_height' => 500.000,
            ],
            [
                'name' => 'ستائر مكتبية عملية - رمادي فاتح',
                'brand' => 'WorkSpace',
                'collection' => 'Professional',
                'description' => 'ستائر عملية مصممة خصيصاً للمكاتب والمساحات التجارية',
                'price' => 450.00,
                'discount' => 15,
                'image' => '/images/curtain1.png',
                'images' => ['/images/curtain1.png', '/images/curtain.png'],
                'rating' => 4,
                'tab' => 'all',
                'category_id' => $categories->where('name', 'ستائر نبش')->first()?->id ?? 1,
                'colors' => ['#D3D3D3', '#C0C0C0', '#A9A9A9'],
                'status' => 'active',
                'stock' => 80,
                'sku' => 'WS-901',
                'featured' => false,
                'specifications' => [
                    'features' => [
                        'تصميم عملي للمكاتب',
                        'سهولة في التنظيف والصيانة',
                        'مقاوم للأتربة'
                    ],
                    'material' => 'قماش عملي مقاوم',
                    'dimensions' => 'أحجام مكتبية متنوعة',
                    'installation' => 'تركيب بسيط وسريع'
                ],
                'weight' => 2.1,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '2 سم'],
                'base_price' => 450.00,
                'price_per_sqm' => 18.00,
                'pricing_method' => 'area_based',
                'min_price' => 250.00,
                'max_price' => 900.00,
                'default_width' => 120.00,
                'default_height' => 160.00,
                'min_width' => 60.000,
                'max_width' => 400.000,
                'min_height' => 60.000,
                'max_height' => 300.000,
            ],
            [
                'name' => 'ستائر رقمية ذكية بتحكم صوتي - أزرق',
                'brand' => 'TechHome',
                'collection' => 'AI Series',
                'description' => 'ستائر ذكية بتقنية الذكاء الاصطناعي والتحكم الصوتي',
                'price' => 2100.00,
                'discount' => 40,
                'image' => '/images/curtain.png',
                'images' => ['/images/curtain.png', '/images/curtain1.png'],
                'rating' => 5,
                'tab' => 'new',
                'category_id' => $categories->where('name', 'ستائر قماشية')->first()?->id ?? 1,
                'colors' => ['#4169E1', '#0000CD', '#191970'],
                'status' => 'active',
                'stock' => 8,
                'sku' => 'TH-2024',
                'featured' => true,
                'specifications' => [
                    'features' => [
                        'تحكم صوتي بتقنية الذكاء الاصطناعي',
                        'تطبيق ذكي مع جدولة تلقائية',
                        'استشعار الإضاءة التلقائي'
                    ],
                    'material' => 'قماش تقني ذكي',
                    'dimensions' => 'أحجام تقنية متقدمة',
                    'installation' => 'تركيب تقني متخصص مطلوب'
                ],
                'weight' => 6.2,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '5 سم'],
                'base_price' => 2100.00,
                'price_per_sqm' => 75.00,
                'pricing_method' => 'area_based',
                'min_price' => 1200.00,
                'max_price' => 6000.00,
                'default_width' => 220.00,
                'default_height' => 300.00,
                'min_width' => 100.000,
                'max_width' => 1000.000,
                'min_height' => 100.000,
                'max_height' => 600.000,
            ],
            [
                'name' => 'ستائر اقتصادية للطلاب - أبيض عادي',
                'brand' => 'StudentLife',
                'collection' => 'Budget Basic',
                'description' => 'ستائر بسيطة واقتصادية مثالية للطلاب والسكن الجامعي',
                'price' => 199.00,
                'discount' => 5,
                'image' => '/images/curtain1.png',
                'images' => ['/images/curtain1.png'],
                'rating' => 3,
                'tab' => 'offers',
                'category_id' => $categories->where('name', 'ستائر قماشية')->first()?->id ?? 1,
                'colors' => ['#FFFFFF', '#FFFAFA'],
                'status' => 'active',
                'stock' => 150,
                'sku' => 'SL-100',
                'featured' => false,
                'specifications' => [
                    'features' => [
                        'سعر مناسب جداً للطلاب',
                        'خفيف الوزن وسهل النقل',
                        'سهل التنظيف'
                    ],
                    'material' => 'قماش أساسي اقتصادي',
                    'dimensions' => 'أحجام أساسية',
                    'installation' => 'تركيب فائق السهولة'
                ],
                'weight' => 0.8,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '0.5 سم'],
                'base_price' => 199.00,
                'price_per_sqm' => 12.00,
                'pricing_method' => 'area_based',
                'min_price' => 150.00,
                'max_price' => 500.00,
                'default_width' => 80.00,
                'default_height' => 100.00,
                'min_width' => 30.000,
                'max_width' => 200.000,
                'min_height' => 30.000,
                'max_height' => 180.000,
            ],
        ];

        foreach ($products as $productData) {
            if (isset($productData['images']) && is_array($productData['images'])) {
                $productData['images'] = json_encode($productData['images']);
            }
            if (isset($productData['colors']) && is_array($productData['colors'])) {
                $productData['colors'] = json_encode($productData['colors']);
            }
            if (isset($productData['specifications']) && is_array($productData['specifications'])) {
                $productData['specifications'] = json_encode($productData['specifications']);
            }
            if (isset($productData['dimensions']) && is_array($productData['dimensions'])) {
                $productData['dimensions'] = json_encode($productData['dimensions']);
            }

            Product::create($productData);
        }
    }
}
