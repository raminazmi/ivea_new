<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplication;
use App\Http\Requests\JobRequest;
use App\Http\Requests\JobApplicationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobs = Job::active()->with('applications')->get();
        $categories = Job::active()->distinct()->pluck('category')->toArray();

        return Inertia::render('Jobs', [
            'jobs' => $jobs,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Jobs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JobRequest $request)
    {
        try {
            $validated = $request->validated();
            $job = Job::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'تم إنشاء الوظيفة بنجاح!',
                'job' => $job
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء إنشاء الوظيفة. يرجى المحاولة مرة أخرى.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $job = Job::with('applications')->findOrFail($id);
        return Inertia::render('Jobs/Show', ['job' => $job]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $job = Job::findOrFail($id);
        return Inertia::render('Jobs/Edit', ['job' => $job]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobRequest $request, string $id)
    {
        try {
            $job = Job::findOrFail($id);
            $validated = $request->validated();
            $job->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث الوظيفة بنجاح!',
                'job' => $job
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء تحديث الوظيفة. يرجى المحاولة مرة أخرى.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $job = Job::findOrFail($id);
            $job->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم حذف الوظيفة بنجاح!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء حذف الوظيفة. يرجى المحاولة مرة أخرى.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Apply for a job.
     */
    public function apply(JobApplicationRequest $request)
    {
        try {
            $validated = $request->validated();

            // Handle CV file upload
            if ($request->hasFile('cv_file')) {
                $file = $request->file('cv_file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('public/job-applications', $fileName);
                $validated['cv_file'] = $fileName;
            }

            $application = JobApplication::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'تم تقديم طلبك بنجاح! سنتواصل معك قريباً.',
                'application' => $application
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get jobs by category.
     */
    public function getByCategory(Request $request)
    {
        $category = $request->get('category');
        $jobs = Job::active();

        if ($category && $category !== 'الكل') {
            $jobs = $jobs->where('category', $category);
        }

        $jobs = $jobs->with('applications')->get();

        return response()->json([
            'success' => true,
            'jobs' => $jobs
        ]);
    }
}
