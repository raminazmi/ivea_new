<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\OffersText;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offers = Offer::with('offersText')->ordered()->paginate(10);

        return Inertia::render('Admin/Offers/Index', [
            'offers' => $offers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $offersTexts = OffersText::where('is_active', true)->orderBy('sort_order')->get();

        return Inertia::render('Admin/Offers/Create', [
            'offersTexts' => $offersTexts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'category_name' => 'required|string|max:255',
            'offers_text_id' => 'nullable|exists:offers_texts,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('offers', 'public');
            $data['image_path'] = $imagePath;
        }

        Offer::create($data);

        return redirect()->route('admin.offers.index')
            ->with('success', 'تم إنشاء العرض بنجاح');
    }

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        return Inertia::render('Admin/Offers/Show', [
            'offer' => $offer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offer $offer)
    {
        $offersTexts = OffersText::where('is_active', true)->orderBy('sort_order')->get();

        return Inertia::render('Admin/Offers/Edit', [
            'offer' => $offer,
            'offersTexts' => $offersTexts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'category_name' => 'required|string|max:255',
            'offers_text_id' => 'nullable|exists:offers_texts,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->except('image');

        // رفع صورة جديدة إذا تم إرسالها
        if ($request->hasFile('image')) {
            // حذف الصورة القديمة
            if ($offer->image_path) {
                Storage::disk('public')->delete($offer->image_path);
            }

            $imagePath = $request->file('image')->store('offers', 'public');
            $data['image_path'] = $imagePath;
        }

        $offer->update($data);

        return redirect()->route('admin.offers.index')
            ->with('success', 'تم تحديث العرض بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        // حذف الصورة من التخزين
        if ($offer->image_path) {
            Storage::disk('public')->delete($offer->image_path);
        }

        $offer->delete();

        return redirect()->route('admin.offers.index')
            ->with('success', 'تم حذف العرض بنجاح');
    }
}
