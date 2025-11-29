<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SalesOrder;
use App\Models\SalesTransaction;
use App\Models\PurchaseOrder;
use App\Models\PurchaseTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
public function index()
    {
        // Get current quarter dates
        $currentQuarter = now()->quarter;
        $year = now()->year;
        $quarterStart = now()->startOfQuarter();
        $quarterEnd = now()->endOfQuarter();

        // Calculate Total Income (from sales)
        $totalIncome = SalesOrder::where('status', 'completed')
            ->whereBetween('created_at', [$quarterStart, $quarterEnd])
            ->sum('total');

        // Calculate Total Expense (from purchases)
        $totalExpense = PurchaseOrder::where('status', 'completed')
            ->whereBetween('created_at', [$quarterStart, $quarterEnd])
            ->sum('total_amount');

        // Get low stock products
        $lowStockProducts = Product::where('quantity', '<', 10)
            ->whereNotNull('low_stock_alert_created_at')
            ->count();

        // Recent sales orders
        $recentSales = SalesOrder::with('customer')
            ->latest()
            ->take(5)
            ->get();

        // Recent purchase orders
        $recentPurchases = PurchaseOrder::with('supplier')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalIncome' => $totalIncome,
                'totalExpense' => $totalExpense,
                'lowStockProducts' => $lowStockProducts,
                'profit' => $totalIncome - $totalExpense,
            ],
            'recentSales' => $recentSales,
            'recentPurchases' => $recentPurchases,
        ]);
    }

    private function getRecentActivities($role)
    {
        $activities = [];

        // Sales orders (for sales and manager)
        if (in_array($role, ['sales', 'manager'])) {
            $recentSales = SalesOrder::with('customer')
                ->where('status', 'completed')
                ->latest('updated_at')
                ->take(2)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => 'sale-' . $order->order_id,
                        'type' => 'sale',
                        'message' => "Order #" . $order->order_id . " completed ($" . number_format($order->total, 2) . ")",
                        'time' => $order->updated_at->diffForHumans(),
                        'icon' => 'CheckCircleIcon',
                        'color' => 'text-green-600',
                    ];
                });
            $activities = array_merge($activities, $recentSales->toArray());
        }

        // Purchase orders (for inventory and manager)
        if (in_array($role, ['inventory', 'manager'])) {
            $recentPurchases = PurchaseOrder::with('supplier')
                ->where('status', 'received')
                ->latest('updated_at')
                ->take(2)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => 'purchase-' . $order->order_id,
                        'type' => 'purchase',
                        'message' => "Purchase order #" . $order->order_id . " received",
                        'time' => $order->updated_at->diffForHumans(),
                        'icon' => 'TruckIcon',
                        'color' => 'text-blue-600',
                    ];
                });
            $activities = array_merge($activities, $recentPurchases->toArray());
        }

        // Low stock alerts (for all roles)
        if (in_array($role, ['sales', 'inventory', 'manager'])) {
            $lowStockProducts = Product::where('quantity', '<=', 10)
                ->where('quantity', '>', 0)
                ->orderBy('quantity', 'asc')
                ->take(2)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => 'low-stock-' . $product->product_id,
                        'type' => 'stock',
                        'message' => "Low stock alert: {$product->name} ({$product->quantity} left)",
                        'time' => $product->updated_at->diffForHumans(),
                        'icon' => 'ExclamationTriangleIcon',
                        'color' => 'text-orange-600',
                    ];
                });
            $activities = array_merge($activities, $lowStockProducts->toArray());
        }

        // Limit to 4 most relevant activities
        return array_slice($activities, 0, 4);
    }
}