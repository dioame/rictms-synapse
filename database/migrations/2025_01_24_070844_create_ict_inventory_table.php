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
        Schema::create('ict_inventory', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('equipment_name')->nullable();// Name of the equipment (e.g., laptop, printer)
            $table->string('serial_number')->nullable(); // Unique serial number
            $table->string('model')->nullable(); // Model of the equipment (optional)
            $table->string('manufacturer')->nullable(); // Manufacturer of the equipment (optional)
            $table->string('location')->nullable();// Where the equipment is located (e.g., office, lab)
            $table->string('status')->nullable(); // Current status of the equipment
            $table->date('purchase_date')->nullable();// Date when the equipment was purchased
            $table->decimal('purchase_price', 10, 2)->nullable(); // Price of the equipment
            $table->date('warranty_expiry')->nullable(); // Warranty expiry date
            $table->text('remarks')->nullable(); // Any additional information or notes about the equipment
            $table->timestamps(); // created_at and updated_at columns
            $table->softdeletes(); // created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ict_inventory');
    }
};
