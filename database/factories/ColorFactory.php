<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ColorFactory extends Factory
{
    public function definition(): array
    {
        $colors = [
            ['name' => 'أبيض', 'hex' => '#FFFFFF'],
            ['name' => 'أسود', 'hex' => '#000000'],
            ['name' => 'رمادي', 'hex' => '#808080'],
            ['name' => 'أزرق', 'hex' => '#0000FF'],
            ['name' => 'أحمر', 'hex' => '#FF0000'],
            ['name' => 'أخضر', 'hex' => '#008000'],
            ['name' => 'بني', 'hex' => '#A52A2A'],
            ['name' => 'ذهبي', 'hex' => '#FFD700'],
        ];

        $color = $this->faker->randomElement($colors);

        return [
            'name' => $color['name'],
            'name_en' => $this->faker->colorName(),
            'hex_code' => $color['hex'],
            'image' => 'colors/' . strtolower($color['name']) . '.jpg',
            'is_active' => true,
            'sort_order' => $this->faker->numberBetween(1, 100)
        ];
    }
}
