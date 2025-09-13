<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\ToolsAndGuidelinesController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\LandingPageController;
use App\Http\Controllers\Admin\OffersTextController;
use App\Http\Controllers\Admin\NationalDayOfferController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\JobController as AdminJobController;
use App\Http\Controllers\Admin\OfferController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ToolController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/robots.txt', [SitemapController::class, 'robots'])->name('robots');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/user-dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('user.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Contact
Route::get('/contact', [ContactController::class, 'create'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// About
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Projects
Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::post('/projects/quiz', [ProjectController::class, 'submitQuiz'])->name('projects.quiz');
Route::post('/projects/calculate-cost', [ProjectController::class, 'calculateCost'])->name('projects.calculate-cost');
Route::post('/projects/submit', [ProjectController::class, 'submitProject'])->name('projects.submit');
Route::get('/api/projects', [ProjectController::class, 'getAll'])->name('api.projects.all');

// Products
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{id}/options', [ProductController::class, 'options'])->name('products.options');
Route::post('/products/{id}/calculate-price', [ProductController::class, 'calculatePrice'])->name('products.calculate-price');

// Tools and Guidelines
Route::get('/tools-and-guidelines', [ToolsAndGuidelinesController::class, 'index'])->name('tools.index');
Route::get('/tools-and-guidelines/{slug}', [ToolsAndGuidelinesController::class, 'show'])->name('tools.show');

Route::get('/api/products', [ProductController::class, 'getAll'])->name('api.products.all');
Route::get('/api/products/tab/{tab}', [ProductController::class, 'getByTab'])->name('api.products.by-tab');
Route::get('/api/products/new', [ProductController::class, 'getNew'])->name('api.products.new');
Route::get('/api/products/offers', [ProductController::class, 'getOffers'])->name('api.products.offers');
Route::get('/api/products/bestsellers', [ProductController::class, 'getBestsellers'])->name('api.products.bestsellers');
Route::get('/api/products/category/{categorySlug}', [ProductController::class, 'getByCategorySlug'])->name('api.products.by-category');
Route::get('/api/products/filter-options', [ProductController::class, 'getFilterOptionsApi'])->name('api.products.filter-options');

// Jobs
Route::get('/jobs', [JobController::class, 'index'])->name('jobs');
Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');
Route::post('/jobs/apply', [JobController::class, 'apply'])->name('jobs.apply');
Route::get('/jobs/category/{category}', [JobController::class, 'getByCategory'])->name('jobs.by-category');
Route::get('/jobs/{id}/apply', [JobApplicationController::class, 'showApplyForm'])->name('jobs.apply.form');
Route::post('/jobs/{id}/apply', [JobApplicationController::class, 'store'])->name('jobs.apply.submit');

// Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    // Products
    Route::resource('products', AdminProductController::class);
    Route::post('products/{id}/tab-settings', [AdminProductController::class, 'updateTabSettings'])->name('products.tab-settings');
    Route::post('products/bulk-tab-settings', [AdminProductController::class, 'bulkUpdateTabSettings'])->name('products.bulk-tab-settings');
    Route::get('products/tab-statistics', [AdminProductController::class, 'getTabStatistics'])->name('products.tab-statistics');

    // Image Upload
    Route::post('upload/image', [ImageUploadController::class, 'upload'])->name('upload.image');
    Route::post('upload/images', [ImageUploadController::class, 'uploadMultiple'])->name('upload.images');
    Route::delete('upload/image', [ImageUploadController::class, 'delete'])->name('upload.delete');

    // Categories
    Route::resource('categories', CategoryController::class);
    Route::patch('categories/{id}/status', [CategoryController::class, 'updateStatus'])->name('categories.update-status');

    // Articles
    Route::resource('articles', ArticleController::class);

    // Offers Texts
    Route::resource('offers-texts', OffersTextController::class);

    // Tools
    Route::resource('tools', ToolController::class);
    Route::patch('tools/{id}/toggle-published', [ToolController::class, 'togglePublished'])->name('tools.toggle-published');
    Route::patch('tools/{id}/toggle-featured', [ToolController::class, 'toggleFeatured'])->name('tools.toggle-featured');

    // Jobs
    Route::resource('jobs', AdminJobController::class);

    // Applications
    Route::get('applications', [AdminJobController::class, 'applications'])->name('applications.index');
    Route::get('applications/{id}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::put('applications/{id}/status', [AdminJobController::class, 'updateApplicationStatus'])->name('applications.update-status');
    Route::delete('applications/{id}', [AdminJobController::class, 'deleteApplication'])->name('applications.destroy');
    Route::get('applications/{id}/download-cv', [AdminJobController::class, 'downloadCV'])->name('applications.download-cv');

    // Contacts
    Route::get('contacts', [AdminContactController::class, 'index'])->name('contacts.index');
    Route::put('contacts/{id}/status', [AdminContactController::class, 'updateStatus'])->name('contacts.update-status');
    Route::delete('contacts/{id}', [AdminContactController::class, 'destroy'])->name('contacts.destroy');

    // Landing Page Management
    Route::get('landing-page', [LandingPageController::class, 'index'])->name('landing-page.index');

    // Hero Slides
    Route::get('landing-page/slides/create', [LandingPageController::class, 'createSlide'])->name('landing-page.slides.create');
    Route::post('landing-page/slides', [LandingPageController::class, 'storeSlide'])->name('landing-page.slides.store');
    Route::get('landing-page/slides/{heroSlide}/edit', [LandingPageController::class, 'editSlide'])->name('landing-page.slides.edit');
    Route::put('landing-page/slides/{heroSlide}', [LandingPageController::class, 'updateSlide'])->name('landing-page.slides.update');
    Route::post('landing-page/slides/{heroSlide}', [LandingPageController::class, 'updateSlide'])->name('landing-page.slides.update.post');
    Route::delete('landing-page/slides/{heroSlide}', [LandingPageController::class, 'destroySlide'])->name('landing-page.slides.destroy');
    Route::post('landing-page/slides/update-order', [LandingPageController::class, 'updateSlidesOrder'])->name('landing-page.slides.update-order');

    // Landing Page Sections
    Route::get('landing-page/sections/create', [LandingPageController::class, 'createSection'])->name('landing-page.sections.create');
    Route::post('landing-page/sections', [LandingPageController::class, 'storeSection'])->name('landing-page.sections.store');
    Route::get('landing-page/sections/{section}/edit', [LandingPageController::class, 'editSection'])->name('landing-page.sections.edit');
    Route::put('landing-page/sections/{section}', [LandingPageController::class, 'updateSection'])->name('landing-page.sections.update');
    Route::delete('landing-page/sections/{section}', [LandingPageController::class, 'destroySection'])->name('landing-page.sections.destroy');
    Route::post('landing-page/sections/update-order', [LandingPageController::class, 'updateSectionsOrder'])->name('landing-page.sections.update-order');

    // Preparing For Summer
    Route::get('landing-page/preparing-for-summer/create', [LandingPageController::class, 'createPreparingForSummer'])->name('landing-page.preparing-for-summer.create');
    Route::post('landing-page/preparing-for-summer', [LandingPageController::class, 'storePreparingForSummer'])->name('landing-page.preparing-for-summer.store');
    Route::get('landing-page/preparing-for-summer/{preparingForSummer}/edit', [LandingPageController::class, 'editPreparingForSummer'])->name('landing-page.preparing-for-summer.edit');
    Route::put('landing-page/preparing-for-summer/{preparingForSummer}', [LandingPageController::class, 'updatePreparingForSummer'])->name('landing-page.preparing-for-summer.update');
    Route::post('landing-page/preparing-for-summer/{preparingForSummer}', [LandingPageController::class, 'updatePreparingForSummer'])->name('landing-page.preparing-for-summer.update.post');
    Route::delete('landing-page/preparing-for-summer/{preparingForSummer}', [LandingPageController::class, 'destroyPreparingForSummer'])->name('landing-page.preparing-for-summer.destroy');

    // Featured Offers
    Route::get('landing-page/featured-offers/create', [LandingPageController::class, 'createFeaturedOffer'])->name('landing-page.featured-offers.create');
    Route::post('landing-page/featured-offers', [LandingPageController::class, 'storeFeaturedOffer'])->name('landing-page.featured-offers.store');
    Route::get('landing-page/featured-offers/{offer}/edit', [LandingPageController::class, 'editFeaturedOffer'])->name('landing-page.featured-offers.edit');
    Route::put('landing-page/featured-offers/{offer}', [LandingPageController::class, 'updateFeaturedOffer'])->name('landing-page.featured-offers.update');
    Route::post('landing-page/featured-offers/{offer}', [LandingPageController::class, 'updateFeaturedOffer'])->name('landing-page.featured-offers.update.post');
    Route::delete('landing-page/featured-offers/{offer}', [LandingPageController::class, 'destroyFeaturedOffer'])->name('landing-page.featured-offers.destroy');
    Route::patch('landing-page/featured-offers/{offer}/status', [LandingPageController::class, 'updateFeaturedOfferStatus'])->name('landing-page.featured-offers.update-status');

    // Featured Offers Settings
    Route::get('landing-page/featured-offers-settings/create', [LandingPageController::class, 'createFeaturedOffersSettings'])->name('landing-page.featured-offers-settings.create');
    Route::post('landing-page/featured-offers-settings', [LandingPageController::class, 'storeFeaturedOffersSettings'])->name('landing-page.featured-offers-settings.store');
    Route::get('landing-page/featured-offers-settings/{featuredOffersSetting}/edit', [LandingPageController::class, 'editFeaturedOffersSettings'])->name('landing-page.featured-offers-settings.edit');
    Route::put('landing-page/featured-offers-settings/{featuredOffersSetting}', [LandingPageController::class, 'updateFeaturedOffersSettings'])->name('landing-page.featured-offers-settings.update');
    Route::delete('landing-page/featured-offers-settings/{featuredOffersSetting}', [LandingPageController::class, 'destroyFeaturedOffersSettings'])->name('landing-page.featured-offers-settings.destroy');
    Route::patch('landing-page/featured-offers-settings/{featuredOffersSetting}/toggle-status', [LandingPageController::class, 'toggleFeaturedOffersSettingStatus'])->name('landing-page.featured-offers-settings.toggle-status');

    // Offers Texts Management
    Route::get('landing-page/offers-texts/create', [LandingPageController::class, 'createOffersText'])->name('landing-page.offers-texts.create');
    Route::post('landing-page/offers-texts', [LandingPageController::class, 'storeOffersText'])->name('landing-page.offers-texts.store');
    Route::get('landing-page/offers-texts/{offersText}/edit', [LandingPageController::class, 'editOffersText'])->name('landing-page.offers-texts.edit');
    Route::put('landing-page/offers-texts/{offersText}', [LandingPageController::class, 'updateOffersText'])->name('landing-page.offers-texts.update');
    Route::delete('landing-page/offers-texts/{offersText}', [LandingPageController::class, 'destroyOffersText'])->name('landing-page.offers-texts.destroy');
    Route::patch('landing-page/offers-texts/{offersText}/toggle-status', [LandingPageController::class, 'toggleOffersTextStatus'])->name('landing-page.offers-texts.toggle-status');

    // National Day Offer Management
    Route::get('landing-page/national-day-offer/create', [LandingPageController::class, 'createNationalDayOffer'])->name('landing-page.national-day-offer.create');
    Route::post('landing-page/national-day-offer', [LandingPageController::class, 'storeNationalDayOffer'])->name('landing-page.national-day-offer.store');
    Route::get('landing-page/national-day-offer/{nationalDayOffer}/edit', [LandingPageController::class, 'editNationalDayOffer'])->name('landing-page.national-day-offer.edit');
    Route::post('landing-page/national-day-offer/{nationalDayOffer}', [LandingPageController::class, 'updateNationalDayOffer'])->name('landing-page.national-day-offer.update');
    Route::delete('landing-page/national-day-offer/{nationalDayOffer}', [LandingPageController::class, 'destroyNationalDayOffer'])->name('landing-page.national-day-offer.destroy');
    Route::patch('landing-page/national-day-offer/{nationalDayOffer}/toggle-status', [LandingPageController::class, 'toggleNationalDayOfferStatus'])->name('landing-page.national-day-offer.toggle-status');

    // Projects
    Route::get('projects', [AdminProjectController::class, 'index'])->name('projects.index');
    Route::get('projects/quizzes/{id}', [AdminProjectController::class, 'showQuiz'])->name('projects.quizzes.show');
    Route::get('projects/quizzes/{id}/edit', [AdminProjectController::class, 'editQuiz'])->name('projects.quizzes.edit');
    Route::put('projects/quizzes/{id}', [AdminProjectController::class, 'updateQuiz'])->name('projects.quizzes.update');
    Route::get('projects/submissions/{id}', [AdminProjectController::class, 'showSubmission'])->name('projects.submissions.show');
    Route::delete('projects/{type}/{id}', [AdminProjectController::class, 'destroy'])->name('projects.destroy');
    Route::delete('projects/bulk-delete', [AdminProjectController::class, 'bulkDelete'])->name('projects.bulk-delete');
    Route::get('projects/export', [AdminProjectController::class, 'export'])->name('projects.export');

    // Orders
    Route::get('orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::delete('orders/bulk-delete', [AdminOrderController::class, 'bulkDelete'])->name('orders.bulk-delete');
    Route::get('orders/export', [AdminOrderController::class, 'export'])->name('orders.export');
    Route::get('orders/{id}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::put('orders/{id}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.update-status');
    Route::delete('orders/{id}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');

    // Offers
    Route::resource('offers', OfferController::class);

    // National Day Offer Management
    Route::get('national-day-offer', [NationalDayOfferController::class, 'index'])->name('national-day-offer.index');
    Route::get('national-day-offer/create', [NationalDayOfferController::class, 'create'])->name('national-day-offer.create');
    Route::post('national-day-offer', [NationalDayOfferController::class, 'store'])->name('national-day-offer.store');
    Route::get('national-day-offer/{nationalDayOffer}/edit', [NationalDayOfferController::class, 'edit'])->name('national-day-offer.edit');
    Route::put('national-day-offer/{nationalDayOffer}', [NationalDayOfferController::class, 'update'])->name('national-day-offer.update');
    Route::delete('national-day-offer/{nationalDayOffer}', [NationalDayOfferController::class, 'destroy'])->name('national-day-offer.destroy');
    Route::patch('national-day-offer/{nationalDayOffer}/toggle-status', [NationalDayOfferController::class, 'toggleStatus'])->name('national-day-offer.toggle-status');
});

// Cart
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::post('/cart/whatsapp', [CartController::class, 'sendToWhatsApp'])->name('cart.whatsapp');
Route::get('/cart/items', [CartController::class, 'getCartItems'])->name('cart.items');

// File Upload
Route::post('/upload-files', [FileUploadController::class, 'upload'])->name('files.upload');
Route::get('/download-file/{uuid}', [FileUploadController::class, 'download'])->name('files.download');

// Order
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::post('/quick-order', [OrderController::class, 'quickOrder'])->name('orders.quick');
Route::get('/orders/success', function () {
    return Inertia::render('Orders/Success');
})->name('orders.success');

require __DIR__ . '/auth.php';
