<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Order;
use App\Models\Contact;
use App\Models\JobApplication;
use App\Models\ProjectQuiz;
use App\Models\ProjectSubmission;

class AdminNotificationsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        View::composer('*', function ($view) {
            if (request()->is('admin*')) {
                $unreadOrders = Order::where('status', 'pending')->count();
                $unreadMessages = Contact::where('status', 'pending')->count();
                $newApplications = JobApplication::where('status', 'pending')->count();
                $pendingProjects = ProjectQuiz::where('status', 'pending')->count() + ProjectSubmission::where('status', 'pending')->count();

                $notifications = [
                    'unreadOrders' => $unreadOrders > 0 ? $unreadOrders : null,
                    'unreadMessages' => $unreadMessages > 0 ? $unreadMessages : null,
                    'newApplications' => $newApplications > 0 ? $newApplications : null,
                    'pendingProjects' => $pendingProjects > 0 ? $pendingProjects : null,
                ];

                $view->with('adminNotifications', $notifications);
            }
        });

        \Inertia\Inertia::share('adminNotifications', function () {
            if (request()->is('admin*')) {
                $unreadOrders = Order::where('status', 'pending')->count();
                $unreadMessages = Contact::where('status', 'pending')->count();
                $newApplications = JobApplication::where('status', 'pending')->count();
                $pendingProjects = ProjectQuiz::where('status', 'pending')->count() + ProjectSubmission::where('status', 'pending')->count();

                return [
                    'unreadOrders' => $unreadOrders > 0 ? $unreadOrders : null,
                    'unreadMessages' => $unreadMessages > 0 ? $unreadMessages : null,
                    'newApplications' => $newApplications > 0 ? $newApplications : null,
                    'pendingProjects' => $pendingProjects > 0 ? $pendingProjects : null,
                ];
            }
            return null;
        });
    }

    public function register() {}
}
