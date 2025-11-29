import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    PlusIcon,
    TrashIcon,
    ShoppingCartIcon,
    ArrowLeftIcon,
    CreditCardIcon,
    BanknotesIcon,
    BuildingLibraryIcon
} from '@heroicons/react/24/outline';

export default function PurchaseOrderCreate({ suppliers, products, auth, flash }) {
    const [supplierId, setSupplierId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [items, setItems] = useState([
        { product_id: '', quantity: 1, price: '' }
    ]);
    const [processing, setProcessing] = useState(false);

    const addItem = () => {
        setItems([...items, { product_id: '', quantity: 1, price: '' }]);
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        
        // Auto-fill price when product is selected
        if (field === 'product_id') {
            const product = products.find(p => p.product_id == value);
            if (product) {
                newItems[index].price = product.price;
            }
        }
        
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => {
            return sum + (parseFloat(item.quantity || 0) * parseFloat(item.price || 0));
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post('/purchase-orders', {
            supplier_id: supplierId,
            payment_method: paymentMethod,
            items: items
        }, {
            onFinish: () => setProcessing(false)
        });
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

            {/* Flash Messages */}
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
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Back to Purchase Orders
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Purchase Order</h1>
                    <p className="text-gray-600">Order products from suppliers</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Order Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Supplier Selection */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Supplier Information</h2>
                                <select
                                    value={supplierId}
                                    onChange={(e) => setSupplierId(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Select Supplier</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.supplier_id} value={supplier.supplier_id}>
                                            {supplier.name} - {supplier.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Method</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-6 border-2 rounded-xl transition-all ${
                                            paymentMethod === 'card'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <CreditCardIcon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                                        <p className="font-semibold text-gray-900">Card</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cash')}
                                        className={`p-6 border-2 rounded-xl transition-all ${
                                            paymentMethod === 'cash'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <BanknotesIcon className="w-8 h-8 mx-auto mb-2 text-green-600" />
                                        <p className="font-semibold text-gray-900">Cash</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('bank_transfer')}
                                        className={`p-6 border-2 rounded-xl transition-all ${
                                            paymentMethod === 'bank_transfer'
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <BuildingLibraryIcon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                        <p className="font-semibold text-gray-900">Bank Transfer</p>
                                    </button>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Order Items</h2>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                                    >
                                        <PlusIcon className="w-5 h-5 mr-2" />
                                        Add Item
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div key={index} className="grid grid-cols-12 gap-4 items-start p-4 bg-gray-50 rounded-xl">
                                            <div className="col-span-5">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                                                <select
                                                    value={item.product_id}
                                                    onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                >
                                                    <option value="">Select Product</option>
                                                    {products.map((product) => (
                                                        <option key={product.product_id} value={product.product_id}>
                                                            {product.name} - {product.sku}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div className="col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(index, 'price', e.target.value)}
                                                    required
                                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div className="col-span-1 flex items-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    disabled={items.length === 1}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="col-span-12 text-right">
                                                <span className="text-sm text-gray-600">Subtotal: </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${(item.quantity * (item.price || 0)).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
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
                                        <span className="font-semibold">{items.length}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                                    <span>Total</span>
                                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        ${calculateTotal().toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || !supplierId || items.some(item => !item.product_id || !item.price)}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            <ShoppingCartIcon className="w-5 h-5 inline mr-2" />
                                            Create Purchase Order
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">📦 Inventory Update</span><br/>
                                        Product quantities will be increased automatically
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}