<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ToolsAndGuidelinesController extends Controller
{
    public function index(Request $request)
    {
        $firstArticle = Article::published()
            ->ordered()
            ->first();

        $articleId = $request->query('article');
        $mainArticle = null;

        if ($articleId) {
            $mainArticle = Article::published()->find($articleId);
        }

        if (!$mainArticle) {
            $mainArticle = $firstArticle;
        }

        $latestArticles = Article::published()
            ->where('id', '!=', $mainArticle?->id)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $tools = Article::published()
            ->ordered()
            ->get();

        $categories = Article::getCategories();

        return Inertia::render('ToolsAndGuidelines', [
            'mainArticle' => $mainArticle,
            'latestArticles' => $latestArticles,
            'tools' => $tools,
            'categories' => $categories,
            'selectedArticleId' => $articleId
        ]);
    }

    public function show($slug)
    {
        $tool = Tool::where('slug', $slug)->published()->firstOrFail();

        return Inertia::render('ToolDetail', [
            'tool' => [
                'id' => $tool->id,
                'title' => $tool->title,
                'slug' => $tool->slug,
                'content' => $tool->content,
                'category' => $tool->category,
                'image' => $tool->image ?: '/images/building1.png',
                'date' => $tool->formatted_date,
                'readTime' => $tool->formatted_read_time,
                'author' => $tool->author,
                'authorImage' => $tool->author_image ?: '/images/pepole.png',
                'authorBio' => $tool->author_bio,
                'metaDescription' => $tool->meta_description,
                'metaKeywords' => $tool->meta_keywords,
            ],
        ]);
    }
}
