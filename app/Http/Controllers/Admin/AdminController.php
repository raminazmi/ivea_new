<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Article;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\Contact;
use App\Models\Order;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'totalProducts' => Product::count(),
            'totalCategories' => Category::count(),
            'totalArticles' => Article::count(),
            'totalJobs' => Job::count(),
            'totalApplications' => JobApplication::count(),
            'totalOrders' => Order::count(),
            'totalContacts' => Contact::count(),
        ];

        $orderStatistics = [
            'total' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'confirmed' => Order::where('status', 'confirmed')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'shipped' => Order::where('status', 'shipped')->count(),
            'delivered' => Order::where('status', 'delivered')->count(),
            'cancelled' => Order::where('status', 'cancelled')->count(),
            'total_amount' => Order::sum('total_amount'),
        ];

        $unreadMessages = Contact::where('status', 'pending')->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'statistics' => $orderStatistics,
            'notifications' => [
                'unreadOrders' => $orderStatistics['pending'] > 0 ? $orderStatistics['pending'] : null,
                'unreadMessages' => $unreadMessages > 0 ? $unreadMessages : null,
            ]
        ]);
    }

    public function jobs()
    {
        $jobs = Job::latest()->get();

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $jobs,
            'user' => Auth::user(),
        ]);
    }

    public function applications()
    {
        $applications = JobApplication::with('job')->latest()->get();

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'user' => Auth::user(),
        ]);
    }

    public function contacts()
    {
        $contacts = Contact::latest()->get();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'user' => Auth::user(),
        ]);
    }

    public function updateApplicationStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected'
        ]);

        $application = JobApplication::findOrFail($id);
        $application->update(['status' => $request->status]);

        return \Response::json([
            'success' => true,
            'message' => 'تم تحديث حالة التقديم بنجاح'
        ]);
    }

    public function updateContactStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,read,replied'
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update(['status' => $request->status]);

        return \Response::json([
            'success' => true,
            'message' => 'تم تحديث حالة الرسالة بنجاح'
        ]);
    }
}
