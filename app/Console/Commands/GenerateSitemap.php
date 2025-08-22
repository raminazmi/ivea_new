<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\SitemapController;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate 
                            {--clear-cache : Clear the sitemap cache before generating}';
    protected $description = 'Generate and cache the XML sitemap for SEO';
    public function handle()
    {
        $this->info('Generating sitemap...');

        if ($this->option('clear-cache')) {
            $this->info('Clearing sitemap cache...');
            Cache::forget('sitemap');
        }

        try {
            $controller = new SitemapController();
            $controller->index();

            $this->info('✅ Sitemap generated successfully!');
            $this->info('📍 Available at: ' . config('app.url') . '/sitemap.xml');
            $controller->robots();
            $this->info('🤖 Robots.txt updated successfully!');
        } catch (\Exception $e) {
            $this->error('❌ Failed to generate sitemap: ' . $e->getMessage());
            return 1;
        }
        return 0;
    }
}
