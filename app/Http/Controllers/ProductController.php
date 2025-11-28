<?php
// app/Http/Controllers/ProductController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search by name or SKU
        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('sku', 'like', '%' . $request->search . '%');
            });
        }

        // Low stock filter (for staff view)
        if ($request->has('low_stock') && $request->low_stock) {
            $query->where('quantity', '<', 10);
        }

        // Only show in-stock products for customers
        if ($request->has('in_stock') && $request->in_stock) {
            $query->where('quantity', '>', 0);
        }

        $products = $query->paginate(20);

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['category', 'search', 'low_stock', 'in_stock'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        $product->load(['expenses.purchaseOrder.supplier', 'incomes.salesOrder.customer']);
        
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku,' . $product->product_id . ',product_id',
            'category' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
        ]);

        $product->update($validated);

        // Check if quantity is now above threshold and alert was active
        if ($product->quantity >= 10 && $product->low_stock_alert_created_at && !$product->low_stock_alert_resolved_at) {
            $product->update([
                'low_stock_alert_resolved_at' => now(),
                'low_stock_alert_resolved_by' => auth()->guard('staff')->id()
            ]);
        }

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }

    /**
     * Display low stock products
     */
    public function lowStock()
    {
        $products = Product::where('quantity', '<', 10)
            ->with('resolvedByStaff')
            ->orderBy('quantity', 'asc')
            ->get();

        return Inertia::render('Products/LowStock', [
            'products' => $products
        ]);
    }

    /**
     * Resolve low stock alert
     */
    public function resolveAlert(Product $product)
    {
        if (!$product->low_stock_alert_created_at) {
            return back()->with('error', 'This product does not have an active low stock alert.');
        }

        if ($product->low_stock_alert_resolved_at) {
            return back()->with('error', 'This alert has already been resolved.');
        }

        $product->update([
            'low_stock_alert_resolved_at' => now(),
            'low_stock_alert_resolved_by' => auth()->guard('staff')->id()
        ]);

        return back()->with('success', 'Low stock alert resolved successfully.');
    }
}