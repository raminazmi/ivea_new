<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PreparingForSummer;
use Illuminate\Support\Facades\Storage;

class PreparingForSummerSeeder extends Seeder
{
    public function run(): void
    {
        PreparingForSummer::truncate();
        PreparingForSummer::create([
            'title_ar' => 'استمتع بالصيف بأناقة',
            'description_ar' => 'من أقمشة عازلة الى تصاميم عصرية .. صممناها لتناسب حرارة الصيف تمنحك راحة طوال اليوم.',
            'button_text_ar' => 'تسوق الآن',
            'button_url' => '/products',
            'image_1_path' => 'hero-slides/image1.jpg',
            'image_1_alt' => 'كنب صيفي أنيق',
            'image_1_url' => '/products?category=knb-wraayk',
            'image_2_path' => 'hero-slides/image2.jpeg',
            'image_2_alt' => 'أثاث خارجي صيفي',
            'image_2_url' => '/products?category=knb-wraayk',
            'is_active' => true,
        ]);
    }
}
