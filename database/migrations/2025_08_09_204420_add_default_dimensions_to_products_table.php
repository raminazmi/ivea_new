<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('default_width', 8, 2)->default(120)->after('max_price')->comment('العرض الافتراضي (سم)');
            $table->decimal('default_height', 8, 2)->default(150)->after('default_width')->comment('الارتفاع الافتراضي (سم)');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'default_width',
                'default_height'
            ]);
        });
    }
};
