<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::create('qr_codes', function (Blueprint $table) {
            $table->bigIncrements('qr_id');
            $table->unsignedBigInteger('order_item_id');
            $table->string('qr_token', 255)->unique();
            $table->boolean('is_checked_in')->default(false);
            $table->timestamp('checked_in_time')->nullable();
            $table->foreign('order_item_id')->references('order_item_id')->on('order_items')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('qr_codes');
    }
};
