<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\Supplier;
use App\Models\Product;
use App\Models\Expense;
use App\Models\Transaction;
use App\Models\PurchaseTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index()
    {
        $orders = PurchaseOrder::with(['supplier'])
            ->latest('purchase_date')
            ->paginate(20);

        // Calculate total amount for each order
        foreach ($orders as $order) {
            $order->total_amount = $order->expenses()->sum(DB::raw('quantity * price'));
        }

        return Inertia::render('PurchaseOrders/Index', [
            'orders' => $orders
        ]);
    }

    public function show($purchaseId)
    {
        $order = PurchaseOrder::with([
            'supplier',
            'expenses.product',
            'purchaseTransaction.transaction.staff'
        ])->findOrFail($purchaseId);

        $order->total_amount = $order->expenses()->sum(DB::raw('quantity * price'));

        return Inertia::render('PurchaseOrders/Show', [
            'order' => $order
        ]);
    }

    public function create()
    {
        $suppliers = Supplier::all();
        $products = Product::all();

        return Inertia::render('PurchaseOrders/Create', [
            'suppliers' => $suppliers,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id' => 'required|exists:suppliers,supplier_id',
            'payment_method' => 'required|string|in:cash,card,bank_transfer',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,product_id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0'
        ]);

        try {
            DB::beginTransaction();

            $order = PurchaseOrder::create([
                'supplier_id' => $validated['supplier_id'],
                'purchase_date' => now(),
                'status' => 'completed'
            ]);

            $totalAmount = 0;

            foreach ($validated['items'] as $item) {
                Expense::create([
                    'purchase_id' => $order->purchase_id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);

                // Update product quantity
                $product = Product::find($item['product_id']);
                $product->increment('quantity', $item['quantity']);

                // Auto-resolve low stock alert if quantity is now >= 10
                if ($product->quantity >= 10 && $product->low_stock_alert_created_at && !$product->low_stock_alert_resolved_at) {
                    $product->update([
                        'low_stock_alert_resolved_at' => now(),
                        'low_stock_alert_resolved_by' => auth()->guard('staff')->id()
                    ]);
                }

                $totalAmount += $item['price'] * $item['quantity'];
            }

            $transaction = Transaction::create([
                'transaction_date' => now(),
                'payment_method' => $validated['payment_method'],
                'created_by' => auth()->guard('staff')->id(),
                'type' => 'purchase'
            ]);

            PurchaseTransaction::create([
                'transaction_id' => $transaction->transaction_id,
                'purchase_id' => $order->purchase_id,
                'amount' => $totalAmount
            ]);

            DB::commit();

            return redirect()->route('purchase-orders.show', $order->purchase_id)
                ->with('success', 'Purchase order created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }
}