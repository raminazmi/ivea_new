<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class SimpleCategoriesProductsSeeder extends Seeder
{
    public function run(): void
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Product::truncate();
        Category::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $mainCategories = [
            [
                'name' => 'ستائر',
                'slug' => 'curtains',
                'description' => 'جميع أنواع الستائر وأقمشة النوافذ',
                'image' => '/images/curtain.png',
                'status' => 'active',
                'sort_order' => 1,
                'color' => '#F5F5F5',
                'subcategories' => [
                    ['name' => 'ستائر الويفي', 'slug' => 'wave-curtains', 'description' => 'ستائر الويفي العصرية'],
                    ['name' => 'ستائر الإمريكي', 'slug' => 'american-curtains', 'description' => 'ستائر النمط الأمريكي'],
                    ['name' => 'ستائر الرول', 'slug' => 'roller-curtains', 'description' => 'ستائر الرول العملية'],
                    ['name' => 'ستائر الروماني', 'slug' => 'roman-curtains', 'description' => 'ستائر النمط الروماني الأنيق'],
                ]
            ],
            [
                'name' => 'كنب',
                'slug' => 'sofas',
                'description' => 'الكنب والأرائك المريحة',
                'image' => '/images/sofa.png',
                'status' => 'active',
                'sort_order' => 2,
                'color' => '#F0F8FF',
                'subcategories' => [
                    ['name' => 'المودرن', 'slug' => 'modern-sofa', 'description' => 'الكنب المودرن العصري'],
                    ['name' => 'الكلاسيك', 'slug' => 'classic-sofa', 'description' => 'الكنب الكلاسيكي التقليدي'],
                    ['name' => 'نيو كلاسيك', 'slug' => 'neo-classic-sofa', 'description' => 'الكنب النيو كلاسيك المتطور'],
                ]
            ],
            [
                'name' => 'خشبيات',
                'slug' => 'wooden',
                'description' => 'منتجات خشبية متنوعة وديكورات',
                'image' => '/images/door.png',
                'status' => 'active',
                'sort_order' => 3,
                'color' => '#FFF8DC',
                'subcategories' => []
            ],
            [
                'name' => 'خزائن',
                'slug' => 'cabinets',
                'description' => 'خزائن ووحدات التخزين',
                'image' => '/images/treasury.png',
                'status' => 'active',
                'sort_order' => 4,
                'color' => '#F0FFF0',
                'subcategories' => [
                    ['name' => 'خزائن ملابس', 'slug' => 'wardrobe-cabinets', 'description' => 'خزائن الملابس والأزياء'],
                    ['name' => 'خزائن تخزين عامة', 'slug' => 'general-storage-cabinets', 'description' => 'خزائن التخزين العامة متعددة الاستخدام'],
                    ['name' => 'خزائن أحذية', 'slug' => 'shoe-cabinets', 'description' => 'خزائن تنظيم وحفظ الأحذية'],
                    ['name' => 'خزائن كتب أو عرض', 'slug' => 'book-display-cabinets', 'description' => 'خزائن الكتب وعرض المقتنيات'],
                    ['name' => 'خزائن أطفال', 'slug' => 'children-cabinets', 'description' => 'خزائن مخصصة لغرف الأطفال'],
                ]
            ]
        ];

        $createdCategories = [];
        $createdSubcategories = [];

        foreach ($mainCategories as $index => $categoryData) {
            $mainCategory = Category::create([
                'name' => $categoryData['name'],
                'slug' => $categoryData['slug'],
                'description' => $categoryData['description'],
                'image' => $categoryData['image'],
                'status' => $categoryData['status'],
                'sort_order' => $categoryData['sort_order'],
                'color' => $categoryData['color'],
                'parent_id' => null,
            ]);

            $createdCategories[] = $mainCategory;

            foreach ($categoryData['subcategories'] as $subIndex => $subCategoryData) {
                $subcategory = Category::create([
                    'name' => $subCategoryData['name'],
                    'slug' => $subCategoryData['slug'],
                    'description' => $subCategoryData['description'],
                    'parent_id' => $mainCategory->id,
                    'sort_order' => $subIndex + 1,
                    'status' => 'active',
                    'image' => null,
                    'color' => null,
                ]);

                $createdSubcategories[] = $subcategory;
            }
        }

        $products = [
            [
                'name' => 'ستارة ويفي فاخرة زرقاء',
                'description' => 'ستارة ويفي فاخرة باللون الأزرق الداكن، مصنوعة من أجود أنواع الأقمشة',
                'price' => 250.00,
                'discount' => 20,
                'sku' => 'WAVE-CUR-BLUE-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 15,
                'weight' => 2.5,
                'brand' => 'إيفيا هوم',
                'collection' => 'الكلاسيكية الفاخرة',
                'colors' => ['#1E40AF', '#FFFFFF', '#D1D5DB', '#F59E0B'],
                'rating' => 5,
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[0]->id,
                'images' => [
                    '/images/curtain1.png',
                    '/images/curtain.png'
                ]
            ],

            [
                'name' => 'ستارة أمريكية كلاسيكية',
                'description' => 'ستارة أمريكية كلاسيكية أنيقة مع تفاصيل منسوجة يدوياً',
                'price' => 180.00,
                'discount' => 15,
                'sku' => 'AMER-CUR-CLAS-001',
                'status' => 'active',
                'featured' => false,
                'stock' => 20,
                'weight' => 2.0,
                'brand' => 'إيفيا هوم',
                'collection' => 'الأمريكية الأصيلة',
                'colors' => ['#8B4513', '#F5DEB3', '#FFFFFF', '#D2691E'],
                'rating' => 4,
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[1]->id,
                'images' => [
                    '/images/curtain.png',
                    '/images/curtain1.png'
                ]
            ],

            [
                'name' => 'كنبة مودرن فاخرة',
                'description' => 'كنبة مودرن فاخرة مريحة بتصميم عصري، مصنوعة من الجلد الطبيعي',
                'price' => 1200.00,
                'discount' => 15,
                'sku' => 'MOD-SOF-LUX-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 5,
                'weight' => 45.0,
                'brand' => 'إيفيا مودرن',
                'collection' => 'العصرية الفاخرة',
                'colors' => ['#2D2D2D', '#FFFFFF', '#C0C0C0', '#708090'],
                'rating' => 5,
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[4]->id,
                'images' => [
                    '/images/sofa3.png',
                    '/images/sofa2.png'
                ]
            ],

            [
                'name' => 'كنبة كلاسيكية بنية',
                'description' => 'كنبة كلاسيكية أنيقة باللون البني مع تفاصيل منحوتة تقليدية',
                'price' => 950.00,
                'discount' => 10,
                'sku' => 'CLAS-SOF-BROWN-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 8,
                'weight' => 40.0,
                'brand' => 'إيفيا كلاسيك',
                'collection' => 'التقليدية الفاخرة',
                'colors' => ['#8B4513', '#D2B48C', '#F5DEB3', '#000000'],
                'rating' => 4,
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[5]->id,
                'images' => [
                    '/images/sofa.png',
                    '/images/sofa2.png'
                ]
            ],

            [
                'name' => 'منتجات خشبية مخصصة',
                'description' => 'منتجات خشبية متنوعة قابلة للتخصيص - فواصل ديكورية، أرفف جدارية، طاولات وكراسي، ألواح كسوة، أسرة غرف نوم، تسريحات',
                'price' => 500.00,
                'discount' => 15,
                'sku' => 'WOOD-CUSTOM-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 25,
                'weight' => 15.0,
                'brand' => 'إيفيا وود',
                'collection' => 'المنتجات الخشبية المخصصة',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'rating' => 5,
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id,
                'customization_options' => [
                    'product_types' => [
                        ['value' => 'فاصل ديكوري', 'price_modifier' => 0],
                        ['value' => 'رف جداري', 'price_modifier' => -100],
                        ['value' => 'طاولات وكراسي خشبية', 'price_modifier' => 200],
                        ['value' => 'ألواح وكسوة جدران', 'price_modifier' => 150],
                        ['value' => 'أسرة غرف نوم', 'price_modifier' => 800],
                        ['value' => 'تسريحات', 'price_modifier' => 400]
                    ],
                    'wood_types' => [
                        ['value' => 'خشب البلوط', 'price_modifier' => 0],
                        ['value' => 'خشب الصنوبر', 'price_modifier' => -50],
                        ['value' => 'خشب الجوز', 'price_modifier' => 100],
                        ['value' => 'خشب الماهوجني', 'price_modifier' => 200]
                    ],
                    'finishes' => [
                        ['value' => 'طبيعي', 'price_modifier' => 0],
                        ['value' => 'مصقول', 'price_modifier' => 50],
                        ['value' => 'مطلي', 'price_modifier' => 75],
                        ['value' => 'منحوت يدوياً', 'price_modifier' => 150]
                    ]
                ],
                'images' => [
                    '/images/door.png',
                    '/images/building1.png',
                    '/images/building2.png'
                ]
            ],
            [
                'name' => 'خزانة ملابس عصرية',
                'description' => 'خزانة ملابس عصرية مع مرآة ووحدات تخزين متعددة',
                'price' => 750.00,
                'discount' => 15,
                'sku' => 'WARD-CAB-MOD-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 6,
                'weight' => 35.0,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'خزائن الملابس العصرية',
                'colors' => ['#FFFFFF', '#F5F5DC', '#D3D3D3', '#696969'],
                'rating' => 4,
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[7]->id,
                'images' => [
                    '/images/treasury.png',
                    '/images/building3.png'
                ]
            ],
            [
                'name' => 'خزانة تخزين عامة عملية',
                'description' => 'خزانة تخزين عامة عملية مع أرفف متحركة وأدراج، مثالية لتنظيم المساحات',
                'price' => 600.00,
                'discount' => 8,
                'sku' => 'GEN-STOR-CAB-001',
                'status' => 'active',
                'featured' => false,
                'stock' => 12,
                'weight' => 30.0,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'التخزين الذكي',
                'colors' => ['#F5F5DC', '#FFFFFF', '#D3D3D3', '#696969'],
                'rating' => 4,
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[8]->id,
                'images' => [
                    '/images/treasury.png',
                    '/images/building4.png'
                ]
            ],
            [
                'name' => 'خزانة أحذية أنيقة',
                'description' => 'خزانة أحذية أنيقة مع أرفف قابلة للتعديل ومساحة لتخزين جميع أنواع الأحذية',
                'price' => 320.00,
                'discount' => 10,
                'sku' => 'SHOE-CAB-ELE-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 18,
                'weight' => 20.0,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'تنظيم الأحذية',
                'colors' => ['#8B4513', '#FFFFFF', '#D2B48C', '#696969'],
                'rating' => 4,
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[9]->id,
                'images' => [
                    '/images/treasury.png',
                    '/images/building1.png'
                ]
            ],
            [
                'name' => 'خزانة كتب وعرض فاخرة',
                'description' => 'خزانة كتب وعرض فاخرة مع أرفف زجاجية وإضاءة داخلية لعرض الكتب والمقتنيات',
                'price' => 850.00,
                'discount' => 12,
                'sku' => 'BOOK-DISP-LUX-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 8,
                'weight' => 45.0,
                'brand' => 'إيفيا ديسبلاي',
                'collection' => 'عرض المقتنيات',
                'colors' => ['#8B4513', '#F5F5DC', '#FFFFFF', '#D2B48C'],
                'rating' => 5,
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[10]->id,
                'images' => [
                    '/images/treasury.png',
                    '/images/building2.png'
                ]
            ],
            [
                'name' => 'خزانة أطفال ملونة',
                'description' => 'خزانة أطفال ملونة وآمنة مع تصميم مرح وألوان زاهية، مثالية لغرف الأطفال',
                'price' => 450.00,
                'discount' => 15,
                'sku' => 'CHILD-CAB-COL-001',
                'status' => 'active',
                'featured' => true,
                'stock' => 15,
                'weight' => 25.0,
                'brand' => 'إيفيا كيدز',
                'collection' => 'أثاث الأطفال',
                'colors' => ['#FF69B4', '#87CEEB', '#98FB98', '#FFD700'],
                'rating' => 5,
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[11]->id,
                'images' => [
                    '/images/treasury.png',
                    '/images/building3.png'
                ]
            ]
        ];

        foreach ($products as $productData) {
            $productData['features'] = $this->getRandomFeatures();
            Product::create($productData);
        }
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
            'ألوان ثابتة لا تبهت',
            'مقاومة للتمزق',
            'عازلة للصوت',
            'مقاومة للعفن',
            'سهلة الطي والتخزين',
            'تصميم قابل للتخصيص',
            'مواد صديقة للبيئة',
            'ضمان الجودة',
            'خدمة ما بعد البيع'
        ];

        $selectedFeatures = [];
        $numFeatures = rand(4, 8);
        $shuffledFeatures = shuffle($features);

        for ($i = 0; $i < $numFeatures; $i++) {
            $selectedFeatures[] = $features[$i];
        }

        return $selectedFeatures;
    }
}
