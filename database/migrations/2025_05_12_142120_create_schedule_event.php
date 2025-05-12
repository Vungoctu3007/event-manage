<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up()
    {
        Schema::create('schedule_events', function (Blueprint $table) {
            $table->bigIncrements('schedule_id');
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('ticket_id')->nullable();
            $table->enum('schedule_type', ['early_bird', 'regular', 'presale', 'general', 'other']);
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->text('description')->nullable();
         
            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('set null');
            $table->index('event_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('schedule_events');
    }
};
