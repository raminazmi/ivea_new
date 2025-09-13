<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Offer;
use App\Models\FeaturedOffersSetting;

class UpdateOffersWithSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $nationalDaySetting = FeaturedOffersSetting::where('title_ar', 'عــــرض اليوم الوطـنـي')->first();
        $ramadanSetting = FeaturedOffersSetting::where('title_ar', 'عروض رمضان المبارك')->first();
        $summerSetting = FeaturedOffersSetting::where('title_ar', 'عروض الصيف')->first();
        $eidSetting = FeaturedOffersSetting::where('title_ar', 'عروض العيد')->first();
        $offers = [
            [
                'title' => 'خصم على الستائر',
                'category_slug' => 'curtains',
                'setting' => $nationalDaySetting
            ],
            [
                'title' => 'عرض الأرائك',
                'category_slug' => 'sofas',
                'setting' => $nationalDaySetting
            ],
            [
                'title' => 'خصم الخزائن',
                'category_slug' => 'cabinets',
                'setting' => $ramadanSetting
            ],
            [
                'title' => 'عرض المنتجات الخشبية',
                'category_slug' => 'wooden',
                'setting' => $ramadanSetting
            ],
            [
                'title' => 'خصم على الستائر الصيفية',
                'category_slug' => 'curtains',
                'setting' => $summerSetting
            ],
            [
                'title' => 'عرض الأرائك المريحة',
                'category_slug' => 'sofas',
                'setting' => $summerSetting
            ],
            [
                'title' => 'خصم خزائن العيد',
                'category_slug' => 'cabinets',
                'setting' => $eidSetting
            ],
            [
                'title' => 'عرض المنتجات الخشبية للعيد',
                'category_slug' => 'wooden',
                'setting' => $eidSetting
            ]
        ];

        foreach ($offers as $offerData) {
            $offer = Offer::where('title', $offerData['title'])->first();

            if ($offer && $offerData['setting']) {
                $offer->update([
                    'featured_offers_setting_id' => $offerData['setting']->id,
                    'is_active' => $offerData['setting']->is_active
                ]);
            }
        }

        $this->command->info('تم ربط العروض بالإعدادات بنجاح!');
    }
}
