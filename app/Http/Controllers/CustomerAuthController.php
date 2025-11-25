<?php
// app/Http/Controllers/CustomerAuthController.php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CustomerAuthController extends Controller
{
    /**
     * Show customer registration form
     */
    public function showRegister()
    {
        return Inertia::render('Auth/CustomerRegister');
    }

    /**
     * Handle customer registration
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
        ]);

        // Auto-login the customer
        Auth::guard('customer')->login($customer);

        return redirect()->route('customer.dashboard')
            ->with('success', 'Registration successful! Welcome to Track & Trade.');
    }

    /**
     * Show customer login form
     */
    public function showLogin()
    {
        return Inertia::render('Auth/CustomerLogin');
    }

    /**
     * Handle customer login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::guard('customer')->attempt($credentials, $remember)) {
            $request->session()->regenerate();
            
            return redirect()->route('customer.dashboard')
                ->with('success', 'Welcome back!');
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials do not match our records.'],
        ]);
    }

    /**
     * Handle customer logout
     */
    public function logout(Request $request)
    {
        Auth::guard('customer')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('customer.login')
            ->with('success', 'You have been logged out.');
    }

    /**
     * Show customer dashboard
     */
    public function dashboard()
    {
        $customer = Auth::guard('customer')->user();
        
        return Inertia::render('Customer/Dashboard', [
            'customer' => $customer
        ]);
    }
}

