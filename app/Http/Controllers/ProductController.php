<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as ResponseFacade;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products for public page
     */
    public function index(Request $request)
    {
        $query = Product::with('category')->active();

        // Filter by category
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Filter by tab
        if ($request->has('tab') && $request->tab !== 'all') {
            switch ($request->tab) {
                case 'new':
                    $query->new();
                    break;
                case 'offers':
                    $query->offers();
                    break;
                case 'bestsellers':
                    $query->bestsellers();
                    break;
                case 'featured':
                    $query->featured();
                    break;
                default:
                    // No additional filtering for 'all'
                    break;
            }
        }

        // Search
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('brand', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('collection', 'like', "%{$search}%");
            });
        }

        // Filter by price range
        if ($request->has('min_price') && !empty($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price') && !empty($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by colors (multiple colors)
        if ($request->has('colors') && !empty($request->colors)) {
            $colors = is_array($request->colors) ? $request->colors : [$request->colors];
            $query->where(function ($q) use ($colors) {
                foreach ($colors as $color) {
                    $q->orWhereJsonContains('colors', $color);
                }
            });
        }

        // Filter by size
        if ($request->has('size') && !empty($request->size)) {
            $sizes = is_array($request->size) ? $request->size : [$request->size];
            $query->where(function ($q) use ($sizes) {
                foreach ($sizes as $size) {
                    switch ($size) {
                        case 'small':
                            $q->orWhere(function ($subQ) {
                                $subQ->where('min_width', '<=', 50)
                                    ->where('max_width', '<=', 100);
                            });
                            break;
                        case 'medium':
                            $q->orWhere(function ($subQ) {
                                $subQ->where('min_width', '>', 50)
                                    ->where('max_width', '<=', 150);
                            });
                            break;
                        case 'large':
                            $q->orWhere(function ($subQ) {
                                $subQ->where('min_width', '>', 100)
                                    ->where('max_width', '>', 150);
                            });
                            break;
                        case 'custom':
                            $q->orWhereNotNull('customization_options');
                            break;
                    }
                }
            });
        }

        // Filter by opening method
        if ($request->has('opening_method') && !empty($request->opening_method)) {
            $methods = is_array($request->opening_method) ? $request->opening_method : [$request->opening_method];
            $query->where(function ($q) use ($methods) {
                foreach ($methods as $method) {
                    $q->orWhereJsonContains('opening_methods', ['value' => $method]);
                }
            });
        }

        // Filter by rail type
        if ($request->has('rail_type') && !empty($request->rail_type)) {
            $railTypes = is_array($request->rail_type) ? $request->rail_type : [$request->rail_type];
            $query->where(function ($q) use ($railTypes) {
                foreach ($railTypes as $railType) {
                    $q->orWhereJsonContains('track_types', ['value' => $railType]);
                }
            });
        }

        // Filter by lining
        if ($request->has('lining') && !empty($request->lining)) {
            $linings = is_array($request->lining) ? $request->lining : [$request->lining];
            $query->where(function ($q) use ($linings) {
                foreach ($linings as $lining) {
                    $q->orWhereJsonContains('lining_options', ['value' => $lining]);
                }
            });
        }

        // Filter by brand
        if ($request->has('brand') && !empty($request->brand)) {
            $brands = is_array($request->brand) ? $request->brand : [$request->brand];
            $query->whereIn('brand', $brands);
        }

        // Filter by collection
        if ($request->has('collection') && !empty($request->collection)) {
            $collections = is_array($request->collection) ? $request->collection : [$request->collection];
            $query->whereIn('collection', $collections);
        }

        // Filter by stock availability
        if ($request->has('in_stock')) {
            if ($request->in_stock === 'true') {
                $query->where('stock', '>', 0);
            } elseif ($request->in_stock === 'false') {
                $query->where('stock', '<=', 0);
            }
        }

        // Sort
        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');

        // Handle special sorting cases
        switch ($sortBy) {
            case 'featured':
                $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
                break;
            case 'price':
                $query->orderBy('price', $sortOrder === 'desc' ? 'desc' : 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'sales':
                $query->orderBy('sales_count', 'desc');
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
                break;
        }

        $products = $query->paginate(12);

        // Get categories for filter
        $categories = Category::active()->ordered()->withCount(['products' => function ($query) {
            $query->active();
        }])->get();

        // Get filter options for dynamic filters
        $filterOptions = $this->getFilterOptions();

        return Inertia::render('Products', [
            'products' => $products,
            'categories' => $categories,
            'filterOptions' => $filterOptions,
            'filters' => $request->only([
                'category',
                'tab',
                'search',
                'min_price',
                'max_price',
                'colors',
                'size',
                'opening_method',
                'rail_type',
                'lining',
                'brand',
                'collection',
                'in_stock',
                'sort',
                'order'
            ])
        ]);
    }

    /**
     * Display the specified product
     */
    public function show($id)
    {
        $product = Product::with('category')->active()->findOrFail($id);

        // Get related products from same category
        $relatedProducts = Product::with('category')
            ->active()
            ->byCategory($product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(6)
            ->get();

        // Format product data for frontend
        $formattedProduct = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => (float) $product->price,
            'description' => $product->description,
            'category' => [
                'id' => $product->category->id,
                'name' => $product->category->name,
                'slug' => $product->category->slug,
            ],
            'brand' => $product->brand ?: 'Antartica',
            'collection' => $product->collection ?: 'Paragon I',
            'sku' => $product->sku ?: '6-52CH',
            'discount' => $product->discount ? (int) $product->discount : null,
            'stock' => $product->stock,
            'colors' => $product->product_colors,
            'colorNames' => $product->color_names,
            'specifications' => $product->specifications,
            'image' => $product->main_image,
            'images' => $product->product_images,
            'features' => $product->features,
            'rating' => $product->rating,
            'weight' => $product->weight,
            'dimensions' => $product->dimensions,
            'inStock' => $product->in_stock,
            'hasDiscount' => $product->has_discount,
            'finalPrice' => (float) $product->final_price,
            'discountAmount' => (float) $product->discount_amount,
        ];

        return Inertia::render('ProductDetail', [
            'product' => $formattedProduct,
            'relatedProducts' => $relatedProducts
        ]);
    }

    /**
     * Display product options page
     */
    public function options($id)
    {
        $product = Product::with('category')->active()->findOrFail($id);

        // Format product data for frontend
        $formattedProduct = [
            'id' => $product->id,
            'name' => $product->name,
            'price' => (float) $product->price,
            'description' => $product->description,
            'category' => [
                'id' => $product->category->id,
                'name' => $product->category->name,
                'slug' => $product->category->slug,
            ],
            'brand' => $product->brand ?: 'Antartica',
            'collection' => $product->collection ?: 'Paragon I',
            'sku' => $product->sku ?: '6-52CH',
            'discount' => $product->discount ? (int) $product->discount : null,
            'stock' => $product->stock,
            'colors' => $product->product_colors,
            'colorNames' => $product->color_names,
            'image' => $product->main_image,
            'images' => $product->product_images,
            'measurementUnits' => $product->measurement_units,
            'openingMethods' => $product->opening_methods,
            'trackTypes' => $product->track_types,
            'liningOptions' => $product->lining_options,
            'defaultWidth' => (float) $product->default_width,
            'defaultHeight' => (float) $product->default_height,
            'fabricReduction' => (float) $product->fabric_reduction,
            'coverageIncrease' => (float) $product->coverage_increase,
            'inStock' => $product->in_stock,
            'hasDiscount' => $product->has_discount,
            'finalPrice' => (float) $product->final_price,
        ];

        return Inertia::render('ProductOptions', [
            'product' => $formattedProduct
        ]);
    }

    /**
     * Get all products for API
     */
    public function getAll(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->featured()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    /**
     * Get products by tab
     */
    public function getByTab($tab): JsonResponse
    {
        $query = Product::with('category')->active();

        switch ($tab) {
            case 'new':
                $products = $query->new()->take(8)->get();
                break;
            case 'offers':
                $products = $query->offers()->take(8)->get();
                break;
            case 'bestsellers':
                $products = $query->bestsellers()->take(8)->get();
                break;
            default:
                $products = $query->featured()->take(8)->get();
                break;
        }

        return response()->json($products);
    }

    /**
     * Get products by category
     */
    public function getByCategory($categoryId): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->byCategory($categoryId)
            ->paginate(12);

        return ResponseFacade::json($products);
    }

    /**
     * Get featured products
     */
    public function getFeatured(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->withDiscount()
            ->limit(6)
            ->get();

        return ResponseFacade::json($products);
    }

    /**
     * Get new products
     */
    public function getNew(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->new()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    /**
     * Get offer products
     */
    public function getOffers(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->offers()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    /**
     * Get bestseller products
     */
    public function getBestsellers(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->bestsellers()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    /**
     * Get filter options for dynamic filters
     */
    private function getFilterOptions()
    {
        // Get unique colors from products
        $colors = Product::active()
            ->whereNotNull('colors')
            ->pluck('colors')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        // Get unique brands
        $brands = Product::active()
            ->whereNotNull('brand')
            ->distinct()
            ->pluck('brand')
            ->filter()
            ->values()
            ->toArray();

        // Get unique collections
        $collections = Product::active()
            ->whereNotNull('collection')
            ->distinct()
            ->pluck('collection')
            ->filter()
            ->values()
            ->toArray();

        // Get price range
        $priceRange = Product::active()
            ->selectRaw('MIN(price) as min_price, MAX(price) as max_price')
            ->first();

        return [
            'colors' => $colors,
            'brands' => $brands,
            'collections' => $collections,
            'priceRange' => [
                'min' => $priceRange->min_price ?? 0,
                'max' => $priceRange->max_price ?? 1000
            ],
            'sizes' => [
                ['value' => 'small', 'label' => 'صغير'],
                ['value' => 'medium', 'label' => 'متوسط'],
                ['value' => 'large', 'label' => 'كبير'],
                ['value' => 'custom', 'label' => 'مخصص']
            ],
            'openingMethods' => [
                ['value' => 'manual', 'label' => 'يدوي'],
                ['value' => 'electric', 'label' => 'كهربائي'],
                ['value' => 'automatic', 'label' => 'أوتوماتيكي']
            ],
            'railTypes' => [
                ['value' => 'metal', 'label' => 'معدني'],
                ['value' => 'plastic', 'label' => 'بلاستيك'],
                ['value' => 'wooden', 'label' => 'خشبي'],
                ['value' => 'aluminum', 'label' => 'ألمنيوم']
            ],
            'liningOptions' => [
                ['value' => 'without', 'label' => 'بدون بطانة'],
                ['value' => 'with', 'label' => 'مع بطانة'],
                ['value' => 'blackout', 'label' => 'بطانة معتمة']
            ]
        ];
    }

    /**
     * Get filter options for API
     */
    public function getFilterOptionsApi(): JsonResponse
    {
        return response()->json($this->getFilterOptions());
    }
}
