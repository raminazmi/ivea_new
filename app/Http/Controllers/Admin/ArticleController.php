<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Article::getCategories();

        return Inertia::render('Admin/Articles/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date' => 'required|date',
            'read_time' => 'required|integer|min:1|max:60',
            'author' => 'nullable|string|max:255',
            'author_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'author_bio' => 'nullable|string',
            'meta_description' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
            $data['image'] = '/storage/' . $imagePath;
        }

        // Handle author image upload
        if ($request->hasFile('author_image')) {
            $authorImagePath = $request->file('author_image')->store('authors', 'public');
            $data['author_image'] = '/storage/' . $authorImagePath;
        }

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        Article::create($data);

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم إنشاء المقالة بنجاح');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return Inertia::render('Admin/Articles/Show', [
            'article' => $article
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $categories = Article::getCategories();

        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date' => 'required|date',
            'read_time' => 'required|integer|min:1|max:60',
            'author' => 'nullable|string|max:255',
            'author_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'author_bio' => 'nullable|string',
            'meta_description' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($article->image && Storage::disk('public')->exists(str_replace('/storage/', '', $article->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $article->image));
            }

            $imagePath = $request->file('image')->store('articles', 'public');
            $data['image'] = '/storage/' . $imagePath;
        }



        // Handle author image upload
        if ($request->hasFile('author_image')) {
            // Delete old author image if exists
            if ($article->author_image && Storage::disk('public')->exists(str_replace('/storage/', '', $article->author_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $article->author_image));
            }

            $authorImagePath = $request->file('author_image')->store('authors', 'public');
            $data['author_image'] = '/storage/' . $authorImagePath;
        }

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم تحديث المقالة بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        // Delete images if they exist
        if ($article->image && Storage::disk('public')->exists(str_replace('/storage/', '', $article->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $article->image));
        }



        if ($article->author_image && Storage::disk('public')->exists(str_replace('/storage/', '', $article->author_image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $article->author_image));
        }

        $article->delete();

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم حذف المقالة بنجاح');
    }

    /**
     * Update sort order of articles
     */
    public function updateSortOrder(Request $request)
    {
        $request->validate([
            'articles' => 'required|array',
            'articles.*.id' => 'required|exists:articles,id',
            'articles.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($request->articles as $articleData) {
            Article::where('id', $articleData['id'])
                ->update(['sort_order' => $articleData['sort_order']]);
        }

        return response()->json(['message' => 'تم تحديث ترتيب المقالات بنجاح']);
    }
}
