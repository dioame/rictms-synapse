<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IctInventory;

class IctInventorySeeder extends Seeder
{
    public function run()
    {
        // Using a loop to create 100 records manually
        for ($i = 0; $i < 100; $i++) {
            IctInventory::create([
                'equipment_name' => 'Equipment ' . $i,
                'serial_number' => 'SN-' . uniqid(),
                'model' => 'Model ' . $i,
                'manufacturer' => 'Manufacturer ' . $i,
                'location' => 'Location ' . ($i % 5), // Example: rotating between 5 locations
                'status' => ['active', 'inactive', 'under_repair', 'disposed'][rand(0, 3)], // Random status
                'purchase_date' => now()->subYears(rand(1, 5))->toDateString(), // Random purchase date in the past 5 years
                'purchase_price' => rand(100, 1000) + rand(0, 99) / 100, // Random price
                'warranty_expiry' => now()->addYears(rand(1, 3))->toDateString(), // Random warranty expiry date
                'remarks' => 'Remarks for equipment ' . $i,
            ]);
        }
    }
}
