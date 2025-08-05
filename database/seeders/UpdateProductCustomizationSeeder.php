<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductCustomizationSeeder extends Seeder
{
    public function run(): void
    {
        $customizationData = [
            'measurement_units' => [
                ['value' => 'mm', 'label' => 'مم'],
                ['value' => 'cm', 'label' => 'سم'],
                ['value' => 'inch', 'label' => 'انش']
            ],
            'opening_methods' => [
                ['value' => 'single', 'label' => 'فتحة واحدة'],
                ['value' => 'double', 'label' => 'فتحتين']
            ],
            'track_types' => [
                ['value' => 'electric', 'label' => 'محرك كهربائي'],
                ['value' => 'manual', 'label' => 'بدون محرك كهربائي']
            ],
            'lining_options' => [
                ['value' => 'with', 'label' => 'مع بطانة'],
                ['value' => 'without', 'label' => 'بدون بطانة']
            ],
            'min_width' => 20.000,
            'max_width' => 300.000,
            'min_height' => 20.000,
            'max_height' => 300.000,
            'fabric_reduction' => 4.00,
            'coverage_increase' => 5.00
        ];

        Product::query()->update($customizationData);

        $this->command->info('Product customization data updated successfully!');
    }
}
