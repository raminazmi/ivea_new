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
        // Check if admin user already exists
        $existingAdmin = User::where('email', 'admin@ivea.com')->first();

        if (!$existingAdmin) {
            User::create([
                'name' => 'أدمن',
                'email' => 'admin@ivea.com',
                'password' => Hash::make('12345678'),
                'is_admin' => true,
            ]);

            $this->command->info('Admin user created successfully!');
        } else {
            $this->command->info('Admin user already exists, skipping creation.');
        }
    }
}
