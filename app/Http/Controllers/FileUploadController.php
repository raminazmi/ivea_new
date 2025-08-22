<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:10240',
        ]);

        $uploadedFiles = [];

        foreach ($request->file('files') as $file) {
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('uploads/customizations', $fileName, 'public');

            $uploadedFiles[] = [
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'url' => Storage::url($path),
                'size' => $file->getSize(),
                'type' => $file->getClientMimeType(),
                'uuid' => pathinfo($fileName, PATHINFO_FILENAME)
            ];
        }

        return response()->json([
            'success' => true,
            'files' => $uploadedFiles
        ]);
    }

    public function download($uuid)
    {
        $files = Storage::disk('public')->files('uploads/customizations');

        foreach ($files as $file) {
            if (Str::contains($file, $uuid)) {
                $fullPath = Storage::disk('public')->path($file);

                if (file_exists($fullPath)) {
                    return response()->download($fullPath);
                }
            }
        }

        abort(404, 'الملف غير موجود');
    }
}
