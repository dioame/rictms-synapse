<?php

namespace App\Http\Resources\IctInventory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class IctInventoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'equipment_name' => $this->equipment_name,
            'serial_number' => $this->serial_number,
            'model' => $this->model,
            'manufacturer' => $this->manufacturer,
            'location' => $this->location,
            'status' => $this->status,
            'purchase_date' => $this->purchase_date,
            'purchase_price' => $this->purchase_price,
            'warranty_expiry' => $this->warranty_expiry,
            'remarks' => $this->remarks,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
