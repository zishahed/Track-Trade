<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// database/migrations/2024_01_01_000004_create_products_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('name');
            $table->string('sku')->unique();
            $table->string('category');
            $table->float('price');
            $table->integer('quantity')->default(0);
            $table->dateTime('low_stock_alert_created_at')->nullable();
            $table->dateTime('low_stock_alert_resolved_at')->nullable();
            $table->unsignedBigInteger('low_stock_alert_resolved_by')->nullable();
            $table->timestamps();

            $table->foreign('low_stock_alert_resolved_by')
                  ->references('staff_id')
                  ->on('staffs')
                  ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};