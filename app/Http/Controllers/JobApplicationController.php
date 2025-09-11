<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\JobApplication;
use App\Http\Requests\JobApplicationRequest;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function showApplyForm($id)
    {
        $job = Job::findOrFail($id);
        return Inertia::render('Jobs/Apply', [
            'job' => $job
        ]);
    }

    public function store(JobApplicationRequest $request, $id)
    {
        $job = Job::findOrFail($id);
        $validated = $request->validated();

        if ($request->hasFile('cv_file')) {
            $cvPath = $request->file('cv_file')->store('cvs', 'public');
        } else {
            $cvPath = null;
        }

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

        return back()->with('success', 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    }
}
