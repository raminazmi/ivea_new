<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'address' => 'nullable|string',
            'total_amount' => 'required|numeric|min:0',
            'total_items' => 'required|integer|min:1',
            'cart_items' => 'required|array|min:1',
            'cart_items.*.id' => 'required|integer',
            'cart_items.*.name' => 'required|string',
            'cart_items.*.price' => 'required|numeric',
            'cart_items.*.quantity' => 'required|integer|min:1',
            'cart_items.*.image' => 'nullable|string',
            'cart_items.*.color' => 'nullable|string',
            'cart_items.*.colorName' => 'nullable|string',
            'cart_items.*.customizations' => 'nullable|array',
            'cart_items.*.uploadedFiles' => 'nullable|array',
            'cart_items.*.cartId' => 'nullable|string',
            'notes' => 'nullable|string|max:1000'
        ]);

        // معالجة عناصر السلة لضمان حفظ الخيارات المخصصة بشكل صحيح
        $processedCartItems = collect($validated['cart_items'])->map(function ($item) {
            $processedItem = [
                'id' => $item['id'],
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'image' => $item['image'] ?? null,
            ];

            // إضافة الألوان إذا كانت موجودة
            if (!empty($item['color'])) {
                $processedItem['color'] = $item['color'];
                $processedItem['colorName'] = $item['colorName'] ?? '';
            }

            // إضافة الخيارات المخصصة إذا كانت موجودة
            if (!empty($item['customizations'])) {
                $processedItem['customizations'] = $item['customizations'];
            }

            // إضافة الملفات المرفوعة إذا كانت موجودة
            if (!empty($item['uploadedFiles'])) {
                $processedItem['uploadedFiles'] = $item['uploadedFiles'];
            }

            // إضافة معرف السلة الفريد
            if (!empty($item['cartId'])) {
                $processedItem['cartId'] = $item['cartId'];
            }

            return $processedItem;
        })->toArray();

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'city' => $validated['city'],
            'address' => $validated['address'],
            'total_amount' => $validated['total_amount'],
            'total_items' => $validated['total_items'],
            'cart_items' => $processedCartItems,
            'notes' => $validated['notes'],
            'status' => 'pending'
        ]);

        return redirect()->route('orders.success')
            ->with('success', 'تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
    }

    public function quickOrder(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'notes' => 'nullable|string|max:1000',
            'product_id' => 'required|integer',
            'product_name' => 'required|string',
            'product_price' => 'required|numeric|min:0',
            'product_image' => 'nullable|string',
            'selected_options' => 'nullable|array',
            'selected_options.color' => 'nullable|string',
            'selected_options.colorName' => 'nullable|string',
            'selected_options.customizations' => 'nullable|array',
            'selected_options.uploadedFiles' => 'nullable|array',
            'quantity' => 'required|integer|min:1'
        ]);

        // تحويل المنتج الواحد لصيغة cart_items مع دعم الخيارات المخصصة
        $cartItem = [
            'id' => $validated['product_id'],
            'name' => $validated['product_name'],
            'price' => $validated['product_price'],
            'quantity' => $validated['quantity'],
            'image' => $validated['product_image'],
        ];

        // إضافة الخيارات المختارة إذا كانت موجودة
        if (!empty($validated['selected_options'])) {
            $options = $validated['selected_options'];

            // إضافة الألوان
            if (!empty($options['color'])) {
                $cartItem['color'] = $options['color'];
                $cartItem['colorName'] = $options['colorName'] ?? '';
            }

            // إضافة الخيارات المخصصة
            if (!empty($options['customizations'])) {
                $cartItem['customizations'] = $options['customizations'];
            }

            // إضافة الملفات المرفوعة
            if (!empty($options['uploadedFiles'])) {
                $cartItem['uploadedFiles'] = $options['uploadedFiles'];
            }

            // إضافة أي خيارات أخرى (للتوافق مع النظام القديم)
            foreach ($options as $key => $value) {
                if (!in_array($key, ['color', 'colorName', 'customizations', 'uploadedFiles']) && !empty($value)) {
                    $cartItem[$key] = $value;
                }
            }
        }

        $totalAmount = $validated['product_price'] * $validated['quantity'];

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'city' => $validated['city'],
            'address' => $validated['address'],
            'total_amount' => $totalAmount,
            'total_items' => $validated['quantity'],
            'cart_items' => [$cartItem],
            'notes' => $validated['notes'],
            'status' => 'pending'
        ]);

        return redirect()->route('orders.success')
            ->with('success', 'تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
    }

    public function success($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        return Inertia::render('OrderSuccess', [
            'order' => $order
        ]);
    }
}
