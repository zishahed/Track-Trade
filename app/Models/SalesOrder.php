<?php

// app/Models/SalesOrder.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class SalesOrder extends Model
{
    protected $primaryKey = 'order_id';

    protected $fillable = [
        'customer_id',
        'order_date',
        'status',
        'shipping_address',
        'subtotal',
        'tax',
        'shipping',
        'total',
    ];

    protected $casts = [
        'order_date' => 'date',
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'shipping' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function incomes(): HasMany
    {
        return $this->hasMany(Income::class, 'order_id', 'order_id');
    }

    // Alias for items (same as incomes for compatibility)
    public function items(): HasMany
    {
        return $this->hasMany(Income::class, 'order_id', 'order_id');
    }

    public function salesTransaction(): HasOne
    {
        return $this->hasOne(SalesTransaction::class, 'order_id', 'order_id');
    }

    public function getTotalAmount()
    {
        return $this->incomes()->sum(DB::raw('quantity * price'));
    }
    public function shouldBeCompleted()
    {
        return $this->status === 'pending' && $this->created_at->addMinutes(10)->isPast();
    }

    public function getRemainingTimeAttribute()
    {
        if ($this->status !== 'pending') {
            return null;
        }
    
        $completionTime = $this->created_at->addMinutes(10);
        $now = now();
    
        if ($completionTime->isPast()) {
            return 0;
        }
    
        return $now->diffInSeconds($completionTime);
    }
}