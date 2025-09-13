<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NationalDayOffer;

class NationalDayOfferSeeder extends Seeder
{
    public function run(): void
    {
        NationalDayOffer::create([
            'title_ar' => 'عــــرض اليوم الوطـنـي',
            'description_ar' => 'اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)',
            'button_text_ar' => 'افتح المتجر',
            'button_url' => '/products',
            'offer1_title' => 'خصم على الستائر',
            'offer1_discount_percentage' => 25,
            'offer1_category_slug' => 'curtains',
            'offer1_category_name' => 'ستائر',
            'offer1_image_path' => null,
            'offer1_link' => '/products?main_category=curtains',
            'offer2_title' => 'عرض الأرائك',
            'offer2_discount_percentage' => 30,
            'offer2_category_slug' => 'sofas',
            'offer2_category_name' => 'أرائك',
            'offer2_image_path' => null,
            'offer2_link' => '/products?main_category=sofas',
            'is_active' => true
        ]);

        $this->command->info('تم إنشاء سكشن عرض اليوم الوطني بنجاح!');
    }
}
