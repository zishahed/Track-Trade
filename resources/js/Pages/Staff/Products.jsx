import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    FunnelIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function StaffProducts({ products, discount, staffRole, auth, flash }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', name: 'All Products', icon: '🛒' },
        { id: 'Processor', name: 'Processors (CPU)', icon: '🔥' },
        { id: 'Motherboard', name: 'Motherboards', icon: '🔧' },
        { id: 'RAM', name: 'RAM', icon: '⚡' },
        { id: 'GPU', name: 'Graphics Cards', icon: '🎮' },
        { id: 'Storage', name: 'Storage', icon: '💾' },
        { id: 'PSU', name: 'Power Supply', icon: '🔌' },
        { id: 'Cooling', name: 'Cooling', icon: '❄️' },
        { id: 'Case', name: 'PC Cases', icon: '📦' },
        { id: 'Monitor', name: 'Monitors', icon: '🖥️' },
        { id: 'Peripherals', name: 'Keyboard & Mouse', icon: '⌨️' },
    ];

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addToCart = (productId) => {
        router.post('/staff/cart/add', 
            { product_id: productId, quantity: 1 },
            { preserveScroll: true }
        );
    };

    const getCategoryGradient = (category) => {
        const gradients = {
            'Processor': 'from-red-500 to-orange-600',
            'Motherboard': 'from-blue-500 to-indigo-600',
            'RAM': 'from-yellow-500 to-orange-600',
            'GPU': 'from-purple-500 to-pink-600',
            'Storage': 'from-green-500 to-emerald-600',
            'PSU': 'from-gray-500 to-slate-600',
            'Cooling': 'from-cyan-500 to-blue-600',
            'Case': 'from-indigo-500 to-purple-600',
            'Monitor': 'from-teal-500 to-cyan-600',
            'Peripherals': 'from-pink-500 to-rose-600',
        };
        return gradients[category] || 'from-gray-500 to-gray-600';
    };

    const getCategoryIcon = (category) => {
        const match = categories.find(c => category.toLowerCase().includes(c.id.toLowerCase()));
        return match ? match.icon : '📦';
    };

    const calculateDiscountedPrice = (price) => {
        return price * (1 - discount / 100);
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
                            <Link 
                                href="/staff/checkout"
                                className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                <ShoppingCartIcon className="w-6 h-6" />
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

            {/* Discount Banner */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <TagIcon className="w-6 h-6 mr-2" />
                    <span className="text-lg font-bold">
                        Staff Discount: {discount}% OFF ({staffRole.toUpperCase()})
                    </span>
                </div>
            </div>

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
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Staff Store</h1>
                    <p className="text-xl text-gray-600">Purchase products with your staff discount</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search products by name or SKU..."
                            className="pl-12 w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Categories Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <div className="flex items-center mb-4">
                                <FunnelIcon className="w-5 h-5 text-indigo-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                            </div>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                                            selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="mr-2">{category.icon}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-4 text-sm text-gray-600">
                            Showing <span className="font-semibold">{filteredProducts.length}</span> products
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.product_id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                                    {/* Product Image */}
                                    <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(product.category)} flex items-center justify-center`}>
                                        <div className="text-white text-6xl">
                                            {getCategoryIcon(product.category)}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Stock Badge */}
                                        <div className="mb-3">
                                            {product.quantity > 0 ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                                                    In Stock ({product.quantity})
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                                    <XCircleIcon className="w-3 h-3 mr-1" />
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 min-h-[3.5rem]">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-3">{product.sku}</p>

                                        {/* Price with Discount */}
                                        <div className="mb-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                    ${calculateDiscountedPrice(product.price).toFixed(2)}
                                                </span>
                                                <span className="text-sm text-gray-500 line-through">
                                                    ${parseFloat(product.price).toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-green-600 font-semibold mt-1">
                                                Save ${(product.price - calculateDiscountedPrice(product.price)).toFixed(2)} ({discount}% off)
                                            </p>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => addToCart(product.product_id)}
                                            disabled={product.quantity === 0}
                                            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                                                product.quantity > 0
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            <ShoppingCartIcon className="w-5 h-5" />
                                            <span>{product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}