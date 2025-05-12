<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::create('event_reviews', function (Blueprint $table) {
            $table->bigIncrements('review_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('event_id');
            $table->integer('rating')->unsigned();
            $table->text('comment')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');
            $table->timestamps();
        });

        // Add CHECK constraint for rating (1-5)
        DB::statement('ALTER TABLE event_reviews ADD CONSTRAINT check_rating_range CHECK (rating BETWEEN 1 AND 5)');
    }

    public function down()
    {
        Schema::dropIfExists('event_reviews');
    }
};
