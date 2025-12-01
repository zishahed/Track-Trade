<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerAuthController extends Controller
{
    public function showRegister()
    {
        return Inertia::render('Auth/CustomerRegister');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        Auth::guard('customer')->login($customer);

        // Check for pending cart action after registration
        $cartAction = session()->get('cart_action');
        
        if ($cartAction && isset($cartAction['product_id'])) {
            $productId = $cartAction['product_id'];
            $quantity = $cartAction['quantity'] ?? 1;
            
            // Verify product exists and has stock
            $product = Product::find($productId);
            
            if ($product && $product->quantity >= $quantity) {
                // Add to cart
                $cart = session()->get('cart', []);
                
                if (isset($cart[$productId])) {
                    $cart[$productId]['quantity'] += $quantity;
                } else {
                    $cart[$productId] = ['quantity' => $quantity];
                }
                
                session()->put('cart', $cart);
                session()->forget('cart_action');
                
                return redirect()->route('cart.index')
                    ->with('success', 'Registration successful! Product added to cart.');
            }
            
            session()->forget('cart_action');
        }

        return redirect()->route('products.index')
            ->with('success', 'Registration successful!');
    }

    public function showLogin()
    {
        return Inertia::render('Auth/CustomerLogin');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('customer')->attempt($credentials, $request->filled('remember'))) {
            // Get cart action BEFORE any session changes
            $cartAction = $request->session()->get('cart_action');
            
            // Use migrate instead of regenerate to preserve session data
            $request->session()->migrate();
            
            // Restore cart action after migration
            if ($cartAction) {
                $request->session()->put('cart_action', $cartAction);
            }

            // Check for pending cart action
            if ($cartAction && isset($cartAction['product_id'])) {
                $productId = $cartAction['product_id'];
                $quantity = $cartAction['quantity'] ?? 1;
                
                // Verify product exists and has stock
                $product = Product::find($productId);
                
                if ($product && $product->quantity >= $quantity) {
                    // Add to cart
                    $cart = $request->session()->get('cart', []);
                    
                    if (isset($cart[$productId])) {
                        $cart[$productId]['quantity'] += $quantity;
                    } else {
                        $cart[$productId] = ['quantity' => $quantity];
                    }
                    
                    $request->session()->put('cart', $cart);
                    $request->session()->forget('cart_action');
                    
                    return redirect()->route('cart.index')
                        ->with('success', 'Logged in successfully! Product added to cart.');
                }
                
                $request->session()->forget('cart_action');
            }

            return redirect()->route('products.index')
                ->with('success', 'Logged in successfully!');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::guard('customer')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('products.index')
            ->with('success', 'Logged out successfully!');
    }

    public function dashboard()
    {
        $customer = Auth::guard('customer')->user();
        
        // Get customer's orders with relationships
        $orders = SalesOrder::where('customer_id', $customer->customer_id)
            ->with(['incomes.product', 'salesTransaction.transaction'])
            ->latest('order_date')
            ->get();
        
        // Calculate stats
        $totalOrders = $orders->count();
        $pendingOrders = $orders->where('status', 'pending')->count();
        $completedOrders = $orders->where('status', 'completed')->count();
        $cancelledOrders = $orders->where('status', 'cancelled')->count();
        
        // Get recent orders (last 5)
        $recentOrders = $orders->take(5);
        
        return Inertia::render('Customer/Dashboard', [
            'customer' => $customer,
            'stats' => [
                'totalOrders' => $totalOrders,
                'pendingOrders' => $pendingOrders,
                'completedOrders' => $completedOrders,
                'cancelledOrders' => $cancelledOrders,
            ],
            'orders' => $orders
        ]);
    }
    public function orders()
    {
        $customer = Auth::guard('customer')->user();
        
        $orders = SalesOrder::where('customer_id', $customer->customer_id)
            ->with(['incomes.product', 'salesTransaction.transaction'])
            ->latest('order_date')
            ->paginate(10);
        
        return Inertia::render('Customer/Orders', [
            'orders' => $orders
        ]);
    }

    public function orderDetails($orderId)
    {
        $customer = Auth::guard('customer')->user();
        
        $order = SalesOrder::where('customer_id', $customer->customer_id)
            ->where('order_id', $orderId)
            ->with(['incomes.product', 'salesTransaction.transaction'])
            ->firstOrFail();
        
        return Inertia::render('Customer/OrderDetails', [
            'order' => $order
        ]);
    }
}