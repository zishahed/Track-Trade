import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    CheckCircleIcon,
    ShoppingBagIcon,
    HomeIcon
} from '@heroicons/react/24/outline';

export default function CheckoutSuccess({ order }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircleIcon className="w-16 h-16 text-green-600" />
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
                        <p className="text-sm text-gray-600 mb-2">Order Number</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            #{order.order_id}
                        </p>
                        <p className="text-sm text-gray-600 mt-4">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">${parseFloat(order.total).toFixed(2)}</p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/customer/dashboard"
                            className="block w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                            <HomeIcon className="w-5 h-5 inline mr-2" />
                            Go to Dashboard
                        </Link>
                        <Link
                            href="/products"
                            className="block w-full px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            <ShoppingBagIcon className="w-5 h-5 inline mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}