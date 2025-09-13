<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class SimpleCategoriesProductsSeeder extends Seeder
{
    public function run(): void
    {
        // For SQLite, we don't need to disable foreign key checks
        // Just truncate the tables
        Product::truncate();
        Category::truncate();

        $mainCategories = [
            [
                'name' => 'الستائر',
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
                'name' => 'الكنب',
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
                'name' => 'الخزائن',
                'slug' => 'cabinets',
                'description' => 'خزائن ووحدات التخزين',
                'image' => '/images/treasury_new.png',
                'status' => 'active',
                'sort_order' => 3,
                'color' => '#F0FFF0',
                'subcategories' => [
                    ['name' => 'خزائن ملابس', 'slug' => 'wardrobe-cabinets', 'description' => 'خزائن الملابس والأزياء'],
                    ['name' => 'خزائن أحذية', 'slug' => 'shoe-cabinets', 'description' => 'خزائن تنظيم وحفظ الأحذية'],
                    ['name' => 'خزائن كتب أو عرض', 'slug' => 'book-display-cabinets', 'description' => 'خزائن الكتب وعرض المقتنيات'],
                    ['name' => 'خزائن أطفال', 'slug' => 'children-cabinets', 'description' => 'خزائن مخصصة لغرف الأطفال'],
                ]
            ],
            [
                'name' => 'الخشبيات',
                'slug' => 'wooden',
                'description' => 'منتجات خشبية متنوعة وديكورات',
                'image' => '/images/door.png',
                'status' => 'active',
                'sort_order' => 4,
                'color' => '#FFF8DC',
                'subcategories' => []
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
            // ========== ستائر الويفي ==========
            [
                'name' => 'ستارة فاخرة ويفي لينين شيفون – خط واحد',
                'description' => 'تضيف لمسة أنيقة وعصرية لمساحتك، بخامة ناعمة تسمح بمرور الضوء بشكل مريح مع الحفاظ على الخصوصية.',
                'price' => 280.00,
                'discount' => 15,
                'sku' => 'WAVE-LINEN-SHEER-001',
                'featured' => true,
                'stock' => 20,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الويفي',
                'colors' => ['#FFFFFF', '#F5F5DC', '#FAF0E6', '#FDF5E6'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[0]->id,
                'image' => '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-1.jpg',
                'images' => [
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-1.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-2.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-3.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-4.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-5.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-6.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-7.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-8.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-9.jpg'
                ],
                'features' => [
                    'قماش لينين شيفون فاخر وناعم',
                    'تسمح بمرور الضوء الطبيعي',
                    'سهلة الغسيل والتنظيف',
                    'مقاومة للتجاعيد والانكماش',
                    'مثالية لغرف النوم، الصالات والمجالس',
                    'ضمان يصل لمدة 5 سنوات',
                    'متوفرة بعدة ألوان أنيقة تناسب مختلف الديكورات',
                    'خدمة ما بعد البيع'
                ]
            ],
            [
                'name' => 'ستارة فاخرة ويفي قماش بلاك أوت – خط واحد',
                'description' => 'ستارة ويفي بلاك أوت بخط واحد تمنحك أجواء راقية ومريحة، بخامة عالية الجودة تحجب الضوء بشكل كامل وتوفر الخصوصية الكاملة لمساحتك.',
                'price' => 320.00,
                'discount' => 10,
                'sku' => 'WAVE-BLACKOUT-001',
                'featured' => true,
                'stock' => 15,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الويفي',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[0]->id,
                'image' => '/images/products/curtains/wave-blackout/wave-blackout-1.jpg',
                'images' => [
                    '/images/products/curtains/wave-blackout/wave-blackout-1.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-2.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-3.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-4.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-5.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-6.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-7.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-8.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-9.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-10.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-11.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-12.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-13.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-14.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-15.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-16.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-17.jpg'
                ],
                'features' => [
                    'قماش بلاك أوت فاخر وعالي الجودة',
                    'حجب كامل للضوء مع عزل حراري مميز',
                    'سهلة الغسيل والتنظيف',
                    'مقاومة للتجاعيد والانكماش',
                    'مثالية لغرف النوم، الصالات والمجالس',
                    'ضمان يصل لمدة 5 سنوات',
                    'متوفرة بعدة ألوان أنيقة تناسب مختلف الديكورات',
                    'خدمة ما بعد البيع'
                ]
            ],
            [
                'name' => 'ستارة فاخرة ويفي لينين شيفون + قماش بلاك أوت – خطين',
                'description' => 'ستارة ويفي بخطين (لينين شيفون + بلاك أوت) تمنحك مزيجاً مثالياً من الأناقة والعملية؛ حيث تضيف الشفافية الناعمة للشيفون إطلالة راقية نهاراً، بينما يوفر البلاك أوت عزل كامل للضوء والحرارة عند الحاجة.',
                'price' => 450.00,
                'discount' => 20,
                'sku' => 'WAVE-DUAL-LAYER-001',
                'featured' => true,
                'stock' => 12,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الويفي',
                'colors' => ['#FFFFFF', '#F5F5DC', '#2F4F4F', '#8B4513'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[0]->id,
                'image' => '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-3.jpg',
                'images' => [
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-3.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-3.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-1.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-2.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-1.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-2.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-4.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-5.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-6.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-7.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-8.jpg',
                    '/images/products/curtains/wave-linen-sheer/wave-linen-sheer-9.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-4.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-5.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-6.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-7.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-8.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-9.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-10.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-11.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-12.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-13.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-14.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-15.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-16.jpg',
                    '/images/products/curtains/wave-blackout/wave-blackout-17.jpg'
                ],
                'features' => [
                    'طبقتان فاخرتان: شيفون لينين للنهار + قماش بلاك أوت للخصوصية التامة',
                    'تحكم مرن في الإضاءة بين الشفافية والحجب الكامل',
                    'سهلة الغسيل والتنظيف',
                    'مقاومة للتجاعيد والانكماش',
                    'مثالية لغرف النوم، الصالات والمجالس',
                    'ضمان يصل لمدة 5 سنوات',
                    'متوفرة بعدة ألوان أنيقة تناسب مختلف الديكورات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== ستائر الأمريكي ==========
            [
                'name' => 'ستارة فاخرة أمريكي لينين شيفون – خط واحد',
                'description' => 'ستارة أمريكي بخامة لينين شيفون أنيقة تضيف انسيابية وهدوء للمكان، بستايل كلاسيكي يضفي لمسة راقية مع نفاذ ضوء طبيعي يبعث على الراحة والصفاء.',
                'price' => 260.00,
                'discount' => 12,
                'sku' => 'AMER-LINEN-SHEER-001',
                'featured' => true,
                'stock' => 18,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الأمريكي',
                'colors' => ['#FFFFFF', '#F5F5DC', '#FAF0E6', '#FDF5E6'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[1]->id,
                'image' => '/images/products/curtains/american-linen-sheer/american-linen-sheer-1.jpg',
                'images' => [
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-1.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-2.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-3.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-4.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-5.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-6.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-7.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-8.jpg'
                ],
                'features' => [
                    'تصميم أمريكي بخط مستقيم يضفي مظهراً عملياً ومرتباً',
                    'قماش لينين شيفون فاخر يمنح شفافية راقية',
                    'يسمح بدخول الضوء الطبيعي مع الحفاظ على الخصوصية',
                    'سهل الغسيل والصيانة اليومية',
                    'مقاوم للتجاعيد والانكماش',
                    'مناسب للصالات، المجالس وغرف النوم',
                    'ضمان حتى 5 سنوات',
                    'خيارات ألوان متعددة تتماشى مع أنماط الديكور المختلفة',
                    'خدمة ما بعد البيع'
                ]
            ],
            [
                'name' => 'ستارة فاخرة أمريكي قماش بلاك أوت – خط واحد',
                'description' => 'ستارة أمريكي بخط واحد من قماش البلاك أوت، توفر عزل كامل للضوء وإحساس بالهدوء، مع تصميم أنيق يناسب المساحات التي تحتاج خصوصية وراحة تامة.',
                'price' => 300.00,
                'discount' => 15,
                'sku' => 'AMER-BLACKOUT-001',
                'featured' => true,
                'stock' => 16,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الأمريكي',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[1]->id,
                'image' => '/images/products/curtains/american-blackout/american-blackout-1.jpg',
                'images' => [
                    '/images/products/curtains/american-blackout/american-blackout-1.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-2.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-3.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-4.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-5.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-6.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-7.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-8.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-9.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-10.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-11.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-12.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-13.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-14.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-15.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-16.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-17.jpg'
                ],
                'features' => [
                    'تصميم أمريكي بخط مرتب يمنح مظهراً عصرياً أنيقاً',
                    'قماش بلاك أوت سميك عالي الجودة',
                    'حجب كامل لأشعة الشمس مع عزل حراري مميز',
                    'سهل التنظيف والغسيل',
                    'مقاوم للتجاعيد والانكماش',
                    'مثالي لغرف النوم، مكاتب العمل والسينما المنزلية',
                    'ضمان حتى 5 سنوات',
                    'خيارات ألوان متنوعة تناسب جميع الديكورات',
                    'خدمة ما بعد البيع'
                ]
            ],
            [
                'name' => 'ستارة فاخرة أمريكي لينين شيفون + قماش بلاك أوت – خطين',
                'description' => 'ستارة أمريكي بطبقتين (لينين شيفون + بلاك أوت) تمنحك رفاهية الاختيار بين إطلالة مضيئة وناعمة خلال النهار، وأجواء مظلمة هادئة وقت الحاجة للراحة.',
                'price' => 420.00,
                'discount' => 18,
                'sku' => 'AMER-DUAL-LAYER-001',
                'featured' => true,
                'stock' => 14,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الأمريكي',
                'colors' => ['#FFFFFF', '#F5F5DC', '#2F4F4F', '#8B4513'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[1]->id,
                'image' => '/images/products/curtains/american-linen-sheer/american-linen-sheer-3.jpg',
                'images' => [
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-3.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-3.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-1.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-2.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-1.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-2.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-4.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-5.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-6.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-7.jpg',
                    '/images/products/curtains/american-linen-sheer/american-linen-sheer-8.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-4.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-5.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-6.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-7.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-8.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-9.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-10.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-11.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-12.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-13.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-14.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-15.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-16.jpg',
                    '/images/products/curtains/american-blackout/american-blackout-17.jpg'
                ],
                'features' => [
                    'طبقتان بتصميم أمريكي أنيق: شيفون لينين للنهار + بلاك أوت لحجب الضوء',
                    'مرونة عالية في التحكم بدرجات الإضاءة',
                    'قماش فاخر يجمع بين الجمالية والعملية',
                    'سهل التنظيف والصيانة',
                    'مقاوم للتجاعيد والانكماش',
                    'مناسب للصالات، المجالس وغرف النوم',
                    'ضمان حتى 5 سنوات',
                    'متوفر بألوان عصرية متعددة',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== ستائر الرول ==========
            [
                'name' => 'ستارة رول فاخرة قماش بلاك أوت',
                'description' => 'ستارة رول بخامة البلاك أوت العازلة، تمنحك خصوصية تامة وحجب كامل لأشعة الشمس، مع تصميم عصري بسيط يناسب المساحات الحديثة.',
                'price' => 180.00,
                'discount' => 10,
                'sku' => 'ROLL-BLACKOUT-001',
                'featured' => true,
                'stock' => 25,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الرول',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[2]->id,
                'image' => '/images/products/curtains/roller/roller-blackout/roller-blackout-1.jpg',
                'images' => [
                    '/images/products/curtains/roller/roller-blackout/roller-blackout-1.jpg',
                    '/images/products/curtains/roller/roller-blackout/roller-blackout-2.jpg',
                    '/images/products/curtains/roller/roller-blackout/roller-blackout-3.jpg'
                ],
                'features' => [
                    'قماش بلاك أوت عالي الجودة',
                    'حجب كامل للضوء وعزل حراري مميز',
                    'آلية رفع وخفض سلسة وسهلة الاستخدام',
                    'تصميم عملي يناسب المكاتب والمنازل',
                    'مقاومة للتجاعيد وسهلة التنظيف',
                    'ضمان حتى 5 سنوات',
                    'متوفرة بألوان متعددة تناسب جميع الديكورات',
                    'خدمة ما بعد البيع'
                ]
            ],
            [
                'name' => 'ستارة رول مطبوعة بتصاميم عصرية',
                'description' => 'ستارة رول مطبوعة تضيف لمسة فنية وجمالية إلى مساحتك، حيث تجمع بين الوظيفة العملية والذوق العصري من خلال نقوش ورسومات متنوعة.',
                'price' => 220.00,
                'discount' => 15,
                'sku' => 'ROLL-PRINTED-001',
                'featured' => true,
                'stock' => 20,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الرول',
                'colors' => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[2]->id,
                'image' => '/images/products/curtains/roller/roller-printed/roller-printed-1.jpg',
                'images' => [
                    '/images/products/curtains/roller/roller-printed/roller-printed-1.jpg',
                    '/images/products/curtains/roller/roller-printed/roller-printed-2.jpg',
                    '/images/products/curtains/roller/roller-printed/roller-printed-3.jpg'
                ],
                'features' => [
                    'قماش رول عالي الجودة مع طباعة مميزة',
                    'تسمح بالتحكم في الإضاءة مع لمسة ديكور أنيقة',
                    'آلية سهلة للرفع والخفض',
                    'تصاميم متعددة تناسب غرف الأطفال، المكاتب والصالونات',
                    'مقاومة للتجاعيد وسهلة التنظيف',
                    'ضمان حتى 5 سنوات',
                    'خيارات طباعة عصرية تناسب مختلف الأذواق',
                    'خدمة ما بعد البيع'
                ]
            ],
            [
                'name' => 'ستارة رول صن سكرين – حماية من الشمس مع رؤية واضحة',
                'description' => 'ستارة رول صن سكرين توفر حماية من أشعة الشمس الضارة مع إمكانية الرؤية للخارج، لتمنحك إضاءة طبيعية متوازنة دون التأثير على الراحة.',
                'price' => 160.00,
                'discount' => 8,
                'sku' => 'ROLL-SUNSCREEN-001',
                'featured' => true,
                'stock' => 30,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الرول',
                'colors' => ['#FFFFFF', '#F5F5DC', '#FAF0E6', '#FDF5E6'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[2]->id,
                'image' => '/images/products/curtains/roller/roller-sunscreen/roller-sunscreen-1.jpg',
                'images' => [
                    '/images/products/curtains/roller/roller-sunscreen/roller-sunscreen-1.jpg',
                    '/images/products/curtains/roller/roller-sunscreen/roller-sunscreen-2.jpg',
                    '/images/products/curtains/roller/roller-sunscreen/roller-sunscreen-3.jpg'
                ],
                'features' => [
                    'قماش صن سكرين عالي الجودة',
                    'تقليل وهج الشمس مع السماح بدخول الضوء الطبيعي',
                    'رؤية خارجية واضحة مع الحفاظ على الخصوصية الداخلية',
                    'آلية رفع وخفض عملية وسهلة الاستخدام',
                    'مثالية للمكاتب، الصالات والمطابخ',
                    'مقاومة للتجاعيد وسهلة التنظيف',
                    'ضمان حتى 5 سنوات',
                    'متوفرة بعدة ألوان تناسب الديكورات الحديثة',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== ستائر الروماني ==========
            [
                'name' => 'ستارة فاخرة روماني – تفصيل حسب الطلب',
                'description' => 'ستارة روماني أنيقة بطيات مرتبة تضيف لمسة كلاسيكية وعصرية في آن واحد، تمنحك تحكم عملي بالإضاءة مع مظهر فاخر يناسب مختلف المساحات.',
                'price' => 350.00,
                'discount' => 12,
                'sku' => 'ROMAN-CURTAIN-001',
                'featured' => true,
                'stock' => 18,
                'brand' => 'IVEA VENTURES',
                'collection' => 'ستائر الروماني',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'curtains',
                'category_id' => $createdSubcategories[3]->id,
                'image' => '/images/products/curtains/roman/roman-1.jpg',
                'images' => [
                    '/images/products/curtains/roman/roman-1.jpg',
                    '/images/products/curtains/roman/roman-2.jpg',
                    '/images/products/curtains/roman/roman-3.jpg',
                    '/images/products/curtains/roman/roman-4.jpg'
                ],
                'features' => [
                    'تصميم روماني بطيات أنيقة تضفي لمسة فخمة',
                    'تسمح بمرور الضوء الطبيعي مع الحفاظ على الخصوصية',
                    'آلية رفع وخفض عملية وسهلة الاستخدام',
                    'قماش عالي الجودة، مقاوم للتجاعيد والانكماش',
                    'سهلة التنظيف والصيانة',
                    'مناسبة للصالات، المجالس وغرف النوم',
                    'ضمان يصل حتى 5 سنوات',
                    'متوفرة بعدة ألوان أنيقة تناسب جميع الديكورات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== الكنب المودرن ==========
            [
                'name' => 'كنب مودرن فاخر – تفصيل حسب الطلب',
                'description' => 'كنب المودرن بتصميمه العصري البسيط يمنح مساحتك إطلالة أنيقة وعملية في نفس الوقت. يتميز بخطوط مستقيمة وألوان هادئة تناسب الديكورات الحديثة، مع خامات مريحة تدوم طويلاً.',
                'price' => 1200.00,
                'discount' => 15,
                'sku' => 'MOD-SOFA-001',
                'featured' => true,
                'stock' => 8,
                'brand' => 'إيفيا مودرن',
                'collection' => 'الكنب المودرن',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[4]->id,
                'image' => '/images/products/sofas/modern/modern-sofa-1.jpg',
                'images' => [
                    '/images/products/sofas/modern/modern-sofa-1.jpg',
                    '/images/products/sofas/modern/modern-sofa-2.jpg',
                    '/images/products/sofas/modern/modern-sofa-3.jpg',
                    '/images/products/sofas/modern/modern-sofa-4.jpg',
                    '/images/products/sofas/modern/modern-sofa-5.jpg',
                    '/images/products/sofas/modern/modern-sofa-6.jpg',
                    '/images/products/sofas/modern/modern-sofa-7.jpg',
                    '/images/products/sofas/modern/modern-sofa-8.jpg',
                    '/images/products/sofas/modern/modern-sofa-9.jpg',
                    '/images/products/sofas/modern/modern-sofa-10.jpg',
                    '/images/products/sofas/modern/modern-sofa-11.jpg',
                    '/images/products/sofas/modern/modern-sofa-12.jpg',
                    '/images/products/sofas/modern/modern-sofa-13.jpg',
                    '/images/products/sofas/modern/modern-sofa-14.jpg',
                    '/images/products/sofas/modern/modern-sofa-15.jpg'
                ],
                'features' => [
                    'تصميم عصري بخطوط انسيابية وأشكال بسيطة',
                    'خامات عالية الجودة تمنح راحة يومية مثالية',
                    'هيكل قوي يتحمل الاستخدام المكثف',
                    'تنجيد ناعم عملي وسهل التنظيف',
                    'متنوع الألوان ليناسب الديكورات الحديثة',
                    'مناسب لغرف المعيشة والصالات العصرية',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== الكنب الكلاسيك ==========
            [
                'name' => 'كنب كلاسيك فاخر – تفصيل حسب الطلب',
                'description' => 'كنب الكلاسيك يعكس الفخامة الملكية والتفاصيل الدقيقة في التصميم. يتميز بالزخارف الراقية واللمسات الذهبية أو الخشبية التي تضيف لمسة من العراقة والفخامة لمجالس الضيافة والصالات الرسمية.',
                'price' => 1500.00,
                'discount' => 10,
                'sku' => 'CLASS-SOFA-001',
                'featured' => true,
                'stock' => 6,
                'brand' => 'إيفيا كلاسيك',
                'collection' => 'الكنب الكلاسيك',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[5]->id,
                'image' => '/images/products/sofas/classic/classic-sofa-1.jpg',
                'images' => [
                    '/images/products/sofas/classic/classic-sofa-1.jpg',
                    '/images/products/sofas/classic/classic-sofa-2.jpg',
                    '/images/products/sofas/classic/classic-sofa-3.jpg',
                    '/images/products/sofas/classic/classic-sofa-4.jpg',
                    '/images/products/sofas/classic/classic-sofa-5.jpg',
                    '/images/products/sofas/classic/classic-sofa-6.jpg',
                    '/images/products/sofas/classic/classic-sofa-7.jpg',
                    '/images/products/sofas/classic/classic-sofa-8.jpg'
                ],
                'features' => [
                    'تصميم تقليدي بزخارف فنية فاخرة',
                    'خامات فاخرة وأقمشة راقية للمظهر الملكي',
                    'تنجيد مريح مع تفاصيل دقيقة في التشطيب',
                    'هيكل قوي بعمر افتراضي طويل',
                    'مثالي للمجالس الرسمية والقصور والصالات الفاخرة',
                    'خيارات متعددة من الألوان والأقمشة',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== الكنب نيو كلاسيك ==========
            [
                'name' => 'كنب نيو كلاسيك فاخر – تفصيل حسب الطلب',
                'description' => 'كنب النيو كلاسيك هو التوازن المثالي بين الفخامة الكلاسيكية والبساطة العصرية. يجمع بين الراحة والعملية مع لمسة أنيقة تعكس الذوق الحديث والفخم في آن واحد.',
                'price' => 1350.00,
                'discount' => 12,
                'sku' => 'NEO-CLASS-SOFA-001',
                'featured' => true,
                'stock' => 7,
                'brand' => 'إيفيا نيو كلاسيك',
                'collection' => 'الكنب نيو كلاسيك',
                'colors' => ['#F5F5DC', '#2F4F4F', '#8B4513', '#696969'],
                'tab' => 'sofas',
                'category_id' => $createdSubcategories[6]->id,
                'image' => '/images/products/sofas/neo-classic/neo-classic-sofa-1.jpg',
                'images' => [
                    '/images/products/sofas/neo-classic/neo-classic-sofa-1.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-2.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-3.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-4.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-5.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-6.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-7.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-8.jpg',
                    '/images/products/sofas/neo-classic/neo-classic-sofa-9.jpg'
                ],
                'features' => [
                    'تصميم يجمع بين الكلاسيك والمودرن بلمسة مبتكرة',
                    'مزيج من الأقمشة الفاخرة مع الألوان العصرية',
                    'راحة عالية تناسب الاستخدام اليومي',
                    'تشطيبات أنيقة تضفي لمسة فخمة على المساحة',
                    'مناسب للصالات والمجالس العائلية الراقية',
                    'متوفر بعدة ألوان وخامات تناسب جميع الأذواق',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== خزائن ملابس ==========
            [
                'name' => 'خزائن ملابس فاخرة – تفصيل حسب الطلب',
                'description' => 'خزائن ملابس عملية بتصميم أنيق توفر لك مساحة منظمة لترتيب ملابسك وإكسسواراتك، مع تقسيمات مدروسة لتناسب مختلف الاحتياجات.',
                'price' => 800.00,
                'discount' => 15,
                'sku' => 'WARDROBE-CAB-001',
                'featured' => true,
                'stock' => 10,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'خزائن الملابس',
                'colors' => ['#8B4513', '#D2B48C', '#A0522D', '#DEB887'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[7]->id,
                'image' => '/images/products/cabinets/wardrobe/wardrobe-1.jpg',
                'images' => [
                    '/images/products/cabinets/wardrobe/wardrobe-1.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-2.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-3.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-4.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-5.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-6.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-7.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-8.jpg',
                    '/images/products/cabinets/wardrobe/wardrobe-9.jpg'
                ],
                'features' => [
                    'تصميم عملي مع أرفف وأدراج لتعزيز التخزين',
                    'خامات عالية الجودة ومتانة تدوم طويلاً',
                    'خيارات متعددة من الأبواب (سحب – مفصلية – مرايا)',
                    'ألوان وتشطيبات أنيقة تناسب جميع الديكورات',
                    'مثالية لغرف النوم والملابس الرئيسية',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== خزائن أحذية ==========
            [
                'name' => 'خزائن أحذية أنيقة – تفصيل حسب الطلب',
                'description' => 'خزائن أحذية أنيقة توفر لك ترتيباً مثالياً لأحذيتك، مع تصميم عصري يحافظ على المظهر المرتب للمكان ويمنع الفوضى.',
                'price' => 350.00,
                'discount' => 10,
                'sku' => 'SHOE-CAB-001',
                'featured' => true,
                'stock' => 20,
                'brand' => 'إيفيا ستوريج',
                'collection' => 'خزائن الأحذية',
                'colors' => ['#8B4513', '#D2B48C', '#A0522D', '#DEB887'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[8]->id,
                'image' => '/images/products/cabinets/shoe/shoe-cabinet-1.jpg',
                'images' => [
                    '/images/products/cabinets/shoe/shoe-cabinet-1.jpg',
                    '/images/products/cabinets/shoe/shoe-cabinet-2.jpg',
                    '/images/products/cabinets/shoe/shoe-cabinet-3.jpg',
                    '/images/products/cabinets/shoe/shoe-cabinet-4.jpg',
                    '/images/products/cabinets/shoe/shoe-cabinet-5.jpg',
                    '/images/products/cabinets/shoe/shoe-cabinet-6.jpg',
                    '/images/products/cabinets/shoe/shoe-cabinet-7.jpg'
                ],
                'features' => [
                    'أرفف مخصصة لتخزين الأحذية بشكل منظم',
                    'خامات متينة مقاومة للاستخدام اليومي',
                    'تصميم مدمج يناسب المداخل وغرف الملابس',
                    'تشطيبات متعددة لتكامل مثالي مع ديكور منزلك',
                    'سهل التنظيف والصيانة',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== خزائن كتب أو عرض ==========
            [
                'name' => 'خزائن كتب وعرض – تفصيل حسب الطلب',
                'description' => 'خزائن كتب وعرض بتصميم أنيق تمنحك مساحة مرتبة لعرض الكتب، الديكورات أو المقتنيات المميزة، مع لمسة جمالية تزين مساحتك.',
                'price' => 600.00,
                'discount' => 12,
                'sku' => 'BOOK-CAB-001',
                'featured' => true,
                'stock' => 15,
                'brand' => 'إيفيا ديسبلاي',
                'collection' => 'خزائن الكتب والعرض',
                'colors' => ['#8B4513', '#D2B48C', '#A0522D', '#DEB887'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[9]->id,
                'image' => '/images/products/cabinets/general/general-cabinet-1.jpg',
                'images' => [
                    '/images/products/cabinets/general/general-cabinet-1.jpg',
                    '/images/products/cabinets/general/general-cabinet-2.jpg',
                    '/images/products/cabinets/general/general-cabinet-3.jpg',
                    '/images/products/cabinets/general/general-cabinet-4.jpg',
                    '/images/products/cabinets/general/general-cabinet-5.jpg',
                    '/images/products/cabinets/general/general-cabinet-6.jpg',
                    '/images/products/cabinets/general/general-cabinet-7.jpg',
                    '/images/products/cabinets/general/general-cabinet-8.jpg',
                    '/images/products/cabinets/general/general-cabinet-9.jpg',
                    '/images/products/cabinets/general/general-cabinet-10.jpg',
                    '/images/products/cabinets/general/general-cabinet-11.jpg'
                ],
                'features' => [
                    'أرفف متعددة قابلة للتخصيص',
                    'خامات عالية الجودة لتخزين آمن وطويل الأمد',
                    'تصميم عصري يبرز الكتب والمقتنيات',
                    'مناسب للمكاتب، الصالات وغرف المعيشة',
                    'متوفر بتشطيبات وألوان متنوعة',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== خزائن أطفال ==========
            [
                'name' => 'خزائن أطفال عملية – تفصيل حسب الطلب',
                'description' => 'خزائن أطفال بتصميم عملي وألوان مبهجة تساعد على تنظيم الملابس والألعاب، مع خامات آمنة تناسب استخدام الأطفال.',
                'price' => 450.00,
                'discount' => 15,
                'sku' => 'CHILD-CAB-001',
                'featured' => true,
                'stock' => 18,
                'brand' => 'إيفيا كيدز',
                'collection' => 'خزائن الأطفال',
                'colors' => ['#FF69B4', '#87CEEB', '#98FB98', '#FFD700'],
                'tab' => 'cabinets',
                'category_id' => $createdSubcategories[10]->id,
                'image' => '/images/products/cabinets/children/children-cabinet-1.jpg',
                'images' => [
                    '/images/products/cabinets/children/children-cabinet-1.jpg',
                    '/images/products/cabinets/children/children-cabinet-2.jpg',
                    '/images/products/cabinets/children/children-cabinet-3.jpg',
                    '/images/products/cabinets/children/children-cabinet-4.jpg',
                    '/images/products/cabinets/children/children-cabinet-5.jpg',
                    '/images/products/cabinets/children/children-cabinet-6.jpg',
                    '/images/products/cabinets/children/children-cabinet-7.jpg',
                    '/images/products/cabinets/children/children-cabinet-8.jpg',
                    '/images/products/cabinets/children/children-cabinet-9.jpg',
                    '/images/products/cabinets/children/children-cabinet-10.jpg',
                    '/images/products/cabinets/children/children-cabinet-11.jpg',
                    '/images/products/cabinets/children/children-cabinet-12.jpg',
                    '/images/products/cabinets/children/children-cabinet-13.jpg',
                    '/images/products/cabinets/children/children-cabinet-14.jpg',
                    '/images/products/cabinets/children/children-cabinet-15.jpg',
                    '/images/products/cabinets/children/children-cabinet-16.jpg',
                    '/images/products/cabinets/children/children-cabinet-17.jpg'
                ],
                'features' => [
                    'تصميم مخصص لتخزين الملابس والألعاب',
                    'خامات آمنة وصديقة للأطفال',
                    'ألوان مرحة تناسب غرف الأطفال',
                    'تقسيمات داخلية عملية لسهولة الاستخدام',
                    'سهل التنظيف والصيانة',
                    'متانة عالية للاستخدام اليومي',
                    'ضمان حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ],

            // ========== الخشبيات ==========
            [
                'name' => 'الخشبيات الفاخرة – تفصيل حسب الطلب',
                'description' => 'مجموعة متنوعة من المنتجات الخشبية الفاخرة التي تضيف لمسات جمالية وعملية لمختلف المساحات. تشمل الفواصل الديكورية، الأرفف الجدارية، الطاولات والكراسي، ألواح وكسوة الجدران، الأسرة والتسريحات. جميعها مصنوعة من أخشاب عالية الجودة وتجمع بين التصميم الأنيق والمتانة لتناسب احتياجاتك اليومية وديكور منزلك أو مكتبك.',
                'price' => 1000.00,
                'discount' => 20,
                'sku' => 'WOODEN-PRODUCTS-001',
                'featured' => true,
                'stock' => 12,
                'brand' => 'إيفيا وود',
                'collection' => 'المنتجات الخشبية',
                'colors' => ['#8B4513', '#D2B48C', '#A0522D', '#DEB887'],
                'tab' => 'wooden',
                'category_id' => $createdCategories[3]->id,
                'image' => '/images/door.png',
                'images' => [
                    '/images/door.png',
                    '/images/building1.png',
                    '/images/building2.png'
                ],
                'features' => [
                    'خامات خشبية طبيعية وعالية الجودة',
                    'تصميمات متعددة تجمع بين العملية والجمال',
                    'منتجات متنوعة: فواصل – أرفف – طاولات – كراسي – أسرة – تسريحات – ألواح جدران',
                    'قابلة للتخصيص حسب المساحة والألوان والتشطيبات',
                    'متانة وثبات عالي مع سهولة في التنظيف والصيانة',
                    'مناسبة للمجالس، الصالات، غرف النوم والمكاتب',
                    'ضمان يصل حتى 5 سنوات',
                    'خدمة ما بعد البيع'
                ]
            ]
        ];

        foreach ($products as $productData) {
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
}
