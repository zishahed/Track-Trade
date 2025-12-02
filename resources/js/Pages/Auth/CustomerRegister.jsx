import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { 
    UserIcon, 
    EnvelopeIcon, 
    LockClosedIcon, 
    PhoneIcon, 
    MapPinIcon 
} from '@heroicons/react/24/outline';

export default function CustomerRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });

    const validatePhone = (phone) => {
        if (!phone) return true; // Optional field
        const phoneRegex = /^(017|019|015|013|018)\d{8}$/;
        return phoneRegex.test(phone);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/customer/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join Track & Trade today!</p>
                </div>

                {errors.email && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {errors.email}
                    </div>
                )}

                {errors.phone && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {errors.phone}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
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
                                placeholder="User"
                                required
                            />
                        </div>
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
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
                                placeholder="user@example.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-gray-500">(Optional)</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                    data.phone && !validatePhone(data.phone) ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="01712345678"
                                maxLength="11"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Must start with 017, 019, 015, 013, or 018 (11 digits)
                        </p>
                        {data.phone && !validatePhone(data.phone) && (
                            <p className="text-red-600 text-sm mt-1">
                                Invalid phone format. Must start with 017, 019, 015, 013, or 018
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
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
                                placeholder="••••••••"
                                required
                                minLength="8"
                            />
                        </div>
                        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
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
                                placeholder="••••••••"
                                required
                                minLength="8"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing || (data.phone && !validatePhone(data.phone))}
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
                    >
                        {processing ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/customer/login" className="text-indigo-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}