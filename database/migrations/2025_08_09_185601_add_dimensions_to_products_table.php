<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('price_per_unit_area', 8, 2)->nullable()->after('price_modifiers')->comment('سعر الوحدة للمتر المربع (للحساب الدقيق)');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'price_per_unit_area'
            ]);
        });
    }
};
