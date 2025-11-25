<?php

// app/Models/PurchaseTransaction.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseTransaction extends Model
{
    protected $primaryKey = 'transaction_id';
    public $incrementing = false;

    protected $fillable = [
        'transaction_id',
        'purchase_id',
        'amount',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'transaction_id');
    }

    public function purchaseOrder(): BelongsTo
    {
        return $this->belongsTo(PurchaseOrder::class, 'purchase_id', 'purchase_id');
    }
}
