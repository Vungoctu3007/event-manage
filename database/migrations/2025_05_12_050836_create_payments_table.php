<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('payment_id');
            $table->unsignedBigInteger('order_id');
            $table->string('payment_method', 50);
            $table->timestamp('payment_time')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->enum('payment_status', ['successful', 'failed', 'refunded']);
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
            $table->index('order_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
};
