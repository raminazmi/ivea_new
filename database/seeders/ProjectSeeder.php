<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'مشروع تصميم داخلي فاخر',
                'description' => 'تصميم وتنفيذ ديكور داخلي لمنزل سكني حديث مع لمسات فاخرة.',
                'image' => '/images/projects/project1.jpg',
            ],
            [
                'title' => 'مكتب أعمال عصري',
                'description' => 'تجهيز مكتب عمل بتصميم عصري يراعي الإنتاجية والراحة.',
                'image' => '/images/projects/project2.jpg',
            ],
            [
                'title' => 'محل تجاري مميز',
                'description' => 'تصميم محل تجاري يعكس هوية العلامة التجارية ويجذب العملاء.',
                'image' => '/images/projects/project3.jpg',
            ],
            [
                'title' => 'منتجع سياحي فاخر',
                'description' => 'تنفيذ منتجع سياحي يجمع بين الفخامة والراحة في التصميم.',
                'image' => '/images/projects/project4.jpg',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
