<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->bigIncrements('order_item_id');
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('ticket_id');
            $table->integer('quantity')->unsigned();
            $table->decimal('price_each', 10, 2);
            $table->unsignedBigInteger('seat_id')->nullable();
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('cascade');
            $table->foreign('seat_id')->references('seat_id')->on('seats')->onDelete('set null');
            $table->index('order_id');
            $table->index('ticket_id');
        });

        // Add CHECK constraint via raw SQL
        DB::statement('ALTER TABLE order_items ADD CONSTRAINT check_quantity_positive CHECK (quantity > 0)');
    }

    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};
