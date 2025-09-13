<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NationalDayOffer;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class NationalDayOfferController extends Controller
{
    public function index(): Response
    {
        $nationalDayOffer = NationalDayOffer::first();

        return Inertia::render('Admin/NationalDayOffer/Index', [
            'nationalDayOffer' => $nationalDayOffer
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/NationalDayOffer/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'button_text_ar' => 'required|string|max:255',
            'button_url' => 'required|string|max:255',
            'offer1_title' => 'required|string|max:255',
            'offer1_discount_percentage' => 'required|integer|min:1|max:100',
            'offer1_category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'offer1_category_name' => 'required|string|max:255',
            'offer1_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'offer1_link' => 'required|string|max:255',
            'offer2_title' => 'required|string|max:255',
            'offer2_discount_percentage' => 'required|integer|min:1|max:100',
            'offer2_category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'offer2_category_name' => 'required|string|max:255',
            'offer2_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'offer2_link' => 'required|string|max:255',
            'is_active' => 'boolean'
        ]);

        $data = $validated;

        if ($request->hasFile('offer1_image')) {
            $imagePath = $request->file('offer1_image')->store('national-day-offers', 'public');
            $data['offer1_image_path'] = $imagePath;
        }

        if ($request->hasFile('offer2_image')) {
            $imagePath = $request->file('offer2_image')->store('national-day-offers', 'public');
            $data['offer2_image_path'] = $imagePath;
        }

        NationalDayOffer::create($data);

        return redirect()->route('admin.national-day-offer.index')
            ->with('success', 'تم إنشاء سكشن عرض اليوم الوطني بنجاح');
    }

    public function edit(NationalDayOffer $nationalDayOffer): Response
    {
        return Inertia::render('Admin/NationalDayOffer/Edit', [
            'nationalDayOffer' => $nationalDayOffer
        ]);
    }

    public function update(Request $request, NationalDayOffer $nationalDayOffer): RedirectResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'button_text_ar' => 'required|string|max:255',
            'button_url' => 'required|string|max:255',
            'offer1_title' => 'required|string|max:255',
            'offer1_discount_percentage' => 'required|integer|min:1|max:100',
            'offer1_category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'offer1_category_name' => 'required|string|max:255',
            'offer1_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'offer1_link' => 'required|string|max:255',
            'offer2_title' => 'required|string|max:255',
            'offer2_discount_percentage' => 'required|integer|min:1|max:100',
            'offer2_category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'offer2_category_name' => 'required|string|max:255',
            'offer2_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'offer2_link' => 'required|string|max:255',
            'is_active' => 'boolean'
        ]);

        $data = $validated;
        if ($request->hasFile('offer1_image')) {
            if ($nationalDayOffer->offer1_image_path) {
                Storage::disk('public')->delete($nationalDayOffer->offer1_image_path);
            }
            $imagePath = $request->file('offer1_image')->store('national-day-offers', 'public');
            $data['offer1_image_path'] = $imagePath;
        }

        if ($request->hasFile('offer2_image')) {
            if ($nationalDayOffer->offer2_image_path) {
                Storage::disk('public')->delete($nationalDayOffer->offer2_image_path);
            }
            $imagePath = $request->file('offer2_image')->store('national-day-offers', 'public');
            $data['offer2_image_path'] = $imagePath;
        }

        $nationalDayOffer->update($data);

        return redirect()->route('admin.national-day-offer.index')
            ->with('success', 'تم تحديث سكشن عرض اليوم الوطني بنجاح');
    }

    public function destroy(NationalDayOffer $nationalDayOffer): RedirectResponse
    {
        if ($nationalDayOffer->offer1_image_path) {
            Storage::disk('public')->delete($nationalDayOffer->offer1_image_path);
        }
        if ($nationalDayOffer->offer2_image_path) {
            Storage::disk('public')->delete($nationalDayOffer->offer2_image_path);
        }

        $nationalDayOffer->delete();

        return redirect()->route('admin.national-day-offer.index')
            ->with('success', 'تم حذف سكشن عرض اليوم الوطني بنجاح');
    }

    public function toggleStatus(NationalDayOffer $nationalDayOffer): RedirectResponse
    {
        $nationalDayOffer->update(['is_active' => !$nationalDayOffer->is_active]);

        $status = $nationalDayOffer->is_active ? 'تفعيل' : 'إلغاء تفعيل';

        return redirect()->route('admin.national-day-offer.index')
            ->with('success', "تم {$status} سكشن عرض اليوم الوطني بنجاح");
    }
}
