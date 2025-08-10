<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateExistingProductsSeeder extends Seeder
{
    public function run(): void
    {
        $existingProducts = Product::whereNull('base_price')
            ->orWhereNull('default_width')
            ->orWhereNull('default_height')
            ->get();

        foreach ($existingProducts as $product) {
            $updates = [];
            if (is_null($product->base_price)) {
                $updates['base_price'] = $product->price;
            }

            if (is_null($product->price_per_sqm)) {
                $pricePerSqm = $product->price < 500 ? 15 : ($product->price < 1000 ? 25 : ($product->price < 1500 ? 35 : 50));
                $updates['price_per_sqm'] = $pricePerSqm;
            }

            if (is_null($product->pricing_method)) {
                $updates['pricing_method'] = 'area_based';
            }

            if (is_null($product->min_price)) {
                $updates['min_price'] = $product->price * 0.6;
            }

            if (is_null($product->max_price)) {
                $updates['max_price'] = $product->price * 3;
            }

            if (is_null($product->default_width)) {
                $defaultWidth = $product->price < 500 ? 90 : ($product->price < 1000 ? 120 : ($product->price < 1500 ? 150 : 180));
                $updates['default_width'] = $defaultWidth;
            }

            if (is_null($product->default_height)) {
                $defaultHeight = $product->price < 500 ? 110 : ($product->price < 1000 ? 140 : ($product->price < 1500 ? 180 : 220));
                $updates['default_height'] = $defaultHeight;
            }

            if (is_null($product->min_width)) {
                $updates['min_width'] = 40.000;
            }

            if (is_null($product->max_width)) {
                $updates['max_width'] = $product->price < 500 ? 300.000 : ($product->price < 1000 ? 400.000 : ($product->price < 1500 ? 500.000 : 600.000));
            }

            if (is_null($product->min_height)) {
                $updates['min_height'] = 40.000;
            }

            if (is_null($product->max_height)) {
                $updates['max_height'] = $product->price < 500 ? 200.000 : ($product->price < 1000 ? 300.000 : ($product->price < 1500 ? 400.000 : 500.000));
            }

            if (!empty($updates)) {
                $product->update($updates);
                $this->command->info("تم تحديث المنتج: {$product->name}");
                $this->command->line("- السعر الأساسي: " . ($updates['base_price'] ?? 'لم يتغير'));
                $this->command->line("- الأبعاد الافتراضية: " .
                    ($updates['default_width'] ?? $product->default_width) . "×" .
                    ($updates['default_height'] ?? $product->default_height) . " سم");
                $this->command->line("- السعر لكل م²: " . ($updates['price_per_sqm'] ?? $product->price_per_sqm) . " ريال");
                $this->command->line("---");
            }
        }

        $this->command->info("تم الانتهاء من تحديث جميع المنتجات الموجودة!");
    }
}
