<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    protected $primaryKey = 'purchase_id';
    
    protected $fillable = [
        'supplier_id',
        'purchase_date',
        'status',
        'total_amount'
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'total_amount' => 'decimal:2'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'purchase_id', 'purchase_id');
    }

    public function purchaseTransaction()
    {
        return $this->hasOne(PurchaseTransaction::class, 'purchase_id', 'purchase_id');
    }
}