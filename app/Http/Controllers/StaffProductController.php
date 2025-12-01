<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Customer;
use App\Models\SalesOrder;
use App\Models\Income;
use App\Models\Transaction;
use App\Models\SalesTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StaffProductController extends Controller
{
    public function index()
    {
        $products = Product::where('quantity', '>', 0)
            ->orderBy('name')
            ->get();

        $staff = Auth::guard('staff')->user();
        
        // Get staff discount based on role
        $discount = $this->getStaffDiscount($staff->role);

        return Inertia::render('Staff/Products', [
            'products' => $products,
            'discount' => $discount,
            'staffRole' => $staff->role
        ]);
    }

    public function showCheckout()
    {
        $staff = Auth::guard('staff')->user();
        $cart = session()->get('staff_cart', []);

        if (empty($cart)) {
            return redirect()->route('staff.products.index')
                ->with('error', 'Your cart is empty');
        }

        // Calculate totals with discount
        $subtotal = 0;
        $processedItems = [];
        $discount = $this->getStaffDiscount($staff->role);

        foreach ($cart as $productId => $item) {
            $product = Product::find($productId);
            if ($product) {
                $originalPrice = $product->price;
                $discountedPrice = $originalPrice * (1 - $discount / 100);
                $itemSubtotal = $discountedPrice * $item['quantity'];
                $subtotal += $itemSubtotal;
                
                $processedItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'original_price' => $originalPrice,
                    'discounted_price' => $discountedPrice,
                    'subtotal' => $itemSubtotal
                ];
            }
        }

        $tax = $subtotal * 0.10;
        $total = $subtotal + $tax;

        return Inertia::render('Staff/Checkout', [
            'cartItems' => $processedItems,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'discount' => $discount,
            'staff' => $staff
        ]);
    }

    public function processCheckout(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,customer_id',
            'payment_method' => 'required|in:cash,card,bank_transfer',
        ]);

        $staff = Auth::guard('staff')->user();
        $cart = session()->get('staff_cart', []);

        if (empty($cart)) {
            return redirect()->route('staff.products.index')
                ->with('error', 'Your cart is empty');
        }

        try {
            DB::beginTransaction();

            $subtotal = 0;
            $orderItems = [];
            $discount = $this->getStaffDiscount($staff->role);

            // Validate stock and calculate totals
            foreach ($cart as $productId => $item) {
                $product = Product::lockForUpdate()->find($productId);
                
                if (!$product) {
                    throw new \Exception("Product not found");
                }

                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for {$product->name}");
                }

                // Apply staff discount
                $discountedPrice = $product->price * (1 - $discount / 100);
                $itemSubtotal = $discountedPrice * $item['quantity'];
                $subtotal += $itemSubtotal;
                
                $orderItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $discountedPrice,
                    'subtotal' => $itemSubtotal
                ];
            }

            $tax = $subtotal * 0.10;
            $total = $subtotal + $tax;

            // Create Sales Order
            $salesOrder = SalesOrder::create([
                'customer_id' => $request->customer_id,
                'order_date' => now(),
                'status' => 'completed',
                'shipping_address' => null,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'shipping' => 0,
                'total' => $total
            ]);

            // Create order items and update product quantities
            foreach ($orderItems as $item) {
                // Create income record
                Income::create([
                    'order_id' => $salesOrder->order_id,
                    'product_id' => $item['product']->product_id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);

                // Reduce product quantity
                $item['product']->decrement('quantity', $item['quantity']);

                // Check if product is now low on stock
                if ($item['product']->quantity < 10 && !$item['product']->low_stock_alert_created_at) {
                    $item['product']->update([
                        'low_stock_alert_created_at' => now()
                    ]);
                }
            }

            // Create Transaction
            $transaction = Transaction::create([
                'transaction_date' => now(),
                'payment_method' => $request->payment_method,
                'created_by' => $staff->staff_id,
                'type' => 'sales'
            ]);

            // Create Sales Transaction
            SalesTransaction::create([
                'transaction_id' => $transaction->transaction_id,
                'order_id' => $salesOrder->order_id,
                'amount' => $total
            ]);

            // Clear cart
            session()->forget('staff_cart');

            DB::commit();

            return redirect()->route('sales-orders.show', $salesOrder->order_id)
                ->with('success', 'Order created successfully with ' . $discount . '% staff discount!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Checkout failed: ' . $e->getMessage());
        }
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->quantity < $request->quantity) {
            return back()->with('error', 'Insufficient stock available');
        }

        $cart = session()->get('staff_cart', []);

        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id]['quantity'] += $request->quantity;
        } else {
            $cart[$request->product_id] = [
                'quantity' => $request->quantity
            ];
        }

        session()->put('staff_cart', $cart);

        return back()->with('success', 'Product added to cart successfully!');
    }

    public function updateCart(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::findOrFail($productId);

        if ($product->quantity < $request->quantity) {
            return back()->with('error', 'Insufficient stock available');
        }

        $cart = session()->get('staff_cart', []);

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $request->quantity;
            session()->put('staff_cart', $cart);
        }

        return back()->with('success', 'Cart updated successfully!');
    }

    public function removeFromCart($productId)
    {
        $cart = session()->get('staff_cart', []);

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            session()->put('staff_cart', $cart);
        }

        return back()->with('success', 'Item removed from cart');
    }

    private function getStaffDiscount($role)
    {
        $discounts = [
            'sales' => 5,
            'inventory' => 10,
            'manager' => 15,
        ];

        return $discounts[$role] ?? 0;
    }
}