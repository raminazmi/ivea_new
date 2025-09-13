<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Models\LandingPageSection;
use App\Models\PreparingForSummer;
use App\Models\Offer;
use App\Models\OffersText;
use App\Models\FeaturedOffersSetting;
use App\Models\NationalDayOffer;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    public function index(): Response
    {
        $heroSlides = HeroSlide::ordered()->get();
        $preparingForSummer = PreparingForSummer::first();
        $featuredOffers = Offer::with('offersText')->ordered()->get();
        $offersTexts = OffersText::getActiveTexts();
        $featuredOffersSettings = FeaturedOffersSetting::first();
        $nationalDayOffer = NationalDayOffer::first();

        return Inertia::render('Admin/LandingPage/Index', [
            'heroSlides' => $heroSlides,
            'preparingForSummer' => $preparingForSummer,
            'featuredOffers' => $featuredOffers,
            'offersTexts' => $offersTexts,
            'featuredOffersSettings' => $featuredOffersSettings,
            'nationalDayOffer' => $nationalDayOffer
        ]);
    }

    public function createSlide(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateSlide');
    }

    public function storeSlide(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ]);
        $nextOrder = HeroSlide::max('sort_order') + 1;
        $defaultTitles = [
            'إيفيا # تشاركك_ذوقك',
            'تفاصيل تلامس حواسك',
            'عروض حصرية لفترة محدودة',
            'جودة استثنائية في كل تفصيل',
            'أحدث التصاميم والألوان',
            'راحة وأناقة في كل تصميم'
        ];

        $defaultSubtitles = [
            'تفاصيل تلامس حواسك',
            'جودة استثنائية في كل تفصيل',
            'خصومات حصرية لفترة محدودة',
            'مكان جلوس مريح',
            'اكتشف مجموعتنا الجديدة',
            'تصميمات عصرية وأنيقة'
        ];

        $defaultButtonTexts = [
            'تسوق الآن',
            'اكتشف المجموعة',
            'احصل على العرض',
            'عرض المزيد',
            'شاهد الجديد',
            'استكشف منتجاتنا'
        ];

        $defaultButtonUrls = [
            '/products',
            '/products?tab=featured',
            '/products?tab=offers',
            '/products?tab=new',
            '/products?tab=bestsellers',
            '/products'
        ];
        $titleIndex = ($nextOrder - 1) % count($defaultTitles);
        $subtitleIndex = ($nextOrder - 1) % count($defaultSubtitles);
        $buttonTextIndex = ($nextOrder - 1) % count($defaultButtonTexts);
        $buttonUrlIndex = ($nextOrder - 1) % count($defaultButtonUrls);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hero-slides', 'public');
            $originalName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($originalName, PATHINFO_FILENAME);

            $slideData = [
                'title' => $validated['title'] ?? $defaultTitles[$titleIndex], // استخدام العنوان من المستخدم أو الافتراضي
                'subtitle' => $defaultSubtitles[$subtitleIndex],
                'image_path' => $imagePath,
                'alt_text' => $fileName,
                'link_url' => $defaultButtonUrls[$buttonUrlIndex],
                'link_text' => 'استكشف منتجاتنا',
                'button_text' => $defaultButtonTexts[$buttonTextIndex],
                'button_url' => $defaultButtonUrls[$buttonUrlIndex],
                'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : true,
                'sort_order' => $nextOrder
            ];
            HeroSlide::create($slideData);
        } else {
        }

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء الشريحة بنجاح');
    }

    public function editSlide(HeroSlide $heroSlide): Response
    {
        return Inertia::render('Admin/LandingPage/EditSlide', [
            'slide' => $heroSlide
        ]);
    }

    public function updateSlide(Request $request, HeroSlide $heroSlide): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_active' => 'nullable|boolean'
            ]);
        } catch (\Exception $e) {
            throw $e;
        }

        $defaultTitles = [
            'إيفيا # تشاركك_ذوقك',
            'تفاصيل تلامس حواسك',
            'عروض حصرية لفترة محدودة',
            'جودة استثنائية في كل تفصيل',
            'أحدث التصاميم والألوان',
            'راحة وأناقة في كل تصميم'
        ];

        $defaultSubtitles = [
            'تفاصيل تلامس حواسك',
            'جودة استثنائية في كل تفصيل',
            'خصومات حصرية لفترة محدودة',
            'مكان جلوس مريح',
            'اكتشف مجموعتنا الجديدة',
            'تصميمات عصرية وأنيقة'
        ];

        $defaultButtonTexts = [
            'تسوق الآن',
            'اكتشف المجموعة',
            'احصل على العرض',
            'عرض المزيد',
            'شاهد الجديد',
            'استكشف منتجاتنا'
        ];

        $defaultButtonUrls = [
            '/products',
            '/products?tab=featured',
            '/products?tab=offers',
            '/products?tab=new',
            '/products?tab=bestsellers',
            '/products'
        ];

        $titleIndex = ($heroSlide->sort_order - 1) % count($defaultTitles);
        $subtitleIndex = ($heroSlide->sort_order - 1) % count($defaultSubtitles);
        $buttonTextIndex = ($heroSlide->sort_order - 1) % count($defaultButtonTexts);
        $buttonUrlIndex = ($heroSlide->sort_order - 1) % count($defaultButtonUrls);

        $updateData = [
            'title' => $validated['title'], // استخدام العنوان من المستخدم
            'subtitle' => $defaultSubtitles[$subtitleIndex],
            'link_url' => $defaultButtonUrls[$buttonUrlIndex],
            'link_text' => 'استكشف منتجاتنا',
            'button_text' => $defaultButtonTexts[$buttonTextIndex],
            'button_url' => $defaultButtonUrls[$buttonUrlIndex],
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : $heroSlide->is_active,
        ];

        if ($request->hasFile('image')) {
            if ($heroSlide->image_path) {
                Storage::disk('public')->delete($heroSlide->image_path);
            }
            $imagePath = $request->file('image')->store('hero-slides', 'public');
            $updateData['image_path'] = $imagePath;
            $originalName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($originalName, PATHINFO_FILENAME);
            $updateData['alt_text'] = $fileName;
        }

        $heroSlide->update($updateData);
        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث الشريحة بنجاح');
    }

    public function destroySlide(HeroSlide $heroSlide): RedirectResponse
    {
        if ($heroSlide->image_path) {
            Storage::disk('public')->delete($heroSlide->image_path);
        }

        $heroSlide->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف الشريحة بنجاح');
    }

    public function createSection(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateSection');
    }

    public function storeSection(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'section_key' => 'required|string|max:255|unique:landing_page_sections,section_key',
            'title_ar' => 'required|string|max:255',
            'subtitle_ar' => 'nullable|string|max:255',
            'description_ar' => 'nullable|string',
            'button_text_ar' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'settings' => 'nullable|array'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('landing-sections', 'public');
            $validated['image_path'] = $imagePath;
        }

        if ($request->hasFile('background_image')) {
            $backgroundImagePath = $request->file('background_image')->store('landing-sections', 'public');
            $validated['background_image_path'] = $backgroundImagePath;
        }

        LandingPageSection::create($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء القسم بنجاح');
    }

    public function editSection(LandingPageSection $section): Response
    {
        return Inertia::render('Admin/LandingPage/EditSection', [
            'section' => $section
        ]);
    }

    public function updateSection(Request $request, LandingPageSection $section): RedirectResponse
    {
        $validated = $request->validate([
            'section_key' => 'required|string|max:255|unique:landing_page_sections,section_key,' . $section->id,
            'title_ar' => 'required|string|max:255',
            'subtitle_ar' => 'nullable|string|max:255',
            'description_ar' => 'nullable|string',
            'button_text_ar' => 'nullable|string|max:255',
            'button_url' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
            'settings' => 'nullable|array'
        ]);

        if ($request->hasFile('image')) {
            if ($section->image_path) {
                Storage::disk('public')->delete($section->image_path);
            }
            $imagePath = $request->file('image')->store('landing-sections', 'public');
            $validated['image_path'] = $imagePath;
        }

        if ($request->hasFile('background_image')) {
            if ($section->background_image_path) {
                Storage::disk('public')->delete($section->background_image_path);
            }
            $backgroundImagePath = $request->file('background_image')->store('landing-sections', 'public');
            $validated['background_image_path'] = $backgroundImagePath;
        }

        $section->update($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث القسم بنجاح');
    }

    public function destroySection(LandingPageSection $section): RedirectResponse
    {
        if ($section->image_path) {
            Storage::disk('public')->delete($section->image_path);
        }

        if ($section->background_image_path) {
            Storage::disk('public')->delete($section->background_image_path);
        }

        $section->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف القسم بنجاح');
    }

    public function updateSlidesOrder(Request $request): RedirectResponse
    {
        $request->validate([
            'slides' => 'required|array',
            'slides.*.id' => 'required|exists:hero_slides,id',
            'slides.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($request->slides as $slide) {
            HeroSlide::where('id', $slide['id'])
                ->update(['sort_order' => $slide['sort_order']]);
        }

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث ترتيب الشرائح بنجاح');
    }

    public function updateSectionsOrder(Request $request): RedirectResponse
    {
        $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|exists:landing_page_sections,id',
            'sections.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($request->sections as $section) {
            LandingPageSection::where('id', $section['id'])
                ->update(['sort_order' => $section['sort_order']]);
        }

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث ترتيب الأقسام بنجاح');
    }

    public function createPreparingForSummer(): Response
    {
        return Inertia::render('Admin/LandingPage/CreatePreparingForSummer');
    }

    public function storePreparingForSummer(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'button_text_ar' => 'required|string|max:255',
            'button_url' => 'required|string|max:255',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_1_alt' => 'nullable|string|max:255',
            'image_1_url' => 'nullable|string|max:255',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_2_alt' => 'nullable|string|max:255',
            'image_2_url' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image_1')) {
            $image1Path = $request->file('image_1')->store('preparing-for-summer', 'public');
            $validated['image_1_path'] = $image1Path;
        }

        if ($request->hasFile('image_2')) {
            $image2Path = $request->file('image_2')->store('preparing-for-summer', 'public');
            $validated['image_2_path'] = $image2Path;
        }

        PreparingForSummer::create($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء سكشن Preparing For Summer بنجاح');
    }

    public function editPreparingForSummer(PreparingForSummer $preparingForSummer): Response
    {
        return Inertia::render('Admin/LandingPage/EditPreparingForSummer', [
            'preparingForSummer' => $preparingForSummer
        ]);
    }

    public function updatePreparingForSummer(Request $request, PreparingForSummer $preparingForSummer): RedirectResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'button_text_ar' => 'required|string|max:255',
            'button_url' => 'required|string|max:255',
            'image_1' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_1_alt' => 'nullable|string|max:255',
            'image_1_url' => 'nullable|string|max:255',
            'image_2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_2_alt' => 'nullable|string|max:255',
            'image_2_url' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('image_1')) {
            if ($preparingForSummer->image_1_path) {
                Storage::disk('public')->delete($preparingForSummer->image_1_path);
            }
            $image1Path = $request->file('image_1')->store('preparing-for-summer', 'public');
            $validated['image_1_path'] = $image1Path;
        }

        if ($request->hasFile('image_2')) {
            if ($preparingForSummer->image_2_path) {
                Storage::disk('public')->delete($preparingForSummer->image_2_path);
            }
            $image2Path = $request->file('image_2')->store('preparing-for-summer', 'public');
            $validated['image_2_path'] = $image2Path;
        }

        $preparingForSummer->update($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث سكشن Preparing For Summer بنجاح');
    }

    public function destroyPreparingForSummer(PreparingForSummer $preparingForSummer): RedirectResponse
    {
        if ($preparingForSummer->image_1_path) {
            Storage::disk('public')->delete($preparingForSummer->image_1_path);
        }

        if ($preparingForSummer->image_2_path) {
            Storage::disk('public')->delete($preparingForSummer->image_2_path);
        }

        $preparingForSummer->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف سكشن Preparing For Summer بنجاح');
    }

    public function createFeaturedOffer(): Response
    {
        $offersTexts = OffersText::where('is_active', true)->orderBy('sort_order')->get();
        $featuredOffersSettings = FeaturedOffersSetting::where('is_active', true)->get();
        $categories = [
            ['slug' => 'curtains', 'name' => 'ستائر'],
            ['slug' => 'sofas', 'name' => 'أرائك'],
            ['slug' => 'cabinets', 'name' => 'خزائن'],
            ['slug' => 'wooden', 'name' => 'خشبي']
        ];

        return Inertia::render('Admin/LandingPage/CreateFeaturedOffer', [
            'offersTexts' => $offersTexts,
            'featuredOffersSettings' => $featuredOffersSettings,
            'categories' => $categories
        ]);
    }

    public function storeFeaturedOffer(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'category_name' => 'required|string|max:255',
            'offers_text_id' => 'nullable|exists:offers_texts,id',
            'featured_offers_setting_id' => 'nullable|exists:featured_offers_settings,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('featured-offers', 'public');
            $data['image_path'] = $imagePath;
        }

        Offer::create($data);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء العرض المميز بنجاح');
    }

    public function editFeaturedOffer(Offer $offer): Response
    {
        $offersTexts = OffersText::where('is_active', true)->orderBy('sort_order')->get();
        $featuredOffersSettings = FeaturedOffersSetting::where('is_active', true)->get();
        $categories = [
            ['slug' => 'curtains', 'name' => 'ستائر'],
            ['slug' => 'sofas', 'name' => 'أرائك'],
            ['slug' => 'cabinets', 'name' => 'خزائن'],
            ['slug' => 'wooden', 'name' => 'خشبي']
        ];

        return Inertia::render('Admin/LandingPage/EditFeaturedOffer', [
            'offer' => $offer,
            'offersTexts' => $offersTexts,
            'featuredOffersSettings' => $featuredOffersSettings,
            'categories' => $categories
        ]);
    }

    public function updateFeaturedOffer(Request $request, Offer $offer): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'category_slug' => 'required|string|in:curtains,sofas,cabinets,wooden',
            'category_name' => 'required|string|max:255',
            'offers_text_id' => 'nullable|exists:offers_texts,id',
            'featured_offers_setting_id' => 'nullable|exists:featured_offers_settings,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ]);

        $data = $validated;

        if ($request->hasFile('image')) {
            if ($offer->image_path) {
                Storage::disk('public')->delete($offer->image_path);
            }

            $imagePath = $request->file('image')->store('featured-offers', 'public');
            $data['image_path'] = $imagePath;
        }

        $offer->update($data);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث العرض المميز بنجاح');
    }

    public function destroyFeaturedOffer(Offer $offer): RedirectResponse
    {
        if ($offer->image_path) {
            Storage::disk('public')->delete($offer->image_path);
        }

        $offer->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف العرض المميز بنجاح');
    }

    public function updateFeaturedOfferStatus(Request $request, Offer $offer): RedirectResponse
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean'
        ]);

        $offer->update($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث حالة العرض بنجاح');
    }

    public function createFeaturedOffersSettings(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateFeaturedOffersSettings');
    }

    public function storeFeaturedOffersSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'button_text_ar' => 'required|string|max:255',
            'button_url' => 'required|string|max:255',
            'is_active' => 'boolean'
        ]);

        FeaturedOffersSetting::create($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء إعدادات العروض المميزة بنجاح');
    }

    public function editFeaturedOffersSettings(FeaturedOffersSetting $featuredOffersSetting): Response
    {
        return Inertia::render('Admin/LandingPage/EditFeaturedOffersSettings', [
            'featuredOffersSetting' => $featuredOffersSetting
        ]);
    }

    public function updateFeaturedOffersSettings(Request $request, FeaturedOffersSetting $featuredOffersSetting): RedirectResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'button_text_ar' => 'required|string|max:255',
            'button_url' => 'required|string|max:255',
            'is_active' => 'boolean'
        ]);

        $featuredOffersSetting->update($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث إعدادات العروض المميزة بنجاح');
    }

    public function destroyFeaturedOffersSettings(FeaturedOffersSetting $featuredOffersSetting): RedirectResponse
    {
        $featuredOffersSetting->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف إعدادات العروض المميزة بنجاح');
    }

    public function createOffersText(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateOffersText');
    }

    public function storeOffersText(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:offers_texts,key',
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        OffersText::create($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء نص العرض بنجاح');
    }

    public function editOffersText(OffersText $offersText): Response
    {
        return Inertia::render('Admin/LandingPage/EditOffersText', [
            'offersText' => $offersText
        ]);
    }

    public function updateOffersText(Request $request, OffersText $offersText): RedirectResponse
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:offers_texts,key,' . $offersText->id,
            'title_ar' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $offersText->update($validated);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث نص العرض بنجاح');
    }

    public function destroyOffersText(OffersText $offersText): RedirectResponse
    {
        $relatedOffers = Offer::where('offers_text_id', $offersText->id)->count();

        if ($relatedOffers > 0) {
            return redirect()->route('admin.landing-page.index')
                ->with('error', 'لا يمكن حذف هذا النص لأنه مرتبط بعروض موجودة');
        }

        $offersText->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف نص العرض بنجاح');
    }

    public function toggleOffersTextStatus(OffersText $offersText): RedirectResponse
    {
        $offersText->update(['is_active' => !$offersText->is_active]);

        $status = $offersText->is_active ? 'تفعيل' : 'إلغاء تفعيل';

        return redirect()->route('admin.landing-page.index')
            ->with('success', "تم {$status} نص العرض بنجاح");
    }

    public function toggleFeaturedOffersSettingStatus(FeaturedOffersSetting $featuredOffersSetting): RedirectResponse
    {
        FeaturedOffersSetting::where('id', '!=', $featuredOffersSetting->id)->update(['is_active' => false]);
        $featuredOffersSetting->update(['is_active' => !$featuredOffersSetting->is_active]);
        $status = $featuredOffersSetting->is_active ? 'تفعيل' : 'إلغاء تفعيل';

        return redirect()->route('admin.landing-page.index')
            ->with('success', "تم {$status} إعدادات العروض المميزة بنجاح");
    }

    public function createNationalDayOffer(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateNationalDayOffer');
    }

    public function storeNationalDayOffer(Request $request): RedirectResponse
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

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء سكشن عرض اليوم الوطني بنجاح');
    }

    public function editNationalDayOffer(NationalDayOffer $nationalDayOffer): Response
    {
        return Inertia::render('Admin/LandingPage/EditNationalDayOffer', [
            'nationalDayOffer' => $nationalDayOffer
        ]);
    }

    public function updateNationalDayOffer(Request $request, NationalDayOffer $nationalDayOffer): RedirectResponse
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

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث سكشن عرض اليوم الوطني بنجاح');
    }

    public function destroyNationalDayOffer(NationalDayOffer $nationalDayOffer): RedirectResponse
    {
        if ($nationalDayOffer->offer1_image_path) {
            Storage::disk('public')->delete($nationalDayOffer->offer1_image_path);
        }
        if ($nationalDayOffer->offer2_image_path) {
            Storage::disk('public')->delete($nationalDayOffer->offer2_image_path);
        }

        $nationalDayOffer->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف سكشن عرض اليوم الوطني بنجاح');
    }

    public function toggleNationalDayOfferStatus(NationalDayOffer $nationalDayOffer): RedirectResponse
    {
        $nationalDayOffer->update(['is_active' => !$nationalDayOffer->is_active]);

        $status = $nationalDayOffer->is_active ? 'تفعيل' : 'إلغاء تفعيل';

        return redirect()->route('admin.landing-page.index')
            ->with('success', "تم {$status} سكشن عرض اليوم الوطني بنجاح");
    }
}
