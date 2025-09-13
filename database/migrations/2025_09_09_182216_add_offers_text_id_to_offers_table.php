<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->unsignedBigInteger('offers_text_id')->nullable()->after('id');
            $table->foreign('offers_text_id')->references('id')->on('offers_texts')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign(['offers_text_id']);
            $table->dropColumn('offers_text_id');
        });
    }
};
