<?php
// routes/web.php

use App\Http\Controllers\StaffController;
use App\Http\Controllers\CustomerAuthController;
use App\Http\Controllers\StaffManagementController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductCustomerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\PurchaseOrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ========== ROOT / WELCOME PAGE (CUSTOMER FACING) ==========
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// ========== STAFF ROUTES (Access via /staff) ==========
Route::get('/staff', [StaffController::class, 'showLogin'])->name('staff.login');
Route::post('/staff/login', [StaffController::class, 'login'])->name('staff.login.post');
Route::post('/staff/logout', [StaffController::class, 'logout'])
    ->middleware('auth:staff')
    ->name('staff.logout');

Route::get('/staff/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware('auth:staff')->name('staff.dashboard');

// ========== CUSTOMER AUTHENTICATION ==========
Route::get('/customer/register', [CustomerAuthController::class, 'showRegister'])
    ->middleware('guest:customer')
    ->name('customer.register');

Route::post('/customer/register', [CustomerAuthController::class, 'register'])
    ->middleware('guest:customer');

Route::get('/customer/login', [CustomerAuthController::class, 'showLogin'])
    ->middleware('guest:customer')
    ->name('customer.login');

Route::post('/customer/login', [CustomerAuthController::class, 'login'])
    ->middleware('guest:customer');

Route::post('/customer/logout', [CustomerAuthController::class, 'logout'])
    ->middleware('auth:customer')
    ->name('customer.logout');

Route::get('/customer/dashboard', [CustomerAuthController::class, 'dashboard'])
    ->middleware('auth:customer')
    ->name('customer.dashboard');

// ========== CUSTOMER PRODUCT BROWSING & CART ==========
Route::middleware('auth:customer')->group(function () {
    // Products browsing for customers
    Route::get('/products', [ProductCustomerController::class, 'index'])->name('products.index');
    
    // Cart routes
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('/add', [CartController::class, 'add'])->name('add');
        Route::put('/{productId}', [CartController::class, 'update'])->name('update');
        Route::delete('/{productId}', [CartController::class, 'remove'])->name('remove');
        Route::delete('/', [CartController::class, 'clear'])->name('clear');
    });
});

// ========== STAFF MANAGEMENT (Manager Only) ==========
Route::middleware('auth:staff')->group(function () {
    Route::get('/staff-management', [StaffManagementController::class, 'index'])
        ->name('staff-management.index');
    
    Route::get('/staff-management/create', [StaffManagementController::class, 'create'])
        ->name('staff-management.create');
    
    Route::post('/staff-management', [StaffManagementController::class, 'store'])
        ->name('staff-management.store');
    
    Route::get('/staff-management/{staff}/edit', [StaffManagementController::class, 'edit'])
        ->name('staff-management.edit');
    
    Route::put('/staff-management/{staff}', [StaffManagementController::class, 'update'])
        ->name('staff-management.update');
    
    Route::delete('/staff-management/{staff}', [StaffManagementController::class, 'destroy'])
        ->name('staff-management.destroy');
});

// ========== PRODUCTS MANAGEMENT (Staff Only) ==========
Route::middleware('auth:staff')->group(function () {
    // Low Stock Alerts
    Route::get('/products/low-stock', [ProductController::class, 'lowStock'])
        ->name('products.low-stock');
    Route::post('/products/{product}/resolve-alert', [ProductController::class, 'resolveAlert'])
        ->name('products.resolve-alert');
    
    // Product CRUD
    Route::resource('admin/products', ProductController::class);
});

// ========== SALES ORDERS (Staff & Manager) ==========
Route::middleware('auth:staff')->group(function () {
    Route::get('/sales-orders', [SalesOrderController::class, 'index'])
        ->name('sales-orders.index');
    Route::get('/sales-orders/{salesOrder}', [SalesOrderController::class, 'show'])
        ->name('sales-orders.show');
    Route::post('/sales-orders/{salesOrder}/cancel', [SalesOrderController::class, 'cancel'])
        ->name('sales-orders.cancel');
});

// ========== PURCHASE ORDERS (Staff & Manager) ==========
Route::middleware('auth:staff')->group(function () {
    Route::get('/purchase-orders', [PurchaseOrderController::class, 'index'])
        ->name('purchase-orders.index');
    Route::get('/purchase-orders/create', [PurchaseOrderController::class, 'create'])
        ->name('purchase-orders.create');
    Route::post('/purchase-orders', [PurchaseOrderController::class, 'store'])
        ->name('purchase-orders.store');
    Route::get('/purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'show'])
        ->name('purchase-orders.show');
});