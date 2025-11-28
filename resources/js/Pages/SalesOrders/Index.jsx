import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    EyeIcon,
    UserIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/outline';

export default function SalesOrdersIndex({ orders, auth }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all');

    const filteredOrders = orders.data.filter(order => {
        const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              order.order_id.toString().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        let matchesSource = true;
        if (sourceFilter === 'online') {
            matchesSource = !order.sales_transaction?.transaction?.created_by;
        } else if (sourceFilter === 'staff') {
            matchesSource = !!order.sales_transaction?.transaction?.created_by;
        }

        return matchesSearch && matchesStatus && matchesSource;
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
        online: orders.data.filter(o => !o.sales_transaction?.transaction?.created_by).length,
        staff: orders.data.filter(o => !!o.sales_transaction?.transaction?.created_by).length,
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-4">
                        <div className="text-gray-500 text-sm">Total Orders</div>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <div className="text-gray-500 text-sm">Completed</div>
                        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <div className="text-gray-500 text-sm">Pending</div>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <div className="text-gray-500 text-sm">Cancelled</div>
                        <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <div className="text-gray-500 text-sm">Online</div>
                        <div className="text-2xl font-bold text-blue-600">{stats.online}</div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-4">
                        <div className="text-gray-500 text-sm">Staff</div>
                        <div className="text-2xl font-bold text-purple-600">{stats.staff}</div>
                    </div>
                </div>

                {/* Search + Filters */}
                <div className="mb-6 space-y-4">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search by customer name or order ID..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {['all','completed','pending','cancelled'].map(s => (
                            <button
                                key={s}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                                    statusFilter === s 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-white text-gray-700 border-gray-300'
                                }`}
                                onClick={() => setStatusFilter(s)}
                            >
                                {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}

                        <button
                            className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                                sourceFilter === 'online' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 border-gray-300'
                            }`}
                            onClick={() => setSourceFilter(sourceFilter === 'online' ? 'all' : 'online')}
                        >
                            Online
                        </button>

                        <button
                            className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                                sourceFilter === 'staff' 
                                    ? 'bg-purple-600 text-white' 
                                    : 'bg-white text-gray-700 border-gray-300'
                            }`}
                            onClick={() => setSourceFilter(sourceFilter === 'staff' ? 'all' : 'staff')}
                        >
                            Staff
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Source</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map(order => {
                                    const badge = getStatusBadge(order.status);
                                    const createdByStaff = order.sales_transaction?.transaction?.staff;
                                    const isOnlineOrder = !order.sales_transaction?.transaction?.created_by;

                                    return (
                                        <tr key={order.order_id} className="hover:bg-gray-50">
                                            
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-indigo-600">#{order.order_id}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium">{order.customer.name}</div>
                                                <div className="text-sm text-gray-500">{order.customer.email}</div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                                                    <badge.icon className="w-3 h-3 mr-1" />
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                {isOnlineOrder ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                        <ComputerDesktopIcon className="w-3 h-3 mr-1" />
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                                                        <UserIcon className="w-3 h-3 mr-1" />
                                                        {createdByStaff?.name || 'Staff'}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold">
                                                    ${order.total ? parseFloat(order.total).toFixed(2) : '0.00'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/sales-orders/${order.order_id}`}
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200"
                                                >
                                                    <EyeIcon className="w-4 h-4 mr-2" />
                                                    View
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

                {/* Pagination */}
                {orders.links && orders.links.length > 3 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            {orders.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                        link.active
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                            : link.url
                                            ? 'bg-white text-gray-700 border-2 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveScroll
                                />
                            ))}
                        </nav>
                    </div>
                )}

            </main>
        </div>
    );
}
