<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories for admin
     */
    public function index(Request $request)
    {
        $query = Category::withCount('products');

        // Search
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $categories = $query->ordered()->paginate(15);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'status']),
            'user' => auth()->user()
        ]);
    }

    /**
     * Show the form for creating a new category
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create', [
            'user' => auth()->user()
        ]);
    }

    /**
     * Store a newly created category
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'sort_order' => 'nullable|integer|min:0',
            'color' => 'nullable|string|regex:/^#[0-9A-F]{6}$/i',
        ], [
            'name.required' => 'اسم الفئة مطلوب',
            'name.unique' => 'اسم الفئة مستخدم بالفعل',
            'status.required' => 'الحالة مطلوبة',
            'color.regex' => 'لون غير صحيح، يجب أن يكون بتنسيق #RRGGBB',
        ]);

        try {
            Category::create($request->validated());

            return redirect()->route('admin.categories.index')
                ->with('success', 'تم إنشاء الفئة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء إنشاء الفئة');
        }
    }

    /**
     * Show the form for editing the specified category
     */
    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
            'user' => auth()->user()
        ]);
    }

    /**
     * Update the specified category
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'sort_order' => 'nullable|integer|min:0',
            'color' => 'nullable|string|regex:/^#[0-9A-F]{6}$/i',
        ], [
            'name.required' => 'اسم الفئة مطلوب',
            'name.unique' => 'اسم الفئة مستخدم بالفعل',
            'status.required' => 'الحالة مطلوبة',
            'color.regex' => 'لون غير صحيح، يجب أن يكون بتنسيق #RRGGBB',
        ]);

        try {
            $category->update($request->validated());

            return redirect()->route('admin.categories.index')
                ->with('success', 'تم تحديث الفئة بنجاح');
        } catch (\Exception $e) {
            return back()->with('error', 'حدث خطأ أثناء تحديث الفئة');
        }
    }

    /**
     * Remove the specified category
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);

            // Check if category has products
            if ($category->products()->count() > 0) {
                return response()->json([
                    'error' => 'لا يمكن حذف الفئة لأنها تحتوي على منتجات'
                ], 400);
            }

            $category->delete();

            return response()->json(['success' => 'تم حذف الفئة بنجاح']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'حدث خطأ أثناء حذف الفئة'], 500);
        }
    }

    /**
     * Update category status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->update(['status' => $request->status]);

            return response()->json(['success' => 'تم تحديث حالة الفئة بنجاح']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'حدث خطأ أثناء تحديث الحالة'], 500);
        }
    }

    /**
     * Get category statistics
     */
    public function stats()
    {
        $stats = [
            'total' => Category::count(),
            'active' => Category::where('status', 'active')->count(),
            'inactive' => Category::where('status', 'inactive')->count(),
            'with_products' => Category::has('products')->count(),
            'empty' => Category::doesntHave('products')->count(),
        ];

        return response()->json($stats);
    }
}
