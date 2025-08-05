<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display a listing of jobs for admin.
     */
    public function index()
    {
        $jobs = Job::latest()->get();

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $jobs,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Display a listing of job applications for admin.
     */
    public function applications()
    {
        $applications = JobApplication::with('job')->latest()->get();

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Update application status.
     */
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
}
