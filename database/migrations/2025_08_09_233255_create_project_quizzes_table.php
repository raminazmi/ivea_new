<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->json('space_types');
            $table->json('product_needs');
            $table->json('preferred_styles');
            $table->text('space_type_other')->nullable();
            $table->text('product_other')->nullable();
            $table->text('style_other')->nullable();
            $table->text('additional_notes')->nullable();
            $table->enum('status', ['pending', 'contacted', 'quoted', 'completed'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_quizzes');
    }
};
