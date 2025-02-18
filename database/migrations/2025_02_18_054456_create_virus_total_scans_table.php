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
        Schema::create('virus_total_scans', function (Blueprint $table) {
            $table->id();
            $table->string('url')->nullable();  // For storing the URL
            $table->string('file_name')->nullable();  // For storing the file name
            $table->json('result');  // To store the response from VirusTotal
            $table->timestamps();  // Store created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('virus_total_scans');
    }
};
