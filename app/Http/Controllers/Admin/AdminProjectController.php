<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectQuiz;
use App\Models\ProjectSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminProjectController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $dateFilter = $request->get('date', 'all');
        $activeTab = $request->get('tab', 'quizzes');

        $quizzesQuery = ProjectQuiz::query();

        if ($search) {
            $quizzesQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        if ($dateFilter !== 'all') {
            switch ($dateFilter) {
                case 'today':
                    $quizzesQuery->whereDate('created_at', today());
                    break;
                case 'week':
                    $quizzesQuery->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'month':
                    $quizzesQuery->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
                    break;
            }
        }

        $quizzes = $quizzesQuery->orderBy('created_at', 'desc')->paginate(15, ['*'], 'quizzes_page');

        $submissionsQuery = ProjectSubmission::query();

        if ($search) {
            $submissionsQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('product_type', 'like', "%{$search}%");
            });
        }

        if ($dateFilter !== 'all') {
            switch ($dateFilter) {
                case 'today':
                    $submissionsQuery->whereDate('created_at', today());
                    break;
                case 'week':
                    $submissionsQuery->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'month':
                    $submissionsQuery->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
                    break;
            }
        }

        $submissions = $submissionsQuery->orderBy('created_at', 'desc')->paginate(15, ['*'], 'submissions_page');

        return Inertia::render('Admin/Projects/Index', [
            'quizzes' => $quizzes,
            'submissions' => $submissions,
            'filters' => [
                'search' => $search,
                'date' => $dateFilter,
                'tab' => $activeTab,
            ]
        ]);
    }

    public function showQuiz($id)
    {
        $quiz = ProjectQuiz::findOrFail($id);

        return Inertia::render('Admin/Projects/QuizShow', [
            'quiz' => $quiz
        ]);
    }

    public function showSubmission($id)
    {
        $submission = ProjectSubmission::findOrFail($id);

        return Inertia::render('Admin/Projects/SubmissionShow', [
            'submission' => $submission
        ]);
    }

    public function editQuiz($id)
    {
        $quiz = ProjectQuiz::findOrFail($id);

        return Inertia::render('Admin/Projects/QuizEdit', [
            'quiz' => $quiz,
            'spaceTypes' => ProjectQuiz::SPACE_TYPES,
            'productNeeds' => ProjectQuiz::PRODUCT_NEEDS,
            'preferredStyles' => ProjectQuiz::PREFERRED_STYLES,
        ]);
    }

    public function updateQuiz(Request $request, $id)
    {
        $quiz = ProjectQuiz::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'space_types' => 'required|array|min:1',
            'space_types.*' => 'string',
            'space_type_other' => 'nullable|string|max:255',
            'product_needs' => 'required|array|min:1',
            'product_needs.*' => 'string',
            'product_other' => 'nullable|string|max:255',
            'preferred_styles' => 'required|array|min:1',
            'preferred_styles.*' => 'string',
            'style_other' => 'nullable|string|max:255',
            'additional_notes' => 'nullable|string'
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.projects.quizzes.show', $quiz->id)
            ->with('success', 'تم تحديث الاختبار بنجاح');
    }

    public function destroy($type, $id)
    {
        try {
            if ($type === 'quizzes') {
                return $this->destroyQuiz($id);
            } elseif ($type === 'submissions') {
                return $this->destroySubmission($id);
            }

            return redirect()->route('admin.projects.index')
                ->with('error', 'نوع العنصر غير صحيح');
        } catch (\Exception $e) {
            return redirect()->route('admin.projects.index')
                ->with('error', 'حدث خطأ أثناء الحذف: ' . $e->getMessage());
        }
    }

    public function destroyQuiz($id)
    {
        $quiz = ProjectQuiz::findOrFail($id);
        $quiz->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'تم حذف الاختبار بنجاح');
    }

    public function destroySubmission($id)
    {
        $submission = ProjectSubmission::findOrFail($id);

        if (!empty($submission->images)) {
            foreach ($submission->images as $imagePath) {
                if (Storage::exists($imagePath)) {
                    Storage::delete($imagePath);
                }
            }
        }

        $submission->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'تم حذف المشروع بنجاح');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
            'type' => 'required|in:quizzes,submissions'
        ]);

        $ids = $request->ids;
        $type = $request->type;

        if ($type === 'quizzes') {
            ProjectQuiz::whereIn('id', $ids)->delete();
        } else {
            $submissions = ProjectSubmission::whereIn('id', $ids)->get();

            foreach ($submissions as $submission) {
                if (!empty($submission->images)) {
                    foreach ($submission->images as $imagePath) {
                        if (Storage::exists($imagePath)) {
                            Storage::delete($imagePath);
                        }
                    }
                }
            }

            ProjectSubmission::whereIn('id', $ids)->delete();
        }

        return redirect()->route('admin.projects.index')
            ->with('success', 'تم حذف العناصر المحددة بنجاح');
    }

    public function export(Request $request)
    {
        $type = $request->get('type', 'quizzes');

        if ($type === 'quizzes') {
            return $this->exportQuizzes();
        } else {
            return $this->exportSubmissions();
        }
    }

    private function exportQuizzes()
    {
        $quizzes = ProjectQuiz::orderBy('created_at', 'desc')->get();

        $csvData = [];
        $csvData[] = [
            'ID',
            'الاسم',
            'البريد الإلكتروني',
            'رقم الهاتف',
            'أنواع المساحات',
            'احتياجات المنتجات',
            'الأساليب المفضلة',
            'ملاحظات إضافية',
            'تاريخ الإرسال'
        ];

        foreach ($quizzes as $quiz) {
            $csvData[] = [
                $quiz->id,
                $quiz->name,
                $quiz->email,
                $quiz->phone,
                implode(', ', $quiz->space_types),
                implode(', ', $quiz->product_needs),
                implode(', ', $quiz->preferred_styles),
                $quiz->additional_notes ?? '',
                $quiz->created_at->format('Y-m-d H:i:s')
            ];
        }

        $filename = 'project_quizzes_' . date('Y-m-d_H-i-s') . '.csv';
        $handle = fopen('php://temp', 'r+');

        fwrite($handle, "\xEF\xBB\xBF");

        foreach ($csvData as $row) {
            fputcsv($handle, $row);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=utf-8')
            ->header('Content-Disposition', "attachment; filename={$filename}");
    }

    private function exportSubmissions()
    {
        $submissions = ProjectSubmission::orderBy('created_at', 'desc')->get();

        $csvData = [];
        $csvData[] = [
            'ID',
            'الاسم',
            'البريد الإلكتروني',
            'رقم الهاتف',
            'نوع المنتج',
            'الوصف',
            'عدد الصور',
            'تاريخ الإرسال'
        ];

        foreach ($submissions as $submission) {
            $csvData[] = [
                $submission->id,
                $submission->name,
                $submission->email,
                $submission->phone,
                $submission->product_type,
                $submission->description,
                count($submission->images),
                $submission->created_at->format('Y-m-d H:i:s')
            ];
        }

        $filename = 'project_submissions_' . date('Y-m-d_H-i-s') . '.csv';
        $handle = fopen('php://temp', 'r+');

        fwrite($handle, "\xEF\xBB\xBF");

        foreach ($csvData as $row) {
            fputcsv($handle, $row);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=utf-8')
            ->header('Content-Disposition', "attachment; filename={$filename}");
    }
}
