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
            $table->json('images')->nullable()->after('image');
            $table->string('collection')->nullable()->after('brand');
            $table->json('specifications')->nullable()->after('colors');
            $table->decimal('weight', 8, 2)->nullable()->after('specifications');
            $table->json('dimensions')->nullable()->after('weight');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['images', 'collection', 'specifications', 'weight', 'dimensions']);
        });
    }
};
