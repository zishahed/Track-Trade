<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'name',
        'sku',
        'category',
        'price',
        'quantity',
        'low_stock_alert_created_at',
        'low_stock_alert_resolved_at',
        'low_stock_alert_resolved_by',
    ];

    protected $casts = [
        'low_stock_alert_created_at' => 'datetime',
        'low_stock_alert_resolved_at' => 'datetime',
    ];

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'product_id', 'product_id');
    }

    public function incomes(): HasMany
    {
        return $this->hasMany(Income::class, 'product_id', 'product_id');
    }

    public function resolvedByStaff(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'low_stock_alert_resolved_by', 'staff_id');
    }

    public function isLowStock(): bool
    {
        return $this->quantity < 10; // You can adjust this threshold
    }
}