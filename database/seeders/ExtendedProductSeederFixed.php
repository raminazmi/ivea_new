<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ExtendedProductSeederFixed extends Seeder
{
    public function run(): void
    {
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
                    'features' => ['شفافية مدروسة للإضاءة الطبيعية', 'حماية من الأنظار دون حجب النور', 'مقاوم للرطوبة'],
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
                'min_width' => 50.00,
                'max_width' => 400.00,
                'min_height' => 50.00,
                'max_height' => 300.00,
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
                'category_id' => 4,
                'colors' => ['#000000', '#2F2F2F', '#1C1C1C'],
                'status' => 'active',
                'stock' => 25,
                'sku' => 'SW-345E',
                'featured' => true,
                'specifications' => [
                    'features' => ['إعتام كامل 100%', 'عزل صوتي ممتاز', 'مقاوم للتجعد والتآكل'],
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
                'max_price' => 2400.00,
                'default_width' => 180.00,
                'default_height' => 200.00,
                'min_width' => 80.00,
                'max_width' => 500.00,
                'min_height' => 100.00,
                'max_height' => 350.00,
            ],
            [
                'name' => 'ستائر ديكورية فاخرة - ذهبي',
                'brand' => 'RoyalDecor',
                'collection' => 'Premium Decor',
                'description' => 'ستائر ديكورية فاخرة بتطريز ذهبي للمساحات الراقية',
                'price' => 1450.00,
                'discount' => 15,
                'image' => '/images/curtain.png',
                'images' => ['/images/curtain.png', '/images/curtain1.png'],
                'rating' => 5,
                'tab' => 'featured',
                'category_id' => 5,
                'colors' => ['#FFD700', '#B8860B', '#DAA520'],
                'status' => 'active',
                'stock' => 15,
                'sku' => 'RD-678E',
                'featured' => true,
                'specifications' => [
                    'features' => ['تطريز يدوي فاخر', 'خامات أوروبية فاخرة', 'تصميم حصري'],
                    'material' => 'حرير طبيعي مع تطريز ذهبي',
                    'dimensions' => 'أحجام حسب الطلب',
                    'installation' => 'تركيب احترافي مطلوب'
                ],
                'weight' => 4.5,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '2.8 سم'],
                'base_price' => 1450.00,
                'price_per_sqm' => 58.00,
                'pricing_method' => 'area_based',
                'min_price' => 1000.00,
                'max_price' => 4500.00,
                'default_width' => 200.00,
                'default_height' => 250.00,
                'min_width' => 120.00,
                'max_width' => 600.00,
                'min_height' => 150.00,
                'max_height' => 400.00,
            ],
            [
                'name' => 'ستائر مكتبية بسيطة - رمادي',
                'brand' => 'WorkSpace',
                'collection' => 'Office Line',
                'description' => 'ستائر عملية بسيطة مناسبة للمكاتب والمساحات التجارية',
                'price' => 420.00,
                'discount' => 10,
                'image' => '/images/curtain1.png',
                'images' => ['/images/curtain1.png', '/images/curtain.png'],
                'rating' => 4,
                'tab' => 'office',
                'category_id' => 2,
                'colors' => ['#808080', '#696969', '#A9A9A9'],
                'status' => 'active',
                'stock' => 60,
                'sku' => 'WS-901E',
                'featured' => false,
                'specifications' => [
                    'features' => ['مقاوم للبقع والغبار', 'سهل التنظيف', 'متين للاستخدام اليومي'],
                    'material' => 'بوليستر معالج ضد البقع',
                    'dimensions' => 'أحجام قياسية متنوعة',
                    'installation' => 'سهل التركيب'
                ],
                'weight' => 2.2,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '1.5 سم'],
                'base_price' => 420.00,
                'price_per_sqm' => 18.00,
                'pricing_method' => 'area_based',
                'min_price' => 280.00,
                'max_price' => 850.00,
                'default_width' => 130.00,
                'default_height' => 160.00,
                'min_width' => 60.00,
                'max_width' => 350.00,
                'min_height' => 80.00,
                'max_height' => 280.00,
            ],
            [
                'name' => 'ستائر ذكية تحكم آلي - أبيض',
                'brand' => 'TechHome',
                'collection' => 'Smart Living',
                'description' => 'ستائر ذكية مع تحكم آلي بالهاتف والذكاء الاصطناعي',
                'price' => 2100.00,
                'discount' => 12,
                'image' => '/images/curtain.png',
                'images' => ['/images/curtain.png', '/images/curtain1.png'],
                'rating' => 5,
                'tab' => 'new',
                'category_id' => 2,
                'colors' => ['#FFFFFF', '#F8F8FF', '#F0F8FF'],
                'status' => 'active',
                'stock' => 8,
                'sku' => 'TH-2024E',
                'featured' => true,
                'specifications' => [
                    'features' => ['تحكم بالهاتف الذكي', 'مؤقت زمني ذكي', 'ربط مع المنزل الذكي'],
                    'material' => 'قماش تقني مع محرك كهربائي',
                    'dimensions' => 'أحجام حسب الطلب',
                    'installation' => 'تركيب تقني متخصص'
                ],
                'weight' => 5.8,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '4.5 سم'],
                'base_price' => 2100.00,
                'price_per_sqm' => 85.00,
                'pricing_method' => 'area_based',
                'min_price' => 1800.00,
                'max_price' => 6500.00,
                'default_width' => 150.00,
                'default_height' => 180.00,
                'min_width' => 100.00,
                'max_width' => 450.00,
                'min_height' => 120.00,
                'max_height' => 320.00,
            ],
            [
                'name' => 'ستائر اقتصادية للطلاب - أزرق',
                'brand' => 'StudentLife',
                'collection' => 'Budget Line',
                'description' => 'ستائر اقتصادية بسيطة مناسبة للغرف الصغيرة والميزانيات المحدودة',
                'price' => 199.00,
                'discount' => 5,
                'image' => '/images/curtain1.png',
                'images' => ['/images/curtain1.png', '/images/curtain.png'],
                'rating' => 3,
                'tab' => 'budget',
                'category_id' => 2,
                'colors' => ['#4169E1', '#1E90FF', '#0000CD'],
                'status' => 'active',
                'stock' => 100,
                'sku' => 'SL-100E',
                'featured' => false,
                'specifications' => [
                    'features' => ['سعر اقتصادي', 'خفيف الوزن', 'ألوان شبابية'],
                    'material' => 'بوليستر أساسي',
                    'dimensions' => 'أحجام صغيرة ومتوسطة',
                    'installation' => 'سهل التركيب الذاتي'
                ],
                'weight' => 1.2,
                'dimensions' => ['width' => 'متغير', 'height' => 'متغير', 'depth' => '0.5 سم'],
                'base_price' => 199.00,
                'price_per_sqm' => 12.00,
                'pricing_method' => 'area_based',
                'min_price' => 150.00,
                'max_price' => 500.00,
                'default_width' => 80.00,
                'default_height' => 100.00,
                'min_width' => 30.00,
                'max_width' => 200.00,
                'min_height' => 30.00,
                'max_height' => 180.00,
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
