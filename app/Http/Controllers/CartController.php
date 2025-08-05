<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * Display the cart page with the current cart items
     *
     * @return \Inertia\Response
     */
    public function show()
    {
        // The cart is managed client-side with Redux
        // This method just renders the cart page
        return Inertia::render('CartPage');
    }

    /**
     * Get cart items with current product data
     * This can be used to sync cart data with the server
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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

        // Merge cart quantities with product data
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
