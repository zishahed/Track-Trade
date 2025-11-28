<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->text('shipping_address')->nullable()->after('status');
            $table->decimal('subtotal', 10, 2)->default(0)->after('shipping_address');
            $table->decimal('tax', 10, 2)->default(0)->after('subtotal');
            $table->decimal('shipping', 10, 2)->default(0)->after('tax');
            $table->decimal('total', 10, 2)->default(0)->after('shipping');
        });
    }

    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn(['shipping_address', 'subtotal', 'tax', 'shipping', 'total']);
        });
    }
};