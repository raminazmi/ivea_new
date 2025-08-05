<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::active()->featured()->take(8)->get()->map(function ($product) {
            // Ensure tab is set for featured products
            if (!$product->tab) {
                $product->tab = 'featured';
            }
            return $product;
        });
        
        $categories = Category::active()->withCount('products')->ordered()->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
        ]);
    }

    public function indexContact()
    {
        return Inertia::render('Contact');
    }
}
