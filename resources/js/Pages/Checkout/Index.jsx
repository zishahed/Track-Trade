import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    CreditCardIcon,
    BanknotesIcon,
    BuildingLibraryIcon,
    ArrowLeftIcon,
    ShoppingBagIcon,
    UserIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function CheckoutIndex({ cartItems, subtotal, tax, shipping, total, customer, flash }) {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [shippingAddress, setShippingAddress] = useState(customer?.address || '');
    const [processing, setProcessing] = useState(false);

    const handleCheckout = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/checkout/process', {
            payment_method: paymentMethod,
            shipping_address: shippingAddress
        }, {
            onFinish: () => setProcessing(false)
        });
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
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">T&T</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Track & Trade
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <span className="text-sm font-semibold text-gray-900">{customer?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

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
                        href="/cart"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Cart
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your order</p>
                </div>

                <form onSubmit={handleCheckout}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Shipping & Payment */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Customer Info */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center mb-4">
                                    <UserIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                    <h2 className="text-2xl font-bold text-gray-900">Customer Information</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                            {customer?.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                                            {customer?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center mb-4">
                                    <MapPinIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                    <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                                </div>
                                <textarea
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    required
                                    rows="4"
                                    placeholder="Enter your complete shipping address..."
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center mb-4">
                                    <CreditCardIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-6 border-2 rounded-xl transition-all ${
                                            paymentMethod === 'card'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <CreditCardIcon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                                        <p className="font-semibold text-gray-900">Card</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cash')}
                                        className={`p-6 border-2 rounded-xl transition-all ${
                                            paymentMethod === 'cash'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <BanknotesIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                                        <p className="font-semibold text-gray-900">Cash</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('bank_transfer')}
                                        className={`p-6 border-2 rounded-xl transition-all ${
                                            paymentMethod === 'bank_transfer'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <BuildingLibraryIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                        <p className="font-semibold text-gray-900">Bank Transfer</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                {/* Order Items */}
                                <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-100 max-h-64 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item.product.product_id} className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-xl">{getCategoryIcon(item.product.category)}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900">${item.subtotal.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
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
                                </div>

                                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || !shippingAddress}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                                            <ShoppingBagIcon className="w-5 h-5 inline mr-2" />
                                            Place Order
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">🔒 Secure Checkout</span><br/>
                                        Your information is encrypted and secure
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}