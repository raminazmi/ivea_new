<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductFilterSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            $colors = $this->getRandomColors();
            $openingMethods = $this->getRandomOpeningMethods();
            $trackTypes = $this->getRandomTrackTypes();
            $liningOptions = $this->getRandomLiningOptions();
            $customizationOptions = $this->getRandomCustomizationOptions();
            $measurementUnits = $this->getRandomMeasurementUnits();
            $dimensions = $this->getRandomDimensions();
            $specifications = $this->getRandomSpecifications();
            $features = $this->getRandomFeatures();
            $product->update([
                'colors' => $colors,
                'opening_methods' => $openingMethods,
                'track_types' => $trackTypes,
                'lining_options' => $liningOptions,
                'customization_options' => $customizationOptions,
                'measurement_units' => $measurementUnits,
                'dimensions' => $dimensions,
                'specifications' => $specifications,
                'features' => $features,
                'min_width' => rand(30, 100),
                'max_width' => rand(150, 300),
                'min_height' => rand(30, 100),
                'max_height' => rand(150, 300),
                'fabric_reduction' => rand(2, 8),
                'coverage_increase' => rand(3, 10),
                'brand' => $this->getRandomBrand(),
                'collection' => $this->getRandomCollection(),
            ]);
        }
    }

    private function getRandomColors(): array
    {
        $allColors = [
            '#FFFFFF',
            '#000000',
            '#808080',
            '#0000FF',
            '#FF0000',
            '#008000',
            '#FFFF00',
            '#A52A2A',
            '#FFA500',
            '#FFC0CB',
            '#800080',
            '#00FFFF',
            '#FFD700',
            '#32CD32',
            '#FF69B4'
        ];

        $selectedColors = [];
        $numColors = rand(1, 4);
        $shuffledColors = shuffle($allColors);

        for ($i = 0; $i < $numColors; $i++) {
            $selectedColors[] = $allColors[$i];
        }

        return $selectedColors;
    }

    private function getRandomOpeningMethods(): array
    {
        $methods = [
            ['value' => 'manual', 'label' => 'يدوي'],
            ['value' => 'electric', 'label' => 'كهربائي'],
            ['value' => 'automatic', 'label' => 'أوتوماتيكي']
        ];

        $selectedMethods = [];
        $numMethods = rand(1, 2);
        $shuffledMethods = shuffle($methods);

        for ($i = 0; $i < $numMethods; $i++) {
            $selectedMethods[] = $methods[$i];
        }

        return $selectedMethods;
    }

    private function getRandomTrackTypes(): array
    {
        $types = [
            ['value' => 'metal', 'label' => 'معدني'],
            ['value' => 'plastic', 'label' => 'بلاستيك'],
            ['value' => 'wooden', 'label' => 'خشبي'],
            ['value' => 'aluminum', 'label' => 'ألمنيوم']
        ];

        $selectedTypes = [];
        $numTypes = rand(1, 2);
        $shuffledTypes = shuffle($types);

        for ($i = 0; $i < $numTypes; $i++) {
            $selectedTypes[] = $types[$i];
        }

        return $selectedTypes;
    }

    private function getRandomLiningOptions(): array
    {
        $options = [
            ['value' => 'without', 'label' => 'بدون بطانة'],
            ['value' => 'with', 'label' => 'مع بطانة'],
            ['value' => 'blackout', 'label' => 'بطانة معتمة']
        ];

        $selectedOptions = [];
        $numOptions = rand(1, 2);
        $shuffledOptions = shuffle($options);

        for ($i = 0; $i < $numOptions; $i++) {
            $selectedOptions[] = $options[$i];
        }

        return $selectedOptions;
    }

    private function getRandomCustomizationOptions(): array
    {
        $options = [
            'custom_width' => true,
            'custom_height' => true,
            'custom_pattern' => rand(0, 1) == 1,
            'custom_fabric' => rand(0, 1) == 1,
            'custom_trim' => rand(0, 1) == 1
        ];

        return $options;
    }

    private function getRandomMeasurementUnits(): array
    {
        $units = [
            ['value' => 'mm', 'label' => 'مم'],
            ['value' => 'cm', 'label' => 'سم'],
            ['value' => 'inch', 'label' => 'انش']
        ];

        return $units;
    }

    private function getRandomDimensions(): array
    {
        return [
            'width' => rand(50, 200) . ' سم',
            'height' => rand(50, 200) . ' سم',
            'depth' => rand(5, 15) . ' سم'
        ];
    }

    private function getRandomFeatures(): array
    {
        $features = [
            'تمنع ما يقارب 90 - 96% من الأشعة فوق البنفسجية الضارة',
            'شديدة التحمل و سهلة التنظيف',
            'يمكن تثبيتها بوضعيات متنوعة',
            'مقاومة للحريق',
            'عازلة للحرارة',
            'مقاومة للرطوبة',
            'مقاومة للبقع',
            'سهلة التركيب',
            'تصميم عصري وأنيق',
            'جودة عالية ومتانة',
            'تنظيف سهل',
            'ألوان ثابتة لا تبهت'
        ];

        $selectedFeatures = [];
        $numFeatures = rand(3, 6);
        $shuffledFeatures = shuffle($features);

        for ($i = 0; $i < $numFeatures; $i++) {
            $selectedFeatures[] = $features[$i];
        }

        return $selectedFeatures;
    }

    private function getRandomSpecifications(): array
    {
        $features = [
            'تمنع ما يقارب 90 - 96% من الأشعة فوق البنفسجية الضارة',
            'شديدة التحمل و سهلة التنظيف',
            'يمكن تثبيتها بوضعيات متنوعة',
            'مقاومة للحريق',
            'عازلة للحرارة',
            'مقاومة للرطوبة'
        ];

        $selectedFeatures = [];
        $numFeatures = rand(2, 4);
        $shuffledFeatures = shuffle($features);

        for ($i = 0; $i < $numFeatures; $i++) {
            $selectedFeatures[] = $features[$i];
        }

        return [
            'features' => $selectedFeatures,
            'material' => $this->getRandomMaterial(),
            'installation' => $this->getRandomInstallation(),
            'care_instructions' => $this->getRandomCareInstructions()
        ];
    }

    private function getRandomMaterial(): string
    {
        $materials = [
            'قماش بوليستر عالي الجودة',
            'قماش قطن طبيعي',
            'قماش حرير صناعي',
            'قماش كتان طبيعي',
            'قماش مخلوط'
        ];

        return $materials[array_rand($materials)];
    }

    private function getRandomInstallation(): string
    {
        $installations = [
            'سهلة التركيب - تتطلب أدوات أساسية فقط',
            'تركيب احترافي مطلوب',
            'تركيب ذاتي مع دليل مفصل',
            'تركيب سريع بدون حفر'
        ];

        return $installations[array_rand($installations)];
    }

    private function getRandomCareInstructions(): string
    {
        $instructions = [
            'غسيل يدوي بالماء البارد',
            'غسيل آلي على درجة حرارة منخفضة',
            'تنظيف جاف فقط',
            'تنظيف بالمكنسة الكهربائية'
        ];

        return $instructions[array_rand($instructions)];
    }

    private function getRandomBrand(): string
    {
        $brands = [
            'إيفيا',
            'ستار لايت',
            'كورتينا',
            'ويندو ديكور',
            'هوم ستايل',
            'إليجانت',
            'مودرن',
            'كلاسيك'
        ];

        return $brands[array_rand($brands)];
    }

    private function getRandomCollection(): string
    {
        $collections = [
            'مجموعة الربيع',
            'مجموعة الصيف',
            'مجموعة الخريف',
            'مجموعة الشتاء',
            'المجموعة الكلاسيكية',
            'المجموعة العصرية',
            'المجموعة الفاخرة',
            'المجموعة الاقتصادية'
        ];

        return $collections[array_rand($collections)];
    }
}
