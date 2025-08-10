<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JobsController extends Controller
{
    public function index()
    {
        return Inertia::render('Jobs');
    }

    public function show($id)
    {
        return Inertia::render('Jobs/Show', [
            'jobId' => $id
        ]);
    }

    public function apply(Request $request)
    {
        $request->validate([
            'job_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'تم تقديم طلبك بنجاح! سنتواصل معك قريباً.'
        ]);
    }
}
