<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JobsController extends Controller
{
    /**
     * Display the jobs page
     */
    public function index()
    {
        return Inertia::render('Jobs');
    }

    /**
     * Display a specific job
     */
    public function show($id)
    {
        // يمكن إضافة منطق لعرض وظيفة محددة
        return Inertia::render('Jobs/Show', [
            'jobId' => $id
        ]);
    }

    /**
     * Handle job application
     */
    public function apply(Request $request)
    {
        // يمكن إضافة منطق لتقديم طلب التوظيف
        $request->validate([
            'job_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048'
        ]);

        // معالجة التقديم هنا

        return response()->json([
            'success' => true,
            'message' => 'تم تقديم طلبك بنجاح! سنتواصل معك قريباً.'
        ]);
    }
}