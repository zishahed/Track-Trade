<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Income;
use App\Models\Transaction;
use App\Models\SalesTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SalesOrderController extends Controller
{
    public function index()
    {
        $orders = SalesOrder::with(['customer', 'items.product', 'salesTransaction.transaction.staff'])
            ->latest('order_date')
            ->paginate(20);

        return Inertia::render('SalesOrders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $customers = Customer::all();
        $cart = session()->get('cart', []);
        $products = Product::whereIn('product_id', array_keys($cart))->get();

        return Inertia::render('SalesOrders/Create', [
            'customers' => $customers,
            'products' => $products,
            'cart' => $cart
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,customer_id',
            'payment_method' => 'required|string|in:cash,card,bank_transfer',
            'is_staff_purchase' => 'boolean',
            'shipping_address' => 'nullable|string|max:500',
        ]);

        // Get cart from session
        $cart = session()->get('cart', []);
        
        if (empty($cart)) {
            return back()->with('error', 'Cart is empty.');
        }

        try {
            DB::beginTransaction();

            $subtotal = 0;
            $orderItems = [];

            // Process each cart item and calculate totals
            foreach ($cart as $productId => $cartItem) {
                $product = Product::lockForUpdate()->findOrFail($productId);

                // Check stock
                if ($product->quantity < $cartItem['quantity']) {
                    throw new \Exception("Not enough stock for {$product->name}");
                }

                // Apply staff discount if applicable (e.g., 10% discount)
                $price = $product->price;
                if (isset($validated['is_staff_purchase']) && $validated['is_staff_purchase']) {
                    $price *= 0.90; // 10% discount
                }

                $itemSubtotal = $price * $cartItem['quantity'];
                $subtotal += $itemSubtotal;

                $orderItems[] = [
                    'product' => $product,
                    'quantity' => $cartItem['quantity'],
                    'price' => $price,
                    'subtotal' => $itemSubtotal
                ];
            }

            // Calculate tax and shipping
            $tax = $subtotal * 0.10;
            $shipping = $subtotal >= 100 ? 0 : 10;
            $total = $subtotal + $tax + $shipping;

            // Create sales order
            $order = SalesOrder::create([
                'customer_id' => $validated['customer_id'],
                'order_date' => now(),
                'status' => 'completed', // Staff orders are immediately completed
                'shipping_address' => $validated['shipping_address'] ?? null,
                'subtotal' => $subtotal,
                'tax' => $tax,
                'shipping' => $shipping,
                'total' => $total
            ]);

            // Create order items and update inventory
            foreach ($orderItems as $item) {
                // Create income record
                Income::create([
                    'order_id' => $order->order_id,
                    'product_id' => $item['product']->product_id,
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);

                // Update product quantity
                $item['product']->decrement('quantity', $item['quantity']);

                // Check if product is now low on stock
                if ($item['product']->quantity < 10 && !$item['product']->low_stock_alert_created_at) {
                    $item['product']->update([
                        'low_stock_alert_created_at' => now()
                    ]);
                }
            }

            // Create transaction (staff-created order)
            $transaction = Transaction::create([
                'transaction_date' => now(),
                'payment_method' => $validated['payment_method'],
                'created_by' => auth()->guard('staff')->id(), // Staff ID
                'type' => 'sales'
            ]);

            // Create sales transaction
            SalesTransaction::create([
                'transaction_id' => $transaction->transaction_id,
                'order_id' => $order->order_id,
                'amount' => $total
            ]);

            DB::commit();

            // Clear cart
            session()->forget('cart');

            return redirect()->route('sales-orders.show', $order)
                ->with('success', 'Order created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }

    public function show($orderId)
    {
        $order = SalesOrder::with([
            'customer',
            'incomes.product',
            'salesTransaction.transaction.staff'
        ])->findOrFail($orderId);

        return Inertia::render('SalesOrders/Show', [
            'order' => $order
        ]);
    }

    public function complete(SalesOrder $salesOrder)
    {
        if ($salesOrder->status === 'completed') {
            return back()->with('error', 'Order is already completed.');
        }

        if ($salesOrder->status === 'cancelled') {
            return back()->with('error', 'Cannot complete a cancelled order.');
        }

        $salesOrder->update(['status' => 'completed']);

        return back()->with('success', 'Order marked as completed successfully.');
    }

    public function cancel(SalesOrder $salesOrder)
    {
        if ($salesOrder->status === 'cancelled') {
            return back()->with('error', 'Order is already cancelled.');
        }

        if ($salesOrder->status === 'completed') {
            return back()->with('error', 'Cannot cancel a completed order.');
        }

        try {
            DB::beginTransaction();

            // Return products to inventory
            foreach ($salesOrder->incomes as $income) {
                $product = Product::find($income->product_id);
                if ($product) {
                    $product->increment('quantity', $income->quantity);
                }
            }

            // Update order status
            $salesOrder->update(['status' => 'cancelled']);

            DB::commit();

            return back()->with('success', 'Order cancelled successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }
}