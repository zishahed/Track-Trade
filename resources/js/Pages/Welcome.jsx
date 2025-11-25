import React from 'react';
import { Link } from '@inertiajs/react';
import { ShoppingBagIcon, SparklesIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold text-white mb-4">Track & Trade</h1>
                    <p className="text-2xl text-white/90 mb-8">Your Complete Inventory Management Solution</p>
                    <p className="text-lg text-white/80">Shop quality products with ease</p>
                </div>

                {/* Main CTA Card */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                                <ShoppingBagIcon className="w-16 h-16 text-white" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Start Shopping Today
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Create your free account and get access to our complete inventory
                        </p>
                        
                        <div className="space-y-4">
                            <Link
                                href="/customer/register"
                                className="block w-full px-8 py-4 bg-indigo-600 text-white text-xl font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
                            >
                                Create Free Account
                            </Link>
                            
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link 
                                    href="/customer/login" 
                                    className="text-indigo-600 font-semibold hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                        <div className="flex justify-center mb-4">
                            <SparklesIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center">Easy to Use</h3>
                        <p className="text-white/90 text-center">
                            Simple and intuitive interface designed for effortless shopping
                        </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                        <div className="flex justify-center mb-4">
                            <ShieldCheckIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center">Secure</h3>
                        <p className="text-white/90 text-center">
                            Your data is protected with industry-standard security measures
                        </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                        <div className="flex justify-center mb-4">
                            <ClockIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center">Real-time Updates</h3>
                        <p className="text-white/90 text-center">
                            Track your orders and inventory availability in real-time
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16">
                    <p className="text-white/60 text-sm">
                        © 2024 Track & Trade. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}