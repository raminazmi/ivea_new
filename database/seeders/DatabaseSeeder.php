<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            SimpleCategoriesProductsSeeder::class,
            CategoryCustomizationSeeder::class,
            AdminUserSeeder::class,
            ArticleSeeder::class,
            ToolSeeder::class,
            JobSeeder::class,
            ProjectSeeder::class,
            PreparingForSummerSeeder::class,
        ]);
    }
}