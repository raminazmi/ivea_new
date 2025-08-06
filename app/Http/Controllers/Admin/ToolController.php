<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ToolController extends Controller
{
    public function index()
    {
        $tools = Tool::orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Tools/Index', [
            'tools' => $tools
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tools/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tools,slug',
            'category' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        Tool::create($validated);

        return redirect()->route('admin.tools.index')
            ->with('success', 'تم إنشاء الأداة بنجاح');
    }

    public function show(Tool $tool)
    {
        return Inertia::render('Admin/Tools/Show', [
            'tool' => $tool
        ]);
    }

    public function edit(Tool $tool)
    {
        return Inertia::render('Admin/Tools/Edit', [
            'tool' => $tool
        ]);
    }

    public function update(Request $request, Tool $tool): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tools,slug,' . $tool->id,
            'category' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $tool->update($validated);

        return redirect()->route('admin.tools.index')
            ->with('success', 'تم تحديث الأداة بنجاح');
    }

    public function destroy(Tool $tool): RedirectResponse
    {
        $tool->delete();

        return redirect()->route('admin.tools.index')
            ->with('success', 'تم حذف الأداة بنجاح');
    }

    public function togglePublished(Tool $tool): RedirectResponse
    {
        $tool->update(['is_published' => !$tool->is_published]);

        return redirect()->back()
            ->with('success', 'تم تحديث حالة النشر بنجاح');
    }

    public function toggleFeatured(Tool $tool): RedirectResponse
    {
        $tool->update(['featured' => !$tool->featured]);

        return redirect()->back()
            ->with('success', 'تم تحديث حالة التميز بنجاح');
    }
}
