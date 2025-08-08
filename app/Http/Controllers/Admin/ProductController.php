<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Apply search filter
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('brand', 'like', '%' . $request->search . '%')
                    ->orWhere('sku', 'like', '%' . $request->search . '%');
            });
        }

        // Apply status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Apply category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category_id', $request->category);
        }

        // Apply tab filter
        if ($request->filled('tab') && $request->tab !== 'all') {
            $query->where('tab', $request->tab);
        }

        $products = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Get categories for filter dropdown
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category', 'tab'])
        ]);
    }

    public function create()
    {
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'collection' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'tab' => 'required|string|in:all,featured,new,bestsellers,offers',
            'category_id' => 'required|exists:categories,id',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'status' => 'required|in:active,inactive',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku',
            'featured' => 'boolean',
            'specifications' => 'nullable|array',
            'specifications.features' => 'nullable|array',
            'specifications.features.*' => 'string',
            'specifications.material' => 'nullable|string',
            'specifications.dimensions' => 'nullable|string',
            'specifications.installation' => 'nullable|string',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'dimensions.width' => 'nullable|string',
            'dimensions.height' => 'nullable|string',
            'dimensions.depth' => 'nullable|string',
        ]);

        $validated['featured'] = $validated['featured'] ?? false;
        $validated['images'] = $validated['images'] ?? [];
        $validated['colors'] = $validated['colors'] ?? [];
        $validated['specifications'] = $validated['specifications'] ?? [];
        $validated['dimensions'] = $validated['dimensions'] ?? [];

        if (empty($validated['image']) && !empty($validated['images'])) {
            $validated['image'] = $validated['images'][0];
        }

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'تم إنشاء المنتج بنجاح');
    }

    public function show(Product $product)
    {
        return Inertia::render('Admin/Products/Show', [
            'product' => $product
        ]);
    }

    public function edit(Product $product)
    {
        $categories = Category::active()->ordered()->get();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:255',
            'collection' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'tab' => 'required|string|in:all,featured,new,bestsellers,offers',
            'category_id' => 'required|exists:categories,id',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'status' => 'required|in:active,inactive',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku,' . $product->id,
            'featured' => 'boolean',
            'specifications' => 'nullable|array',
            'specifications.features' => 'nullable|array',
            'specifications.features.*' => 'string',
            'specifications.material' => 'nullable|string',
            'specifications.dimensions' => 'nullable|string',
            'specifications.installation' => 'nullable|string',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|array',
            'dimensions.width' => 'nullable|string',
            'dimensions.height' => 'nullable|string',
            'dimensions.depth' => 'nullable|string',
        ]);

        // Set default values
        $validated['featured'] = $validated['featured'] ?? false;
        $validated['images'] = $validated['images'] ?? [];
        $validated['colors'] = $validated['colors'] ?? [];
        $validated['specifications'] = $validated['specifications'] ?? [];
        $validated['dimensions'] = $validated['dimensions'] ?? [];

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'تم تحديث المنتج بنجاح');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'تم حذف المنتج بنجاح');
    }

    public function updateStatus(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:active,inactive'
        ]);

        $product->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث حالة المنتج بنجاح'
        ]);
    }

    public function stats(): JsonResponse
    {
        $stats = [
            'total' => Product::count(),
            'active' => Product::where('status', 'active')->count(),
            'inactive' => Product::where('status', 'inactive')->count(),
            'featured' => Product::where('featured', true)->count(),
            'with_discount' => Product::whereNotNull('discount')->where('discount', '>', 0)->count(),
            'out_of_stock' => Product::where('stock', 0)->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Update product tab settings
     */
    public function updateTabSettings(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'featured' => 'boolean',
            'is_offer' => 'boolean',
            'is_bestseller' => 'boolean',
            'sales_count' => 'integer|min:0',
            'published_at' => 'nullable|date',
        ]);

        $product->update([
            'featured' => $request->featured ?? false,
            'is_offer' => $request->is_offer ?? false,
            'is_bestseller' => $request->is_bestseller ?? false,
            'sales_count' => $request->sales_count ?? 0,
            'published_at' => $request->published_at,
        ]);

        return redirect()->back()->with('success', 'تم تحديث إعدادات التبويب بنجاح');
    }

    /**
     * Bulk update tab settings
     */
    public function bulkUpdateTabSettings(Request $request)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
            'featured' => 'boolean',
            'is_offer' => 'boolean',
            'is_bestseller' => 'boolean',
            'action' => 'required|in:set,unset',
        ]);

        $productIds = $request->product_ids;
        $action = $request->action;
        $value = $action === 'set';

        $updates = [];

        if ($request->has('featured')) {
            $updates['featured'] = $value;
        }
        if ($request->has('is_offer')) {
            $updates['is_offer'] = $value;
        }
        if ($request->has('is_bestseller')) {
            $updates['is_bestseller'] = $value;
        }

        Product::whereIn('id', $productIds)->update($updates);

        return redirect()->back()->with('success', 'تم تحديث إعدادات التبويب للمنتجات المحددة');
    }

    /**
     * Get tab statistics
     */
    public function getTabStatistics()
    {
        $stats = [
            'featured' => Product::where('featured', true)->count(),
            'new' => Product::whereNotNull('published_at')
                ->where('published_at', '>=', now()->subDays(30))
                ->count(),
            'offers' => Product::where('is_offer', true)
                ->whereNotNull('discount')
                ->where('discount', '>', 0)
                ->count(),
            'bestsellers' => Product::where('is_bestseller', true)->count(),
        ];

        return response()->json($stats);
    }
}