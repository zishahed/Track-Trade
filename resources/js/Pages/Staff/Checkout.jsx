import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    ShoppingCartIcon,
    TrashIcon,
    MinusIcon,
    PlusIcon,
    ArrowLeftIcon,
    CreditCardIcon,
    BanknotesIcon,
    BuildingLibraryIcon,
    UserIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function StaffCheckout({ cartItems, subtotal, tax, total, discount, staff, auth, flash }) {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [customerId, setCustomerId] = useState('');
    const [processing, setProcessing] = useState(false);

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        router.put(`/staff/cart/${productId}`, 
            { quantity: newQuantity },
            { preserveScroll: true }
        );
    };

    const removeItem = (productId) => {
        if (confirm('Remove this item from cart?')) {
            router.delete(`/staff/cart/${productId}`, {
                preserveScroll: true
            });
        }
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/staff/checkout/process', {
            customer_id: customerId,
            payment_method: paymentMethod
        }, {
            onFinish: () => setProcessing(false)
        });
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
                            <Link href="/staff/dashboard" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">T&T</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Track & Trade
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/staff/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                                Dashboard
                            </Link>
                            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <span className="text-sm font-semibold text-gray-900">{auth.user?.name}</span>
                            </div>
                            <Link 
                                href="/staff/logout" 
                                method="post" 
                                as="button"
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Discount Banner */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <TagIcon className="w-5 h-5 mr-2" />
                    <span className="font-bold">
                        {discount}% Staff Discount Applied
                    </span>
                </div>
            </div>

            {/* Flash Messages */}
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
                        href="/staff/products"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Products
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Staff Checkout</h1>
                    <p className="text-gray-600">{cartItems?.length || 0} items in your cart</p>
                </div>

                {!cartItems || cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                        <ShoppingCartIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Add products to get started!</p>
                        <Link
                            href="/staff/products"
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
                                                    <div className="mt-2">
                                                        <p className="text-xs text-gray-500 line-through">
                                                            Original: ${parseFloat(item.original_price).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-green-600 font-semibold">
                                                            With {discount}% discount: ${parseFloat(item.discounted_price).toFixed(2)}
                                                        </p>
                                                    </div>
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
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        ${item.subtotal.toFixed(2)}
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
                            <form onSubmit={handleCheckout} className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                {/* Customer Selection */}
                                <div className="mb-6 pb-6 border-b-2 border-gray-100">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <UserIcon className="w-4 h-4 inline mr-1" />
                                        Customer ID
                                    </label>
                                    <input
                                        type="number"
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        required
                                        placeholder="Enter Customer ID"
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Enter the customer's ID for this purchase
                                    </p>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-6 pb-6 border-b-2 border-gray-100">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Payment Method
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('card')}
                                            className={`p-3 border-2 rounded-lg transition-all ${
                                                paymentMethod === 'card'
                                                    ? 'border-indigo-600 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <CreditCardIcon className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
                                            <p className="text-xs font-semibold">Card</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('cash')}
                                            className={`p-3 border-2 rounded-lg transition-all ${
                                                paymentMethod === 'cash'
                                                    ? 'border-indigo-600 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <BanknotesIcon className="w-6 h-6 mx-auto mb-1 text-green-600" />
                                            <p className="text-xs font-semibold">Cash</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('bank_transfer')}
                                            className={`p-3 border-2 rounded-lg transition-all ${
                                                paymentMethod === 'bank_transfer'
                                                    ? 'border-indigo-600 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <BuildingLibraryIcon className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                                            <p className="text-xs font-semibold">Bank</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-100">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Staff Discount ({discount}%)</span>
                                        <span className="font-semibold">Applied ✓</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (10%)</span>
                                        <span className="font-semibold">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || !customerId}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all mb-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            <CreditCardIcon className="w-5 h-5 inline mr-2" />
                                            Complete Purchase
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/staff/products"
                                    className="block w-full px-6 py-3 border-2 border-gray-200 text-gray-700 text-center font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}