<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class CartImageController extends Controller
{
    public function generate(Request $request)
    {
        $items = $request->input('items', []);
        $total = $request->input('total', 0);

        // إعداد نص الطلب
        $lines = [
            'طلب جديد:',
        ];
        foreach ($items as $item) {
            $lines[] = $item['name'] . ' - ' . $item['quantity'] . ' قطعة - ' . $item['price'] . ' ريال';
        }
        $lines[] = 'المجموع: ' . $total . ' ريال';
        $text = implode("\n", $lines);

        // إنشاء صورة
        Log::info('بدأ إنشاء الصورة');
        try {
            $img = Image::canvas(600, 400, '#fff');
            Log::info('تم إنشاء canvas');
            $img->text($text, 300, 50, function ($font) {
                // لا تحدد ملف الخط
                $font->size(24);
                $font->color('#222');
                $font->align('center');
                $font->valign('top');
            });
            Log::info('تم رسم النص');
            $filename = 'cart_orders/' . uniqid() . '.png';
            Log::info('سيتم حفظ الصورة في: ' . $filename);
            Storage::disk('public')->put($filename, (string) $img->encode('png'));
            $url = Storage::disk('public')->url($filename);
            Log::info('تم حفظ الصورة بنجاح: ' . $url);
            return response()->json(['url' => $url]);
        } catch (\Exception $e) {
            Log::error('خطأ في إنشاء الصورة: ' . $e->getMessage());
            return response()->json(['error' => 'خطأ في إنشاء الصورة: ' . $e->getMessage()], 500);
        }
    }
}
