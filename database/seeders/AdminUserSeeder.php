<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء مستخدم مدير
        User::create([
            'name' => 'مدير النظام',
            'email' => 'admin@ivea.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);

        // إنشاء مستخدم مدير إضافي
        User::create([
            'name' => 'أحمد محمد',
            'email' => 'ahmed@ivea.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);

        $this->command->info('تم إنشاء المستخدمين المديرين بنجاح!');
        $this->command->info('البريد الإلكتروني: admin@ivea.com');
        $this->command->info('كلمة المرور: 12345678');
        $this->command->info('البريد الإلكتروني: ahmed@ivea.com');
        $this->command->info('كلمة المرور: 12345678');
    }
}
