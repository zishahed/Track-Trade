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
        $orders = SalesOrder::with(['customer'])
            ->latest('order_date')
            ->paginate(20);

        // Calculate total amount for each order
        foreach ($orders as $order) {
            $order->total_amount = $order->incomes()->sum(DB::raw('quantity * price'));
        }

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
        ]);

        // Get cart from session
        $cart = session()->get('cart', []);
        
        if (empty($cart)) {
            return back()->with('error', 'Cart is empty.');
        }

        try {
            DB::beginTransaction();

            // Create sales order
            $order = SalesOrder::create([
                'customer_id' => $validated['customer_id'],
                'order_date' => now(),
                'status' => 'completed'
            ]);

            $totalAmount = 0;

            // Process each cart item
            foreach ($cart as $productId => $cartItem) {
                $product = Product::findOrFail($productId);

                // Check stock
                if ($product->quantity < $cartItem['quantity']) {
                    throw new \Exception("Not enough stock for {$product->name}");
                }

                // Apply staff discount if applicable (e.g., 10% discount)
                $price = $product->price;
                if (isset($validated['is_staff_purchase']) && $validated['is_staff_purchase']) {
                    $price *= 0.90; // 10% discount
                }

                // Create income record
                Income::create([
                    'order_id' => $order->order_id,
                    'product_id' => $product->product_id,
                    'quantity' => $cartItem['quantity'],
                    'price' => $price
                ]);

                // Update product quantity
                $product->decrement('quantity', $cartItem['quantity']);

                // Check if product is now low on stock
                if ($product->quantity < 10 && !$product->low_stock_alert_created_at) {
                    $product->update([
                        'low_stock_alert_created_at' => now()
                    ]);
                }

                $totalAmount += $price * $cartItem['quantity'];
            }

            // Create transaction
            $transaction = Transaction::create([
                'transaction_date' => now(),
                'payment_method' => $validated['payment_method'],
                'created_by' => auth()->guard('staff')->id(),
                'type' => 'sales'
            ]);

            // Create sales transaction
            SalesTransaction::create([
                'transaction_id' => $transaction->transaction_id,
                'order_id' => $order->order_id,
                'amount' => $totalAmount
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

        $order->total_amount = $order->incomes()->sum(DB::raw('quantity * price'));

        return Inertia::render('SalesOrders/Show', [
            'order' => $order
        ]);
    }

    public function cancel(SalesOrder $salesOrder)
    {
        if ($salesOrder->status === 'cancelled') {
            return back()->with('error', 'Order is already cancelled.');
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
