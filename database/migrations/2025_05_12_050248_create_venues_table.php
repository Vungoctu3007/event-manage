<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
    {
        Schema::create('venues', function (Blueprint $table) {
            $table->bigIncrements('venue_id');
            $table->string('name', 150);
            $table->text('address');
            $table->string('city', 100)->nullable();
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('venues');
    }
};
