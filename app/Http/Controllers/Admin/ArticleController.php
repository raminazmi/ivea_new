<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')
            ->paginate(10);

        $categories = Article::getCategories();
        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $categories = Article::getCategories();
        return Inertia::render('Admin/Articles/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'required|string|max:255|unique:articles,slug',
                'content' => 'required|string',
                'excerpt' => 'nullable|string',
                'category_id' => 'required|integer|exists:categories,id',
                'image' => 'nullable|file|image|max:2048',
                'is_published' => 'boolean',
                'featured' => 'boolean',
                'sort_order' => 'nullable|integer|min:0',
                'read_time' => 'nullable|integer|min:1',
                'author' => 'nullable|string',
                'author_bio' => 'nullable|string',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'author_image' => 'nullable|file|image|max:2048',
                'date' => 'nullable|date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        }

        $is_published = $request->boolean('is_published');
        $featured = $request->boolean('featured');
        $sort_order = (int) $request->input('sort_order', 0);
        $read_time = (int) $request->input('read_time', 0);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }
        $authorImagePath = null;
        if ($request->hasFile('author_image')) {
            $authorImagePath = $request->file('author_image')->store('authors', 'public');
        }

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'] ?? null,
            'category_id' => $validated['category_id'],
            'image' => $imagePath,
            'author_image' => $authorImagePath,
            'date' => $validated['date'] ?? null,
            'read_time' => $read_time,
            'author' => $validated['author'] ?? null,
            'author_bio' => $validated['author_bio'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'is_published' => $is_published,
            'featured' => $featured,
            'sort_order' => $sort_order,
        ]);
        if (!$article) {
        } else {
        }
        return redirect()->route('admin.articles.index')
            ->with('success', 'تم إنشاء المقال بنجاح');
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return Inertia::render('Admin/Articles/Show', [
            'article' => $article
        ]);
    }

    public function edit($id)
    {
        $article = Article::findOrFail($id);
        $categories = Article::getCategories();
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $article = Article::findOrFail($id);
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'slug' => 'required|string|max:255|unique:articles,slug,' . $id,
                'content' => 'required|string',
                'excerpt' => 'nullable|string',
                'category_id' => 'required|integer|exists:categories,id',
                'image' => 'nullable|file|image|max:2048',
                'is_published' => 'boolean',
                'featured' => 'boolean',
                'sort_order' => 'nullable|integer|min:0',
                'read_time' => 'nullable|integer|min:1',
                'author' => 'nullable|string',
                'author_bio' => 'nullable|string',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'author_image' => 'nullable|file|image|max:2048',
                'date' => 'nullable|date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        }

        $is_published = $request->boolean('is_published');
        $featured = $request->boolean('featured');
        $sort_order = (int) $request->input('sort_order', 0);
        $read_time = (int) $request->input('read_time', 0);

        $imagePath = $article->image;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }
        $authorImagePath = $article->author_image;
        if ($request->hasFile('author_image')) {
            $authorImagePath = $request->file('author_image')->store('authors', 'public');
        }

        $article->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'] ?? null,
            'category_id' => $validated['category_id'],
            'image' => $imagePath,
            'author_image' => $authorImagePath,
            'date' => $validated['date'] ?? null,
            'read_time' => $read_time,
            'author' => $validated['author'] ?? null,
            'author_bio' => $validated['author_bio'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'is_published' => $is_published,
            'featured' => $featured,
            'sort_order' => $sort_order,
        ]);

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم تحديث المقال بنجاح');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم حذف المقال بنجاح');
    }
}
