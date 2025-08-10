<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->boolean('is_offer')->default(false)->after('featured');
            $table->boolean('is_bestseller')->default(false)->after('is_offer');
            $table->integer('sales_count')->default(0)->after('is_bestseller');
            $table->timestamp('published_at')->nullable()->after('sales_count');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['is_offer', 'is_bestseller', 'sales_count', 'published_at']);
        });
    }
};
