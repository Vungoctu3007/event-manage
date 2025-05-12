<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::table('schedule_events', function (Blueprint $table) {
            $table->dropForeign(['ticket_id']);
            $table->dropColumn('ticket_id');

            $table->enum('schedule_type', ['performance', 'session', 'general'])->change();
        });
    }

    public function down()
    {
        Schema::table('schedule_events', function (Blueprint $table) {
            $table->unsignedBigInteger('ticket_id')->nullable()->after('event_id');
            $table->foreign('ticket_id')->references('ticket_id')->on('tickets')->onDelete('set null');

            $table->enum('schedule_type', ['early_bird', 'regular', 'presale', 'general', 'other'])->change();
        });
    }
};
