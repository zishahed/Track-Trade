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
        $orders = PurchaseOrder::with(['supplier', 'purchaseTransaction.transaction.staff'])
            ->latest('purchase_date')
            ->paginate(20);

        return Inertia::render('PurchaseOrders/Index', [
            'orders' => $orders
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
            'items.*.price' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            $totalAmount = 0;

            // Calculate total
            foreach ($validated['items'] as $item) {
                $totalAmount += $item['quantity'] * $item['price'];
            }

            // Create Purchase Order
            $purchaseOrder = PurchaseOrder::create([
                'supplier_id' => $validated['supplier_id'],
                'purchase_date' => now(),
                'status' => 'completed',
                'total_amount' => $totalAmount
            ]);

            // Create expenses and update product quantities
            foreach ($validated['items'] as $item) {
                // Create expense record
                Expense::create([
                    'purchase_id' => $purchaseOrder->purchase_id,  // ✅ Must be purchase_id
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);

                // Increase product quantity
                $product = Product::find($item['product_id']);
                $product->increment('quantity', $item['quantity']);

                // Clear low stock alert if quantity is now sufficient
                if ($product->quantity >= 10 && $product->low_stock_alert_created_at) {
                    $product->update([
                        'low_stock_alert_created_at' => null
                    ]);
                }
            }

            // Create Transaction
            $transaction = Transaction::create([
                'transaction_date' => now(),
                'payment_method' => $validated['payment_method'],
                'created_by' => auth()->guard('staff')->id(),
                'type' => 'purchase'
            ]);

            // Create Purchase Transaction
            PurchaseTransaction::create([
                'transaction_id' => $transaction->transaction_id,
                'purchase_id' => $purchaseOrder->purchase_id,
                'amount' => $totalAmount
            ]);

            DB::commit();

            return redirect()->route('purchase-orders.show', $purchaseOrder->purchase_id)
                ->with('success', 'Purchase order created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Failed to create purchase order: ' . $e->getMessage());
        }
    }

    public function show($purchaseId)
    {
        $order = PurchaseOrder::with([
            'supplier',
            'expenses.product',
            'purchaseTransaction.transaction.staff'
        ])->findOrFail($purchaseId);

        return Inertia::render('PurchaseOrders/Show', [
            'order' => $order
        ]);
    }
}