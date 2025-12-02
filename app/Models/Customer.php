<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Customer extends Authenticatable
{
    protected $primaryKey = 'customer_id';
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    // Validation rules
    public static function validationRules($customerId = null)
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers,email,' . $customerId . ',customer_id',
            'password' => $customerId ? 'nullable|string|min:8' : 'required|string|min:8',
            'phone' => [
                'nullable',
                'regex:/^(017|019|015|013|018)\d{8}$/',
                'size:11'
            ],
            'address' => 'nullable|string',
        ];
    }

    // Custom validation messages
    public static function validationMessages()
    {
        return [
            'email.unique' => 'This email is already registered.',
            'phone.regex' => 'Phone number must start with 017, 019, 015, 013, or 018 and be exactly 11 digits.',
            'phone.size' => 'Phone number must be exactly 11 digits.',
        ];
    }
}