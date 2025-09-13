<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Services\SeoService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as ResponseFacade;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $seoService;

    public function __construct(SeoService $seoService)
    {
        $this->seoService = $seoService;
    }

    public function index(Request $request)
    {
        $query = Product::with('category')->active();

        if ($request->has('category') && $request->category !== 'all') {
            $categorySlug = $request->category;
            $category = Category::where('slug', $categorySlug)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        if ($request->has('main_category') && $request->main_category !== 'all') {
            $mainCategorySlug = $request->main_category;
            $mainCategory = Category::where('slug', $mainCategorySlug)->whereNull('parent_id')->first();
            if ($mainCategory) {
                $subcategoryIds = Category::where('parent_id', $mainCategory->id)->pluck('id')->toArray();
                if (!empty($subcategoryIds)) {
                    $query->whereIn('category_id', $subcategoryIds);
                } else {
                    $query->where('category_id', $mainCategory->id);
                }
            }
        }

        if ($request->has('subcategory_ids') && !empty($request->subcategory_ids)) {
            $subcategoryIds = is_array($request->subcategory_ids) ? $request->subcategory_ids : [$request->subcategory_ids];
            $query->whereIn('category_id', $subcategoryIds);
        }

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
                    break;
            }
        }

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('brand', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('collection', 'like', "%{$search}%");
            });
        }

        if ($request->has('min_price') && !empty($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price') && !empty($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->has('colors') && !empty($request->colors)) {
            $colors = is_array($request->colors) ? $request->colors : [$request->colors];
            $query->where(function ($q) use ($colors) {
                foreach ($colors as $color) {
                    $q->orWhereJsonContains('colors', $color);
                }
            });
        }

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

        if ($request->has('opening_method') && !empty($request->opening_method)) {
            $methods = is_array($request->opening_method) ? $request->opening_method : [$request->opening_method];
            $query->where(function ($q) use ($methods) {
                foreach ($methods as $method) {
                    $q->orWhereJsonContains('opening_methods', ['value' => $method]);
                }
            });
        }

        if ($request->has('rail_type') && !empty($request->rail_type)) {
            $railTypes = is_array($request->rail_type) ? $request->rail_type : [$request->rail_type];
            $query->where(function ($q) use ($railTypes) {
                foreach ($railTypes as $railType) {
                    $q->orWhereJsonContains('track_types', ['value' => $railType]);
                }
            });
        }

        if ($request->has('lining') && !empty($request->lining)) {
            $linings = is_array($request->lining) ? $request->lining : [$request->lining];
            $query->where(function ($q) use ($linings) {
                foreach ($linings as $lining) {
                    $q->orWhereJsonContains('lining_options', ['value' => $lining]);
                }
            });
        }

        if ($request->has('brand') && !empty($request->brand)) {
            $brands = is_array($request->brand) ? $request->brand : [$request->brand];
            $query->whereIn('brand', $brands);
        }

        if ($request->has('collection') && !empty($request->collection)) {
            $collections = is_array($request->collection) ? $request->collection : [$request->collection];
            $query->whereIn('collection', $collections);
        }

        if ($request->has('in_stock')) {
            if ($request->in_stock === 'true') {
                $query->where('stock', '>', 0);
            } elseif ($request->in_stock === 'false') {
                $query->where('stock', '<=', 0);
            }
        }

        if ($request->has('width_min') && !empty($request->width_min)) {
            $query->where('max_width', '>=', $request->width_min);
        }
        if ($request->has('width_max') && !empty($request->width_max)) {
            $query->where('min_width', '<=', $request->width_max);
        }
        if ($request->has('height_min') && !empty($request->height_min)) {
            $query->where('max_height', '>=', $request->height_min);
        }
        if ($request->has('height_max') && !empty($request->height_max)) {
            $query->where('min_height', '<=', $request->height_max);
        }

        $sortBy = $request->get('sort', 'created_at');
        $sortOrder = $request->get('order', 'desc');

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

        $products->getCollection()->transform(function ($product) {
            $product->features = $product->features;
            return $product;
        });

        $categories = Category::active()->ordered()->withCount(['products' => function ($query) {
            $query->active();
        }])->get();

        $filterOptions = $this->getFilterOptions();

        $seoData = $this->seoService->getSeoData('products');
        $structuredData = $this->seoService->generateStructuredData($seoData);

        return Inertia::render('Products', [
            'products' => $products,
            'categories' => $categories,
            'filterOptions' => $filterOptions,
            'seo' => $seoData,
            'structuredData' => $structuredData,
            'filters' => $request->only([
                'category',
                'tab',
                'main_category',
                'subcategory_ids',
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
                'width_min',
                'width_max',
                'height_min',
                'height_max',
                'sort',
                'order'
            ])
        ]);
    }

    public function show($id)
    {
        $product = Product::with('category')->active()->findOrFail($id);

        $relatedProducts = Product::with('category')
            ->active()
            ->byCategory($product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(6)
            ->get();

        $cleanRelatedProducts = $relatedProducts->map(function ($relatedProduct) {
            return [
                'id' => (int) ($relatedProduct->id ?? 0),
                'name' => $relatedProduct->name ? mb_convert_encoding($relatedProduct->name, 'UTF-8', 'UTF-8') : '',
                'price' => (float) ($relatedProduct->price ?? 0),
                'description' => $relatedProduct->description ? mb_convert_encoding($relatedProduct->description, 'UTF-8', 'UTF-8') : '',
                'category' => [
                    'id' => (int) ($relatedProduct->category->id ?? 0),
                    'name' => $relatedProduct->category->name ? mb_convert_encoding($relatedProduct->category->name, 'UTF-8', 'UTF-8') : '',
                    'slug' => $relatedProduct->category->slug ?? '',
                ],
                'brand' => $relatedProduct->brand ? mb_convert_encoding($relatedProduct->brand, 'UTF-8', 'UTF-8') : 'Antartica',
                'collection' => $relatedProduct->collection ? mb_convert_encoding($relatedProduct->collection, 'UTF-8', 'UTF-8') : 'Paragon I',
                'sku' => $relatedProduct->sku ?: '6-52CH',
                'discount' => $relatedProduct->discount ? (int) $relatedProduct->discount : null,
                'stock' => (int) ($relatedProduct->stock ?? 0),
                'colors' => $relatedProduct->product_colors ?? [],
                'colorNames' => $relatedProduct->color_names ?? [],
                'image' => $relatedProduct->main_image ?? '',
                'images' => $relatedProduct->product_images ?? [],
                'rating' => (float) ($relatedProduct->rating ?? 0),
                'inStock' => (bool) ($relatedProduct->in_stock ?? true),
                'hasDiscount' => (bool) ($relatedProduct->has_discount ?? false),
                'finalPrice' => (float) ($relatedProduct->final_price ?? $relatedProduct->price ?? 0),
            ];
        })->toArray();

        $cleanFeatures = [];
        if ($product->features && is_array($product->features)) {
            foreach ($product->features as $feature) {
                if (is_string($feature)) {
                    $cleanFeatures[] = mb_convert_encoding($feature, 'UTF-8', 'UTF-8');
                }
            }
        }

        $formattedProduct = [
            'id' => (int) $product->id,
            'name' => $product->name ? mb_convert_encoding($product->name, 'UTF-8', 'UTF-8') : '',
            'price' => (float) ($product->price ?? 0),
            'description' => $product->description ? mb_convert_encoding($product->description, 'UTF-8', 'UTF-8') : '',
            'category' => [
                'id' => (int) ($product->category->id ?? 0),
                'name' => $product->category->name ? mb_convert_encoding($product->category->name, 'UTF-8', 'UTF-8') : '',
                'slug' => $product->category->slug ?? '',
            ],
            'brand' => $product->brand ? mb_convert_encoding($product->brand, 'UTF-8', 'UTF-8') : 'Antartica',
            'collection' => $product->collection ? mb_convert_encoding($product->collection, 'UTF-8', 'UTF-8') : 'Paragon I',
            'sku' => $product->sku ?: '6-52CH',
            'discount' => $product->discount ? (int) $product->discount : null,
            'stock' => (int) ($product->stock ?? 0),
            'colors' => $product->product_colors ?? [],
            'colorNames' => $product->color_names ?? [],
            'specifications' => $product->specifications ?? [],
            'image' => $product->main_image ?? '',
            'images' => $product->product_images ?? [],
            'features' => $cleanFeatures,
            'rating' => (float) ($product->rating ?? 0),
            'weight' => $product->weight ? (float) $product->weight : null,
            'inStock' => (bool) ($product->in_stock ?? true),
            'hasDiscount' => (bool) ($product->has_discount ?? false),
            'finalPrice' => (float) ($product->final_price ?? $product->price ?? 0),
            'discountAmount' => $product->discount_amount ? (float) $product->discount_amount : null,
        ];

        try {
            $seoData = $this->seoService->getProductSeo($product);

            if (is_array($seoData)) {
                foreach ($seoData as $key => $value) {
                    if (is_string($value)) {
                        $seoData[$key] = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
                        $seoData[$key] = preg_replace('/[\x00-\x1F\x7F]/', '', $seoData[$key]);
                    }
                }
            }
        } catch (\Exception $e) {
            $seoData = [];
        }

        try {
            $structuredData = $this->seoService->generateStructuredData($seoData, 'product');

            if (is_array($structuredData)) {
                $this->cleanArrayRecursively($structuredData);
            }
        } catch (\Exception $e) {
            $structuredData = [];
        }

        try {
            $this->cleanArrayRecursively($formattedProduct);
            $this->cleanArrayRecursively($cleanRelatedProducts);

            $data = [
                'product' => $formattedProduct,
                'relatedProducts' => $cleanRelatedProducts,
                'seo' => $seoData,
                'structuredData' => $structuredData,
            ];

            $jsonTest = json_encode($data);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return redirect()->route('products')->with('error', 'حدث خطأ في ترميز البيانات');
            }

            return Inertia::render('ProductDetail', $data);
        } catch (\Exception $e) {
            return redirect()->route('products')->with('error', 'حدث خطأ في عرض تفاصيل المنتج');
        }
    }

    public function options($id)
    {
        $product = Product::with('category')->active()->findOrFail($id);

        $cleanFeatures = [];
        if ($product->features && is_array($product->features)) {
            foreach ($product->features as $feature) {
                if (is_string($feature)) {
                    $cleanFeatures[] = mb_convert_encoding($feature, 'UTF-8', 'UTF-8');
                }
            }
        }

        $formattedProduct = [
            'id' => (int) ($product->id ?? 0),
            'name' => $product->name ? mb_convert_encoding($product->name, 'UTF-8', 'UTF-8') : '',
            'price' => (float) ($product->price ?? 0),
            'description' => $product->description ? mb_convert_encoding($product->description, 'UTF-8', 'UTF-8') : '',
            'category' => [
                'id' => (int) ($product->category->id ?? 0),
                'name' => $product->category->name ? mb_convert_encoding($product->category->name, 'UTF-8', 'UTF-8') : '',
                'slug' => $product->category->slug ?? '',
                'customization_fields' => $product->category->customization_fields ?? [],
            ],
            'brand' => $product->brand ? mb_convert_encoding($product->brand, 'UTF-8', 'UTF-8') : 'Antartica',
            'collection' => $product->collection ? mb_convert_encoding($product->collection, 'UTF-8', 'UTF-8') : 'Paragon I',
            'sku' => $product->sku ?: '6-52CH',
            'discount' => $product->discount ? (int) $product->discount : null,
            'stock' => (int) ($product->stock ?? 0),
            'colors' => $product->product_colors ?? [],
            'colorNames' => $product->color_names ?? [],
            'image' => $product->main_image ?? '',
            'images' => $product->product_images ?? [],
            'features' => $cleanFeatures,
            'inStock' => (bool) ($product->in_stock ?? true),
            'hasDiscount' => (bool) ($product->has_discount ?? false),
            'finalPrice' => (float) ($product->final_price ?? $product->price ?? 0),
        ];

        try {
            $this->cleanArrayRecursively($formattedProduct);
            $jsonTest = json_encode($formattedProduct);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return redirect()->route('products')->with('error', 'حدث خطأ في ترميز بيانات المنتج');
            }

            return Inertia::render('ProductOptions', [
                'product' => $formattedProduct
            ]);
        } catch (\Exception $e) {
            return redirect()->route('products')->with('error', 'حدث خطأ في عرض خيارات المنتج');
        }
    }

    public function getAll(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->featured()
            ->take(8)
            ->get();

        return response()->json($products);
    }

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

    public function getByCategory($categoryId): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->byCategory($categoryId)
            ->paginate(12);

        return ResponseFacade::json($products);
    }

    public function getByCategorySlug($categorySlug): JsonResponse
    {
        $category = Category::where('slug', $categorySlug)->first();

        if (!$category) {
            return response()->json(['data' => []], 404);
        }

        $subcategoryIds = Category::where('parent_id', $category->id)->pluck('id')->toArray();

        $query = Product::with('category')->active();

        if (!empty($subcategoryIds)) {
            $query->whereIn('category_id', $subcategoryIds);
        } else {
            $query->where('category_id', $category->id);
        }

        $products = $query->take(8)->get();

        return response()->json($products);
    }

    public function getFeatured(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->withDiscount()
            ->limit(6)
            ->get();

        return ResponseFacade::json($products);
    }

    public function getNew(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->new()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    public function getOffers(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->offers()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    public function getBestsellers(): JsonResponse
    {
        $products = Product::with('category')
            ->active()
            ->bestsellers()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    private function getFilterOptions()
    {
        $colors = Product::active()
            ->whereNotNull('colors')
            ->pluck('colors')
            ->flatten()
            ->unique()
            ->values()
            ->toArray();

        $brands = Product::active()
            ->whereNotNull('brand')
            ->distinct()
            ->pluck('brand')
            ->filter()
            ->values()
            ->toArray();

        $collections = Product::active()
            ->whereNotNull('collection')
            ->distinct()
            ->pluck('collection')
            ->filter()
            ->values()
            ->toArray();

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

    public function calculatePrice(Request $request, $id): JsonResponse
    {
        $product = Product::active()->findOrFail($id);

        $width = $request->get('width', $product->default_width);
        $height = $request->get('height', $product->default_height);
        $options = $request->get('options', []);

        $calculatedPrice = $product->calculateDynamicPrice($width, $height, $options);

        return response()->json([
            'price' => $calculatedPrice,
            'formatted_price' => number_format($calculatedPrice, 2) . ' ر.س',
            'area' => ($width / 100) * ($height / 100),
            'pricing_method' => $product->pricing_method,
            'base_price' => $product->base_price,
            'width' => $width,
            'height' => $height,
            'options' => $options
        ]);
    }

    public function getFilterOptionsApi(): JsonResponse
    {
        return response()->json($this->getFilterOptions());
    }

    private function cleanArrayRecursively(&$array)
    {
        foreach ($array as $key => &$value) {
            if (is_string($value)) {
                $value = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
                $value = preg_replace('/[\x00-\x1F\x7F]/', '', $value);
            } elseif (is_array($value)) {
                $this->cleanArrayRecursively($value);
            }
        }
    }
}
