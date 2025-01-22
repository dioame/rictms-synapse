<?php

namespace App\Http\Resources\Application;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ApplicationResource extends JsonResource
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
            'description' => $this->description,
            'version' => $this->version,
            'frontend_language' => $this->frontend_language,
            'frontend_framework' => $this->frontend_framework,
            'backend_language' => $this->backend_language,
            'backend_framework' => $this->backend_framework,
            'sqa_status' => $this->sqa_status,
            'repository' => $this->repository,
            'is_pia' => $this->is_pia,
            'author' => $this->author,
            'developer' => $this->developer,
            'division' => $this->division,
            'section' => $this->section,
            'region' => $this->region,
            'url' => $this->url,
            'deployment_date' => $this->deployment_date,
            'status' => $this->status,
         ];
    }
}
