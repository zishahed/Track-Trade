// resources/js/Pages/Staff/Index.jsx

import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { 
    UserGroupIcon, 
    PlusIcon, 
    PencilIcon, 
    TrashIcon,
    MagnifyingGlassIcon,
    EnvelopeIcon,
    ShieldCheckIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

export default function StaffIndex({ staffMembers, auth }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStaff = staffMembers.filter(staff => 
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteStaff = (staffId) => {
        if (confirm('Are you sure you want to delete this staff member?')) {
            router.delete(`/staff-management/${staffId}`);
        }
    };

    const getRoleBadge = (role) => {
        const badges = {
            manager: { bg: 'bg-purple-100', text: 'text-purple-800', ring: 'ring-purple-600' },
            sales: { bg: 'bg-blue-100', text: 'text-blue-800', ring: 'ring-blue-600' },
            inventory: { bg: 'bg-green-100', text: 'text-green-800', ring: 'ring-green-600' },
            cashier: { bg: 'bg-yellow-100', text: 'text-yellow-800', ring: 'ring-yellow-600' }
        };
        return badges[role] || { bg: 'bg-gray-100', text: 'text-gray-800', ring: 'ring-gray-600' };
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
                            <Link href="/staff/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                Dashboard
                            </Link>
                            <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                                <span className="text-sm font-semibold text-gray-900">{auth.user?.name}</span>
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

            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">Staff Management</h1>
                                <p className="text-gray-600 flex items-center space-x-2">
                                    <UserGroupIcon className="w-5 h-5" />
                                    <span>Manage your team members ({filteredStaff.length} staff)</span>
                                </p>
                            </div>
                            <Link
                                href="/staff-management/create"
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>Add Staff Member</span>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search staff by name, email, or role..."
                                className="pl-12 w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Staff Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStaff.map((staff) => {
                            const badge = getRoleBadge(staff.role);
                            return (
                                <div key={staff.staff_id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                                    <div className="p-6 -mt-12">
                                        <div className="flex justify-center mb-4">
                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-2xl font-bold">
                                                        {staff.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{staff.name}</h3>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} ring-2 ${badge.ring} ring-offset-2`}>
                                                <ShieldCheckIcon className="w-3 h-3 mr-1" />
                                                {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                                            </span>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                                                <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                <span className="truncate">{staff.email}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                                                <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                <span>Joined {new Date(staff.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/staff-management/${staff.staff_id}/edit`}
                                                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                <PencilIcon className="w-4 h-4 mr-1" />
                                                Edit
                                            </Link>
                                            {staff.staff_id !== auth.user?.staff_id && (
                                                <button
                                                    onClick={() => deleteStaff(staff.staff_id)}
                                                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                                                >
                                                    <TrashIcon className="w-4 h-4 mr-1" />
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredStaff.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                            <UserGroupIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No staff members found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your search or add a new staff member</p>
                            <Link
                                href="/staff-management/create"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add Staff Member
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}