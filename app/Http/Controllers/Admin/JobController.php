<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index()
    {
        $jobs = Job::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Jobs/Index', [
            'jobs' => $jobs
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Jobs/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:full-time,part-time,contract',
            'category' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'required|in:active,inactive,closed',
        ]);

        Job::create($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'تم إنشاء الوظيفة بنجاح');
    }

    public function show(Job $job)
    {
        return Inertia::render('Admin/Jobs/Show', [
            'job' => $job
        ]);
    }

    public function edit(Job $job)
    {
        return Inertia::render('Admin/Jobs/Edit', [
            'job' => $job
        ]);
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:full-time,part-time,contract',
            'category' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'required|in:active,inactive,closed',
        ]);

        $job->update($validated);

        return redirect()->route('admin.jobs.index')
            ->with('success', 'تم تحديث الوظيفة بنجاح');
    }

    public function destroy(Job $job): RedirectResponse
    {
        $job->delete();

        return redirect()->route('admin.jobs.index')
            ->with('success', 'تم حذف الوظيفة بنجاح');
    }

    public function applications()
    {
        $applications = JobApplication::with('job')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications
        ]);
    }

    public function updateApplicationStatus(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected'
        ]);

        $application = JobApplication::findOrFail($id);
        $application->update($validated);

        return redirect()->back()
            ->with('success', 'تم تحديث حالة التقديم بنجاح');
    }

    public function deleteApplication($id): RedirectResponse
    {
        $application = JobApplication::findOrFail($id);
        $application->delete();

        return redirect()->back()
            ->with('success', 'تم حذف التقديم بنجاح');
    }
}
