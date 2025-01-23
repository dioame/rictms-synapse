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
        Schema::create('applications', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('name'); 
            $table->text('description')->nullable(); 
            $table->string('version')->nullable(); 
            $table->string('application_type')->nullable(); 
            $table->string('frontend_language')->nullable(); 
            $table->string('frontend_framework')->nullable();
            $table->string('backend_language')->nullable(); 
            $table->string('backend_framework')->nullable(); 
            $table->string('sqa_status')->nullable();
            $table->string('repository')->nullable(); 
            $table->string('is_pia')->nullable();
            $table->string('is_km')->nullable();
            $table->string('author')->nullable();
            $table->string('developer')->nullable();
            $table->string('division')->nullable(); 
            $table->string('section')->nullable(); 
            $table->string('region')->nullable(); 
            $table->string('url')->nullable(); 
            $table->date('deployment_date')->nullable(); 
            $table->string('status')->nullable(); 
            $table->string('request_status')->default("pending"); 
            $table->timestamps();
            $table->softdeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
