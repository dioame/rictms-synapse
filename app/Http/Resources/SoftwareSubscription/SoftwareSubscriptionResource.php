<?php

namespace App\Http\Resources\SoftwareSubscription;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SoftwareSubscriptionResource extends JsonResource
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
            'software_name' => $this->software_name,
            'license_key' => $this->license_key,
            'subscriber_name' => $this->subscriber_name,
            'subscriber_email' => $this->subscriber_email,
            'subscriber_type' => $this->subscriber_type,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'is_active' => $this->is_active,
        ];
    }
}
