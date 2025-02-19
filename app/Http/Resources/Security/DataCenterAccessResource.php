<?php

namespace App\Http\Resources\Security;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DataCenterAccessResource extends JsonResource
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
            'name' => $this->name,
            'company_name' => $this->company_name,
            'contact_number' => $this->contact_number,
            'email_address' => $this->email_address,
            'purpose_of_visit' => $this->purpose_of_visit,
            'date_of_visit' => $this->date_of_visit,
            'duration_of_visit' => $this->duration_of_visit,
            'proof_of_identity_presented' => $this->proof_of_identity_presented,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
    
}
