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
            $table->string('abbr'); 
            $table->text('description')->nullable(); 
            $table->string('tech_stack')->nullable(); 
            $table->string('version')->nullable(); 
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
            $table->string('accessibility')->nullable(); 
            $table->string('development_strategy')->nullable(); 
            $table->string('platform')->nullable(); 
            $table->string('computing_scheme')->nullable(); 
            $table->string('internal_users')->nullable(); 
            $table->string('no_of_internal_users')->nullable(); 
            $table->string('external_users')->nullable(); 
            $table->string('no_of_external_users')->nullable(); 
            $table->string('system_owner')->nullable(); 
            $table->string('location_of_deployment')->nullable(); 
            $table->string('hostname_of_database')->nullable(); 
            $table->string('database_ip_address')->nullable(); 
            $table->text('description_general_contents')->nullable(); 
            $table->text('information_systems_served')->nullable(); 
            $table->string('data_archiving')->nullable(); 
            $table->string('sqa_tested')->nullable(); 
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
