<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn([
                'middle_image',
                'brand_strength_title', 
                'brand_strength_content',
                'brand_strength_points'
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('middle_image')->nullable();
            $table->string('brand_strength_title')->nullable();
            $table->text('brand_strength_content')->nullable();
            $table->json('brand_strength_points')->nullable();
        });
    }
}; 