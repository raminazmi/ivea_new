<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('national_day_offers', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->text('description_ar');
            $table->string('button_text_ar');
            $table->string('button_url');
            $table->string('offer1_title');
            $table->integer('offer1_discount_percentage');
            $table->string('offer1_category_slug');
            $table->string('offer1_category_name');
            $table->string('offer1_image_path')->nullable();
            $table->string('offer1_link');
            $table->string('offer2_title');
            $table->integer('offer2_discount_percentage');
            $table->string('offer2_category_slug');
            $table->string('offer2_category_name');
            $table->string('offer2_image_path')->nullable();
            $table->string('offer2_link');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('national_day_offers');
    }
};
