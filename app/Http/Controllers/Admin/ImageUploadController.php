<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Upload a single image
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);

        try {
            $file = $request->file('image');
            $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

            // Store in public/images/products directory
            $path = $file->storeAs('images/products', $fileName, 'public');

            return response()->json([
                'success' => true,
                'url' => asset(Storage::url($path)),
                'filename' => $fileName
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في رفع الصورة: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload multiple images
     */
    public function uploadMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);

        try {
            $uploadedImages = [];

            foreach ($request->file('images') as $file) {
                $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('images/products', $fileName, 'public');

                $uploadedImages[] = [
                    'url' => asset(Storage::url($path)),
                    'filename' => $fileName
                ];
            }

            return response()->json([
                'success' => true,
                'images' => $uploadedImages
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في رفع الصور: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an image
     */
    public function delete(Request $request): JsonResponse
    {
        $request->validate([
            'filename' => 'required|string'
        ]);

        try {
            $filename = $request->filename;
            $path = 'images/products/' . $filename;

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);

                return response()->json([
                    'success' => true,
                    'message' => 'تم حذف الصورة بنجاح'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'الصورة غير موجودة'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'فشل في حذف الصورة: ' . $e->getMessage()
            ], 500);
        }
    }
}
