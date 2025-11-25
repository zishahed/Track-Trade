<?php

// app/Models/SalesOrder.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SalesOrder extends Model
{
    protected $primaryKey = 'order_id';

    protected $fillable = [
        'customer_id',
        'order_date',
        'status',
    ];

    protected $casts = [
        'order_date' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function incomes(): HasMany
    {
        return $this->hasMany(Income::class, 'order_id', 'order_id');
    }

    public function salesTransaction(): HasOne
    {
        return $this->hasOne(SalesTransaction::class, 'order_id', 'order_id');
    }

    public function getTotalAmount()
    {
        return $this->incomes()->sum(\DB::raw('quantity * price'));
    }
}