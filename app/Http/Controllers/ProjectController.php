<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Get all projects for API
     */
    public function getAll(): JsonResponse
    {
        $projects = Project::active()->get();
        return response()->json(['projects' => $projects]);
    }
}
