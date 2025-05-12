<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

  public function up()
    {
        Schema::create('organizers', function (Blueprint $table) {
            $table->bigIncrements('organizer_id');
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('organization_name', 150);
            $table->text('description')->nullable();
            $table->text('logo_url')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('organizers');
    }
};
