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
        \Log::info('Article Creation Started', [
            'request_data' => $request->all(),
            'has_image' => $request->hasFile('image'),
            'has_author_image' => $request->hasFile('author_image')
        ]);

        try {
            \Log::info('Starting Validation for Creation', [
                'request_all' => $request->all(),
                'request_files' => $request->files->all()
            ]);

            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'slug' => 'nullable|string|max:255|unique:articles,slug',
                'content' => 'nullable|string',
                'excerpt' => 'nullable|string',
                'category_id' => 'nullable|integer|exists:categories,id',
                'image' => 'nullable|file|image|max:2048',
                'is_published' => 'nullable|boolean',
                'featured' => 'nullable|boolean',
                'sort_order' => 'nullable|integer|min:0',
                'read_time' => 'nullable|integer|min:1',
                'author' => 'nullable|string',
                'author_bio' => 'nullable|string',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'author_image' => 'nullable|file|image|max:2048',
                'date' => 'nullable|date',
            ]);

            \Log::info('Validation Passed for Article Creation', [
                'validated_data' => $validated
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation Failed for Article Creation', [
                'errors' => $e->errors()
            ]);
            throw $e;
        }

        $is_published = $request->boolean('is_published');
        $featured = $request->boolean('featured');
        $sort_order = (int) $request->input('sort_order', 0);
        $read_time = (int) $request->input('read_time', 0);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = '/storage/' . $request->file('image')->store('articles', 'public');
        }
        $authorImagePath = null;
        if ($request->hasFile('author_image')) {
            $authorImagePath = '/storage/' . $request->file('author_image')->store('authors', 'public');
        }

        // إنشاء slug تلقائي إذا لم يتم توفيره
        $slug = $validated['slug'] ?? '';
        if (empty($slug) && !empty($validated['title'])) {
            $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9\x{0600}-\x{06FF}\-]+/u', '', str_replace(' ', '-', $validated['title']))));
        }

        $createData = [
            'title' => $validated['title'] ?? '',
            'slug' => $slug,
            'content' => $validated['content'] ?? '',
            'excerpt' => $validated['excerpt'] ?? null,
            'category_id' => isset($validated['category_id']) && $validated['category_id'] ? (int) $validated['category_id'] : null,
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
        ];

        \Log::info('Creating Article', [
            'create_data' => $createData
        ]);

        $article = Article::create($createData);

        if (!$article) {
            \Log::error('Article Creation Failed');
        } else {
            \Log::info('Article Created Successfully', [
                'article_id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug
            ]);
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
        \Log::info('Article Update Started', [
            'article_id' => $id,
            'request_data' => $request->all(),
            'has_image' => $request->hasFile('image'),
            'has_author_image' => $request->hasFile('author_image')
        ]);

        $article = Article::findOrFail($id);

        \Log::info('Article Found', [
            'article_id' => $article->id,
            'current_title' => $article->title,
            'current_slug' => $article->slug
        ]);

        try {
            \Log::info('Starting Validation', [
                'request_all' => $request->all(),
                'request_files' => $request->files->all()
            ]);

            $validated = $request->validate([
                'title' => 'nullable|string|max:255',
                'slug' => 'nullable|string|max:255|unique:articles,slug,' . $id,
                'content' => 'nullable|string',
                'excerpt' => 'nullable|string',
                'category_id' => 'nullable|integer|exists:categories,id',
                'image' => 'nullable|file|image|max:2048',
                'is_published' => 'nullable|boolean',
                'featured' => 'nullable|boolean',
                'sort_order' => 'nullable|integer|min:0',
                'read_time' => 'nullable|integer|min:1',
                'author' => 'nullable|string',
                'author_bio' => 'nullable|string',
                'meta_description' => 'nullable|string',
                'meta_keywords' => 'nullable|string',
                'author_image' => 'nullable|file|image|max:2048',
                'date' => 'nullable|date',
            ]);

            \Log::info('Validation Passed', [
                'validated_data' => $validated
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation Failed', [
                'article_id' => $id,
                'errors' => $e->errors()
            ]);
            throw $e;
        }

        $is_published = $request->boolean('is_published');
        $featured = $request->boolean('featured');
        $sort_order = (int) $request->input('sort_order', 0);
        $read_time = (int) $request->input('read_time', 0);

        \Log::info('Processing Data', [
            'is_published' => $is_published,
            'featured' => $featured,
            'sort_order' => $sort_order,
            'read_time' => $read_time
        ]);

        $imagePath = $article->image;
        if ($request->hasFile('image')) {
            $imagePath = '/storage/' . $request->file('image')->store('articles', 'public');
            \Log::info('Image Uploaded', ['new_image_path' => $imagePath]);
        }
        $authorImagePath = $article->author_image;
        if ($request->hasFile('author_image')) {
            $authorImagePath = '/storage/' . $request->file('author_image')->store('authors', 'public');
            \Log::info('Author Image Uploaded', ['new_author_image_path' => $authorImagePath]);
        }

        // إنشاء slug تلقائي إذا لم يتم توفيره
        $slug = $validated['slug'] ?? $article->slug;
        if (empty($slug) && !empty($validated['title'])) {
            $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9\x{0600}-\x{06FF}\-]+/u', '', str_replace(' ', '-', $validated['title']))));
            \Log::info('Slug Generated', ['new_slug' => $slug, 'from_title' => $validated['title']]);
        }

        $updateData = [
            'title' => $validated['title'] ?? $article->title,
            'slug' => $slug,
            'content' => $validated['content'] ?? $article->content,
            'excerpt' => $validated['excerpt'] ?? $article->excerpt,
            'category_id' => isset($validated['category_id']) && $validated['category_id'] ? (int) $validated['category_id'] : $article->category_id,
            'image' => $imagePath,
            'author_image' => $authorImagePath,
            'date' => $validated['date'] ?? $article->date,
            'read_time' => $read_time,
            'author' => $validated['author'] ?? $article->author,
            'author_bio' => $validated['author_bio'] ?? $article->author_bio,
            'meta_description' => $validated['meta_description'] ?? $article->meta_description,
            'meta_keywords' => $validated['meta_keywords'] ?? $article->meta_keywords,
            'is_published' => $is_published,
            'featured' => $featured,
            'sort_order' => $sort_order,
        ];

        \Log::info('Updating Article', [
            'article_id' => $article->id,
            'update_data' => $updateData
        ]);

        $article->update($updateData);

        \Log::info('Article Updated Successfully', [
            'article_id' => $article->id,
            'new_title' => $article->title,
            'new_slug' => $article->slug
        ]);

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم تحديث المقال بنجاح');
    }

    public function destroy(Article $article): RedirectResponse
    {
        \Log::info('Article Deletion Started', [
            'article_id' => $article->id,
            'title' => $article->title,
            'slug' => $article->slug
        ]);

        $article->delete();

        \Log::info('Article Deleted Successfully', [
            'article_id' => $article->id,
            'title' => $article->title
        ]);

        return redirect()->route('admin.articles.index')
            ->with('success', 'تم حذف المقال بنجاح');
    }
}
