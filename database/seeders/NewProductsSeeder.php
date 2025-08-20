<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Carbon\Carbon;

class NewProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some categories
        $categories = Category::take(4)->get();
        
        if ($categories->isEmpty()) {
            $this->command->info('No categories found. Please run CategorySeeder first.');
            return;
        }

        // Create some new products with published_at dates
        $newProducts = [
            [
                'name' => 'ستارة جديدة عصرية',
                'brand' => 'ايفيا',
                'description' => 'ستارة جديدة بتصميم عصري وألوان جذابة',
                'price' => 299.99,
                'image' => '/images/curtain.png',
                'category_id' => $categories->first()->id,
                'status' => 'active',
                'stock' => 50,
                'featured' => false,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'name' => 'كنب جديد فاخر',
                'brand' => 'ايفيا',
                'description' => 'كنب جديد بتصميم فاخر ومريح',
                'price' => 1299.99,
                'image' => '/images/sofa.png',
                'category_id' => $categories->get(1)->id ?? $categories->first()->id,
                'status' => 'active',
                'stock' => 20,
                'featured' => false,
                'published_at' => Carbon::now()->subDays(10),
            ],
            [
                'name' => 'خزانة جديدة أنيقة',
                'brand' => 'ايفيا',
                'description' => 'خزانة جديدة بتصميم أنيق وعملي',
                'price' => 899.99,
                'image' => '/images/treasury.png',
                'category_id' => $categories->get(2)->id ?? $categories->first()->id,
                'status' => 'active',
                'stock' => 15,
                'featured' => false,
                'published_at' => Carbon::now()->subDays(15),
            ],
            [
                'name' => 'خشبية جديدة كلاسيكية',
                'brand' => 'ايفيا',
                'description' => 'خشبية جديدة بتصميم كلاسيكي أنيق',
                'price' => 599.99,
                'image' => '/images/door.png',
                'category_id' => $categories->get(3)->id ?? $categories->first()->id,
                'status' => 'active',
                'stock' => 25,
                'featured' => false,
                'published_at' => Carbon::now()->subDays(20),
            ],
        ];

        foreach ($newProducts as $productData) {
            Product::create($productData);
        }

        $this->command->info('New products seeded successfully!');
    }
}
