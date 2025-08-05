<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'مصمم داخلي',
                'description' => 'نبحث عن مصمم داخلي موهوب ومبدع للانضمام إلى فريقنا. يجب أن يكون لديه خبرة في تصميم المساحات الداخلية للمنازل والمكاتب.',
                'type' => 'full-time',
                'category' => 'الستائر',
                'location' => 'الرياض',
                'salary_range' => '8000-12000 ريال',
                'requirements' => 'خبرة 3 سنوات على الأقل، إتقان برامج التصميم، مهارات التواصل الجيدة',
                'benefits' => 'تأمين صحي، إجازة سنوية، بيئة عمل محفزة',
                'status' => 'active',
                'deadline' => now()->addDays(30),
            ],
            [
                'title' => 'مشرف إنتاج',
                'description' => 'نحتاج إلى مشرف إنتاج ذو خبرة في إدارة خطوط الإنتاج وضمان الجودة. سيكون مسؤولاً عن الإشراف على فريق العمل وتحقيق الأهداف الإنتاجية.',
                'type' => 'full-time',
                'category' => 'الخشبيات',
                'location' => 'جدة',
                'salary_range' => '10000-15000 ريال',
                'requirements' => 'خبرة 5 سنوات في مجال الإنتاج، مهارات قيادية، معرفة بمعايير الجودة',
                'benefits' => 'راتب تنافسي، مكافآت أداء، تدريب مستمر',
                'status' => 'active',
                'deadline' => now()->addDays(45),
            ],
            [
                'title' => 'مندوب مبيعات',
                'description' => 'نبحث عن مندوب مبيعات نشط ومتحمس لزيادة مبيعاتنا في السوق المحلي. سيكون مسؤولاً عن بناء علاقات مع العملاء وتحقيق أهداف المبيعات.',
                'type' => 'part-time',
                'category' => 'الكتب',
                'location' => 'الدمام',
                'salary_range' => '5000-8000 ريال + عمولة',
                'requirements' => 'خبرة في المبيعات، مهارات تواصل ممتازة، رخصة قيادة',
                'benefits' => 'عمولة على المبيعات، سيارات شركة، تدريب منتظم',
                'status' => 'active',
                'deadline' => now()->addDays(20),
            ],
            [
                'title' => 'محاسب مالي',
                'description' => 'نحتاج إلى محاسب مالي ذو خبرة في إدارة الحسابات والمالية. سيكون مسؤولاً عن إعداد التقارير المالية وضمان دقة السجلات المحاسبية.',
                'type' => 'full-time',
                'category' => 'للمزيد',
                'location' => 'الرياض',
                'salary_range' => '9000-13000 ريال',
                'requirements' => 'شهادة محاسبية، خبرة 4 سنوات، إتقان برامج المحاسبة',
                'benefits' => 'تأمين شامل، إجازة مدفوعة، بيئة عمل مستقرة',
                'status' => 'active',
                'deadline' => now()->addDays(60),
            ],
            [
                'title' => 'مصمم جرافيك',
                'description' => 'نبحث عن مصمم جرافيك مبدع لتصميم المواد التسويقية والعلامات التجارية. سيعمل على تطوير هوية بصرية قوية للشركة.',
                'type' => 'contract',
                'category' => 'الستائر',
                'location' => 'عن بُعد',
                'salary_range' => '6000-9000 ريال',
                'requirements' => 'خبرة في Adobe Creative Suite، محفظة أعمال قوية، إبداع عالي',
                'benefits' => 'عمل مرن، مشاريع متنوعة، فرص تطوير',
                'status' => 'active',
                'deadline' => now()->addDays(25),
            ],
            [
                'title' => 'مهندس ميكانيكي',
                'description' => 'نحتاج إلى مهندس ميكانيكي للعمل على تطوير وتحسين خطوط الإنتاج. سيكون مسؤولاً عن الصيانة الوقائية وحل المشاكل التقنية.',
                'type' => 'full-time',
                'category' => 'الخشبيات',
                'location' => 'الخبر',
                'salary_range' => '12000-18000 ريال',
                'requirements' => 'شهادة هندسة ميكانيكية، خبرة 6 سنوات، معرفة بالأنظمة الصناعية',
                'benefits' => 'راتب مميز، تأمين صحي، فرص ترقية',
                'status' => 'active',
                'deadline' => now()->addDays(40),
            ],
            [
                'title' => 'مدير تسويق',
                'description' => 'نبحث عن مدير تسويق استراتيجي لقيادة جهود التسويق الرقمي والتقليدي. سيكون مسؤولاً عن تطوير استراتيجيات التسويق وزيادة الوعي بالعلامة التجارية.',
                'type' => 'full-time',
                'category' => 'الكتب',
                'location' => 'الرياض',
                'salary_range' => '15000-22000 ريال',
                'requirements' => 'خبرة 8 سنوات في التسويق، مهارات قيادية، معرفة بالتسويق الرقمي',
                'benefits' => 'راتب تنافسي، مكافآت أداء، بيئة عمل ديناميكية',
                'status' => 'active',
                'deadline' => now()->addDays(35),
            ],
            [
                'title' => 'مطور ويب',
                'description' => 'نحتاج إلى مطور ويب موهوب لتطوير وصيانة مواقعنا الإلكترونية. سيعمل على تطوير تطبيقات ويب حديثة ومتجاوبة.',
                'type' => 'contract',
                'category' => 'للمزيد',
                'location' => 'عن بُعد',
                'salary_range' => '8000-12000 ريال',
                'requirements' => 'خبرة في React/Laravel، معرفة بقواعد البيانات، مهارات حل المشاكل',
                'benefits' => 'عمل مرن، مشاريع متنوعة، فرص التعلم',
                'status' => 'active',
                'deadline' => now()->addDays(50),
            ],
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
}
