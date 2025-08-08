<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\JobController;
use Inertia\Inertia;

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
Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');
Route::get('/api/projects', [App\Http\Controllers\ProjectController::class, 'getAll'])->name('api.projects.all');

// Products routes
Route::get('/products', [App\Http\Controllers\ProductController::class, 'index'])->name('products');
Route::get('/products/{id}', [App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/products/{id}/options', [App\Http\Controllers\ProductController::class, 'options'])->name('products.options');

// Tools and Guidelines Routes
Route::get('/tools-and-guidelines', [App\Http\Controllers\ToolsAndGuidelinesController::class, 'index'])->name('tools.index');
Route::get('/tools-and-guidelines/{slug}', [App\Http\Controllers\ToolsAndGuidelinesController::class, 'show'])->name('tools.show');

// API Routes for products
Route::get('/api/products', [App\Http\Controllers\ProductController::class, 'getAll'])->name('api.products.all');
Route::get('/api/products/tab/{tab}', [App\Http\Controllers\ProductController::class, 'getByTab'])->name('api.products.by-tab');
Route::get('/api/products/new', [App\Http\Controllers\ProductController::class, 'getNew'])->name('api.products.new');
Route::get('/api/products/offers', [App\Http\Controllers\ProductController::class, 'getOffers'])->name('api.products.offers');
Route::get('/api/products/bestsellers', [App\Http\Controllers\ProductController::class, 'getBestsellers'])->name('api.products.bestsellers');
Route::get('/api/products/filter-options', [App\Http\Controllers\ProductController::class, 'getFilterOptionsApi'])->name('api.products.filter-options');

// Jobs routes
Route::get('/jobs', [JobController::class, 'index'])->name('jobs');
Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');
Route::post('/jobs/apply', [JobController::class, 'apply'])->name('jobs.apply');
Route::get('/jobs/category/{category}', [JobController::class, 'getByCategory'])->name('jobs.by-category');
Route::get('/jobs/{id}/apply', [App\Http\Controllers\JobApplicationController::class, 'showApplyForm'])->name('jobs.apply');
Route::post('/jobs/{id}/apply', [App\Http\Controllers\JobApplicationController::class, 'store'])->name('jobs.apply.submit');

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');

    // Products
    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);
    Route::post('products/{id}/tab-settings', [App\Http\Controllers\Admin\ProductController::class, 'updateTabSettings'])->name('products.tab-settings');
    Route::post('products/bulk-tab-settings', [App\Http\Controllers\Admin\ProductController::class, 'bulkUpdateTabSettings'])->name('products.bulk-tab-settings');
    Route::get('products/tab-statistics', [App\Http\Controllers\Admin\ProductController::class, 'getTabStatistics'])->name('products.tab-statistics');

    // Image Upload
    Route::post('upload/image', [App\Http\Controllers\Admin\ImageUploadController::class, 'upload'])->name('upload.image');
    Route::post('upload/images', [App\Http\Controllers\Admin\ImageUploadController::class, 'uploadMultiple'])->name('upload.images');
    Route::delete('upload/image', [App\Http\Controllers\Admin\ImageUploadController::class, 'delete'])->name('upload.delete');

    // Categories
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
    Route::patch('categories/{id}/status', [App\Http\Controllers\Admin\CategoryController::class, 'updateStatus'])->name('categories.update-status');

    // Articles
    Route::resource('articles', App\Http\Controllers\Admin\ArticleController::class);
    Route::post('/admin/articles/{article}', [App\Http\Controllers\Admin\ArticleController::class, 'update'])->name('articles.update');
    // Tools
    Route::resource('tools', App\Http\Controllers\Admin\ToolController::class);
    Route::patch('tools/{id}/toggle-published', [App\Http\Controllers\Admin\ToolController::class, 'togglePublished'])->name('tools.toggle-published');
    Route::patch('tools/{id}/toggle-featured', [App\Http\Controllers\Admin\ToolController::class, 'toggleFeatured'])->name('tools.toggle-featured');

    // Jobs
    Route::resource('jobs', App\Http\Controllers\Admin\JobController::class);

    // Applications
    Route::get('applications', [App\Http\Controllers\Admin\JobController::class, 'applications'])->name('applications.index');
    Route::get('applications/{id}', [App\Http\Controllers\Admin\ApplicationController::class, 'show'])->name('applications.show');
    Route::put('applications/{id}/status', [App\Http\Controllers\Admin\JobController::class, 'updateApplicationStatus'])->name('applications.update-status');
    Route::delete('applications/{id}', [App\Http\Controllers\Admin\JobController::class, 'deleteApplication'])->name('applications.destroy');

    // Contacts
    Route::get('contacts', [App\Http\Controllers\Admin\ContactController::class, 'index'])->name('contacts.index');
    Route::put('contacts/{id}/status', [App\Http\Controllers\Admin\ContactController::class, 'updateStatus'])->name('contacts.update-status');
    Route::delete('contacts/{id}', [App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('contacts.destroy');
});

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::post('/cart/whatsapp', [CartController::class, 'sendToWhatsApp'])->name('cart.whatsapp');
Route::get('/cart/items', [CartController::class, 'getCartItems'])->name('cart.items');

require __DIR__ . '/auth.php';
