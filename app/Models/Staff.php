<?php

// app/Models/Staff.php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Staff extends Authenticatable
{
    protected $table = 'staffs';
    protected $primaryKey = 'staff_id';

    protected $fillable = [
        'name',
        'role',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'created_by', 'staff_id');
    }

    public function resolvedProducts(): HasMany
    {
        return $this->hasMany(Product::class, 'low_stock_alert_resolved_by', 'staff_id');
    }
}