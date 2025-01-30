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
        Schema::create('application_deployment_attachments', function (Blueprint $table) {
            $table->id()->primary();
            $table->uuid('application_id')->nullable();
            $table->unsignedBigInteger('lib_deployment_attachments_id')->nullable();
            $table->string('path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_deployment_attachments');
    }
};
