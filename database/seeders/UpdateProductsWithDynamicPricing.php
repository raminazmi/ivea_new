<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductsWithDynamicPricing extends Seeder
{
    public function run()
    {
        $fixedProducts = Product::where('id', '<=', 3)->get();
        foreach ($fixedProducts as $product) {
            $product->update([
                'pricing_method' => 'fixed',
                'base_price' => $product->price,
                'price_per_sqm' => 0,
                'min_price' => $product->price,
                'max_price' => $product->price,
            ]);
        }

        $areaBasedProducts = Product::where('id', '>', 3)->where('id', '<=', 8)->get();
        foreach ($areaBasedProducts as $product) {
            $basePrice = $product->price * 0.8;
            $pricePerSqm = rand(50, 150);
            $minPrice = $basePrice;
            $maxPrice = $basePrice + ($pricePerSqm * 10);

            $product->update([
                'pricing_method' => 'area_based',
                'base_price' => $basePrice,
                'price_per_sqm' => $pricePerSqm,
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
            ]);
        }

        $sizeBasedProducts = Product::where('id', '>', 8)->where('id', '<=', 15)->get();
        foreach ($sizeBasedProducts as $product) {
            $basePrice = $product->price * 0.7;
            $minPrice = $basePrice;
            $maxPrice = $basePrice * 2.5;

            $product->update([
                'pricing_method' => 'size_based',
                'base_price' => $basePrice,
                'price_per_sqm' => 0,
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
                'price_modifiers' => json_encode([
                    'small' => ['multiplier' => 1.0, 'label' => 'صغير'],
                    'medium' => ['multiplier' => 1.5, 'label' => 'متوسط'],
                    'large' => ['multiplier' => 2.0, 'label' => 'كبير'],
                    'xlarge' => ['multiplier' => 2.5, 'label' => 'كبير جداً'],
                ])
            ]);
        }

        $customProducts = Product::where('id', '>', 15)->get();
        foreach ($customProducts as $product) {
            $basePrice = $product->price * 0.9;
            $minPrice = $basePrice;
            $maxPrice = $basePrice * 1.8;

            $product->update([
                'pricing_method' => 'custom',
                'base_price' => $basePrice,
                'price_per_sqm' => rand(40, 120),
                'min_price' => $minPrice,
                'max_price' => $maxPrice,
                'price_modifiers' => json_encode([
                    'premium' => ['multiplier' => 1.3, 'label' => 'بريميوم'],
                    'standard' => ['multiplier' => 1.0, 'label' => 'عادي'],
                    'basic' => ['multiplier' => 0.8, 'label' => 'أساسي'],
                ])
            ]);
        }

        $this->command->info('تم تحديث المنتجات بنجاح بالتسعير الديناميكي!');
    }
}
