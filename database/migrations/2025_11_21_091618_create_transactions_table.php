<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// database/migrations/2024_01_01_000009_create_transactions_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->date('transaction_date');
            $table->string('payment_method'); // cash, card, bank_transfer
            $table->unsignedBigInteger('created_by');
            $table->string('type'); // sales, purchase
            $table->timestamps();

            $table->foreign('created_by')
                  ->references('staff_id')
                  ->on('staffs')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};