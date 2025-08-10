<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    public function run(): void
    {
        $colors = [
            [
                'name' => 'أبيض',
                'name_en' => 'White',
                'hex_code' => '#FFFFFF',
                'image' => 'colors/white.jpg',
                'sort_order' => 1
            ],
            [
                'name' => 'أسود',
                'name_en' => 'Black',
                'hex_code' => '#000000',
                'image' => 'colors/black.jpg',
                'sort_order' => 2
            ],
            [
                'name' => 'رمادي',
                'name_en' => 'Gray',
                'hex_code' => '#808080',
                'image' => 'colors/gray.jpg',
                'sort_order' => 3
            ],
            [
                'name' => 'أزرق',
                'name_en' => 'Blue',
                'hex_code' => '#0000FF',
                'image' => 'colors/blue.jpg',
                'sort_order' => 4
            ],
            [
                'name' => 'أحمر',
                'name_en' => 'Red',
                'hex_code' => '#FF0000',
                'image' => 'colors/red.jpg',
                'sort_order' => 5
            ],
            [
                'name' => 'أخضر',
                'name_en' => 'Green',
                'hex_code' => '#008000',
                'image' => 'colors/green.jpg',
                'sort_order' => 6
            ],
            [
                'name' => 'بني',
                'name_en' => 'Brown',
                'hex_code' => '#A52A2A',
                'image' => 'colors/brown.jpg',
                'sort_order' => 7
            ],
            [
                'name' => 'ذهبي',
                'name_en' => 'Gold',
                'hex_code' => '#FFD700',
                'image' => 'colors/gold.jpg',
                'sort_order' => 8
            ],
            [
                'name' => 'فضي',
                'name_en' => 'Silver',
                'hex_code' => '#C0C0C0',
                'image' => 'colors/silver.jpg',
                'sort_order' => 9
            ],
            [
                'name' => 'بيج',
                'name_en' => 'Beige',
                'hex_code' => '#F5F5DC',
                'image' => 'colors/beige.jpg',
                'sort_order' => 10
            ],
            [
                'name' => 'وردي',
                'name_en' => 'Pink',
                'hex_code' => '#FFC0CB',
                'image' => 'colors/pink.jpg',
                'sort_order' => 11
            ],
            [
                'name' => 'بنفسجي',
                'name_en' => 'Purple',
                'hex_code' => '#800080',
                'image' => 'colors/purple.jpg',
                'sort_order' => 12
            ],
            [
                'name' => 'برتقالي',
                'name_en' => 'Orange',
                'hex_code' => '#FFA500',
                'image' => 'colors/orange.jpg',
                'sort_order' => 13
            ],
            [
                'name' => 'أصفر',
                'name_en' => 'Yellow',
                'hex_code' => '#FFFF00',
                'image' => 'colors/yellow.jpg',
                'sort_order' => 14
            ],
            [
                'name' => 'سماوي',
                'name_en' => 'Sky Blue',
                'hex_code' => '#87CEEB',
                'image' => 'colors/skyblue.jpg',
                'sort_order' => 15
            ]
        ];

        foreach ($colors as $color) {
            Color::create($color);
        }
    }
}
