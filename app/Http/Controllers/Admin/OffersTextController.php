<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OffersText;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OffersTextController extends Controller
{
    public function index(): Response
    {
        $texts = OffersText::orderBy('sort_order')->get();

        return Inertia::render('Admin/OffersTexts/Index', [
            'texts' => $texts
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/OffersTexts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:offers_texts,key',
            'title_ar' => 'nullable|string|max:255',
            'description_ar' => 'nullable|string',
            'title_en' => 'nullable|string|max:255',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        OffersText::create($validated);

        return redirect()->route('admin.offers-texts.index')
            ->with('success', 'تم إنشاء النص بنجاح');
    }

    public function show(OffersText $offersText): Response
    {
        return Inertia::render('Admin/OffersTexts/Show', [
            'text' => $offersText
        ]);
    }

    public function edit(OffersText $offersText): Response
    {
        return Inertia::render('Admin/OffersTexts/Edit', [
            'text' => $offersText
        ]);
    }

    public function update(Request $request, OffersText $offersText): RedirectResponse
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:offers_texts,key,' . $offersText->id,
            'title_ar' => 'nullable|string|max:255',
            'description_ar' => 'nullable|string',
            'title_en' => 'nullable|string|max:255',
            'description_en' => 'nullable|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $offersText->update($validated);

        return redirect()->route('admin.offers-texts.index')
            ->with('success', 'تم تحديث النص بنجاح');
    }

    public function destroy(OffersText $offersText): RedirectResponse
    {
        $offersText->delete();

        return redirect()->route('admin.offers-texts.index')
            ->with('success', 'تم حذف النص بنجاح');
    }
}
