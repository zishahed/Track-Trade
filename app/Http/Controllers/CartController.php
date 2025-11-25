<?php
// app/Http/Controllers/CartController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart
     */
    public function index(Request $request)
    {
        $cart = session()->get('cart', []);
        $cartItems = [];
        $subtotal = 0;
        
        foreach ($cart as $productId => $cartItem) {
            $product = Product::find($productId);
            if ($product) {
                $itemSubtotal = $product->price * $cartItem['quantity'];
                $cartItems[] = [
                    'product' => $product,
                    'quantity' => $cartItem['quantity'],
                    'subtotal' => $itemSubtotal
                ];
                $subtotal += $itemSubtotal;
            }
        }

        $tax = $subtotal * 0.10; // 10% tax
        $shipping = $subtotal >= 100 ? 0 : 15; // Free shipping over $100
        $total = $subtotal + $tax + $shipping;

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $total,
        ]);
    }

    /**
     * Add product to cart
     */
    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Check if enough stock
        if ($product->quantity < $validated['quantity']) {
            return back()->with('error', 'Not enough stock available.');
        }

        $cart = session()->get('cart', []);

        // If product already in cart, increase quantity
        if (isset($cart[$product->product_id])) {
            $newQuantity = $cart[$product->product_id]['quantity'] + $validated['quantity'];
            
            // Check if new quantity exceeds stock
            if ($newQuantity > $product->quantity) {
                return back()->with('error', 'Cannot add more items. Insufficient stock.');
            }
            
            $cart[$product->product_id]['quantity'] = $newQuantity;
        } else {
            $cart[$product->product_id] = [
                'quantity' => $validated['quantity']
            ];
        }

        session()->put('cart', $cart);

        return back()->with('success', 'Product added to cart successfully!');
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $productId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            $product = Product::find($productId);
            
            if (!$product) {
                return back()->with('error', 'Product not found.');
            }
            
            if ($product->quantity < $validated['quantity']) {
                return back()->with('error', 'Not enough stock available.');
            }

            $cart[$productId]['quantity'] = $validated['quantity'];
            session()->put('cart', $cart);
            
            return back()->with('success', 'Cart updated successfully!');
        }

        return back()->with('error', 'Item not found in cart.');
    }

    /**
     * Remove item from cart
     */
    public function remove($productId)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('cart', $cart);
            
            return back()->with('success', 'Product removed from cart.');
        }

        return back()->with('error', 'Item not found in cart.');
    }

    /**
     * Clear entire cart
     */
    public function clear()
    {
        session()->forget('cart');
        return back()->with('success', 'Cart cleared.');
    }
}