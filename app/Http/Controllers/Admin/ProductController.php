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

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('brand', 'like', '%' . $request->search . '%')
                    ->orWhere('sku', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('tab') && $request->tab !== 'all') {
            $query->where('tab', $request->tab);
        }

        $products = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $categories = Category::with('children')
            ->whereNull('parent_id')
            ->active()
            ->ordered()
            ->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category', 'tab'])
        ]);
    }

    public function create()
    {
        $subCategories = Category::whereNotNull('parent_id')->active()->ordered()->get();
        $woodenCategory = Category::where('slug', 'wooden')->active()->first();

        $categories = $subCategories;
        if ($woodenCategory) {
            $categories = $categories->push($woodenCategory);
        }

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
            'tab' => 'required|string|in:all,featured,new,bestsellers,offers',
            'category_id' => 'required|exists:categories,id',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku',
            'featured' => 'boolean',
            'is_new' => 'boolean',
            'features' => 'nullable|array',
            'features.*' => 'string',
        ]);

        $category = Category::find($validated['category_id']);
        if (!$category) {
            return redirect()->back()
                ->withErrors(['category_id' => 'الفئة المختارة غير موجودة'])
                ->withInput();
        }

        if (!is_null($category->parent_id) || $category->slug === 'wooden') {
        } else {
            return redirect()->back()
                ->withErrors(['category_id' => 'يجب اختيار فئة فرعية أو فئة الخشبيات'])
                ->withInput();
        }

        $validated['featured'] = $validated['featured'] ?? false;
        $validated['images'] = $validated['images'] ?? [];
        $validated['colors'] = $validated['colors'] ?? [];
        $validated['features'] = $validated['features'] ?? [];
        $validated['status'] = 'active';

        if (empty($validated['image']) && !empty($validated['images'])) {
            $validated['image'] = $validated['images'][0];
        }

        // تحديث الحقول بناءً على قيمة التبويب
        $tabUpdates = [];
        switch ($validated['tab']) {
            case 'featured':
                $tabUpdates = ['featured' => true, 'is_offer' => false, 'is_bestseller' => false, 'is_new' => false];
                break;
            case 'new':
                $tabUpdates = ['featured' => false, 'is_offer' => false, 'is_bestseller' => false, 'is_new' => true];
                break;
            case 'bestsellers':
                $tabUpdates = ['featured' => false, 'is_offer' => false, 'is_bestseller' => true, 'is_new' => false];
                break;
            case 'offers':
                $tabUpdates = ['featured' => false, 'is_offer' => true, 'is_bestseller' => false, 'is_new' => false];
                break;
            case 'all':
            default:
                $tabUpdates = ['featured' => false, 'is_offer' => false, 'is_bestseller' => false, 'is_new' => false];
                break;
        }

        Product::create(array_merge($validated, $tabUpdates));

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
        $subCategories = Category::whereNotNull('parent_id')->active()->ordered()->get();
        $woodenCategory = Category::where('slug', 'wooden')->active()->first();

        $categories = $subCategories;
        if ($woodenCategory) {
            $categories = $categories->push($woodenCategory);
        }

        $product->load('category');

        return Inertia::render('Admin/Products/Create', [
            'product' => $product,
            'categories' => $categories,
            'isEditing' => true
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
            'tab' => 'required|string|in:all,featured,new,bestsellers,offers',
            'category_id' => 'required|exists:categories,id',
            'colors' => 'nullable|array',
            'colors.*' => 'string',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string|max:255|unique:products,sku,' . $product->id,
            'featured' => 'boolean',
            'is_new' => 'boolean',
            'features' => 'nullable|array',
            'features.*' => 'string',
        ]);

        $category = Category::find($validated['category_id']);
        if (!$category) {
            return redirect()->back()
                ->withErrors(['category_id' => 'الفئة المختارة غير موجودة'])
                ->withInput();
        }

        if (!is_null($category->parent_id) || $category->slug === 'wooden') {
        } else {
            return redirect()->back()
                ->withErrors(['category_id' => 'يجب اختيار فئة فرعية أو فئة الخشبيات'])
                ->withInput();
        }

        // تحديث الحقول بناءً على قيمة التبويب
        $tabUpdates = [];
        switch ($validated['tab']) {
            case 'featured':
                $tabUpdates = ['featured' => true, 'is_offer' => false, 'is_bestseller' => false, 'is_new' => false];
                break;
            case 'new':
                $tabUpdates = ['featured' => false, 'is_offer' => false, 'is_bestseller' => false, 'is_new' => true];
                break;
            case 'bestsellers':
                $tabUpdates = ['featured' => false, 'is_offer' => false, 'is_bestseller' => true, 'is_new' => false];
                break;
            case 'offers':
                $tabUpdates = ['featured' => false, 'is_offer' => true, 'is_bestseller' => false, 'is_new' => false];
                break;
            case 'all':
            default:
                $tabUpdates = ['featured' => false, 'is_offer' => false, 'is_bestseller' => false, 'is_new' => false];
                break;
        }

        $product->update(array_merge($validated, $tabUpdates));

        return redirect()->route('admin.products.index')
            ->with('success', 'تم تحديث المنتج بنجاح');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'تم حذف المنتج بنجاح');
    }

    public function toggleStatus(Product $product): JsonResponse
    {
        $product->update([
            'status' => $product->status === 'active' ? 'inactive' : 'active'
        ]);

        return response()->json([
            'success' => true,
            'status' => $product->status,
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

    public function updateTabSettings(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'featured' => 'boolean',
            'is_offer' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_new' => 'boolean',
            'sales_count' => 'integer|min:0',
            'published_at' => 'nullable|date',
        ]);

        $product->update([
            'featured' => $request->featured ?? false,
            'is_offer' => $request->is_offer ?? false,
            'is_bestseller' => $request->is_bestseller ?? false,
            'is_new' => $request->is_new ?? false,
            'sales_count' => $request->sales_count ?? 0,
            'published_at' => $request->published_at,
        ]);

        return redirect()->back()->with('success', 'تم تحديث إعدادات التبويب بنجاح');
    }

    public function bulkUpdateTabSettings(Request $request)
    {
        $request->validate([
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
            'featured' => 'boolean',
            'is_offer' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_new' => 'boolean',
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
        if ($request->has('is_new')) {
            $updates['is_new'] = $value;
        }

        Product::whereIn('id', $productIds)->update($updates);

        return redirect()->back()->with('success', 'تم تحديث إعدادات التبويب للمنتجات المحددة');
    }

    public function getTabStatistics()
    {
        $stats = [
            'featured' => Product::where('featured', true)->count(),
            'new' => Product::where('is_new', true)->count(),
            'offers' => Product::where('is_offer', true)
                ->whereNotNull('discount')
                ->where('discount', '>', 0)
                ->count(),
            'bestsellers' => Product::where('is_bestseller', true)->count(),
        ];

        return response()->json($stats);
    }
}
