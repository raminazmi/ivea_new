<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Models\LandingPageSection;
use App\Models\PreparingForSummer;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    /**
     * عرض صفحة إدارة الصفحة الرئيسية
     */
    public function index(): Response
    {
        $heroSlides = HeroSlide::ordered()->get();
        $preparingForSummer = PreparingForSummer::first();

        return Inertia::render('Admin/LandingPage/Index', [
            'heroSlides' => $heroSlides,
            'preparingForSummer' => $preparingForSummer
        ]);
    }

    // ========== Hero Slides Management ==========

    /**
     * عرض صفحة إنشاء شريحة جديدة
     */
    public function createSlide(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateSlide');
    }

    /**
     * حفظ شريحة جديدة
     */
    public function storeSlide(Request $request): RedirectResponse
    {
        \Log::info('StoreSlide: Starting validation', [
            'request_data' => $request->all(),
            'has_file' => $request->hasFile('image')
        ]);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean'
        ]);

        \Log::info('StoreSlide: Validation passed', [
            'validated_data' => $validated
        ]);

        // حساب ترتيب العرض تلقائياً
        $nextOrder = HeroSlide::max('sort_order') + 1;

        // قيم افتراضية للنصوص
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

        // اختيار النصوص بناءً على ترتيب الشريحة
        $titleIndex = ($nextOrder - 1) % count($defaultTitles);
        $subtitleIndex = ($nextOrder - 1) % count($defaultSubtitles);
        $buttonTextIndex = ($nextOrder - 1) % count($defaultButtonTexts);
        $buttonUrlIndex = ($nextOrder - 1) % count($defaultButtonUrls);

        if ($request->hasFile('image')) {
            \Log::info('StoreSlide: Processing image upload');

            $imagePath = $request->file('image')->store('hero-slides', 'public');
            \Log::info('StoreSlide: Image stored', ['image_path' => $imagePath]);

            // استخراج اسم الملف للاستخدام كنص بديل
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

            \Log::info('StoreSlide: Creating slide with data', ['slide_data' => $slideData]);
            HeroSlide::create($slideData);
            \Log::info('StoreSlide: Slide created successfully');
        } else {
            \Log::error('StoreSlide: No image file found');
        }

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم إنشاء الشريحة بنجاح');
    }

    /**
     * عرض صفحة تعديل شريحة
     */
    public function editSlide(HeroSlide $heroSlide): Response
    {
        return Inertia::render('Admin/LandingPage/EditSlide', [
            'slide' => $heroSlide
        ]);
    }

    /**
     * تحديث شريحة
     */
    public function updateSlide(Request $request, HeroSlide $heroSlide): RedirectResponse
    {
        try {
            \Log::info('UpdateSlide: Starting validation', [
                'slide_id' => $heroSlide->id,
                'request_data' => $request->all(),
                'request_method' => $request->method(),
                'content_type' => $request->header('Content-Type'),
                'has_file' => $request->hasFile('image'),
                'input_data' => $request->input(),
                'files_data' => $request->allFiles()
            ]);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_active' => 'nullable|boolean'
            ]);
        } catch (\Exception $e) {
            \Log::error('UpdateSlide: Validation failed', [
                'error' => $e->getMessage(),
                'request_data' => $request->all()
            ]);
            throw $e;
        }

        \Log::info('UpdateSlide: Validation passed', [
            'validated_data' => $validated
        ]);

        // قيم افتراضية للنصوص
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

        // اختيار النصوص بناءً على ترتيب الشريحة الحالي
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
            // حذف الصورة القديمة
            if ($heroSlide->image_path) {
                Storage::disk('public')->delete($heroSlide->image_path);
            }
            $imagePath = $request->file('image')->store('hero-slides', 'public');
            $updateData['image_path'] = $imagePath;

            // استخراج اسم الملف للاستخدام كنص بديل
            $originalName = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($originalName, PATHINFO_FILENAME);
            $updateData['alt_text'] = $fileName;
        }

        $heroSlide->update($updateData);

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم تحديث الشريحة بنجاح');
    }

    /**
     * حذف شريحة
     */
    public function destroySlide(HeroSlide $heroSlide): RedirectResponse
    {
        if ($heroSlide->image_path) {
            Storage::disk('public')->delete($heroSlide->image_path);
        }

        $heroSlide->delete();

        return redirect()->route('admin.landing-page.index')
            ->with('success', 'تم حذف الشريحة بنجاح');
    }

    // ========== Landing Page Sections Management ==========

    /**
     * عرض صفحة إنشاء قسم جديد
     */
    public function createSection(): Response
    {
        return Inertia::render('Admin/LandingPage/CreateSection');
    }

    /**
     * حفظ قسم جديد
     */
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

    /**
     * عرض صفحة تعديل قسم
     */
    public function editSection(LandingPageSection $section): Response
    {
        return Inertia::render('Admin/LandingPage/EditSection', [
            'section' => $section
        ]);
    }

    /**
     * تحديث قسم
     */
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
            // حذف الصورة القديمة
            if ($section->image_path) {
                Storage::disk('public')->delete($section->image_path);
            }
            $imagePath = $request->file('image')->store('landing-sections', 'public');
            $validated['image_path'] = $imagePath;
        }

        if ($request->hasFile('background_image')) {
            // حذف صورة الخلفية القديمة
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

    /**
     * حذف قسم
     */
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

    /**
     * تحديث ترتيب الشرائح
     */
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

    /**
     * تحديث ترتيب الأقسام
     */
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

    // ========== Preparing For Summer Management ==========

    /**
     * عرض صفحة إنشاء سكشن Preparing For Summer
     */
    public function createPreparingForSummer(): Response
    {
        return Inertia::render('Admin/LandingPage/CreatePreparingForSummer');
    }

    /**
     * حفظ سكشن Preparing For Summer جديد
     */
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

        // رفع الصور
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

    /**
     * عرض صفحة تعديل سكشن Preparing For Summer
     */
    public function editPreparingForSummer(PreparingForSummer $preparingForSummer): Response
    {
        return Inertia::render('Admin/LandingPage/EditPreparingForSummer', [
            'preparingForSummer' => $preparingForSummer
        ]);
    }

    /**
     * تحديث سكشن Preparing For Summer
     */
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

        // رفع الصور الجديدة وحذف القديمة
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

    /**
     * حذف سكشن Preparing For Summer
     */
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
}
