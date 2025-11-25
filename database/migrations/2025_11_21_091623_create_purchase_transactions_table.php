<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// database/migrations/2024_01_01_000011_create_purchase_transactions_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_transactions', function (Blueprint $table) {
            $table->unsignedBigInteger('transaction_id')->primary();
            $table->unsignedBigInteger('purchase_id');
            $table->decimal('amount', 10, 2);
            $table->timestamps();

            $table->foreign('transaction_id')
                  ->references('transaction_id')
                  ->on('transactions')
                  ->cascadeOnDelete();

            $table->foreign('purchase_id')
                  ->references('purchase_id')
                  ->on('purchase_orders')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_transactions');
    }
};