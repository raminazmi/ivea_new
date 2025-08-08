<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\JobApplication;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class JobApplicationController extends Controller
{
    // عرض نموذج التقديم
    public function showApplyForm($id)
    {
        $job = Job::findOrFail($id);
        return Inertia::render('Jobs/Apply', [
            'job' => $job
        ]);
    }

    // حفظ طلب التقديم
    public function store(Request $request, $id)
    {
        $job = Job::findOrFail($id);
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'cover_letter' => 'nullable|string|max:1000',
            'cv_file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        Log::info('JobApplicationController@store - validated:', $validated);

        // رفع السيرة الذاتية
        if ($request->hasFile('cv_file')) {
            $cvPath = $request->file('cv_file')->store('cvs', 'public');
        } else {
            $cvPath = null;
        }

        Log::info('JobApplicationController@store - cvPath:', ['cvPath' => $cvPath]);

        $application = JobApplication::create([
            'job_id' => $job->id,
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'cover_letter' => $validated['cover_letter'] ?? null,
            'cv_file' => $cvPath,
            'status' => 'pending',
        ]);

        Log::info('JobApplicationController@store - created application:', $application->toArray());

        return redirect()->route('jobs')->with('success', 'تم إرسال طلبك بنجاح!');
    }
}
