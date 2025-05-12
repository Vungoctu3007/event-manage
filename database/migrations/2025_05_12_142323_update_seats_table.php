<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('seats', function (Blueprint $table) {
            // Xóa khóa ngoại và cột venue_id
            $table->dropForeign(['venue_id']);
            $table->dropColumn('venue_id');

            // Thêm cột map_id và ticket_id
            $table->unsignedBigInteger('map_id')->after('seat_id');
            $table->unsignedBigInteger('ticket_id')->nullable()->after('reserved_until');

            // Thêm khóa ngoại
            $table->foreign('map_id')->references('map_id')->on('seating_maps')->onDelete('cascade');
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('seats', function (Blueprint $table) {
            // Khôi phục venue_id và khóa ngoại
            $table->unsignedBigInteger('venue_id')->after('seat_id');
            $table->foreign('venue_id')->references('venue_id')->on('venues')->onDelete('cascade');

            // Xóa map_id, ticket_id và khóa ngoại
            $table->dropForeign(['map_id']);
            $table->dropForeign(['ticket_id']);
            $table->dropColumn('map_id');
            $table->dropColumn('ticket_id');
        });
    }
};
