<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // المقالة الأولى - التطور في عالم الكتب
        Article::create([
            'title' => 'التطور في عالم الكتب',
            'slug' => 'التطور-في-عالم-الكتب',
            'content' => '<p class="mb-6 leading-relaxed">
                نحن في شركة ايفيا نتميز بخبرة واسعة في مجال البناء والعقارات، حيث نقدم خدمات شاملة ومتكاملة تلبي جميع احتياجات عملائنا. نؤمن بأهمية الجودة والدقة في كل مشروع نقوم به، ونحرص على تقديم أفضل الحلول المبتكرة التي تضمن رضا العملاء وتحقيق أهدافهم.
            </p>

            <p class="mb-6 leading-relaxed">
                فلسفتنا تقوم على أساس الثقة والشفافية في التعامل مع العملاء، حيث نعتبر كل مشروع تحدياً جديداً نتطلع إليه بكل حماس وإبداع. نحرص على بناء علاقات طويلة الأمد مع عملائنا من خلال تقديم خدمات متميزة ودعم مستمر.
            </p>

            <div class="my-8 text-center">
                <img src="/images/pepole.png" alt="صورة منتصف المقالة" class="mx-auto max-w-md rounded-lg shadow-lg">
            </div>

            <div class="bg-gray-50 p-8 rounded-lg my-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">قوة علامتنا التجارية</h3>
                <p class="text-gray-700 leading-relaxed mb-6 text-center">
                    في نفس الوقت، إيمانًا منا بأهمية الثقافة الإيجابية في تحقيق التفوق المؤسسي وتحقيق مكانة رائدة في السوق المحلي.إن قوة علامتنا التجارية بنيت على ثقافتنا المؤسسية وأصولها الثابتة من اهتمام بالغ بعملائنا ورفعنا لمسؤوليتنا الاجتماعية على رأس قائمة اهتماماتنا، إلى جانب المنظومة الداخلية للمنشأة من فريق عمل لديه خبرات عريقة إلى جانب الثوابتالأخلاقية والمهنية لكل فرد فيه.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span class="text-gray-700">تنوع الاستثمارات.</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span class="text-gray-700">الشفافية والمصداقية.</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span class="text-gray-700">التحليل الاستثماري الدقيق.</span>
                    </div>
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span class="text-gray-700">التوجه نحو الاستدامة.</span>
                    </div>
                </div>
            </div>',
            'category' => 'التطوير العقاري',
            'image' => '/images/pepole.png',
            'date' => Carbon::now(),
            'read_time' => 8,
            'author' => 'سمية الحسن',
            'author_image' => '/images/pepole.png',
            'author_bio' => 'كاتبة وباحثة متخصصة في مجال البناء والعقارات، لها العديد من المؤلفات والدراسات المنشورة في المجلات المتخصصة. حاصلة على جوائز عديدة في مجال الكتابة والبحث العلمي.',
            'meta_description' => 'مقال عن التطور في عالم البناء والعقارات وخدمات شركة ايفيا',
            'meta_keywords' => 'بناء، عقارات، تطوير، ايفيا، خدمات',
            'is_published' => true,
            'featured' => true,
            'sort_order' => 1
        ]);

        // مقالة ثانية
        Article::create([
            'title' => 'أحدث تقنيات البناء المستدام',
            'slug' => 'أحدث-تقنيات-البناء-المستدام',
            'content' => '<p class="mb-6 leading-relaxed">
                يشهد عالم البناء تطورات متسارعة في مجال التقنيات المستدامة، حيث أصبح الاهتمام بالبيئة والاستدامة من الأولويات الأساسية في صناعة البناء والتشييد.
            </p>

            <p class="mb-6 leading-relaxed">
                من أهم هذه التقنيات استخدام المواد الصديقة للبيئة، والاعتماد على الطاقة المتجددة، وتطبيق معايير البناء الأخضر التي تضمن كفاءة استهلاك الطاقة والمياه.
            </p>',
            'category' => 'تقنيات البناء',
            'image' => '/images/building1.png',
            'date' => Carbon::now()->subDays(2),
            'read_time' => 5,
            'author' => 'أحمد محمد',
            'author_image' => '/images/pepole.png',
            'author_bio' => 'مهندس معماري متخصص في البناء المستدام والتصميم الأخضر.',
            'meta_description' => 'مقال عن أحدث تقنيات البناء المستدام والتصميم الأخضر',
            'meta_keywords' => 'بناء مستدام، تقنيات، تصميم أخضر، بيئة',
            'is_published' => true,
            'featured' => false,
            'sort_order' => 2
        ]);

        // مقالة ثالثة
        Article::create([
            'title' => 'دليل اختيار المواد المناسبة للمشاريع العقارية',
            'slug' => 'دليل-اختيار-المواد-المناسبة-للمشاريع-العقارية',
            'content' => '<p class="mb-6 leading-relaxed">
                يعد اختيار المواد المناسبة من أهم العوامل التي تحدد نجاح أي مشروع عقاري، حيث تؤثر جودة المواد بشكل مباشر على متانة المبنى وعمره الافتراضي.
            </p>

            <p class="mb-6 leading-relaxed">
                يجب أن يتم الاختيار بناءً على عدة معايير منها: نوع التربة، الظروف المناخية، الميزانية المتاحة، والتصميم المطلوب.
            </p>',
            'category' => 'مواد البناء',
            'image' => '/images/building2.png',
            'date' => Carbon::now()->subDays(5),
            'read_time' => 6,
            'author' => 'فاطمة علي',
            'author_image' => '/images/pepole.png',
            'author_bio' => 'خبيرة في مواد البناء والجودة، لها خبرة 15 عام في مجال البناء.',
            'meta_description' => 'دليل شامل لاختيار المواد المناسبة للمشاريع العقارية',
            'meta_keywords' => 'مواد بناء، مشاريع عقارية، جودة، متانة',
            'is_published' => true,
            'featured' => false,
            'sort_order' => 3
        ]);

        // مقالة رابعة
        Article::create([
            'title' => 'تخطيط المشاريع العقارية الناجحة',
            'slug' => 'تخطيط-المشاريع-العقارية-الناجحة',
            'content' => '<p class="mb-6 leading-relaxed">
                يعد التخطيط الجيد من أهم عوامل نجاح المشاريع العقارية، حيث يجب أن يشمل التخطيط جميع الجوانب من الدراسة المالية إلى التنفيذ والتسويق.
            </p>

            <p class="mb-6 leading-relaxed">
                من العناصر الأساسية للتخطيط الناجح: دراسة السوق، تحليل المنافسين، تحديد الفئة المستهدفة، والتخطيط المالي الدقيق.
            </p>',
            'category' => 'تخطيط المشاريع',
            'image' => '/images/building3.png',
            'date' => Carbon::now()->subDays(8),
            'read_time' => 7,
            'author' => 'محمد عبدالله',
            'author_image' => '/images/pepole.png',
            'author_bio' => 'مدير مشاريع عقارية، له خبرة 20 عام في إدارة وتخطيط المشاريع الكبرى.',
            'meta_description' => 'دليل تخطيط المشاريع العقارية الناجحة من الألف إلى الياء',
            'meta_keywords' => 'تخطيط، مشاريع عقارية، نجاح، إدارة',
            'is_published' => true,
            'featured' => false,
            'sort_order' => 4
        ]);

        // مقالة خامسة
        Article::create([
            'title' => 'أساسيات التصميم الداخلي للمنازل الحديثة',
            'slug' => 'أساسيات-التصميم-الداخلي-للمنازل-الحديثة',
            'content' => '<p class="mb-6 leading-relaxed">
                يلعب التصميم الداخلي دوراً مهماً في تحديد هوية المنزل وخلق بيئة مريحة وجذابة للسكان، حيث يجب أن يجمع بين الجمال والوظيفة.
            </p>

            <p class="mb-6 leading-relaxed">
                من المبادئ الأساسية للتصميم الداخلي الناجح: التناسق في الألوان، التوزيع الجيد للمساحات، والاهتمام بالإضاءة والتهوية.
            </p>',
            'category' => 'التصميم الداخلي',
            'image' => '/images/building4.png',
            'date' => Carbon::now()->subDays(10),
            'read_time' => 4,
            'author' => 'نورا أحمد',
            'author_image' => '/images/pepole.png',
            'author_bio' => 'مصممة داخلية معتمدة، متخصصة في تصميم المنازل الحديثة والفاخرة.',
            'meta_description' => 'أساسيات التصميم الداخلي للمنازل الحديثة والعصرية',
            'meta_keywords' => 'تصميم داخلي، منازل، ديكور، أثاث',
            'is_published' => true,
            'featured' => false,
            'sort_order' => 5
        ]);
    }
}
