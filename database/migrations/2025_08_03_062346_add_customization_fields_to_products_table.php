<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->json('customization_options')->nullable()->after('dimensions');
            $table->json('measurement_units')->nullable()->after('customization_options');
            $table->json('opening_methods')->nullable()->after('measurement_units');
            $table->json('track_types')->nullable()->after('opening_methods');
            $table->json('lining_options')->nullable()->after('track_types');
            $table->decimal('min_width', 8, 3)->nullable()->after('lining_options');
            $table->decimal('max_width', 8, 3)->nullable()->after('min_width');
            $table->decimal('min_height', 8, 3)->nullable()->after('max_width');
            $table->decimal('max_height', 8, 3)->nullable()->after('min_height');
            $table->decimal('fabric_reduction', 8, 2)->default(4.00)->after('max_height');
            $table->decimal('coverage_increase', 8, 2)->default(5.00)->after('fabric_reduction');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'customization_options',
                'measurement_units',
                'opening_methods',
                'track_types',
                'lining_options',
                'min_width',
                'max_width',
                'min_height',
                'max_height',
                'fabric_reduction',
                'coverage_increase'
            ]);
        });
    }
};
