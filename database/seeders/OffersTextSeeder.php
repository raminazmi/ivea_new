<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OffersText;

class OffersTextSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $texts = [
            [
                'key' => 'main_title',
                'title_ar' => 'عــــرض اليوم الوطـنـي',
                'description_ar' => 'اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)',
                'title_en' => 'National Day Offer',
                'description_en' => 'Check out our daily offers that combine great discounts on home products. Offers may change daily, so don\'t miss the opportunity :)',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'key' => 'section_title',
                'title_ar' => 'العروض المميزة',
                'description_ar' => 'اكتشف أفضل العروض والخصومات على منتجاتنا المميزة',
                'title_en' => 'Featured Offers',
                'description_en' => 'Discover the best offers and discounts on our featured products',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'key' => 'special_offer_title',
                'title_ar' => 'عرض خاص',
                'description_ar' => 'خصم يصل إلى 50% على جميع المنتجات',
                'title_en' => 'Special Offer',
                'description_en' => 'Up to 50% discount on all products',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'key' => 'limited_time_title',
                'title_ar' => 'عرض لفترة محدودة',
                'description_ar' => 'لا تفوت هذه الفرصة الذهبية',
                'title_en' => 'Limited Time Offer',
                'description_en' => 'Don\'t miss this golden opportunity',
                'is_active' => true,
                'sort_order' => 4
            ]
        ];

        foreach ($texts as $text) {
            OffersText::create($text);
        }
    }
}
