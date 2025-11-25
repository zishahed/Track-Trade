<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Show the login form
     */
    public function showLogin()
    {
        // If already logged in, redirect to dashboard
        if (Auth::guard('staff')->check()) {
            return redirect('/staff/dashboard');
        }

        return Inertia::render('Auth/Login');
    }

    /**
     * Handle login request
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::guard('staff')->attempt($credentials, $remember)) {
            $request->session()->regenerate();
            
            return redirect('/staff/dashboard')
                ->with('success', 'Welcome back!');
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials do not match our records.'],
        ]);
    }

    /**
     * Handle logout request
     */
    public function logout(Request $request)
    {
        Auth::guard('staff')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/staff')
            ->with('success', 'You have been logged out.');
    }
}