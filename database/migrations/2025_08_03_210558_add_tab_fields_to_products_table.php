<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // حقل للعروض
            $table->boolean('is_offer')->default(false)->after('featured');

            // حقل للأكثر مبيعاً
            $table->boolean('is_bestseller')->default(false)->after('is_offer');

            // عدد المبيعات (للأكثر مبيعاً)
            $table->integer('sales_count')->default(0)->after('is_bestseller');

            // تاريخ النشر (للجديد)
            $table->timestamp('published_at')->nullable()->after('sales_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['is_offer', 'is_bestseller', 'sales_count', 'published_at']);
        });
    }
};
