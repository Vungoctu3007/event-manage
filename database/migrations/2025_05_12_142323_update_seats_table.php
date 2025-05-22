<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('seats', function (Blueprint $table) {
            // Xóa khóa ngoại venue_id nếu tồn tại
            if (Schema::hasColumn('seats', 'venue_id')) {
                $table->dropForeign(['venue_id']);
                $table->dropColumn('venue_id');
            }

            // Thêm cột map_id, ticket_id
            $table->unsignedBigInteger('map_id')->after('seat_id');
            $table->unsignedBigInteger('ticket_id')->nullable()->after('reserved_until');

            // Cột x, y: lưu vị trí render trên sơ đồ
            $table->integer('x')->nullable()->after('section');
            $table->integer('y')->nullable()->after('x');

            // Cột width/height nếu cần render theo kích thước
            $table->integer('width')->nullable()->after('y');
            $table->integer('height')->nullable()->after('width');

            // Khóa ngoại
            $table->foreign('map_id')->references('map_id')->on('seating_maps')->onDelete('cascade');
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('seats', function (Blueprint $table) {
            // Khôi phục venue_id nếu cần rollback
            $table->unsignedBigInteger('venue_id')->after('seat_id');
            $table->foreign('venue_id')->references('venue_id')->on('venues')->onDelete('cascade');

            // Xóa khóa ngoại và cột đã thêm
            $table->dropForeign(['map_id']);
            $table->dropForeign(['ticket_id']);
            $table->dropColumn(['map_id', 'ticket_id', 'x', 'y', 'width', 'height']);
        });
    }
};
