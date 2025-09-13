<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('landing_page_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique();
            $table->string('title_ar');
            $table->string('subtitle_ar')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('button_text_ar')->nullable();
            $table->string('button_url')->nullable();
            $table->string('image_path')->nullable();
            $table->string('background_image_path')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->json('settings')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('landing_page_sections');
    }
};
