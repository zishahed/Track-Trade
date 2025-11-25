// resources/js/Pages/Staff/Edit.jsx

import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function StaffEdit({ staff, auth }) {
    const { data, setData, put, processing, errors } = useForm({
        name: staff.name || '',
        email: staff.email || '',
        role: staff.role || 'sales',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/staff-management/${staff.staff_id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/staff/dashboard" className="text-xl font-bold text-gray-900">
                                Track & Trade
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">{auth.user?.name}</span>
                            <Link 
                                href="/staff/logout" 
                                method="post" 
                                as="button"
                                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-6">
                        <Link href="/staff-management" className="text-indigo-600 hover:text-indigo-700">
                            ← Back to Staff List
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                                <UserIcon className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Edit Staff Member</h1>
                                <p className="text-sm text-gray-500">Update {staff.name}'s information</p>
                            </div>
                        </div>

                        {Object.keys(errors).length > 0 && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {Object.values(errors).map((error, index) => (
                                    <p key={index} className="text-sm">{error}</p>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="staff@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="sales">Sales</option>
                                    <option value="inventory">Inventory</option>
                                    <option value="cashier">Cashier</option>
                                    <option value="manager">Manager</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Current role: <span className="font-semibold">{staff.role}</span>
                                </p>
                            </div>

                            <div className="border-t pt-4 mt-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                    Change Password (Optional)
                                </h3>
                                <p className="text-xs text-gray-500 mb-3">
                                    Leave blank to keep current password
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={e => setData('password', e.target.value)}
                                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Leave blank to keep current"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    onClick={submit}
                                    disabled={processing}
                                    className="flex-1 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Updating...' : 'Update Staff Member'}
                                </button>
                                <Link
                                    href="/staff-management"
                                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 text-center flex items-center justify-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Staff ID: <span className="font-mono font-semibold">#{staff.staff_id}</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Joined: {new Date(staff.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}