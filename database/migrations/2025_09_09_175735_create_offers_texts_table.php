<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offers_texts', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('title_ar')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('title_en')->nullable();
            $table->text('description_en')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers_texts');
    }
};
