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
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\JobController as AdminJobController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\ToolController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// SEO Routes
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

// Contact routes
Route::get('/contact', [ContactController::class, 'create'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// About page
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Projects page
Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::post('/projects/quiz', [ProjectController::class, 'submitQuiz'])->name('projects.quiz');
Route::post('/projects/calculate-cost', [ProjectController::class, 'calculateCost'])->name('projects.calculate-cost');
Route::post('/projects/submit', [ProjectController::class, 'submitProject'])->name('projects.submit');
Route::get('/api/projects', [ProjectController::class, 'getAll'])->name('api.projects.all');

// Products routes
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{id}/options', [ProductController::class, 'options'])->name('products.options');
Route::post('/products/{id}/calculate-price', [ProductController::class, 'calculatePrice'])->name('products.calculate-price');

// Tools and Guidelines Routes
Route::get('/tools-and-guidelines', [ToolsAndGuidelinesController::class, 'index'])->name('tools.index');
Route::get('/tools-and-guidelines/{slug}', [ToolsAndGuidelinesController::class, 'show'])->name('tools.show');

// API Routes for products
Route::get('/api/products', [ProductController::class, 'getAll'])->name('api.products.all');
Route::get('/api/products/tab/{tab}', [ProductController::class, 'getByTab'])->name('api.products.by-tab');
Route::get('/api/products/new', [ProductController::class, 'getNew'])->name('api.products.new');
Route::get('/api/products/offers', [ProductController::class, 'getOffers'])->name('api.products.offers');
Route::get('/api/products/bestsellers', [ProductController::class, 'getBestsellers'])->name('api.products.bestsellers');
Route::get('/api/products/category/{categorySlug}', [ProductController::class, 'getByCategorySlug'])->name('api.products.by-category');
Route::get('/api/products/filter-options', [ProductController::class, 'getFilterOptionsApi'])->name('api.products.filter-options');

// Jobs routes
Route::get('/jobs', [JobController::class, 'index'])->name('jobs');
Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');
Route::post('/jobs/apply', [JobController::class, 'apply'])->name('jobs.apply');
Route::get('/jobs/category/{category}', [JobController::class, 'getByCategory'])->name('jobs.by-category');
Route::get('/jobs/{id}/apply', [JobApplicationController::class, 'showApplyForm'])->name('jobs.apply');
Route::post('/jobs/{id}/apply', [JobApplicationController::class, 'store'])->name('jobs.apply.submit');

// Admin routes
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
    Route::post('/admin/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');

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

    // Contacts
    Route::get('contacts', [AdminContactController::class, 'index'])->name('contacts.index');
    Route::put('contacts/{id}/status', [AdminContactController::class, 'updateStatus'])->name('contacts.update-status');
    Route::delete('contacts/{id}', [AdminContactController::class, 'destroy'])->name('contacts.destroy');

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
});

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::post('/cart/whatsapp', [CartController::class, 'sendToWhatsApp'])->name('cart.whatsapp');
Route::get('/cart/items', [CartController::class, 'getCartItems'])->name('cart.items');

// File Upload Routes
Route::post('/upload-files', [FileUploadController::class, 'upload'])->name('files.upload');
Route::get('/download-file/{uuid}', [FileUploadController::class, 'download'])->name('files.download');

// Order routes
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::post('/quick-order', [OrderController::class, 'quickOrder'])->name('orders.quick');
Route::get('/orders/success', function () {
    return Inertia::render('Orders/Success');
})->name('orders.success');

require __DIR__ . '/auth.php';
