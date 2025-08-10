<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductsWithDimensions extends Seeder
{
    public function run()
    {
        $products = Product::all();

        foreach ($products as $product) {
            $baseWidth = rand(100, 300);
            $baseHeight = rand(120, 350);

            $product->update([
                'default_width' => $baseWidth,
                'default_height' => $baseHeight,
                'min_width' => max(50, $baseWidth - 50),
                'max_width' => $baseWidth + 200,
                'min_height' => max(60, $baseHeight - 60),
                'max_height' => $baseHeight + 150,
            ]);
        }
    }
}
