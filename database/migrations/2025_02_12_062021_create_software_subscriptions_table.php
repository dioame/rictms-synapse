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
        Schema::create('software_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('software_name');
            $table->string('license_key')->nullable();
            $table->string('subscriber_name')->nullable();
            $table->string('subscriber_email')->nullable();
            $table->string('subscriber_type')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_active')->default(true)->nullable();
            $table->timestamps();
            $table->softdeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('software_subscriptions');
    }
};
