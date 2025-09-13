<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSlide;
use App\Models\LandingPageSection;

class LandingPageSeeder extends Seeder
{
    public function run(): void
    {
        $heroSlides = [
            [
                'title' => 'إيفيا # تشاركك_ذوقك',
                'subtitle' => 'تفاصيل تلامس حواسك',
                'image_path' => 'hero-slides/hero_banner2.jpg',
                'alt_text' => 'إيفيا # تشاركك_ذوقك',
                'link_url' => '/products',
                'link_text' => 'استكشف منتجاتنا',
                'button_text' => 'تسوق الآن',
                'button_url' => '/products?tab=featured',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'تفاصيل تلامس حواسك',
                'subtitle' => 'جودة استثنائية في كل تفصيل',
                'image_path' => 'hero-slides/hero_banner.jpg',
                'alt_text' => 'تفاصيل تلامس حواسك',
                'link_url' => '/products',
                'link_text' => 'اكتشف المجموعة',
                'button_text' => 'عرض المزيد',
                'button_url' => '/products',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'عروض اليوم الوطني',
                'subtitle' => 'خصومات حصرية لفترة محدودة',
                'image_path' => 'hero-slides/hero_banner3.jpg',
                'alt_text' => 'عروض اليوم الوطني بدأت',
                'link_url' => '/products?tab=offers',
                'link_text' => 'شاهد العروض',
                'button_text' => 'احصل على العرض',
                'button_url' => '/products?tab=offers',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($heroSlides as $slide) {
            HeroSlide::create($slide);
        }

        $sections = [
            [
                'section_key' => 'preparing-for-summer',
                'title_ar' => 'استمتع بالصيف بأناقة',
                'subtitle_ar' => 'مجموعة صيفية حصرية',
                'description_ar' => 'من أقمشة عازلة الى تصاميم عصرية .. صممناها لتناسب حرارة الصيف تمنحك راحة طوال اليوم.',
                'button_text_ar' => 'تسوق الآن',
                'button_url' => '/products?category=summer-collection',
                'image_path' => 'landing-sections/summer-collection.jpg',
                'is_active' => true,
                'sort_order' => 1,
                'settings' => [
                    'bg_color' => '#F5F5F5',
                    'text_color' => '#000000',
                    'layout' => 'default',
                    'animation' => 'fade'
                ]
            ],
        ];

        foreach ($sections as $section) {
            LandingPageSection::create($section);
        }
    }
}
