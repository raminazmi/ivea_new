<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('collection')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount', 5, 2)->nullable();
            $table->string('image')->nullable();
            $table->json('images')->nullable();
            $table->string('tab')->default('all');
            $table->unsignedBigInteger('category_id');
            $table->json('colors')->nullable();
            $table->json('color_names')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->integer('stock')->default(0);
            $table->string('sku')->unique()->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('is_offer')->default(false);
            $table->boolean('is_bestseller')->default(false);
            $table->integer('sales_count')->default(0);
            $table->json('features')->nullable();
            $table->json('customization_options')->nullable();
            $table->json('measurement_units')->nullable();
            $table->json('opening_methods')->nullable();
            $table->json('track_types')->nullable();
            $table->json('lining_options')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
