<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class CartImageController extends Controller
{
    public function generate(Request $request)
    {
        $items = $request->input('items', []);
        $total = $request->input('total', 0);
        $lines = [
            'طلب جديد:',
        ];
        foreach ($items as $item) {
            $lines[] = $item['name'] . ' - ' . $item['quantity'] . ' قطعة - ' . $item['price'] . ' ريال';
        }
        $lines[] = 'المجموع: ' . $total . ' ريال';
        $text = implode("\n", $lines);

        try {
            $img = Image::canvas(600, 400, '#fff');
            $img->text($text, 300, 50, function ($font) {
                $font->size(24);
                $font->color('#222');
                $font->align('center');
                $font->valign('top');
            });
            $filename = 'cart_orders/' . uniqid() . '.png';
            Storage::disk('public')->put($filename, (string) $img->encode('png'));
            $url = Storage::disk('public')->url($filename);
            return response()->json(['url' => $url]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'خطأ في إنشاء الصورة: ' . $e->getMessage()], 500);
        }
    }
}
