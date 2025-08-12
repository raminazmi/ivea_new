<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
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

        $categories = Category::active()->withCount('products')->ordered()->get();

        $seoData = $this->seoService->getSeoData('home');
        $structuredData = $this->seoService->generateStructuredData($seoData);

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
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
