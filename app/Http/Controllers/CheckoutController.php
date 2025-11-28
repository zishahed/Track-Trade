<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\SalesTransaction;
use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function show()
    {
        $customer = Auth::guard('customer')->user();
        $cartItems = session()->get('cart', []);

        if (empty($cartItems)) {
            return redirect()->route('products.index')
                ->with('error', 'Your cart is empty');
        }

        // Calculate totals
        $subtotal = 0;
        $processedItems = [];

        foreach ($cartItems as $productId => $item) {
            $product = Product::find($productId);
            if ($product) {
                $itemSubtotal = $product->price * $item['quantity'];
                $subtotal += $itemSubtotal;
                
                $processedItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'subtotal' => $itemSubtotal
                ];
            }
        }

        $tax = $subtotal * 0.10;
        $shipping = $subtotal >= 100 ? 0 : 10;
        $total = $subtotal + $tax + $shipping;

        return Inertia::render('Checkout/Index', [
            'cartItems' => $processedItems,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $total,
            'customer' => $customer
        ]);
    }

    public function process(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|in:cash,card,bank_transfer',
            'shipping_address' => 'required|string|max:500',
        ]);

        $customer = Auth::guard('customer')->user();
        $cartItems = session()->get('cart', []);

        if (empty($cartItems)) {
            return redirect()->route('products.index')
                ->with('error', 'Your cart is empty');
        }

        try {
            DB::beginTransaction();

            // Calculate totals
            $subtotal = 0;
            $orderItems = [];

            // Validate stock and calculate totals
            foreach ($cartItems as $productId => $item) {
                $product = Product::lockForUpdate()->find($productId);
                
                if (!$product) {
                    throw new \Exception("Product not found");
                }

                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for {$product->name}");
                }

                $itemSubtotal = $product->price * $item['quantity'];
                $subtotal += $itemSubtotal;
                
                $orderItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $itemSubtotal
                ];
            }

            $tax = $subtotal * 0.10;
            $shipping = $subtotal >= 100 ? 0 : 10;
            $total = $subtotal + $tax + $shipping;

            // Create Sales Order
            $salesOrder = SalesOrder::create([
                'customer_id' => $customer->customer_id,
                'order_date' => now(),
                'status' => 'completed',
                'shipping_address' => $request->shipping_address,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'shipping' => $shipping,
                'total' => $total
            ]);

            // Create order items and update product quantities
            foreach ($orderItems as $item) {
                // Create order item
                $salesOrder->items()->create([
                    'product_id' => $item['product']->product_id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $item['subtotal']
                ]);

                // Reduce product quantity
                $item['product']->decrement('quantity', $item['quantity']);
            }

            // Create Transaction with created_by as NULL (customer order)
            $transaction = Transaction::create([
                'transaction_date' => now(),
                'payment_method' => $request->payment_method,
                'created_by' => null, // NULL for customer orders
                'type' => 'sales'
            ]);

            // Create Sales Transaction
            SalesTransaction::create([
                'transaction_id' => $transaction->transaction_id,
                'order_id' => $salesOrder->order_id,
                'amount' => $total
            ]);

            // Clear cart
            session()->forget('cart');

            DB::commit();

            return redirect()->route('checkout.success', $salesOrder->order_id)
                ->with('success', 'Order placed successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Checkout failed: ' . $e->getMessage());
        }
    }

    public function success($orderId)
    {
        $customer = Auth::guard('customer')->user();
        $order = SalesOrder::with('items.product')
            ->where('order_id', $orderId)
            ->where('customer_id', $customer->customer_id)
            ->firstOrFail();

        return Inertia::render('Checkout/Success', [
            'order' => $order
        ]);
    }
}