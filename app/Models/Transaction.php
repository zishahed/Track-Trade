<?php

// app/Models/Transaction.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    protected $primaryKey = 'transaction_id';

    protected $fillable = [
        'transaction_date',
        'payment_method',
        'created_by',
        'type',
    ];

    protected $casts = [
        'transaction_date' => 'date',
    ];

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class, 'created_by', 'staff_id');
    }

    public function salesTransaction(): HasOne
    {
        return $this->hasOne(SalesTransaction::class, 'transaction_id', 'transaction_id');
    }

    public function purchaseTransaction(): HasOne
    {
        return $this->hasOne(PurchaseTransaction::class, 'transaction_id', 'transaction_id');
    }
}