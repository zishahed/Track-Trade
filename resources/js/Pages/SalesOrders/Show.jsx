import React from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    ShoppingBagIcon,
    UserIcon,
    CalendarIcon,
    CreditCardIcon,
    TruckIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function SalesOrderShow({ order, auth, flash }) {
    const handleComplete = () => {
        if (confirm('Mark this order as completed?')) {
            router.post(`/sales-orders/${order.order_id}/complete`, {}, {
                preserveScroll: true
            });
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this order? This will restore the product quantities.')) {
            router.post(`/sales-orders/${order.order_id}/cancel`, {}, {
                preserveScroll: true
            });
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: CalendarIcon },
            'completed': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircleIcon },
            'cancelled': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircleIcon },
        };
        return badges[status] || badges['pending'];
    };

    const badge = getStatusBadge(order.status);
    const StatusIcon = badge.icon;

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
                        href="/sales-orders"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Orders
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-4xl font-bold text-gray-900">Order #{order.order_id}</h1>
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            {order.status === 'pending' && (
                                <>
                                    <button
                                        onClick={handleComplete}
                                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center"
                                    >
                                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                                        Mark as Completed
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center"
                                    >
                                        <XCircleIcon className="w-5 h-5 mr-2" />
                                        Cancel Order
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Order Date: {new Date(order.order_date).toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <UserIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">Customer Information</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Name</p>
                                    <p className="text-lg font-semibold text-gray-900">{order.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <p className="text-lg font-semibold text-gray-900">{order.customer.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                                    <p className="text-lg font-semibold text-gray-900">{order.customer.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        {order.shipping_address && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center mb-4">
                                    <MapPinIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                    <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                                </div>
                                <p className="text-gray-700 whitespace-pre-line">{order.shipping_address}</p>
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <ShoppingBagIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
                            </div>
                            <div className="space-y-4">
                                {order.incomes.map((income) => (
                                    <div key={income.product_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{income.product.name}</h3>
                                            <p className="text-sm text-gray-600">{income.product.sku}</p>
                                            <p className="text-sm text-gray-600">Quantity: {income.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">${parseFloat(income.price).toFixed(2)} each</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                ${(income.quantity * parseFloat(income.price)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <CreditCardIcon className="w-6 h-6 text-indigo-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                                    <p className="text-lg font-semibold text-gray-900 capitalize">
                                        {order.sales_transaction?.transaction?.payment_method?.replace('_', ' ')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Transaction Date</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {new Date(order.sales_transaction?.transaction?.transaction_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Created By</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {order.sales_transaction?.transaction?.staff?.name || 'Customer (Online)'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            
                            <div className="space-y-3 mb-6 pb-6 border-b-2 border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${parseFloat(order.subtotal).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (10%)</span>
                                    <span className="font-semibold">${parseFloat(order.tax).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className={`font-semibold ${order.shipping == 0 ? 'text-green-600' : ''}`}>
                                        {order.shipping == 0 ? 'FREE' : `$${parseFloat(order.shipping).toFixed(2)}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                                <span>Total</span>
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    ${parseFloat(order.total).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}