<?php

// app/Models/PurchaseOrder.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PurchaseOrder extends Model
{
    protected $primaryKey = 'purchase_id';

    protected $fillable = [
        'supplier_id',
        'purchase_date',
        'status',
    ];

    protected $casts = [
        'purchase_date' => 'date',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class, 'purchase_id', 'purchase_id');
    }

    public function purchaseTransaction(): HasOne
    {
        return $this->hasOne(PurchaseTransaction::class, 'purchase_id', 'purchase_id');
    }

    public function getTotalAmount()
    {
        return $this->expenses()->sum(\DB::raw('quantity * price'));
    }
}