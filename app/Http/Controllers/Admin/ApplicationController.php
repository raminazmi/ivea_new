<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function show($id)
    {
        $application = JobApplication::with('job')->findOrFail($id);
        return Inertia::render('Admin/Applications/Show', [
            'application' => $application
        ]);
    }
}
