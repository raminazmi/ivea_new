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
    public function index()
    {
        $jobs = Job::active()->with('applications')->get();
        $categories = Job::active()->distinct()->pluck('category')->toArray();

        return Inertia::render('Jobs', [
            'jobs' => $jobs,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Jobs/Create');
    }

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

    public function show(string $id)
    {
        $job = Job::with('applications')->findOrFail($id);
        return Inertia::render('Jobs/Show', ['job' => $job]);
    }

    public function edit(string $id)
    {
        $job = Job::findOrFail($id);
        return Inertia::render('Jobs/Edit', ['job' => $job]);
    }

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

    public function apply(JobApplicationRequest $request)
    {
        try {
            $validated = $request->validated();
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
