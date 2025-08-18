<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount(['products' => function ($query) {
            $query->active();
        }]);

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Get per_page parameter, default to 50, max 100
        $perPage = min($request->get('per_page', 50), 100);

        // Order main categories first, then subcategories
        $categories = $query->orderBy('parent_id', 'asc')
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'per_page'])
        ]);
    }

    public function create()
    {
        // Get all main categories (parent_id is null) for parent selection
        $categories = Category::whereNull('parent_id')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Categories/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        // Debug: Log the incoming request
        \Log::info('Store Category Request:', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'image' => 'nullable|string',
            'color' => 'nullable|string',
            'parent_id' => 'nullable|string|exists:categories,id',
        ]);

        \Log::info('Validated data:', $validated);

        $validated['slug'] = \Str::slug($validated['name']);

        // Set default color if not provided
        if (empty($validated['color'])) {
            $validated['color'] = '#3B82F6'; // Default blue color
        }

        // Convert empty parent_id to null
        if (empty($validated['parent_id'])) {
            $validated['parent_id'] = null;
        }

        \Log::info('Final data before create:', $validated);

        // Auto-set sort_order
        if ($validated['parent_id']) {
            // For subcategories, get max sort_order within the same parent
            $maxOrder = Category::where('parent_id', $validated['parent_id'])->max('sort_order');
        } else {
            // For main categories, get max sort_order where parent_id is null
            $maxOrder = Category::whereNull('parent_id')->max('sort_order');
        }
        $validated['sort_order'] = ($maxOrder ?? 0) + 1;

        try {
            $category = Category::create($validated);
            \Log::info('Category created:', $category->toArray());

            return redirect()->route('admin.categories.index')
                ->with('success', 'تم إنشاء الفئة بنجاح');
        } catch (\Exception $e) {
            \Log::error('Error creating category:', ['error' => $e->getMessage()]);
            return redirect()->back()->withInput()->with('error', 'حدث خطأ أثناء إنشاء الفئة: ' . $e->getMessage());
        }
    }

    public function show(Category $category)
    {
        $category->load('products');

        return Inertia::render('Admin/Categories/Show', [
            'category' => $category
        ]);
    }

    public function edit(Category $category)
    {
        // Get all main categories (parent_id is null) for parent selection
        // Only exclude if the current category has subcategories (to prevent circular reference)
        $categories = Category::whereNull('parent_id')
            ->when($category->children()->exists(), function ($query) use ($category) {
                return $query->where('id', '!=', $category->id);
            })
            ->orderBy('sort_order')->get();

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'categories' => $categories
        ]);
    }
    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'image' => 'nullable|string',
            'color' => 'nullable|string',
            'parent_id' => 'nullable|string|exists:categories,id',
        ]);

        $validated['slug'] = \Str::slug($validated['name']);

        // Set default color if not provided
        if (empty($validated['color'])) {
            $validated['color'] = '#3B82F6'; // Default blue color
        }

        // Convert empty parent_id to null
        if (empty($validated['parent_id'])) {
            $validated['parent_id'] = null;
        }

        // Prevent category from being its own parent
        if ($validated['parent_id'] && $validated['parent_id'] == $category->id) {
            return redirect()->back()->withErrors(['parent_id' => 'لا يمكن أن تكون الفئة والد لنفسها']);
        }

        // Prevent circular reference: if category has children, it cannot become a subcategory
        if ($validated['parent_id'] && $category->children()->exists()) {
            return redirect()->back()->withErrors(['parent_id' => 'لا يمكن جعل فئة لها فئات فرعية كفئة فرعية']);
        }

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'تم تحديث الفئة بنجاح');
    }

    public function destroy(Category $category): RedirectResponse
    {
        if ($category->products()->count() > 0) {
            return redirect()->route('admin.categories.index')
                ->with('error', 'لا يمكن حذف الفئة لأنها تحتوي على منتجات');
        }

        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'تم حذف الفئة بنجاح');
    }

    public function updateStatus(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:active,inactive'
        ]);

        $category->update($validated);

        return redirect()->back()
            ->with('success', 'تم تحديث حالة الفئة بنجاح');
    }
}
