<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_tickets', function (Blueprint $table) {
            $table->bigIncrements('ticket_transaction_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('ticket_id');
            $table->integer('quantity')->unsigned()->default(1);
            $table->string('ticket_code', 100)->unique();
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->timestamp('purchase_date')->default(DB::raw('CURRENT_TIMESTAMP'));
         
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('set null');
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('cascade');
            $table->index('user_id');
            $table->index('ticket_id');
            $table->index('ticket_code');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_tickets');
    }
};
