import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    TruckIcon,
    BuildingStorefrontIcon,
    CalendarIcon,
    CreditCardIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ArrowLeftIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function PurchaseOrderShow({ order, auth, flash }) {
    const getStatusBadge = (status) => {
        const badges = {
            'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: ClockIcon },
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
                        href="/purchase-orders"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Purchase Orders
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-4xl font-bold text-gray-900">Purchase Order #PO-{order.purchase_id}</h1>
                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}>
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">
                        Order Date: {new Date(order.purchase_date).toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Supplier Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <BuildingStorefrontIcon className="w-6 h-6 text-green-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">Supplier Information</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Company Name</p>
                                    <p className="text-lg font-semibold text-gray-900">{order.supplier.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Contact Person</p>
                                    <p className="text-lg font-semibold text-gray-900">{order.supplier.contact_person || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1 flex items-center">
                                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                                        Email
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">{order.supplier.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1 flex items-center">
                                        <PhoneIcon className="w-4 h-4 mr-1" />
                                        Phone
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">{order.supplier.phone || 'N/A'}</p>
                                </div>
                            </div>
                            {order.supplier.address && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Address</p>
                                    <p className="text-gray-700">{order.supplier.address}</p>
                                </div>
                            )}
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <TruckIcon className="w-6 h-6 text-green-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
                            </div>
                            <div className="space-y-4">
                                {order.expenses.map((expense) => (
                                    <div key={expense.product_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{expense.product.name}</h3>
                                            <p className="text-sm text-gray-600">{expense.product.sku}</p>
                                            <p className="text-sm text-gray-600">Quantity: {expense.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">${parseFloat(expense.price).toFixed(2)} each</p>
                                            <p className="text-lg font-bold text-gray-900">
                                                ${(expense.quantity * parseFloat(expense.price)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transaction Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <CreditCardIcon className="w-6 h-6 text-green-600 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                                    <p className="text-lg font-semibold text-gray-900 capitalize">
                                        {order.purchase_transaction?.transaction?.payment_method?.replace('_', ' ')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Transaction Date</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {new Date(order.purchase_transaction?.transaction?.transaction_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1 flex items-center">
                                        <UserIcon className="w-4 h-4 mr-1" />
                                        Created By
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {order.purchase_transaction?.transaction?.staff?.name || 'N/A'}
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
                                    <span>Items</span>
                                    <span className="font-semibold">{order.expenses.length}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Total Quantity</span>
                                    <span className="font-semibold">
                                        {order.expenses.reduce((sum, exp) => sum + exp.quantity, 0)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                                <span>Total Amount</span>
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    ${parseFloat(order.total_amount).toFixed(2)}
                                </span>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">📦 Inventory Updated</span><br/>
                                    Product quantities have been increased
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}