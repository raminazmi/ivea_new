<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render('Cart/Index');
    }

    public function getCartItems(Request $request)
    {
        $cartItems = $request->input('items', []);

        if (empty($cartItems)) {
            return response()->json(['items' => []]);
        }

        $productIds = array_column($cartItems, 'id');
        $products = Product::whereIn('id', $productIds)
            ->select(['id', 'name', 'price', 'image'])
            ->get()
            ->keyBy('id');

        $enrichedItems = collect($cartItems)->map(function ($item) use ($products) {
            $product = $products->get($item['id']);

            if (!$product) {
                return null;
            }

            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'quantity' => $item['quantity'] ?? 1,
            ];
        })->filter()->values();

        return response()->json([
            'items' => $enrichedItems
        ]);
    }
}