// resources/js/Pages/Dashboard/Index.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    CubeIcon, 
    ShoppingCartIcon, 
    UserGroupIcon, 
    ChartBarIcon,
    ExclamationTriangleIcon,
    TruckIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ClockIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    const stats = [
        { 
            name: 'Total Revenue', 
            value: '$45,231', 
            change: '+12.5%',
            trending: 'up',
            icon: CurrencyDollarIcon, 
            color: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        { 
            name: 'Total Products', 
            value: '2,458', 
            change: '+5.2%',
            trending: 'up',
            icon: CubeIcon, 
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        { 
            name: 'Sales Today', 
            value: '145', 
            change: '+8.1%',
            trending: 'up',
            icon: ShoppingCartIcon, 
            color: 'from-purple-400 to-pink-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        { 
            name: 'Low Stock Items', 
            value: '12', 
            change: '-3 from yesterday',
            trending: 'down',
            icon: ExclamationTriangleIcon, 
            color: 'from-orange-400 to-red-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600'
        },
    ];

    const recentActivities = [
        { id: 1, type: 'sale', message: 'New order #1234 completed', time: '2 minutes ago', icon: CheckCircleIcon, color: 'text-green-600' },
        { id: 2, type: 'stock', message: 'Low stock alert for Laptop Dell', time: '15 minutes ago', icon: ExclamationTriangleIcon, color: 'text-orange-600' },
        { id: 3, type: 'purchase', message: 'Purchase order #5678 received', time: '1 hour ago', icon: TruckIcon, color: 'text-blue-600' },
        { id: 4, type: 'sale', message: 'New order #1233 completed', time: '2 hours ago', icon: CheckCircleIcon, color: 'text-green-600' },
    ];

    const quickActions = [
        { name: 'Manage Products', href: '/products', icon: CubeIcon, color: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
        { name: 'Sales Orders', href: '/sales-orders', icon: ShoppingCartIcon, color: 'bg-gradient-to-br from-purple-500 to-pink-600' },
        { name: 'Purchase Orders', href: '/purchase-orders', icon: TruckIcon, color: 'bg-gradient-to-br from-green-500 to-emerald-600' },
        { name: 'Low Stock Alerts', href: '/products/low-stock', icon: ExclamationTriangleIcon, color: 'bg-gradient-to-br from-orange-500 to-red-600' },
    ];

    const isManager = auth.user?.role === 'manager';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">T&T</span>
                                </div>
                                <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Track & Trade
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {isManager && (
                                <Link 
                                    href="/staff-management"
                                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    Staff Management
                                </Link>
                            )}
                            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">
                                        {auth.user?.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900">{auth.user?.name}</p>
                                    <p className="text-xs text-gray-600 capitalize">{auth.user?.role}</p>
                                </div>
                            </div>
                            <Link 
                                href="/staff/logout" 
                                method="post" 
                                as="button"
                                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back, {auth.user?.name}! 👋
                        </h2>
                        <p className="text-gray-600">Here's what's happening with your store today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.name} className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                            <stat.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {stat.trending === 'up' ? (
                                                <ArrowTrendingUpIcon className="w-4 h-4" />
                                            ) : (
                                                <ArrowTrendingDownIcon className="w-4 h-4" />
                                            )}
                                            <span>{stat.change}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Manager & Inventory can manage products */}
                            {(auth.user?.role === 'manager' || auth.user?.role === 'inventory') && (
                                <Link
                                    href="/admin/products"
                                    className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                                >
                                    <CubeIcon className="h-8 w-8 text-white mb-3 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-lg font-semibold text-white">Manage Products</h4>
                                </Link>
                            )}
                            
                            {/* Sales & Manager can see sales orders */}
                            {(auth.user?.role === 'manager' || auth.user?.role === 'sales') && (
                                <Link
                                    href="/sales-orders"
                                    className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                                >
                                    <ShoppingCartIcon className="h-8 w-8 text-white mb-3 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-lg font-semibold text-white">Sales Orders</h4>
                                </Link>
                            )}
                            
                            {/* Inventory & Manager can see purchase orders */}
                            {(auth.user?.role === 'manager' || auth.user?.role === 'inventory') && (
                                <Link
                                    href="/purchase-orders"
                                    className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                                >
                                    <TruckIcon className="h-8 w-8 text-white mb-3 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-lg font-semibold text-white">Purchase Orders</h4>
                                </Link>
                            )}
                            
                            {/* Inventory & Manager can see low stock alerts */}
                            {(auth.user?.role === 'manager' || auth.user?.role === 'inventory') && (
                                <Link
                                    href="/products/low-stock"
                                    className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
                                >
                                    <ExclamationTriangleIcon className="h-8 w-8 text-white mb-3 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-lg font-semibold text-white">Low Stock Alerts</h4>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                                <ClockIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className={`p-2 rounded-lg bg-gray-100`}>
                                            <activity.icon className={`w-5 h-5 ${activity.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Manager Section */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">Management Tools</h3>
                            {isManager ? (
                                <div className="space-y-3">
                                    <Link
                                        href="/staff-management"
                                        className="block p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                                    >
                                        <UserGroupIcon className="w-6 h-6 mb-2" />
                                        <p className="font-semibold">Manage Staff</p>
                                        <p className="text-sm text-white/80 mt-1">Add, edit, or remove staff members</p>
                                    </Link>
                                    <Link
                                        href="/reports"
                                        className="block p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                                    >
                                        <ChartBarIcon className="w-6 h-6 mb-2" />
                                        <p className="font-semibold">View Reports</p>
                                        <p className="text-sm text-white/80 mt-1">Analytics and insights</p>
                                    </Link>
                                </div>
                            ) : (
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                    <p className="text-sm">You are logged in as <span className="font-semibold capitalize">{auth.user?.role}</span></p>
                                    <p className="text-xs text-white/80 mt-2">Contact your manager for additional permissions</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}