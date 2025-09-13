<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('preparing_for_summer', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->text('description_ar');
            $table->string('button_text_ar');
            $table->string('button_url');
            $table->string('image_1_path')->nullable();
            $table->string('image_1_alt')->nullable();
            $table->string('image_1_url')->nullable();
            $table->string('image_2_path')->nullable();
            $table->string('image_2_alt')->nullable();
            $table->string('image_2_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('preparing_for_summer');
    }
};