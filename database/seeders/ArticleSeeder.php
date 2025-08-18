<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
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
                <img src="/images/pepole.png" alt="صورة منتصف المقالة">
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
            'category_id' => 1,
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

        Article::create([
            'title' => 'أحدث تقنيات البناء المستدام',
            'slug' => 'أحدث-تقنيات-البناء-المستدام',
            'content' => '<p class="mb-6 leading-relaxed">
                يشهد عالم البناء تطورات متسارعة في مجال التقنيات المستدامة، حيث أصبح الاهتمام بالبيئة والاستدامة من الأولويات الأساسية في صناعة البناء والتشييد.
            </p>

            <p class="mb-6 leading-relaxed">
                من أهم هذه التقنيات استخدام المواد الصديقة للبيئة، والاعتماد على الطاقة المتجددة، وتطبيق معايير البناء الأخضر التي تضمن كفاءة استهلاك الطاقة والمياه.
            </p>',
            'category_id' => 2,
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
    }
}
