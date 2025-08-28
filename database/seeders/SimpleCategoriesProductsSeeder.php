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
                'featured' => true,
                'stock' => 15,
                'brand' => 'إيفيا هوم',
                'collection' => 'الكلاسيكية الفاخرة',
                'colors' => ['#1E40AF', '#FFFFFF', '#D1D5DB', '#F59E0B'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[0]->id,
                'image' => '/images/curtain1.png',
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
                'featured' => false,
                'stock' => 20,
                'brand' => 'إيفيا هوم',
                'collection' => 'الأمريكية الأصيلة',
                'colors' => ['#8B4513', '#F5DEB3', '#FFFFFF', '#D2691E'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[1]->id,
                'image' => '/images/curtain.png',
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
                'featured' => true,
                'stock' => 5,
                'brand' => 'إيفيا مودرن',
                'collection' => 'العصرية الفاخرة',
                'colors' => ['#2D2D2D', '#FFFFFF', '#C0C0C0', '#708090'],
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[4]->id,
                'image' => '/images/sofa2.png',
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
                'featured' => true,
                'stock' => 8,
                'brand' => 'إيفيا كلاسيك',
                'collection' => 'التقليدية الفاخرة',
                'colors' => ['#8B4513', '#D2B48C', '#F5DEB3', '#000000'],
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[5]->id,
                'image' => '/images/sofa.png',
                'images' => [
                    '/images/sofa.png',
                    '/images/sofa2.png'
                ]
            ],

            [
                'name' => 'فاصل ديكوري خشبي كلاسيكي',
                'description' => 'فاصل ديكوري خشبي كلاسيكي أنيق، مثالي لتقسيم المساحات وإضافة لمسة جمالية',
                'price' => 800.00,
                'discount' => 15,
                'sku' => 'WOOD-PART-CLAS-001',
                'featured' => true,
                'stock' => 8,
                'brand' => 'إيفيا وود',
                'collection' => 'الفواصل الديكورية',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id, // فئة الخشبيات الرئيسية
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building1.png',
                    '/images/building2.png'
                ]
            ],
            [
                'name' => 'رف جداري خشبي عصري',
                'description' => 'رف جداري خشبي عصري مع تصميم بسيط وأنيق، مثالي لعرض الكتب والمقتنيات',
                'price' => 350.00,
                'discount' => 10,
                'sku' => 'WOOD-SHELF-MOD-001',
                'featured' => true,
                'stock' => 15,
                'brand' => 'إيفيا وود',
                'collection' => 'الأرفف الجدارية',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id, // فئة الخشبيات الرئيسية
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building1.png'
                ]
            ],
            [
                'name' => 'طاولة طعام خشبية فاخرة',
                'description' => 'طاولة طعام خشبية فاخرة مع 6 كراسي مريحة، مصنوعة من خشب البلوط الطبيعي',
                'price' => 1200.00,
                'discount' => 20,
                'sku' => 'WOOD-TABLE-LUX-001',
                'featured' => true,
                'stock' => 5,
                'brand' => 'إيفيا وود',
                'collection' => 'طاولات وكراسي',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id, // فئة الخشبيات الرئيسية
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building2.png'
                ]
            ],
            [
                'name' => 'كسوة جدران خشبية طبيعية',
                'description' => 'كسوة جدران خشبية طبيعية مع نسيج خشبي جميل، مثالية لتغطية الجدران',
                'price' => 450.00,
                'discount' => 12,
                'sku' => 'WOOD-PANEL-NAT-001',
                'featured' => false,
                'stock' => 20,
                'brand' => 'إيفيا وود',
                'collection' => 'كسوة الجدران',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id, // فئة الخشبيات الرئيسية
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building1.png'
                ]
            ],
            [
                'name' => 'سرير خشبي كلاسيكي',
                'description' => 'سرير خشبي كلاسيكي أنيق مع تفاصيل منحوتة يدوياً، مصنوع من خشب الجوز',
                'price' => 1500.00,
                'discount' => 15,
                'sku' => 'WOOD-BED-CLAS-001',
                'featured' => true,
                'stock' => 6,
                'brand' => 'إيفيا وود',
                'collection' => 'أثاث غرف النوم',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id, // فئة الخشبيات الرئيسية
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building2.png'
                ]
            ],
            [
                'name' => 'تسريحة خشبية عصرية',
                'description' => 'تسريحة خشبية عصرية مع مرآة كبيرة وأدراج متعددة، مثالية لغرف النوم',
                'price' => 900.00,
                'discount' => 18,
                'sku' => 'WOOD-DRESS-MOD-001',
                'featured' => true,
                'stock' => 10,
                'brand' => 'إيفيا وود',
                'collection' => 'التسريحات',
                'colors' => ['#D2B48C', '#8B4513', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[2]->id, // فئة الخشبيات الرئيسية
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building1.png'
                ]
            ],
            [
                'name' => 'خزانة ملابس عصرية',
                'description' => 'خزانة ملابس عصرية مع مرآة ووحدات تخزين متعددة',
                'price' => 750.00,
                'discount' => 15,
                'sku' => 'WARD-CAB-MOD-001',
                'featured' => true,
                'stock' => 6,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'خزائن الملابس العصرية',
                'colors' => ['#FFFFFF', '#F5F5DC', '#D3D3D3', '#696969'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[7]->id,
                'image' => '/images/treasury.png',
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
                'featured' => false,
                'stock' => 12,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'التخزين الذكي',
                'colors' => ['#F5F5DC', '#FFFFFF', '#D3D3D3', '#696969'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[8]->id,
                'image' => '/images/treasury.png',
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
                'featured' => true,
                'stock' => 18,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'تنظيم الأحذية',
                'colors' => ['#8B4513', '#FFFFFF', '#D2B48C', '#696969'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[9]->id,
                'image' => '/images/treasury.png',
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
                'featured' => true,
                'stock' => 8,
                'brand' => 'إيفيا ديسبلاي',
                'collection' => 'عرض المقتنيات',
                'colors' => ['#8B4513', '#F5F5DC', '#FFFFFF', '#D2B48C'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[10]->id,
                'image' => '/images/treasury.png',
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
                'featured' => true,
                'stock' => 15,
                'brand' => 'إيفيا كيدز',
                'collection' => 'أثاث الأطفال',
                'colors' => ['#FF69B4', '#87CEEB', '#98FB98', '#FFD700'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[11]->id,
                'image' => '/images/treasury.png',
                'images' => [
                    '/images/treasury.png',
                    '/images/building3.png'
                ]
            ]
        ];

        foreach ($products as $productData) {
            $productData['features'] = $this->getRandomFeatures();

            // إضافة خيارات المنتج الافتراضية للمنتجات الخشبية
            if ($productData['tab'] === 'wooden') {
                $productData['product_options'] = [
                    'quantity' => [
                        'type' => 'number',
                        'label' => 'الكمية',
                        'min' => 1,
                        'max' => 100,
                        'default' => 1
                    ],
                    'decorative_partition' => [
                        'type' => 'checkbox',
                        'label' => 'فاصل ديكوري',
                        'default' => false
                    ],
                    'wall_shelf' => [
                        'type' => 'checkbox',
                        'label' => 'رف جداري',
                        'default' => false
                    ],
                    'tables_chairs' => [
                        'type' => 'checkbox',
                        'label' => 'طاوالت وكراسي خشبية',
                        'default' => false
                    ],
                    'wall_paneling' => [
                        'type' => 'checkbox',
                        'label' => 'ألواح وكسوة جدران',
                        'default' => false
                    ],
                    'bedroom_furniture' => [
                        'type' => 'checkbox',
                        'label' => 'أسرة غرف نوم',
                        'default' => false
                    ],
                    'dressers' => [
                        'type' => 'checkbox',
                        'label' => 'تسريحات',
                        'default' => false
                    ]
                ];
            }

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
