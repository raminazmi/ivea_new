<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'price' => fake()->randomFloat(2, 50, 1000),
            'image' => fake()->imageUrl(300, 200),
            'featured' => fake()->boolean(30),
            'category_id' => null,
        ];
    }
}
