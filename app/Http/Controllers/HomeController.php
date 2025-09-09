<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Article;
use App\Models\Offer;
use App\Models\OffersText;
use App\Services\SeoService;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected $seoService;

    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    public function index()
    {
        $featuredProducts = Product::active()->featured()->take(8)->get()->map(function ($product) {
            if (!$product->tab) {
                $product->tab = 'featured';
            }
            return $product;
        });

        $categories = Category::active()->whereNull('parent_id')->withCount('products')->ordered()->get();

        // Get latest 2 offers for featured offers section with their texts
        $featuredOffers = Offer::with('offersText')->ordered()->take(2)->get();

        // Get offers texts
        $offersTexts = OffersText::getTextsArray();

        $latestArticles = Article::published()->ordered()->take(6)->get()->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'category' => $article->category,
                'image' => $article->image,
                'date' => $article->formatted_date,
                'read_time' => $article->read_time,
                'slug' => $article->slug,
            ];
        });

        if ($latestArticles->isEmpty()) {
            $latestArticles = collect([
                [
                    'id' => 1,
                    'title' => 'دليل اختيار الستائر المثالية لمنزلك',
                    'category' => 'ستائر',
                    'image' => '/images/curtain.png',
                    'date' => now()->format('d M Y'),
                    'read_time' => 5,
                    'slug' => 'curtains-guide',
                ],
                [
                    'id' => 2,
                    'title' => 'أحدث اتجاهات تصميم الكنب في 2024',
                    'category' => 'كنب',
                    'image' => '/images/sofa.png',
                    'date' => now()->subDays(2)->format('d M Y'),
                    'read_time' => 7,
                    'slug' => 'sofa-trends-2024',
                ],
                [
                    'id' => 3,
                    'title' => 'كيف تختار الخزائن المناسبة لمطبخك',
                    'category' => 'خزائن',
                    'image' => '/images/treasury.png',
                    'date' => now()->subDays(5)->format('d M Y'),
                    'read_time' => 6,
                    'slug' => 'kitchen-cabinets-guide',
                ],
                [
                    'id' => 4,
                    'title' => 'أفكار تصميم الخشبيات للمنازل الحديثة',
                    'category' => 'خشبيات',
                    'image' => '/images/door.png',
                    'date' => now()->subDays(7)->format('d M Y'),
                    'read_time' => 8,
                    'slug' => 'wooden-designs-modern',
                ],
                [
                    'id' => 5,
                    'title' => 'نصائح لتنظيم غرفة المعيشة بشكل مثالي',
                    'category' => 'تنظيم',
                    'image' => '/images/hero_ivea.png',
                    'date' => now()->subDays(10)->format('d M Y'),
                    'read_time' => 4,
                    'slug' => 'living-room-organization',
                ],
                [
                    'id' => 6,
                    'title' => 'اختيار الألوان المناسبة للديكور الداخلي',
                    'category' => 'ديكور',
                    'image' => '/images/projects_cover.png',
                    'date' => now()->subDays(12)->format('d M Y'),
                    'read_time' => 9,
                    'slug' => 'interior-color-selection',
                ],
            ]);
        }

        $seoData = $this->seoService->getSeoData('home');
        $structuredData = $this->seoService->generateStructuredData($seoData);

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'featuredOffers' => $featuredOffers,
            'offersTexts' => $offersTexts,
            'latestArticles' => $latestArticles,
            'seo' => $seoData,
            'structuredData' => $structuredData,
        ]);
    }

    public function indexContact()
    {
        $seoData = $this->seoService->getSeoData('contact');
        $structuredData = $this->seoService->generateStructuredData($seoData);

        return Inertia::render('Contact', [
            'seo' => $seoData,
            'structuredData' => $structuredData,
        ]);
    }
}
