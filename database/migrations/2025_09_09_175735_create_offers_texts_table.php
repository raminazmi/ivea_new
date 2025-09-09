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
        Schema::create('offers_texts', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // مفتاح النص (مثل: main_title, main_description)
            $table->string('title_ar')->nullable(); // العنوان بالعربية
            $table->text('description_ar')->nullable(); // الوصف بالعربية
            $table->string('title_en')->nullable(); // العنوان بالإنجليزية
            $table->text('description_en')->nullable(); // الوصف بالإنجليزية
            $table->boolean('is_active')->default(true); // هل النص نشط
            $table->integer('sort_order')->default(0); // ترتيب النص
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers_texts');
    }
};
