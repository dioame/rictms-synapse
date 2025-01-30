<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sqa_test_cases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('application_id')->index();
            $table->string('module');
            $table->json('test_procedure')->nullable();
            $table->json('expected_result')->nullable();
            $table->string('test_status')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sqa_test_cases');
    }
};
