<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'ستائر نبش',
                'slug' => 'stayr-nbsh',
                'description' => 'ستائر نبش عالية الجودة',
                'color' => '#F0F7FF',
                'sort_order' => 1,
                'status' => 'active'
            ],
            [
                'name' => 'ستائر قماشية',
                'slug' => 'stayr-qmashya',
                'description' => 'ستائر قماشية أنيقة',
                'color' => '#FFEDED',
                'sort_order' => 2,
                'status' => 'active'
            ],
            [
                'name' => 'ستائر شفافة',
                'slug' => 'stayr-shfafa',
                'description' => 'ستائر شفافة خفيفة',
                'color' => '#FFF7ED',
                'sort_order' => 3,
                'status' => 'active'
            ],
            [
                'name' => 'ستائر معتمة',
                'slug' => 'stayr-mtma',
                'description' => 'ستائر معتمة للحماية من الضوء',
                'color' => '#E5E7EB',
                'sort_order' => 4,
                'status' => 'active'
            ],
            [
                'name' => 'ستائر رومانية',
                'slug' => 'stayr-romanya',
                'description' => 'ستائر رومانية كلاسيكية',
                'color' => '#FEF3C7',
                'sort_order' => 5,
                'status' => 'active'
            ],
            [
                'name' => 'كنب وأرائك',
                'slug' => 'knb-wraayk',
                'description' => 'كنب وأرائك فاخرة',
                'color' => '#DBEAFE',
                'sort_order' => 6,
                'status' => 'active'
            ],
            [
                'name' => 'كراسي',
                'slug' => 'krasy',
                'description' => 'كراسي مريحة وأنيقة',
                'color' => '#FCE7F3',
                'sort_order' => 7,
                'status' => 'active'
            ],
            [
                'name' => 'طاولات',
                'slug' => 'tawlat',
                'description' => 'طاولات بأشكال مختلفة',
                'color' => '#D1FAE5',
                'sort_order' => 8,
                'status' => 'active'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
