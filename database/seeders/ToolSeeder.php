<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tool;
use Carbon\Carbon;

class ToolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tools = [
            [
                'title' => 'التطور في عالم الكتب',
                'slug' => 'development-in-books-world',
                'content' => 'نحن في شركة ايفيا نتميز بخبرة واسعة في مجال البناء والعقارات، حيث نقدم خدمات شاملة ومتكاملة تلبي جميع احتياجات عملائنا. نؤمن بأهمية الجودة والدقة في كل مشروع نقوم به، ونحرص على تقديم أفضل الحلول المبتكرة التي تضمن رضا العملاء وتحقيق أهدافهم.',
                'category' => 'الكتب',
                'image' => '/images/building1.png',
                'date' => Carbon::now()->subDays(5),
                'read_time' => 3,
                'author' => 'سمية الحسن',
                'author_image' => '/images/pepole.png',
                'author_bio' => 'كاتبة وباحثة متخصصة في مجال البناء والعقارات، لها العديد من المؤلفات والدراسات المنشورة في المجلات المتخصصة.',
                'is_published' => true,
                'featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'أحدث تقنيات الستائر',
                'slug' => 'latest-curtain-technologies',
                'content' => 'فلسفتنا تقوم على أساس الثقة والشفافية في التعامل مع العملاء، حيث نعتبر كل مشروع تحدياً جديداً نتطلع إليه بكل حماس وإبداع. نحرص على بناء علاقات طويلة الأمد مع عملائنا من خلال تقديم خدمات متميزة ودعم مستمر.',
                'category' => 'الستائر',
                'image' => '/images/curtain.png',
                'date' => Carbon::now()->subDays(3),
                'read_time' => 5,
                'author' => 'أحمد محمد',
                'author_image' => '/images/pepole.png',
                'author_bio' => 'خبير في مجال الديكور والتصميم الداخلي، له خبرة أكثر من 15 عاماً في مجال الستائر والديكورات.',
                'is_published' => true,
                'featured' => false,
                'sort_order' => 2,
            ],
            [
                'title' => 'دليل اختيار الأبواب المناسبة',
                'slug' => 'door-selection-guide',
                'content' => 'نؤمن بأهمية البيئة الإيجابية في العمل، حيث نحرص على توفير بيئة عمل محفزة ومريحة لموظفينا، مما ينعكس إيجاباً على جودة الخدمات المقدمة.',
                'category' => 'الأبواب',
                'image' => '/images/door.png',
                'date' => Carbon::now()->subDays(1),
                'read_time' => 4,
                'author' => 'فاطمة علي',
                'author_image' => '/images/pepole.png',
                'author_bio' => 'مصممة ديكور متخصصة في مجال الأبواب والنوافذ، لها العديد من المشاريع الناجحة.',
                'is_published' => true,
                'featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'أسرار نجاح المشاريع الخشبية',
                'slug' => 'wooden-projects-success-secrets',
                'content' => 'تتميز علامتنا التجارية بقوة وثبات في السوق، حيث نحرص على الحفاظ على معايير الجودة العالية في جميع مشاريعنا. نؤمن بأهمية الابتكار والتطوير المستمر.',
                'category' => 'الخشبيات',
                'image' => '/images/building2.png',
                'date' => Carbon::now(),
                'read_time' => 6,
                'author' => 'محمد عبدالله',
                'author_image' => '/images/pepole.png',
                'author_bio' => 'مهندس معماري متخصص في المشاريع الخشبية، له خبرة واسعة في مجال التصميم والتنفيذ.',
                'is_published' => true,
                'featured' => false,
                'sort_order' => 4,
            ],
        ];

        foreach ($tools as $tool) {
            Tool::create($tool);
        }
    }
}
