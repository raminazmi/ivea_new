<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tool;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ToolController extends Controller
{
    /**
     * Display a listing of the tools.
     */
    public function index()
    {
        $tools = Tool::orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($tool) {
                return [
                    'id' => $tool->id,
                    'title' => $tool->title,
                    'slug' => $tool->slug,
                    'category' => $tool->category,
                    'date' => $tool->formatted_date,
                    'readTime' => $tool->formatted_read_time,
                    'isPublished' => $tool->is_published,
                    'featured' => $tool->featured,
                    'sortOrder' => $tool->sort_order,
                    'createdAt' => $tool->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/Tools/Index', [
            'tools' => $tools,
        ]);
    }

    /**
     * Show the form for creating a new tool.
     */
    public function create()
    {
        return Inertia::render('Admin/Tools/Create');
    }

    /**
     * Store a newly created tool in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'date' => 'required|date',
            'read_time' => 'required|integer|min:1',
            'author' => 'nullable|string|max:255',
            'author_image' => 'nullable|string',
            'author_bio' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $tool = Tool::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'category' => $request->category,
            'image' => $request->image,
            'date' => $request->date,
            'read_time' => $request->read_time,
            'author' => $request->author,
            'author_image' => $request->author_image,
            'author_bio' => $request->author_bio,
            'meta_description' => $request->meta_description,
            'meta_keywords' => $request->meta_keywords,
            'is_published' => $request->is_published ?? true,
            'featured' => $request->featured ?? false,
            'sort_order' => $request->sort_order ?? 0,
        ]);

        return \Illuminate\Support\Facades\Redirect::route('admin.tools.index')
            ->with('success', 'تم إنشاء الأداة بنجاح');
    }

    /**
     * Show the form for editing the specified tool.
     */
    public function edit(Tool $tool)
    {
        return Inertia::render('Admin/Tools/Edit', [
            'tool' => [
                'id' => $tool->id,
                'title' => $tool->title,
                'slug' => $tool->slug,
                'content' => $tool->content,
                'category' => $tool->category,
                'image' => $tool->image,
                'date' => $tool->date ? $tool->date->format('Y-m-d') : '',
                'read_time' => $tool->read_time,
                'author' => $tool->author,
                'author_image' => $tool->author_image,
                'author_bio' => $tool->author_bio,
                'meta_description' => $tool->meta_description,
                'meta_keywords' => $tool->meta_keywords,
                'is_published' => $tool->is_published,
                'featured' => $tool->featured,
                'sort_order' => $tool->sort_order,
            ],
        ]);
    }

    /**
     * Update the specified tool in storage.
     */
    public function update(Request $request, Tool $tool)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'date' => 'required|date',
            'read_time' => 'required|integer|min:1',
            'author' => 'nullable|string|max:255',
            'author_image' => 'nullable|string',
            'author_bio' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $tool->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'category' => $request->category,
            'image' => $request->image,
            'date' => $request->date,
            'read_time' => $request->read_time,
            'author' => $request->author,
            'author_image' => $request->author_image,
            'author_bio' => $request->author_bio,
            'meta_description' => $request->meta_description,
            'meta_keywords' => $request->meta_keywords,
            'is_published' => $request->is_published ?? true,
            'featured' => $request->featured ?? false,
            'sort_order' => $request->sort_order ?? 0,
        ]);

        return \Illuminate\Support\Facades\Redirect::route('admin.tools.index')
            ->with('success', 'تم تحديث الأداة بنجاح');
    }

    /**
     * Remove the specified tool from storage.
     */
    public function destroy(Tool $tool)
    {
        $tool->delete();

        return \Illuminate\Support\Facades\Redirect::route('admin.tools.index')
            ->with('success', 'تم حذف الأداة بنجاح');
    }

    /**
     * Toggle the published status of a tool.
     */
    public function togglePublished(Tool $tool)
    {
        $tool->update([
            'is_published' => !$tool->is_published,
        ]);

        return \Illuminate\Support\Facades\Redirect::back()->with('success', 'تم تحديث حالة النشر بنجاح');
    }

    /**
     * Toggle the featured status of a tool.
     */
    public function toggleFeatured(Tool $tool)
    {
        $tool->update([
            'featured' => !$tool->featured,
        ]);

        return \Illuminate\Support\Facades\Redirect::back()->with('success', 'تم تحديث حالة التميز بنجاح');
    }
}
