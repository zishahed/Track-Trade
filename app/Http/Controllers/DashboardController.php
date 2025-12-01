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
    public function index(Request $request)
    {
        $user = $request->user();
        $role = $user->role;

        // Initialize stats array
        $stats = [];

        // Get current quarter dates
        $quarterStart = Carbon::now()->firstOfQuarter();
        $quarterEnd = Carbon::now()->lastOfQuarter();
        $today = Carbon::today();
        
        // Get previous quarter dates (used by multiple stats)
        $prevQuarterStart = Carbon::now()->subQuarter()->firstOfQuarter();
        $prevQuarterEnd = Carbon::now()->subQuarter()->lastOfQuarter();

        // Total Revenue This Quarter (for sales and manager)
        if (in_array($role, ['sales', 'manager'])) {
            // Calculate total revenue from sales_orders using the 'total' column
            $totalRevenue = SalesOrder::where('status', 'completed')
                ->whereBetween('created_at', [$quarterStart, $quarterEnd])
                ->sum('total');

            // Calculate previous quarter revenue for comparison
            $prevQuarterRevenue = SalesOrder::where('status', 'completed')
                ->whereBetween('created_at', [$prevQuarterStart, $prevQuarterEnd])
                ->sum('total');

            $revenueChange = $prevQuarterRevenue > 0 
                ? (($totalRevenue - $prevQuarterRevenue) / $prevQuarterRevenue) * 100 
                : ($totalRevenue > 0 ? 100 : 0);

            $stats['totalRevenue'] = [
                'name' => 'Total Revenue (Quarter)',
                'value' => '$' . number_format($totalRevenue, 2),
                'change' => ($revenueChange >= 0 ? '+' : '') . number_format($revenueChange, 1) . '%',
                'trending' => $revenueChange >= 0 ? 'up' : 'down',
            ];
        }

        // Sales Today (for sales and manager)
        if (in_array($role, ['sales', 'manager'])) {
            $salesToday = SalesOrder::whereDate('created_at', $today)
                ->where('status', 'completed')
                ->count();

            // Get yesterday's sales for comparison
            $yesterday = Carbon::yesterday();
            $salesYesterday = SalesOrder::whereDate('created_at', $yesterday)
                ->where('status', 'completed')
                ->count();

            $salesChange = $salesYesterday > 0 
                ? (($salesToday - $salesYesterday) / $salesYesterday) * 100 
                : ($salesToday > 0 ? 100 : 0);

            $stats['salesToday'] = [
                'name' => 'Sales Today',
                'value' => (string)$salesToday,
                'change' => ($salesChange >= 0 ? '+' : '') . number_format($salesChange, 1) . '%',
                'trending' => $salesChange >= 0 ? 'up' : 'down',
            ];
        }

        // Total Products Stock (for inventory and manager)
        if (in_array($role, ['inventory', 'manager'])) {
            $totalProducts = Product::sum('quantity');

            // Count distinct products for a meaningful comparison
            $currentMonthProducts = Product::whereMonth('updated_at', Carbon::now()->month)
                ->whereYear('updated_at', Carbon::now()->year)
                ->count();
            
            $lastMonthProducts = Product::whereMonth('updated_at', Carbon::now()->subMonth()->month)
                ->whereYear('updated_at', Carbon::now()->subMonth()->year)
                ->count();

            $productsChange = $lastMonthProducts > 0 
                ? (($currentMonthProducts - $lastMonthProducts) / $lastMonthProducts) * 100 
                : ($currentMonthProducts > 0 ? 100 : 0);

            $stats['totalProducts'] = [
                'name' => 'Total Products Stock',
                'value' => number_format($totalProducts),
                'change' => ($productsChange >= 0 ? '+' : '') . number_format($productsChange, 1) . '%',
                'trending' => $productsChange >= 0 ? 'up' : 'down',
            ];
        }

        // Total Expense This Quarter (for manager and inventory)
        if (in_array($role, ['inventory', 'manager'])) {
            // Calculate total expense from purchase_transactions
            $totalExpense = PurchaseTransaction::whereHas('purchaseOrder', function($query) {
                    $query->where('status', 'received');
                })
                ->whereBetween('created_at', [$quarterStart, $quarterEnd])
                ->sum('amount');

            // Calculate previous quarter expense for comparison
            $prevQuarterExpense = PurchaseTransaction::whereHas('purchaseOrder', function($query) {
                    $query->where('status', 'received');
                })
                ->whereBetween('created_at', [$prevQuarterStart, $prevQuarterEnd])
                ->sum('amount');

            $expenseChange = $prevQuarterExpense > 0 
                ? (($totalExpense - $prevQuarterExpense) / $prevQuarterExpense) * 100 
                : ($totalExpense > 0 ? 100 : 0);

            $stats['totalExpense'] = [
                'name' => 'Total Expense (Quarter)',
                'value' => '$' . number_format($totalExpense, 2),
                'change' => ($expenseChange >= 0 ? '+' : '') . number_format($expenseChange, 1) . '%',
                'trending' => $expenseChange >= 0 ? 'up' : 'down',
            ];
        }

        // Low Stock Items (for sales, inventory, and manager)
        if (in_array($role, ['sales', 'inventory', 'manager'])) {
            $lowStockCount = Product::where('quantity', '<=', 10)
                ->where('quantity', '>', 0)
                ->count();

            // Count out of stock items
            $outOfStockCount = Product::where('quantity', '=', 0)->count();

            $stats['lowStock'] = [
                'name' => 'Low Stock Items',
                'value' => (string)$lowStockCount,
                'change' => $outOfStockCount > 0 ? $outOfStockCount . ' out of stock' : 'Needs attention',
                'trending' => $lowStockCount > 5 ? 'up' : 'down',
            ];
        }

        // Get recent activities based on role
        $recentActivities = $this->getRecentActivities($role);

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
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