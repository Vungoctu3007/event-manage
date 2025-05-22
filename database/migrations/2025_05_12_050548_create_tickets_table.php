<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->bigIncrements('ticket_id');
            $table->string('ticket_type', 100);
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('total_quantity')->unsigned();
            $table->integer('sold_quantity')->unsigned()->default(0);
            $table->timestamp('sale_start')->nullable();
            $table->timestamp('sale_end')->nullable();
            $table->timestamps();
        });

        // Thêm ràng buộc CHECK bằng SQL thô
        DB::statement('ALTER TABLE tickets ADD CONSTRAINT check_total_quantity_non_negative CHECK (total_quantity >= 0)');
        DB::statement('ALTER TABLE tickets ADD CONSTRAINT check_sold_quantity_non_negative CHECK (sold_quantity >= 0)');
    }

    public function down()
    {
        Schema::dropIfExists('tickets');
    }
};
