// resources/js/Pages/Products/LowStock.jsx

import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    ExclamationTriangleIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
    ClockIcon,
    UserIcon,
    CubeIcon
} from '@heroicons/react/24/outline';

export default function LowStock({ products, auth, flash }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('unresolved'); // 'all', 'unresolved', 'resolved'

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filter === 'all' || 
                            (filter === 'unresolved' && !product.low_stock_alert_resolved_at) ||
                            (filter === 'resolved' && product.low_stock_alert_resolved_at);
        
        return matchesSearch && matchesFilter;
    });

    const resolveAlert = (productId) => {
        if (confirm('Mark this low stock alert as resolved?')) {
            router.post(`/products/${productId}/resolve-alert`, {}, {
                preserveScroll: true
            });
        }
    };

    const unresolvedCount = products.filter(p => !p.low_stock_alert_resolved_at).length;
    const resolvedCount = products.filter(p => p.low_stock_alert_resolved_at).length;

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

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                        <ExclamationTriangleIcon className="w-10 h-10 text-orange-600 mr-3" />
                        Low Stock Alerts
                    </h1>
                    <p className="text-gray-600">Monitor and resolve low stock alerts for products</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Alerts</p>
                                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                                <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Unresolved</p>
                                <p className="text-3xl font-bold text-orange-600">{unresolvedCount}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                                <ClockIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Resolved</p>
                                <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                                <CheckCircleIcon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search by product name or SKU..."
                            className="pl-12 w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                filter === 'all'
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unresolved')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                filter === 'unresolved'
                                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300'
                            }`}
                        >
                            Unresolved
                        </button>
                        <button
                            onClick={() => setFilter('resolved')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                filter === 'resolved'
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300'
                            }`}
                        >
                            Resolved
                        </button>
                    </div>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                    {filteredProducts.map(product => (
                        <div 
                            key={product.product_id} 
                            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden ${
                                !product.low_stock_alert_resolved_at ? 'border-l-4 border-orange-500' : 'border-l-4 border-green-500'
                            }`}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div className="p-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl">
                                            <CubeIcon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                                                {!product.low_stock_alert_resolved_at ? (
                                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full flex items-center">
                                                        <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                                                        Needs Attention
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center">
                                                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                                                        Resolved
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">SKU: {product.sku} | Category: {product.category}</p>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                                <div className="bg-red-50 rounded-lg p-3">
                                                    <p className="text-xs text-gray-600 mb-1">Current Stock</p>
                                                    <p className="text-2xl font-bold text-red-600">{product.quantity}</p>
                                                </div>
                                                <div className="bg-blue-50 rounded-lg p-3">
                                                    <p className="text-xs text-gray-600 mb-1">Price</p>
                                                    <p className="text-xl font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</p>
                                                </div>
                                                <div className="bg-yellow-50 rounded-lg p-3">
                                                    <p className="text-xs text-gray-600 mb-1">Alert Created</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(product.low_stock_alert_created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                {product.low_stock_alert_resolved_at && (
                                                    <div className="bg-green-50 rounded-lg p-3">
                                                        <p className="text-xs text-gray-600 mb-1">Resolved On</p>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {new Date(product.low_stock_alert_resolved_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {product.resolved_by_staff && (
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 flex items-center space-x-3">
                                                    <UserIcon className="w-5 h-5 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            Resolved by: {product.resolved_by_staff.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {product.resolved_by_staff.email} • {product.resolved_by_staff.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-2 ml-4">
                                        {!product.low_stock_alert_resolved_at && (
                                            <button
                                                onClick={() => resolveAlert(product.product_id)}
                                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                                            >
                                                Mark as Resolved
                                            </button>
                                        )}
                                        <Link
                                            href={`/admin/products/${product.product_id}/edit`}
                                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                                        >
                                            Edit Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <CheckCircleIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No alerts found</h3>
                        <p className="text-gray-500">All products are well stocked!</p>
                    </div>
                )}
            </main>
        </div>
    );
}