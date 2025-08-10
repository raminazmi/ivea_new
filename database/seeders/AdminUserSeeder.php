<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'مدير',
            'email' => 'admin@ivea.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);

        User::create([
            'name' => 'أحمد محمد',
            'email' => 'ahmed@ivea.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);
    }
}
