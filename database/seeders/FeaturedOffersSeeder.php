<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;
use App\Models\OffersText;

class FeaturedOffersSeeder extends Seeder
{
    public function run(): void
    {
        $mainTitleText = OffersText::firstOrCreate(
            ['key' => 'main_title'],
            [
                'title_ar' => 'عــــرض اليوم الوطـنـي',
                'description_ar' => 'اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)',
                'is_active' => true,
                'sort_order' => 1
            ]
        );

        $offers = [
            [
                'title' => 'خصم على الستائر',
                'discount_percentage' => 25,
                'category_slug' => 'curtains',
                'category_name' => 'ستائر',
                'offers_text_id' => $mainTitleText->id,
                'is_active' => true
            ],
            [
                'title' => 'عرض الأرائك',
                'discount_percentage' => 30,
                'category_slug' => 'sofas',
                'category_name' => 'أرائك',
                'offers_text_id' => $mainTitleText->id,
                'is_active' => true
            ],
            [
                'title' => 'خصم الخزائن',
                'discount_percentage' => 20,
                'category_slug' => 'cabinets',
                'category_name' => 'خزائن',
                'offers_text_id' => $mainTitleText->id,
                'is_active' => true
            ],
            [
                'title' => 'عرض المنتجات الخشبية',
                'discount_percentage' => 35,
                'category_slug' => 'wooden',
                'category_name' => 'خشبي',
                'offers_text_id' => $mainTitleText->id,
                'is_active' => false
            ]
        ];

        foreach ($offers as $offerData) {
            Offer::firstOrCreate(
                [
                    'title' => $offerData['title'],
                    'category_slug' => $offerData['category_slug']
                ],
                $offerData
            );
        }

        $this->command->info('تم إنشاء العروض المميزة التجريبية بنجاح!');
    }
}
