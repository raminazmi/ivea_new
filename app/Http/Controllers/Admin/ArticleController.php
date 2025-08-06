<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Articles/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        Article::create($validated);

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم إنشاء المقال بنجاح');
    }

    public function show(Article $article)
    {
        return Inertia::render('Admin/Articles/Show', [
            'article' => $article
        ]);
    }

    public function edit(Article $article)
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article
        ]);
    }

    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:articles,slug,' . $article->id,
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $article->update($validated);

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
