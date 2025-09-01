<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function register(): void {}

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        setlocale(LC_TIME, 'ar_EG.UTF-8', 'ar_EG', 'ar', 'Arabic_Egypt.UTF-8');
        if (!config('app.timezone')) {
            date_default_timezone_set('Asia/Riyadh');
        }
    }
}