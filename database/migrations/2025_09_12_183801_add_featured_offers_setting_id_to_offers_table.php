<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->unsignedBigInteger('featured_offers_setting_id')->nullable()->after('offers_text_id');
            $table->foreign('featured_offers_setting_id')->references('id')->on('featured_offers_settings')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table) {
            $table->dropForeign(['featured_offers_setting_id']);
            $table->dropColumn('featured_offers_setting_id');
        });
    }
};
