// resources/js/Pages/Cart/Index.jsx

import React from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    ShoppingCartIcon,
    TrashIcon,
    MinusIcon,
    PlusIcon,
    ArrowLeftIcon,
    CreditCardIcon
} from '@heroicons/react/24/outline';

export default function CartIndex({ cartItems, total, subtotal, tax, shipping, auth, flash }) {
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        router.put(`/cart/${productId}`, 
            { quantity: newQuantity },
            { preserveScroll: true }
        );
    };

    const removeItem = (productId) => {
        if (confirm('Remove this item from cart?')) {
            router.delete(`/cart/${productId}`, {
                preserveScroll: true
            });
        }
    };

    const getCategoryGradient = (category) => {
        const gradients = {
            'Processor': 'from-red-500 to-orange-600',
            'Motherboard': 'from-blue-500 to-indigo-600',
            'RAM': 'from-yellow-500 to-orange-600',
            'GPU': 'from-purple-500 to-pink-600',
            'Storage': 'from-green-500 to-emerald-600',
            'PSU': 'from-gray-500 to-slate-600',
            'Cooling': 'from-cyan-500 to-blue-600',
            'Case': 'from-indigo-500 to-purple-600',
            'Monitor': 'from-teal-500 to-cyan-600',
            'Peripherals': 'from-pink-500 to-rose-600',
        };
        return gradients[category] || 'from-gray-500 to-gray-600';
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Processor': '🔥',
            'Motherboard': '🔧',
            'RAM': '⚡',
            'GPU': '🎮',
            'Storage': '💾',
            'PSU': '🔌',
            'Cooling': '❄️',
            'Case': '📦',
            'Monitor': '🖥️',
            'Peripherals': '⌨️',
        };
        return icons[category] || '📦';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <Link href="/customer/dashboard" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">T&T</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Track & Trade
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/products"
                                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <span className="text-sm font-semibold text-gray-900">{auth?.user?.name || 'Guest'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                        {flash.success}
                    </div>
                </div>
            )}

            {flash?.error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                        {flash.error}
                    </div>
                </div>
            )}

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link 
                        href="/products"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Shopping
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cartItems?.length || 0} items in your cart</p>
                </div>

                {!cartItems || cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                        <ShoppingCartIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Start building your dream PC!</p>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                            <ShoppingCartIcon className="w-5 h-5 mr-2" />
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.product.product_id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Product Image */}
                                        <div className={`sm:w-32 h-32 bg-gradient-to-br ${getCategoryGradient(item.product.category)} flex items-center justify-center flex-shrink-0`}>
                                            <span className="text-white text-4xl">
                                                {getCategoryIcon(item.product.category)}
                                            </span>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.product.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.product.sku}</p>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {item.product.quantity} available
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.product.product_id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.product_id, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <MinusIcon className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-6 py-2 font-semibold text-gray-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.product.quantity}
                                                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        <PlusIcon className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                        ${item.subtotal.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ${parseFloat(item.product.price).toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (10%)</span>
                                        <span className="font-semibold">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    {subtotal < 100 && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            💡 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="block w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all mb-3"
                                >
                                    <CreditCardIcon className="w-5 h-5 inline mr-2" />
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    href="/products"
                                    className="block w-full px-6 py-3 border-2 border-gray-200 text-gray-700 text-center font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </Link>

                                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">🔒 Secure Checkout</span><br/>
                                        Your payment information is encrypted and secure
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}