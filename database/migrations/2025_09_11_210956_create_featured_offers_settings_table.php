<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('featured_offers_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->text('description_ar');
            $table->string('button_text_ar');
            $table->string('button_url');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('featured_offers_settings');
    }
};
