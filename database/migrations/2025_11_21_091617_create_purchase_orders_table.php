<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// database/migrations/2024_01_01_000005_create_purchase_orders_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id('purchase_id');
            $table->unsignedBigInteger('supplier_id');
            $table->date('purchase_date');
            $table->string('status')->default('pending'); // pending, completed, cancelled
            $table->timestamps();

            $table->foreign('supplier_id')
                  ->references('supplier_id')
                  ->on('suppliers')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
