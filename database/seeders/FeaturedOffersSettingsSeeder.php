<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FeaturedOffersSetting;

class FeaturedOffersSettingsSeeder extends Seeder
{

    public function run(): void
    {
        $settings = [
            [
                'title_ar' => 'عــــرض اليوم الوطـنـي',
                'description_ar' => 'اطلع على عروضنا اليومية التي تجمع بين خصومات كبيرة على منتجات المنزل. العروض قد تتغير يوميا، فلا تفوت الفرصة :)',
                'button_text_ar' => 'افتح المتجر',
                'button_url' => '/products',
                'is_active' => true
            ],
            [
                'title_ar' => 'عروض رمضان المبارك',
                'description_ar' => 'استعد لرمضان مع عروضنا الخاصة على جميع منتجات المنزل. خصومات تصل إلى 50% على منتجات مختارة',
                'button_text_ar' => 'تسوق الآن',
                'button_url' => '/products?category=special',
                'is_active' => false
            ],
            [
                'title_ar' => 'عروض الصيف',
                'description_ar' => 'استعد للصيف مع عروضنا الحصرية على منتجات التكييف والستائر. خصومات كبيرة لفترة محدودة',
                'button_text_ar' => 'اكتشف العروض',
                'button_url' => '/products?season=summer',
                'is_active' => false
            ],
            [
                'title_ar' => 'عروض العيد',
                'description_ar' => 'احتفل بالعيد مع عروضنا الخاصة. تجديد منزلك بأسعار لا تقاوم',
                'button_text_ar' => 'تسوق العيد',
                'button_url' => '/products?offer=eid',
                'is_active' => false
            ]
        ];

        foreach ($settings as $setting) {
            FeaturedOffersSetting::firstOrCreate(
                ['title_ar' => $setting['title_ar']],
                $setting
            );
        }

        $this->command->info('تم إنشاء إعدادات العروض المميزة بنجاح!');
    }
}
