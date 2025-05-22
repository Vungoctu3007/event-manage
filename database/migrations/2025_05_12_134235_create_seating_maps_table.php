<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('seating_maps', function (Blueprint $table) {
            $table->bigIncrements('map_id');

            $table->unsignedBigInteger('event_id')->unique();

            $table->enum('map_type', ['fixed', 'general', 'custom']);
            $table->json('configuration')->nullable(); // JSON ghế kéo thả

            $table->string('background_image')->nullable(); // ảnh nền sơ đồ
            $table->integer('width')->nullable(); // chiều rộng canvas ảnh
            $table->integer('height')->nullable(); // chiều cao canvas ảnh
            $table->float('scale_ratio')->nullable(); // nếu cần scale lại ảnh

            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');

            $table->index('event_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('seating_maps');
    }
};
