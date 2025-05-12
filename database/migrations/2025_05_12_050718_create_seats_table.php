<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->bigIncrements('seat_id');
            $table->unsignedBigInteger('venue_id');
            $table->unsignedBigInteger('event_id')->nullable();
            $table->string('seat_number', 20);
            $table->string('seat_row', 10)->nullable();
            $table->string('section', 50)->nullable();
            $table->enum('status', ['available', 'reserved', 'sold', 'disabled']);
            $table->timestamp('reserved_until')->nullable();
            $table->unique(['event_id', 'seat_number', 'seat_row', 'section']);
            $table->foreign('venue_id')->references('venue_id')->on('venues')->onDelete('cascade');
            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            $table->index(['event_id', 'status']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('seats');
    }
};
