<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Article;
use App\Models\Project;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    public function index()
    {
        $sitemap = Cache::remember('sitemap', 3600, function () {
            return $this->generateSitemap();
        });

        return response($sitemap, 200)
            ->header('Content-Type', 'text/xml; charset=utf-8');
    }

    private function generateSitemap()
    {
        $baseUrl = config('app.url');
        $lastmod = now()->toAtomString();

        $urls = [
            // Static pages
            [
                'url' => $baseUrl,
                'lastmod' => $lastmod,
                'changefreq' => 'daily',
                'priority' => '1.0'
            ],
            [
                'url' => $baseUrl . '/products',
                'lastmod' => $lastmod,
                'changefreq' => 'daily',
                'priority' => '0.9'
            ],
            [
                'url' => $baseUrl . '/projects',
                'lastmod' => $lastmod,
                'changefreq' => 'weekly',
                'priority' => '0.8'
            ],
            [
                'url' => $baseUrl . '/articles',
                'lastmod' => $lastmod,
                'changefreq' => 'weekly',
                'priority' => '0.8'
            ],
            [
                'url' => $baseUrl . '/contact',
                'lastmod' => $lastmod,
                'changefreq' => 'monthly',
                'priority' => '0.7'
            ]
        ];

        // Add categories
        $categories = Category::active()->get();
        foreach ($categories as $category) {
            $urls[] = [
                'url' => $baseUrl . '/products?category=' . $category->slug,
                'lastmod' => $category->updated_at->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.8'
            ];
        }

        // Add products
        $products = Product::active()->get();
        foreach ($products as $product) {
            $urls[] = [
                'url' => $baseUrl . '/products/' . $product->id,
                'lastmod' => $product->updated_at->toAtomString(),
                'changefreq' => 'weekly',
                'priority' => '0.7'
            ];
        }

        // Add articles if exists
        if (class_exists(Article::class)) {
            try {
                $articles = Article::all();
                foreach ($articles as $article) {
                    $urls[] = [
                        'url' => $baseUrl . '/articles/' . ($article->slug ?? $article->id),
                        'lastmod' => $article->updated_at->toAtomString(),
                        'changefreq' => 'monthly',
                        'priority' => '0.6'
                    ];
                }
            } catch (\Exception $e) {
                // Skip articles if there's an error
            }
        }

        // Add projects if exists
        if (class_exists(Project::class)) {
            try {
                $projects = Project::all();
                foreach ($projects as $project) {
                    $urls[] = [
                        'url' => $baseUrl . '/projects/' . ($project->slug ?? $project->id),
                        'lastmod' => $project->updated_at->toAtomString(),
                        'changefreq' => 'monthly',
                        'priority' => '0.6'
                    ];
                }
            } catch (\Exception $e) {
                // Skip projects if there's an error
            }
        }

        return $this->generateXml($urls);
    }

    private function generateXml($urls)
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($urls as $url) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($url['url']) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $url['lastmod'] . '</lastmod>' . "\n";
            $xml .= '    <changefreq>' . $url['changefreq'] . '</changefreq>' . "\n";
            $xml .= '    <priority>' . $url['priority'] . '</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return $xml;
    }

    public function robots()
    {
        $robots = "User-agent: *\n";
        $robots .= "Allow: /\n";
        $robots .= "Disallow: /admin/\n";
        $robots .= "Disallow: /api/\n";
        $robots .= "Disallow: /storage/\n";
        $robots .= "\n";
        $robots .= "Sitemap: " . config('app.url') . "/sitemap.xml\n";

        return response($robots, 200)
            ->header('Content-Type', 'text/plain; charset=utf-8');
    }
}
