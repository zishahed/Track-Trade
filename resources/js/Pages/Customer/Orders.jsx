import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    ShoppingBagIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function CustomerOrders({ orders, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(new URLSearchParams(window.location.search).get('status') || 'all');

    const filteredOrders = orders.data.filter(order => {
        const matchesSearch = order.order_id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

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
                            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <span className="text-sm font-semibold text-gray-900">{auth.user?.name}</span>
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

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link 
                        href="/customer/dashboard"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
                    <p className="text-gray-600">View and track your order history</p>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search by order ID..."
                            className="pl-12 w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                statusFilter === 'all'
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('pending')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                statusFilter === 'pending'
                                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200'
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setStatusFilter('completed')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                statusFilter === 'completed'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200'
                            }`}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => {
                        const badge = getStatusBadge(order.status);
                        const StatusIcon = badge.icon;
                        
                        return (
                            <Link
                                key={order.order_id}
                                href={`/customer/orders/${order.order_id}`}
                                className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                Order #{order.order_id}
                                            </h3>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">
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
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
                        <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No orders found</h2>
                        <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}