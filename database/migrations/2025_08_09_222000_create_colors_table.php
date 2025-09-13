<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('colors')) {
            Schema::create('colors', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('name_en')->nullable();
                $table->string('hex_code');
                $table->string('image')->nullable();
                $table->boolean('is_active')->default(true);
                $table->integer('sort_order')->default(0);
                $table->text('description')->nullable();
                $table->timestamps();
                $table->index(['is_active', 'sort_order']);
                $table->unique('hex_code');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('colors');
    }
};
