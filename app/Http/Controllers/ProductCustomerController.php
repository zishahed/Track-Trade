<?php
// app/Http/Controllers/ProductCustomerController.php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCustomerController extends Controller
{
    /**
     * Display product listing for customers
     */
    public function index(Request $request)
    {
        $products = Product::where('quantity', '>', 0)
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'cartCount' => count(session()->get('cart', []))
        ]);
    }
}