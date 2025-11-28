// resources/js/Pages/Customer/Dashboard.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    ShoppingBagIcon, 
    UserCircleIcon, 
    ClockIcon,
    CreditCardIcon,
    TruckIcon,
    CheckCircleIcon,
    SparklesIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

export default function CustomerDashboard({ customer, auth }) {
    const stats = [
        { 
            name: 'Total Orders', 
            value: '0', 
            icon: ShoppingBagIcon, 
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        { 
            name: 'Pending Orders', 
            value: '0', 
            icon: ClockIcon, 
            color: 'from-yellow-500 to-orange-600',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600'
        },
        { 
            name: 'Completed', 
            value: '0', 
            icon: CheckCircleIcon, 
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
                            
                            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-semibold">
                                        {customer.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                                    <p className="text-xs text-gray-600">Customer</p>
                                </div>
                            </div>
                            <Link 
                                href="/customer/logout" 
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

            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Welcome back, {customer.name}! 👋
                        </h1>
                        <p className="text-gray-600">Ready to build your dream PC?</p>
                    </div>

                    {/* Hero CTA */}
                    <div className="mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="px-8 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                            <div className="lg:w-0 lg:flex-1">
                                <h2 className="text-3xl font-extrabold text-white sm:text-4xl flex items-center">
                                    <SparklesIcon className="w-10 h-10 mr-3" />
                                    Build Your Dream PC
                                </h2>
                                <p className="mt-4 text-lg text-indigo-100">
                                    Browse our extensive collection of high-quality PC components. From processors to peripherals, we have everything you need!
                                </p>
                                <div className="mt-6 flex items-center space-x-4">
                                    <div className="flex items-center text-white/90">
                                        <BoltIcon className="w-5 h-5 mr-2" />
                                        <span className="text-sm">Fast Shipping</span>
                                    </div>
                                    <div className="flex items-center text-white/90">
                                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                                        <span className="text-sm">Genuine Products</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 lg:mt-0 lg:ml-8">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-indigo-600 bg-white hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                                >
                                    <ShoppingBagIcon className="w-6 h-6 mr-2" />
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.name} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                            <stat.icon className="h-6 w-6 text-white" />
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

                    {/* Account Info & Quick Links */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Account Information */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-6">
                                <UserCircleIcon className="w-8 h-8 text-indigo-600 mr-3" />
                                <h3 className="text-xl font-bold text-gray-900">Account Information</h3>
                            </div>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                                    <dt className="text-sm font-medium text-gray-600 mb-1">Full Name</dt>
                                    <dd className="text-base font-semibold text-gray-900">{customer.name}</dd>
                                </div>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                                    <dt className="text-sm font-medium text-gray-600 mb-1">Email Address</dt>
                                    <dd className="text-base font-semibold text-gray-900">{customer.email}</dd>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-4">
                                    <dt className="text-sm font-medium text-gray-600 mb-1">Phone Number</dt>
                                    <dd className="text-base font-semibold text-gray-900">{customer.phone}</dd>
                                </div>
                                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4">
                                    <dt className="text-sm font-medium text-gray-600 mb-1">Customer ID</dt>
                                    <dd className="text-base font-semibold text-gray-900 font-mono">#{customer.customer_id}</dd>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:col-span-2">
                                    <dt className="text-sm font-medium text-gray-600 mb-1">Member Since</dt>
                                    <dd className="text-base font-semibold text-gray-900">
                                        {new Date(customer.created_at).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/products"
                                    className="block p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all transform hover:scale-105"
                                >
                                    <ShoppingBagIcon className="w-6 h-6 mb-2" />
                                    <p className="font-semibold">Browse Products</p>
                                    <p className="text-sm text-white/80 mt-1">Explore PC components</p>
                                </Link>
                                <Link
                                    href="/cart"
                                    className="block p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all transform hover:scale-105"
                                >
                                    <CreditCardIcon className="w-6 h-6 mb-2" />
                                    <p className="font-semibold">My Cart</p>
                                    <p className="text-sm text-white/80 mt-1">View items in cart</p>
                                </Link>
                                <Link
                                    href="/orders"
                                    className="block p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all transform hover:scale-105"
                                >
                                    <TruckIcon className="w-6 h-6 mb-2" />
                                    <p className="font-semibold">My Orders</p>
                                    <p className="text-sm text-white/80 mt-1">Track your orders</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}