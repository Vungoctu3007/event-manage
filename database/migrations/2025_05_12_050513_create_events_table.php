<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('event_id');
            $table->unsignedBigInteger('organizer_id');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('venue_id')->nullable();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->enum('status', ['active', 'cancelled', 'sold_out']);
            $table->text('banner_url')->nullable();
            $table->text('logo_url')->nullable(); 
            $table->text('background_url')->nullable(); 

            $table->foreign('organizer_id')->references('organizer_id')->on('organizers')->onDelete('cascade');
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('set null');
            $table->foreign('venue_id')->references('venue_id')->on('venues')->onDelete('set null');
            $table->index('title');
            $table->index('venue_id');
            $table->index('category_id');
            $table->timestamps();
        });
     
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
};
