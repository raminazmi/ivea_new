<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->json('images');
            $table->text('description');
            $table->string('product_type');
            $table->json('space_details')->nullable();
            $table->enum('status', ['pending', 'in_review', 'quoted', 'approved', 'in_progress', 'completed'])->default('pending');
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('contacted_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_submissions');
    }
};
