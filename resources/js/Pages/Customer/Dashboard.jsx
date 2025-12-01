import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    ShoppingBagIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowRightIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export default function CustomerDashboard({ customer, stats, orders }) {
    const { flash } = usePage().props;

    const getStatusBadge = (status) => {
        const badges = {
            'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: ClockIcon },
            'completed': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircleIcon },
            'cancelled': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircleIcon },
        };
        return badges[status] || badges['pending'];
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
                            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                                Products
                            </Link>
                            <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                                Cart
                            </Link>
                            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <span className="text-sm font-semibold text-gray-900">{customer.name}</span>
                            </div>
                            <Link 
                                href="/customer/logout" 
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

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {customer.name}!</h1>
                    <p className="text-gray-600">Here's an overview of your orders and account</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Orders */}
                    <Link
                        href="/customer/orders"
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                                <p className="text-4xl font-bold text-gray-900">{stats.totalOrders}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                <ShoppingBagIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-indigo-600 font-medium">
                            <span className="text-sm">View all orders</span>
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </div>
                    </Link>

                    {/* Pending Orders */}
                    <Link
                        href="/customer/orders?status=pending"
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Pending Orders</p>
                                <p className="text-4xl font-bold text-gray-900">{stats.pendingOrders}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                                <ClockIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-yellow-600 font-medium">
                            <span className="text-sm">View pending</span>
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </div>
                    </Link>

                    {/* Completed Orders */}
                    <Link
                        href="/customer/orders?status=completed"
                        className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                                <p className="text-4xl font-bold text-gray-900">{stats.completedOrders}</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                <CheckCircleIcon className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-green-600 font-medium">
                            <span className="text-sm">View completed</span>
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </div>
                    </Link>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                        <Link
                            href="/customer/orders"
                            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
                        >
                            View All
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    {orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.slice(0, 5).map((order) => {
                                const badge = getStatusBadge(order.status);
                                const StatusIcon = badge.icon;
                                
                                return (
                                    <Link
                                        key={order.order_id}
                                        href={`/customer/orders/${order.order_id}`}
                                        className="block p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <p className="text-lg font-bold text-gray-900">
                                                        Order #{order.order_id}
                                                    </p>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                                        <StatusIcon className="w-3 h-3 mr-1" />
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(order.order_date).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {order.incomes?.length || 0} items
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                    ${parseFloat(order.total || 0).toFixed(2)}
                                                </p>
                                                <ArrowRightIcon className="w-5 h-5 text-gray-400 ml-auto mt-2" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-4">No orders yet</p>
                            <Link
                                href="/products"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}