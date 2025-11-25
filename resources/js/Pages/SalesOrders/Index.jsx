// resources/js/Pages/SalesOrders/Index.jsx

import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    EyeIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function SalesOrdersIndex({ orders, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredOrders = orders.data.filter(order => {
        const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.order_id.toString().includes(searchTerm);
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

    const stats = {
        total: orders.data.length,
        completed: orders.data.filter(o => o.status === 'completed').length,
        pending: orders.data.filter(o => o.status === 'pending').length,
        cancelled: orders.data.filter(o => o.status === 'cancelled').length,
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

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                        <ShoppingCartIcon className="w-10 h-10 text-indigo-600 mr-3" />
                        Sales Orders
                    </h1>
                    <p className="text-gray-600">Manage and track customer orders</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                                <ShoppingCartIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                <CheckCircleIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                                <ClockIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Cancelled</p>
                                <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                                <XCircleIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
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
                            placeholder="Search by customer name or order ID..."
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
                            onClick={() => setStatusFilter('completed')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                statusFilter === 'completed'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200'
                            }`}
                        >
                            Completed
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
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map((order) => {
                                    const badge = getStatusBadge(order.status);
                                    return (
                                        <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-indigo-600">#{order.order_id}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                                                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                                    <badge.icon className="w-3 h-3 mr-1" />
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-900">
                                                    ${order.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/sales-orders/${order.order_id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition-colors"
                                                >
                                                    <EyeIcon className="w-4 h-4 mr-2" />
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No orders found</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}