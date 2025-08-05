<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'slug' => fn($attributes) => str_replace(' ', '-', strtolower($attributes['name'])),
            'image' => fake()->imageUrl(300, 200),
        ];
    }
}
