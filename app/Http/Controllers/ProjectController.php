<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectQuiz;
use App\Models\ProjectSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects', [
            'spaceTypes' => ProjectQuiz::SPACE_TYPES,
            'productNeeds' => ProjectQuiz::PRODUCT_NEEDS,
            'preferredStyles' => ProjectQuiz::PREFERRED_STYLES,
            'productTypes' => ProjectSubmission::PRODUCT_TYPES,
        ]);
    }

    public function getAll(): JsonResponse
    {
        $projects = Project::active()->get();
        return response()->json(['projects' => $projects]);
    }

    public function submitQuiz(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'space_types' => 'required|array|min:1',
            'space_types.*' => 'string|in:' . implode(',', array_keys(ProjectQuiz::SPACE_TYPES)),
            'product_needs' => 'required|array|min:1',
            'product_needs.*' => 'string|in:' . implode(',', array_keys(ProjectQuiz::PRODUCT_NEEDS)),
            'preferred_styles' => 'required|array|min:1',
            'preferred_styles.*' => 'string|in:' . implode(',', array_keys(ProjectQuiz::PREFERRED_STYLES)),
            'space_type_other' => 'nullable|string|max:500',
            'product_other' => 'nullable|string|max:500',
            'style_other' => 'nullable|string|max:500',
            'additional_notes' => 'nullable|string|max:1000'
        ]);

        $quiz = ProjectQuiz::create($validated);

        return redirect()->back()->with('success', 'تم إرسال بياناتك بنجاح. سيتواصل معك فريقنا قريباً!');
    }

    public function submitProject(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'description' => 'required|string|max:2000',
            'product_type' => 'required|string|in:' . implode(',', array_keys(ProjectSubmission::PRODUCT_TYPES)),
            'images' => 'required|array|min:1|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',
            'space_details' => 'nullable|array'
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('project-submissions', 'public');
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = $imagePaths;

        $submission = ProjectSubmission::create($validated);

        return redirect()->back()->with('success', 'تم إرسال مشروعك بنجاح! سنتواصل معك خلال 24 ساعة.');
    }

    public function calculateCost(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rooms_count' => 'required|integer|min:1|max:20',
            'service_type' => 'required|string|in:custom,installation',
            'material_type' => 'required|string|in:economy,premium',
            'project_type' => 'required|array|min:1',
            'project_type.*' => 'string|in:curtains,furniture,cabinets,woodwork,finishes'
        ]);

        $baseCostPerRoom = [
            'curtains' => ['economy' => 800, 'premium' => 1500],
            'furniture' => ['economy' => 2000, 'premium' => 5000],
            'cabinets' => ['economy' => 1500, 'premium' => 3500],
            'woodwork' => ['economy' => 1200, 'premium' => 2800],
            'finishes' => ['economy' => 600, 'premium' => 1200],
        ];

        $serviceMultiplier = $validated['service_type'] === 'custom' ? 1.0 : 0.6; // خصم للتركيب فقط
        $totalEstimate = 0;

        foreach ($validated['project_type'] as $type) {
            $baseCost = $baseCostPerRoom[$type][$validated['material_type']] ?? 0;
            $totalEstimate += $baseCost * $validated['rooms_count'] * $serviceMultiplier;
        }

        $costEstimate = [
            'total' => round($totalEstimate, 2),
            'per_room' => round($totalEstimate / $validated['rooms_count'], 2),
            'currency' => 'ر.س',
            'note' => 'هذا تقدير تقريبي. للحصول على عرض سعر دقيق، يرجى التواصل معنا.'
        ];

        return redirect()->back()->with([
            'success' => 'تم حساب التكلفة التقديرية بنجاح!',
            'costEstimate' => $costEstimate
        ]);
    }
}
