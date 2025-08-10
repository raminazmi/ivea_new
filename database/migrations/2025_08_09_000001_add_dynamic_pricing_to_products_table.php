<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('base_price', 10, 2)->default(0)->after('price')->comment('السعر الأساسي للمقاس الأدنى');
            $table->decimal('price_per_sqm', 8, 2)->nullable()->after('base_price')->comment('السعر لكل متر مربع');
            $table->decimal('min_price', 10, 2)->nullable()->after('price_per_sqm')->comment('أقل سعر ممكن');
            $table->decimal('max_price', 10, 2)->nullable()->after('min_price')->comment('أعلى سعر ممكن');
            $table->enum('pricing_method', ['fixed', 'area_based', 'size_based', 'custom'])
                ->default('fixed')->after('max_price')->comment('طريقة حساب السعر');
            $table->json('price_modifiers')->nullable()->after('pricing_method')->comment('معدلات السعر الإضافية');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'base_price',
                'price_per_sqm',
                'min_price',
                'max_price',
                'pricing_method',
                'price_modifiers'
            ]);
        });
    }
};
